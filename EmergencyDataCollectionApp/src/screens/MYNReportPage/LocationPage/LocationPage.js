import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSetAtom, useAtomValue } from "jotai";
import { KeyboardAvoidingView, NativeBaseProvider } from "native-base";
import React, { useEffect, useState } from "react";
import { Alert, Platform, ScrollView } from "react-native";

import {
  numberOfVisitOptions,
  roadConditionOptions,
  StateOptions,
} from "./components/selectOptions";
import CustomInput from "../../../components/CustomInput/CustomInput";
import CustomSelect from "../../../components/CustomSelect/CustomSelect";
import LineSeparator from "../../../components/LineSeparator/LineSeparator";
import { isLocationPageValidatedAtom, tabIndexAtom } from "../MYNPageAtoms";
import NavigationButtons from "../components/NavigationButtons";

const LocationPage = () => {
  const [valueVisit, setValueVisit] = useState(null);
  const [valueRoadCondition, setValueRoadCondition] = useState(null);
  const [address, onChangeAddress] = useState(null);
  const [city, onChangeCity] = useState(null);
  const [valueState, setValueState] = useState(null);
  const [zip, onChangeZip] = useState(null);

  //auto population from User Preferences
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userDataJSON = await AsyncStorage.getItem("userData");
        const userData = JSON.parse(userDataJSON);
        if (userData) {
          if (userData.city && userData.city !== "") {
            onChangeCity(userData.city);
          }
          if (userData.zip && userData.zip !== "") {
            onChangeZip(userData.zip);
          }
          if (userData.selectedState && userData.selectedState !== "") {
            setValueState(userData.selectedState);
          }
        }
      } catch {}
    };
    loadUserData();
  }, []);

  const [isNumberOfVisitSelectInvalid, setIsNumberOfVisitSelectInvalid] =
    useState(false);
  const [isRoadConditionSelectInvalid, setIsRoadConditionSelectInvalid] =
    useState(false);
  const [isAddressInvalid, setIsAddressInvalid] = useState(false);
  const [isCityInvalid, setIsCityInvalid] = useState(false);
  const [isStateInvalid, setIsStateInvalid] = useState(false);
  const [isZipInvalid, setIsZipInvalid] = useState(false);

  const setIsLocationPageValidated = useSetAtom(isLocationPageValidatedAtom);
  const tabIndex = useAtomValue(tabIndexAtom);
  const setTabIndex = useSetAtom(tabIndexAtom);

  const handleNumberOfVisitSelectChange = (value) => {
    setValueVisit(value);
    setIsNumberOfVisitSelectInvalid(!value);
  };
  const handleRoadConditionSelectChange = (value) => {
    setValueRoadCondition(value);
    setIsRoadConditionSelectInvalid(!value);
  };
  const handleAddressChange = (value) => {
    onChangeAddress(value);
    setIsAddressInvalid(!value);
  };
  const handleCityChange = (value) => {
    onChangeCity(value);
    setIsCityInvalid(!value);
  };
  const handleStateChange = (value) => {
    setValueState(value);
    setIsStateInvalid(!value);
  };
  const handleZipChange = (value) => {
    onChangeZip(value);
    setIsZipInvalid(!value);
  };

  const validateData = () => {
    const requiredFieldsList = [];
    if (!valueVisit) {
      setIsNumberOfVisitSelectInvalid(true);
      requiredFieldsList.push("► 1. First Visit");
    }
    if (!valueRoadCondition) {
      setIsRoadConditionSelectInvalid(true);
      requiredFieldsList.push("► 2. Road Access");
    }
    if (!address) {
      setIsAddressInvalid(true);
      requiredFieldsList.push("► 3. Address");
    }
    if (!city) {
      setIsCityInvalid(true);
      requiredFieldsList.push("► 4. City");
    }
    if (!valueState) {
      setIsStateInvalid(true);
      requiredFieldsList.push("► 5. State");
    }
    if (!zip) {
      setIsZipInvalid(true);
      requiredFieldsList.push("► 6. Zip");
    }

    if (requiredFieldsList.length > 0) {
      Alert.alert(
        "Validation Error",
        "Please fill in all required fields:\n" + requiredFieldsList.join("\n"),
      );
      setIsLocationPageValidated(false);
      return;
    }

    setIsLocationPageValidated(true);
    setTabIndex(tabIndex + 1);
  };

  return (
    <NativeBaseProvider>
      <LineSeparator />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 100}
      >
        <ScrollView>
          <CustomSelect
            items={numberOfVisitOptions}
            label="1. Is this your first visit to the address?"
            onChange={handleNumberOfVisitSelectChange}
            isInvalid={isNumberOfVisitSelectInvalid}
            testID="myn-report-location-page-is-first-visit-select"
            formControlProps={{
              paddingBottom: 3,
            }}
          />
          <CustomSelect
            items={roadConditionOptions}
            label="2. How good is the ROAD access to the location?"
            onChange={handleRoadConditionSelectChange}
            isInvalid={isRoadConditionSelectInvalid}
            testID="myn-report-location-page-road-condition-select"
            formControlProps={{
              paddingBottom: 3,
            }}
          />
          <CustomInput
            label="3. Address"
            placeholder="Enter the address"
            value={address}
            onChangeText={handleAddressChange}
            isInvalid={isAddressInvalid}
            errorMessage="Please enter a valid address."
            testID="myn-report-location-page-address-input"
            formControlProps={{
              paddingBottom: 3,
            }}
          />
          <CustomInput
            label="4. City"
            placeholder="Enter the city"
            value={city}
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
            label="5. State"
            isInvalid={isStateInvalid}
            onChange={handleStateChange}
            errorMessage="Please make a selection!"
            testID="myn-report-location-page-state-select"
            formControlProps={{
              paddingBottom: 3,
            }}
          />
          {/* TODO - implement Zip code validation */}
          <CustomInput
            label="6. Zip"
            placeholder="Enter the zip code"
            value={zip}
            onChangeText={handleZipChange}
            isInvalid={isZipInvalid}
            errorMessage="Please enter a valid zip code."
            testID="myn-report-location-page-zip-input"
            formControlProps={{
              paddingBottom: 10,
            }}
          />
        </ScrollView>
        <NavigationButtons validateData={validateData} />
      </KeyboardAvoidingView>
    </NativeBaseProvider>
  );
};

export default LocationPage;
