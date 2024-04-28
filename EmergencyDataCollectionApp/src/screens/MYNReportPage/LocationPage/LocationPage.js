import { Box } from "@gluestack-ui/themed";
import { useAtom, useAtomValue } from "jotai";
import { useResetAtom } from "jotai/utils";
import { KeyboardAvoidingView } from "native-base";
import React, { useEffect, useState } from "react";
import { Alert, Platform, ScrollView, Text } from "react-native";

import {
  numberOfVisitOptions,
  roadConditionOptions,
  StateOptions,
} from "./components/selectOptions";
import CustomGPSInfoComponent from "../../../components/CustomFeedback/CustomGPSInfoComponent/CustomGPSInfoComponent";
import CustomInput from "../../../components/CustomForms/NativeBase/CustomInput/CustomInput";
import CustomSelect from "../../../components/CustomForms/NativeBase/CustomSelect/CustomSelect";
import LineSeparator from "../../../components/LineSeparator/LineSeparator";
import {
  accuracyAtom,
  latitudeAtom,
  longitudeAtom,
} from "../../../utils/gps/GPS_Atom";
import { mynReportAtom, mynTabsStatusAtom } from "../MYNPageAtoms";
import NavigationButtons from "../components/NavigationButtons";

const LocationPage = () => {
  const [mynReport, setMynReport] = useAtom(mynReportAtom);
  const [mynTabsStatus, setMynTabsStatus] = useAtom(mynTabsStatusAtom);

  const [isNumberOfVisitSelectInvalid, setIsNumberOfVisitSelectInvalid] =
    useState(false);
  const [isRoadConditionSelectInvalid, setIsRoadConditionSelectInvalid] =
    useState(false);
  const [isAddressInvalid, setIsAddressInvalid] = useState(false);
  const [isCityInvalid, setIsCityInvalid] = useState(false);
  const [isStateInvalid, setIsStateInvalid] = useState(false);
  const [isZipInvalid, setIsZipInvalid] = useState(false);

  const latitude = useAtomValue(latitudeAtom);
  const longitude = useAtomValue(longitudeAtom);
  const accuracy = useAtomValue(accuracyAtom);

  const resetLatitude = useResetAtom(latitudeAtom);
  const resetLongitude = useResetAtom(longitudeAtom);
  const resetAccuracy = useResetAtom(accuracyAtom);

  const handleNumberOfVisitSelectChange = (value) => {
    setMynReport((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        numberOfVisit: value,
      },
    }));
    setIsNumberOfVisitSelectInvalid(!value);
  };
  const handleRoadConditionSelectChange = (value) => {
    setMynReport((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        roadCondition: value,
      },
    }));
    setIsRoadConditionSelectInvalid(!value);
  };
  const handleAddressChange = (value) => {
    setMynReport((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        address: value,
      },
    }));
    setIsAddressInvalid(!value);
  };
  const handleCityChange = (value) => {
    setMynReport((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        city: value,
      },
    }));
    setIsCityInvalid(!value);
  };
  const handleStateChange = (value) => {
    setMynReport((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        state: value,
      },
    }));
    setIsStateInvalid(!value);
  };
  const handleZipChange = (value) => {
    setMynReport((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        zip: value,
      },
    }));
    setIsZipInvalid(!value);
  };

  useEffect(() => {
    if (
      accuracy < mynReport.location.accuracy ||
      mynReport.location.accuracy === 100
    ) {
      setMynReport((prev) => ({
        ...prev,
        location: {
          ...prev.location,
          latitude,
          longitude,
          accuracy,
        },
      }));
    }
    resetLatitude();
    resetLongitude();
    resetAccuracy();
  }, [latitude, longitude, accuracy]);

  const validateData = () => {
    const zipRegex = /^\d{5}$/;
    const requiredFieldsList = [];

    if (!mynReport.location.latitude || !mynReport.location.longitude) {
      // requiredFieldsList.push("► 1. GPS Accuracy Low");
    }
    if (!mynReport.location.numberOfVisit) {
      setIsNumberOfVisitSelectInvalid(true);
      requiredFieldsList.push("► 2. First Visit");
    }
    if (!mynReport.location.roadCondition) {
      setIsRoadConditionSelectInvalid(true);
      requiredFieldsList.push("► 3. Road Access");
    }
    if (!mynReport.location.address) {
      setIsAddressInvalid(true);
      requiredFieldsList.push("► 4. Address");
    }
    if (!mynReport.location.city) {
      setIsCityInvalid(true);
      requiredFieldsList.push("► 5. City");
    }
    if (!mynReport.location.state) {
      setIsStateInvalid(true);
      requiredFieldsList.push("► 6. State");
    }
    if (!mynReport.location.zip) {
      setIsZipInvalid(true);
      requiredFieldsList.push("► 7. Zip");
    } else if (!zipRegex.test(mynReport.location.zip)) {
      setIsZipInvalid(true);
      requiredFieldsList.push("► 7. Zip Code must be a 5 digit number");
    }

    if (requiredFieldsList.length > 0 && mynTabsStatus.enableDataValidation) {
      Alert.alert(
        "Validation Error",
        "Please fill in all required fields:\n" + requiredFieldsList.join("\n"),
      );
      setMynTabsStatus((prev) => ({
        ...prev,
        isLocationPageValidated: false,
      }));
      return;
    }

    const currentTabIndex = mynTabsStatus.tabIndex;
    setMynTabsStatus((prev) => ({
      ...prev,
      isLocationPageValidated: true,
      tabIndex: currentTabIndex + 1,
    }));
  };

  return (
    <>
      <LineSeparator />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 100}
      >
        <ScrollView>
          <CustomGPSInfoComponent
            title="1. Fetch GPS by clicking the button below"
            latitude={mynReport.location.latitude}
            longitude={mynReport.location.longitude}
            accuracy={mynReport.location.accuracy}
            isRequired
          />
          <Text>
            For most accurate GPS results, please stand at the center of the
            property, away from the street and near the front door. If the GPS
            location accuracy is low, the data will appear in red. Moderate
            accuracy will appear yellow. Good accuracy will appear Green.
          </Text>
          <CustomSelect
            items={numberOfVisitOptions}
            label="2. Is this your first visit to the address?"
            onChange={handleNumberOfVisitSelectChange}
            isInvalid={isNumberOfVisitSelectInvalid}
            testID="myn-report-location-page-is-first-visit-select"
            formControlProps={{
              paddingBottom: 3,
            }}
          />
          <CustomSelect
            items={roadConditionOptions}
            label="3. How good is the ROAD access to the location?"
            onChange={handleRoadConditionSelectChange}
            isInvalid={isRoadConditionSelectInvalid}
            testID="myn-report-location-page-road-condition-select"
            formControlProps={{
              paddingBottom: 3,
            }}
          />
          <CustomInput
            label="4. Address"
            placeholder="Enter the address"
            value={mynReport.location.address}
            onChangeText={handleAddressChange}
            isInvalid={isAddressInvalid}
            errorMessage="Please enter a valid address."
            testID="myn-report-location-page-address-input"
            formControlProps={{
              paddingBottom: 3,
            }}
          />
          <CustomInput
            label="5. City"
            placeholder="Enter the city"
            value={mynReport.location.city}
            onChangeText={handleCityChange}
            isInvalid={isCityInvalid}
            errorMessage="Please enter a valid city."
            testID="myn-report-location-page-city-input"
            formControlProps={{
              paddingBottom: 3,
            }}
          />
          <CustomSelect
            items={StateOptions}
            label="6. State"
            selectedValue={mynReport.location.state}
            isInvalid={isStateInvalid}
            onChange={handleStateChange}
            errorMessage="Please make a selection!"
            testID="myn-report-location-page-state-select"
            formControlProps={{
              paddingBottom: 3,
            }}
          />
          <CustomInput
            label="7. Zip"
            placeholder="Enter the zip code"
            value={mynReport.location.zip}
            onChangeText={handleZipChange}
            isInvalid={isZipInvalid}
            errorMessage="Please enter a valid zip code."
            testID="myn-report-location-page-zip-input"
            formControlProps={{
              paddingBottom: 10,
            }}
          />
          <Box mt={200} />
        </ScrollView>
        <NavigationButtons validateData={validateData} />
      </KeyboardAvoidingView>
    </>
  );
};

export default LocationPage;
