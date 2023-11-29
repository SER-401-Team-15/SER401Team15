import * as React from "react";
import { useState } from "react";
import { Text, View, TextInput } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { useCERTReportContext } from "../../components/CERTReportContext";

import styles from "./styles";
import { personal } from "../../components/dataLists";

function PeoplePage() {
  const [valueGreen, setValueGreen] = useState(null);
  const [valueYellow, setValueYello] = useState(null);
  const [valueRed, setValueRed] = useState(null);
  const [valueBlack, setValueBlack] = useState(null);
  const [valueTrapped, setValueTrapped] = useState(null);
  const [valueShelter, setValueShelter] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [showLocation, setShowLocation] = useState(false);
  const [blackLocation, onChangeText] = React.useState("");
  const certReportObject = useCERTReportContext();

  const handleValueBlackChange = (item) => {
    setValueBlack(item.value);
    setShowLocation(item.value > 0);
  };

  const onLoad = () => {
    // Check if values in CERTReportObject are not null before setting the state
    if (certReportObject.RescuedPeopleGreen) {
      setSelectedCERTGroup(certReportObject.RescuedPeopleGreen);
    }
    if (certReportObject.RescuedPeopleYellow) {
      setSelectedSquadName(certReportObject.RescuedPeopleYellow);
    }
    if (certReportObject.RescuedPeopleRed) {
      setSelectedNumVisit(certReportObject.RescuedPeopleRed);
    }
    if (certReportObject.DeceasedPeople) {
      setSelectedNumVisit(certReportObject.DeceasedPeople);
    }
    if (certReportObject.PeopleTrapped) {
      setSelectedRoadStatus(certReportObject.PeopleTrapped);
    }
    if (certReportObject.PeopleNeedShelter) {
      setSelectedRoadStatus(certReportObject.PeopleNeedShelter);
    }
  };

  React.useEffect(() => {
    onLoad(); // Call onLoad when the component mounts
  }, []);

  const check_form = () => {
    const requiredFieldsList = [];
    if (!valueGreen) {
      requiredFieldsList.push("Status GREEN");
    }    
    if (!valueYellow) {
      requiredFieldsList.push("Status YELLOW");
    }    
    if (!valueRed) {
      requiredFieldsList.push("Status RED");
    }    
    if (!valueBlack) {
      requiredFieldsList.push("Status DECEASED");
    }    
    if (!valueTrapped) {
      requiredFieldsList.push("Number People Trapped");
    }    
    if (!valueShelter) {
      requiredFieldsList.push("Number Needing Shelter");
    }
  
    if (requiredFieldsList.length > 0) {
      Alert.alert(
        "Validation Error",
        "Please fill in all required fields:\n" + requiredFieldsList.join("\n"),
      );
      return false;
    }
    certReportObject.RescuedPeopleGreen = valueGreen;
    certReportObject.RescuedPeopleYellow = valueYellow;
    certReportObject.RescuedPeopleRed = valueRed;
    certReportObject.DeceasedPeople = valueBlack;
    certReportObject.PeopleTrapped = valueTrapped;
    certReportObject.PeopleNeedShelter = valueShelter;
    return true;
  };

  return (
    <View>
      <View style={styles.CONTAINER}>
        <Text style={styles.HEADER1TEXT}>People Information</Text>
        <View>
          <Text>*How many people rescued GREEN status: </Text>
          <Dropdown
            style={[styles.dropdown]}
            data={personal}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? "" : ""}
            searchPlaceholder="Search..."
            value={valueGreen}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) => {
              setValueGreen(item.value);
              setIsFocus(false);
            }}
          />
        </View>
        <View>
          <Text>*How many people rescued YELLOW status: </Text>
          <Dropdown
            style={[styles.dropdown]}
            data={personal}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? "" : ""}
            searchPlaceholder="Search..."
            value={valueYellow}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) => {
              setValueYello(item.value);
              setIsFocus(false);
            }}
          />
        </View>
        <View>
          <Text>*How many people rescued RED status: </Text>
          <Dropdown
            style={[styles.dropdown]}
            data={personal}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? "" : ""}
            searchPlaceholder="Search..."
            value={valueRed}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) => {
              setValueRed(item.value);
              setIsFocus(false);
            }}
          />
        </View>
        <View>
          <Text>*How many people rescued DECEASED status:</Text>
          <Dropdown
            style={[styles.dropdown]}
            data={personal}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? "" : ""}
            searchPlaceholder="Search..."
            value={valueBlack}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={handleValueBlackChange}
          />
          {showLocation && (
            <View style={styles.locationContainer}>
              <Text>Where is the location of the deceased?*</Text>
              <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={blackLocation}
              />
            </View>
          )}
        </View>
        <View>
          <Text>*How many people TRAPPED: </Text>
          <Dropdown
            style={[styles.dropdown]}
            data={personal}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? "" : ""}
            searchPlaceholder="Search..."
            value={valueTrapped}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) => {
              setValueTrapped(item.value);
              setIsFocus(false);
            }}
          />
        </View>
        <View>
          <Text>*How many people needing SHELTER: </Text>
          <Dropdown
            style={[styles.dropdown]}
            data={personal}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? "" : ""}
            searchPlaceholder="Search..."
            value={valueShelter}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) => {
              setValueShelter(item.value);
              setIsFocus(false);
            }}
          />
        </View>
        <View>
          <Text>
            *How many people from other neighborhoods require first aid:{" "}
          </Text>
          <Dropdown
            style={[styles.dropdown]}
            data={personal}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? "" : ""}
            searchPlaceholder="Search..."
            value={valueShelter}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) => {
              setValueShelter(item.value);
              setIsFocus(false);
            }}
          />
        </View>
        <View>
          <Text>
            *How many people from other neighborhoods require shelter:{" "}
          </Text>
          <Dropdown
            style={[styles.dropdown]}
            data={personal}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? "" : ""}
            searchPlaceholder="Search..."
            value={valueShelter}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) => {
              setValueShelter(item.value);
              setIsFocus(false);
            }}
          />
        </View>
      </View>
    </View>
  );
}
export default PeoplePage;
