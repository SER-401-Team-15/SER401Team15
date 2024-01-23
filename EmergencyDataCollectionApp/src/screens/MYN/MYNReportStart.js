/**
 * @module MYNReportStart
 * @description React component for collecting the initial information for the MYN report.
 * @param {Object} props - React props passed to the component.
 * @param {function} props.addVisibleTab - Function to add a tab to the list of visible tabs in the parent navigation component.
 * @returns {JSX.Element} Rendered component.
 */
// React and React Native imports
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, TextInput, Alert } from "react-native";

// Custom styles and components
import styles from "./styles";
import Button from "../../components/Button";
import useLocationManager from "../../components/LocationManager/LocationManager";
import { useMYNReportContext } from "../../components/MYNReportContect";
import LocationService from "../../utils/gps/locationService";

/**
 * @function MYNReportStart
 * @description React component for collecting the initial information for the MYN report.
 * @param {Object} props - React props passed to the component.
 * @param {function} props.addVisibleTab - Function to add a tab to the list of visible tabs in the parent navigation component.
 * @returns {JSX.Element} - Rendered component.
 */
const MYNReportStart = ({ addVisibleTab }) => {
  const [mynName, onChangeText] = React.useState("");
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [isDatePicker, setIsDatePicker] = useState(true);
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const [acc, setAccuracy] = useState(null);
  const navigation = useNavigation();

  /**
   * @description Function to get the accuracy color based on the accuracy value
   */
  const getAccuracyColor = () => {
    if (acc !== null && !isNaN(acc)) {
      if (acc < 5) {
        return styles.accuracyGreen;
      } else if (acc >= 5 && acc <= 10) {
        return styles.accuracyYellow;
      } else {
        return styles.accuracyRed;
      }
    } else {
      return styles.accuracyBlack;
    }
  };

  const {
    latitude,
    longitude,
    accuracy,
    isFetchingLocation,
    getGPS,
    handleLocationUpdate,
  } = useLocationManager();

  const mynReportObject = useMYNReportContext();
  /**
   * @description Function to load existing data when the component mounts
   */
  const onLoad = () => {
    // Check if values in mynReportObject are not null before setting the state
    if (mynReportObject.StartTime) {
      setDate(mynReportObject.StartTime);
    }
    if (mynReportObject.MYNGroupName) {
      onChangeText(mynReportObject.MYNGroupName);
    }
    if (mynReportObject.Lat) {
      setLat(mynReportObject.Lat);
    }
    if (mynReportObject.Long) {
      setLong(mynReportObject.Long);
    }
    if (mynReportObject.Accuracy) {
      setAccuracy(mynReportObject.Accuracy);
    }
  };
  // Load data on component mount
  React.useEffect(() => {
    onLoad();
  }, []);
  /**
   * @description Function to display the date or time picker based on the current mode
   */
  const showDatepicker = () => {
    setShow(true);
    setIsDatePicker(!isDatePicker);
  };
  /**
   * @description Function to save the current draft of the MYN report and navigate to the next tab
   */
  const saveDraft = () => {
    // Check for required fields
    const requiredFieldsList = [];

    if (!date) {
      requiredFieldsList.push("date");
    }

    if (!latitude || !longitude) {
      requiredFieldsList.push("GPS");
    }

    if (!mynName) {
      requiredFieldsList.push("MYN Group Name");
    }

    // If any required field is empty, show an alert and return without saving
    if (requiredFieldsList.length > 0) {
      Alert.alert(
        "Validation Error",
        "Please fill in all required fields:\n" + requiredFieldsList.join("\n"),
      );
      return;
    }

    // All required fields are filled, proceed to save
    mynReportObject.StartTime = date;
    mynReportObject.Lat = latitude;
    mynReportObject.Long = longitude;
    mynReportObject.Accuracy = accuracy;
    mynReportObject.MYNGroupName = mynName;
    console.log(mynReportObject);
    addVisibleTab("Loc");
  };
  /**
   *@description Function to handle the retry of fetching GPS data
   */
  const handleRetryGPS = () => {
    getGPS();
  };

  React.useEffect(() => {
    if (latitude !== null) {
      setLat(latitude);
    }
    if (longitude !== null) {
      setLong(longitude);
    }
    if (accuracy !== null) {
      setAccuracy(accuracy);
    }
  }, [latitude, longitude, accuracy]);
  /**
   * @description Function to handle the confirmation of the date or time picker
   * @param {Object} event - Event object
   * @param {Date} selectedDate - Selected date
   */
  const handleConfirm = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
  };
  /**
   * @description Function to format the date for display
   * @param {Date} date - Date object
   * @returns {string} - Formatted date string
   */
  const formatDate = (date) => {
    return `${(date.getMonth() + 1).toString().padStart(2, "0")}/${date
      .getDate()
      .toString()
      .padStart(2, "0")}/${date.getFullYear()} ${date
      .getHours()
      .toString()
      .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
  };

  return (
    <View style={styles.container} testID="MYNstart">
      <View style={styles.Upper}>
        <Text style={styles.textHeader}>MYN REPORT</Text>
        <Text style={styles.text}>On site date and time*:</Text>
        <Text style={styles.dateDisplay}>{formatDate(date)}</Text>
        <View style={styles.buttonContainer}>
          <View>
            <Button
              style={styles.button}
              title={isDatePicker ? "Select Time" : "Select Date"}
              onPress={showDatepicker}
            />
          </View>
        </View>

        {isFetchingLocation && (
          <LocationService onLocationObtained={handleLocationUpdate} />
        )}
        <Text style={[styles.gps, getAccuracyColor()]}>
          {`GPS*: ${lat !== null ? lat : "Not available"}, ${
            long !== null ? long : "Not available"
          }\n Accuracy: ${
            acc !== null ? acc.toFixed(2) + " meters" : "Not available"
          }`}
        </Text>
        {isFetchingLocation && <Text>Fetching GPS data...</Text>}
        {!isFetchingLocation && (
          <Button
            style={styles.bottomButtonContainer}
            title="Re-Try GPS"
            onPress={handleRetryGPS}
          />
        )}

        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={isDatePicker ? "date" : "time"}
            is24Hour
            display="default"
            onChange={handleConfirm}
          />
        )}
        <Text style={styles.text}>What is the name of the MYN Group?*</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={mynName}
        />
      </View>
      <View style={styles.Lower}>
        <Text>* are required fields</Text>
        <Button
          style={styles.bottomButtonContainer}
          title="Next"
          onPress={saveDraft}
        />
        <Button
          title="Go Back"
          onPress={() => {
            // Navigate using the `navigation` prop that you received
            navigation.navigate("MainScreen");
          }}
        />
        <Button
          title="Return"
          onPress={() => {
            navigation.navigate("MainScreen");
          }}
        />
      </View>
    </View>
  );
};

export default MYNReportStart;
