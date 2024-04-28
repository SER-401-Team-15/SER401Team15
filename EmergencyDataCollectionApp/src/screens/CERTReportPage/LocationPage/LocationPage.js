import { Box } from "@gluestack-ui/themed";
import { useAtom, useAtomValue } from "jotai";
import { useResetAtom } from "jotai/utils";
import { KeyboardAvoidingView } from "native-base";
import React, { useEffect, useState } from "react";
import { Alert, Platform, ScrollView, Text } from "react-native";

import {
  StateOptions,
  numberOfVisitOptions,
  roadConditionOptions,
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
import { certReportAtom, certTabsStatusAtom } from "../CERTPageAtoms";
import NavigationButtons from "../components/NavigationButtons";

const LocationPage = () => {
  const [certReport, setCERTReport] = useAtom(certReportAtom);
  const [certTabsStatus, setCERTTabsStatus] = useAtom(certTabsStatusAtom);

  const [isAddressInvalid, setIsAddressInvalid] = useState(false);
  const [isCityInvalid, setIsCityInvalid] = useState(false);
  const [isStateInvalid, setIsStateInvalid] = useState(false);
  const [isZipInvalid, setIsZipInvalid] = useState(false);
  const [isGPSInvalid, setIsGPSInvalid] = useState(false);
  const [isVisitNumberInvalid, setIsVisitNumberInvalid] = useState(false);
  const [isRoadAccessInvalid, setIsRoadAccessInvalid] = useState(false);

  const latitude = useAtomValue(latitudeAtom);
  const longitude = useAtomValue(longitudeAtom);
  const accuracy = useAtomValue(accuracyAtom);

  const resetLatitude = useResetAtom(latitudeAtom);
  const resetLongitude = useResetAtom(longitudeAtom);
  const resetAccuracy = useResetAtom(accuracyAtom);

  const handleAddressChange = (value) => {
    setCERTReport((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        address: value,
      },
    }));
    setIsAddressInvalid(!value);
  };
  const handleCityChange = (value) => {
    setCERTReport((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        city: value,
      },
    }));
    setIsCityInvalid(!value);
  };
  const handleStateChange = (value) => {
    setCERTReport((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        state: value,
      },
    }));
    setIsStateInvalid(!value);
  };
  const handleZipChange = (value) => {
    setCERTReport((prev) => ({
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
      accuracy < certReport.location.accuracy ||
      certReport.location.accuracy === 100
    ) {
      setCERTReport((prev) => ({
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
    setIsGPSInvalid(false);
  }, [latitude, longitude, accuracy]);

  const handleVisitNumberChange = (value) => {
    setCERTReport((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        numberOfVisit: value,
      },
    }));
    setIsVisitNumberInvalid(!value);
  };

  const handleRoadAccessChange = (value) => {
    setCERTReport((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        roadCondition: value,
      },
    }));
    setIsRoadAccessInvalid(!value);
  };

  const validateData = () => {
    const zipRegex = /^\d{5}$/;
    const requiredFieldsList = [];
    if (!certReport.location.latitude || !certReport.location.longitude) {
      //requiredFieldsList.push("► 1. GPS Coordinates");
    }
    if (!certReport.location.numberOfVisit) {
      setIsVisitNumberInvalid(true);
      requiredFieldsList.push("► 2. Visit Number");
    }
    if (!certReport.location.roadCondition) {
      setIsRoadAccessInvalid(true);
      requiredFieldsList.push("► 3. Road Access");
    }
    if (!certReport.location.address) {
      setIsAddressInvalid(true);
      requiredFieldsList.push("► 4. Address");
    }
    if (!certReport.location.city) {
      setIsCityInvalid(true);
      requiredFieldsList.push("► 5. City");
    }
    if (!certReport.location.state) {
      setIsStateInvalid(true);
      requiredFieldsList.push("► 6. State");
    }
    if (!certReport.location.zip) {
      setIsZipInvalid(true);
      requiredFieldsList.push("► 7. Zip");
    } else if (!zipRegex.test(certReport.location.zip)) {
      setIsZipInvalid(true);
      requiredFieldsList.push("► 7. Zip Code must be a 5 digit number");
    }

    if (requiredFieldsList.length > 0 && certTabsStatus.enableDataValidation) {
      Alert.alert(
        "Validation Error",
        "Please fill in all required fields:\n" + requiredFieldsList.join("\n"),
      );
      setCERTTabsStatus((prev) => ({
        ...prev,
        isLocationPageValidated: false,
      }));
      return;
    }

    const currentTabIndex = certTabsStatus.tabIndex;
    setCERTTabsStatus((prev) => ({
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
            latitude={certReport.location.latitude}
            longitude={certReport.location.longitude}
            accuracy={certReport.location.accuracy}
            isInvalid={isGPSInvalid}
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
            onChange={handleVisitNumberChange}
            isInvalid={isVisitNumberInvalid}
            formControlProps={{
              paddingBottom: 3,
            }}
          />
          <CustomSelect
            items={roadConditionOptions}
            label="3. How good is the ROAD access to the location?"
            onChange={handleRoadAccessChange}
            isInvalid={isRoadAccessInvalid}
            formControlProps={{
              paddingBottom: 3,
            }}
          />
          <CustomInput
            label="4. Address"
            placeholder="Enter the address"
            value={certReport.location.address}
            onChangeText={handleAddressChange}
            isInvalid={isAddressInvalid}
            errorMessage="Please enter a valid address."
            testID="cert-report-location-page-address-input"
            formControlProps={{
              paddingBottom: 3,
            }}
          />
          <CustomInput
            label="5. City"
            placeholder="Enter the city"
            value={certReport.location.city}
            onChangeText={handleCityChange}
            isInvalid={isCityInvalid}
            errorMessage="Please enter a valid city."
            testID="cert-report-location-page-city-input"
            formControlProps={{
              paddingBottom: 3,
            }}
          />
          <CustomSelect
            items={StateOptions}
            label="6. State"
            selectedValue={certReport.location.state}
            isInvalid={isStateInvalid}
            onChange={handleStateChange}
            errorMessage="Please make a selection!"
            testID="cert-report-location-page-state-select"
            formControlProps={{
              paddingBottom: 3,
            }}
          />
          {/* TODO - implement Zip code validation */}
          <CustomInput
            label="7. Zip"
            placeholder="Enter the zip code"
            value={certReport.location.zip}
            onChangeText={handleZipChange}
            isInvalid={isZipInvalid}
            errorMessage="Please enter a valid zip code."
            testID="cert-report-location-page-zip-input"
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
