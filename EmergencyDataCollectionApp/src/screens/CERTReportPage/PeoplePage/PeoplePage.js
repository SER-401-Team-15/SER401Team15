import { Box } from "@gluestack-ui/themed";
import { useAtom } from "jotai";
import { KeyboardAvoidingView } from "native-base";
import React, { useState } from "react";
import { Alert, ScrollView, Platform } from "react-native";

import CustomInput from "../../../components/CustomForms/NativeBase/CustomInput/CustomInput";
import CustomSelect from "../../../components/CustomForms/NativeBase/CustomSelect/CustomSelect";
import LineSeparator from "../../../components/LineSeparator/LineSeparator";
import { personal, yesNo } from "../../../utils/constants/dropdownOptions";
import { certReportAtom, certTabsStatusAtom } from "../CERTPageAtoms";
import NavigationButtons from "../components/NavigationButtons";

const PeoplePage = () => {
  const [certReport, setCERTReport] = useAtom(certReportAtom);
  const [certTabsStatus, setCERTTabsStatus] = useAtom(certTabsStatusAtom);

  const [isGreenPersonalSelectInvalid, setIsGreenPersonalSelectInvalid] =
    useState(false);
  const [isYellowPersonalSelectInvalid, setIsYellowPersonalSelectInvalid] =
    useState(false);
  const [isRedPersonalSelectInvalid, setIsRedPersonalSelectInvalid] =
    useState(false);
  const [isDeceasedPersonalSelectInvalid, setIsDeceasedPersonalSelectInvalid] =
    useState(false);
  const [isTrappedPersonalSelectInvalid, setIsTrappedPersonalSelectInvalid] =
    useState(false);
  const [
    isPersonalRequiringShelterSelectInvalid,
    setIsPersonalRequiringShelterSelectInvalid,
  ] = useState(false);
  const [
    isDeceasedPersonalLocationInvalid,
    setIsDeceasedPersonalLocationInvalid,
  ] = useState(false);
  const [isRefugeesFirstAidInvalid, setIsRefugeesFirstAidInvalid] =
    useState(false);
  const [isRefugeesShelterInvalid, setIsRefugeesShelterInvalid] =
    useState(false);

  const [showLocation, setShowLocation] = useState(false);

  const handleRefugeesFirstAidChange = (value) => {
    setCERTReport((prev) => ({
      ...prev,
      people: {
        ...prev.people,
        refugeesFirstAid: value,
      },
    }));
    setIsRefugeesFirstAidInvalid(!value);
  };
  const handleRefugeesShelterChange = (value) => {
    setCERTReport((prev) => ({
      ...prev,
      people: {
        ...prev.people,
        refugeesShelter: value,
      },
    }));
    setIsRefugeesFirstAidInvalid(!value);
  };
  const handleGreenPersonalChange = (value) => {
    setCERTReport((prev) => ({
      ...prev,
      people: {
        ...prev.people,
        greenPersonal: value,
      },
    }));
    setIsGreenPersonalSelectInvalid(!value);
  };
  const handleYellowPersonalChange = (value) => {
    setCERTReport((prev) => ({
      ...prev,
      people: {
        ...prev.people,
        yellowPersonal: value,
      },
    }));
    setIsYellowPersonalSelectInvalid(!value);
  };
  const handleRedPersonalChange = (value) => {
    setCERTReport((prev) => ({
      ...prev,
      people: {
        ...prev.people,
        redPersonal: value,
      },
    }));
    setIsRedPersonalSelectInvalid(!value);
  };
  const handleTrappedPersonalChange = (value) => {
    setCERTReport((prev) => ({
      ...prev,
      people: {
        ...prev.people,
        trappedPersonal: value,
      },
    }));
    setIsTrappedPersonalSelectInvalid(!value);
  };
  const handlePersonalRequiringShelterChange = (value) => {
    setCERTReport((prev) => ({
      ...prev,
      people: {
        ...prev.people,
        personalRequiringShelter: value,
      },
    }));
    setIsPersonalRequiringShelterSelectInvalid(!value);
  };
  const handleDeceasedPersonalChange = (value) => {
    setCERTReport((prev) => ({
      ...prev,
      people: {
        ...prev.people,
        deceasedPersonal: value,
      },
    }));
    setIsDeceasedPersonalSelectInvalid(!value);
    if (value > 0) {
      setShowLocation(true);
    } else {
      setShowLocation(false);
    }
  };
  const handleDeceasedPersonalLocationChange = (value) => {
    setCERTReport((prev) => ({
      ...prev,
      people: {
        ...prev.people,
        deceasedPersonalLocation: value,
      },
    }));
    setIsDeceasedPersonalLocationInvalid(!value);
  };

  const validateData = () => {
    const requiredFieldsList = [];
    if (!certReport.people.greenPersonal) {
      setIsGreenPersonalSelectInvalid(true);
      requiredFieldsList.push("► 1. Green Personal");
    }
    if (!certReport.people.yellowPersonal) {
      setIsYellowPersonalSelectInvalid(true);
      requiredFieldsList.push("► 2. Yellow Personal");
    }
    if (!certReport.people.redPersonal) {
      setIsRedPersonalSelectInvalid(true);
      requiredFieldsList.push("► 3. Red Personal");
    }
    if (!certReport.people.trappedPersonal) {
      setIsTrappedPersonalSelectInvalid(true);
      requiredFieldsList.push("► 4. Trapped Personal");
    }
    if (!certReport.people.personalRequiringShelter) {
      setIsPersonalRequiringShelterSelectInvalid(true);
      requiredFieldsList.push("► 5. Personal Requiring Shelter");
    }
    if (!certReport.people.deceasedPersonal) {
      setIsDeceasedPersonalSelectInvalid(true);
      requiredFieldsList.push("► 6. Deceased Personal");
    }
    if (
      !certReport.people.deceasedPersonalLocation &&
      certReport.people.deceasedPersonal > 0
    ) {
      setIsDeceasedPersonalLocationInvalid(true);
      requiredFieldsList.push("► 7. Deceased Personal Location");
    }
    if (!certReport.people.refugeesFirstAid) {
      setIsRefugeesFirstAidInvalid(true);
      requiredFieldsList.push(
        "► 8. Refugees from other Neighborhoods Needing First Aid",
      );
    }
    if (!certReport.people.refugeesShelter) {
      setIsRefugeesShelterInvalid(true);
      requiredFieldsList.push(
        "► 9. Refugees from other Neighborhoods Shelter Aid",
      );
    }

    if (requiredFieldsList.length > 0 && certTabsStatus.enableDataValidation) {
      Alert.alert(
        "Validation Error",
        "Please fill in all required fields:\n" + requiredFieldsList.join("\n"),
      );
      setCERTTabsStatus((prev) => ({
        ...prev,
        isPeoplePageValidated: false,
      }));
      return;
    }

    const currentTabIndex = certTabsStatus.tabIndex;
    setCERTTabsStatus((prev) => ({
      ...prev,
      isPeoplePageValidated: true,
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
          <CustomSelect
            items={personal}
            label="1. How many rescued people are GREEN?"
            onChange={handleGreenPersonalChange}
            isInvalid={isGreenPersonalSelectInvalid}
            testID="cert-report-people-page-rescued-green-select"
            formControlProps={{
              paddingBottom: 3,
            }}
          />
          <CustomSelect
            items={personal}
            label="2. How many rescued people are YELLOW?"
            onChange={handleYellowPersonalChange}
            isInvalid={isYellowPersonalSelectInvalid}
            testID="cert-report-people-page-rescued-yellow-select"
            formControlProps={{
              paddingBottom: 3,
            }}
          />
          <CustomSelect
            items={personal}
            label="3. How many rescued people are RED?"
            onChange={handleRedPersonalChange}
            isInvalid={isRedPersonalSelectInvalid}
            testID="cert-report-people-page-rescued-red-select"
            formControlProps={{
              paddingBottom: 3,
            }}
          />
          <CustomSelect
            items={personal}
            label="4. How many people are TRAPPED?"
            onChange={handleTrappedPersonalChange}
            isInvalid={isTrappedPersonalSelectInvalid}
            testID="cert-report-people-page-trapped-select"
            formControlProps={{
              paddingBottom: 3,
            }}
          />
          <CustomSelect
            items={personal}
            label="5. How many people need SHELTER?"
            onChange={handlePersonalRequiringShelterChange}
            isInvalid={isPersonalRequiringShelterSelectInvalid}
            testID="cert-report-people-page-shelter-select"
            formControlProps={{
              paddingBottom: 3,
            }}
          />
          <CustomSelect
            items={personal}
            label="6. How many rescued people are DECEASED?"
            onChange={handleDeceasedPersonalChange}
            isInvalid={isDeceasedPersonalSelectInvalid}
            testID="cert-report-people-page-rescued-deceased-select"
            formControlProps={{
              paddingBottom: 3,
            }}
          />
          {showLocation && (
            <CustomInput
              label="7. Where is the location of the deceased?"
              onChangeText={handleDeceasedPersonalLocationChange}
              value={certReport.people.deceasedPersonalLocation}
              isInvalid={isDeceasedPersonalLocationInvalid}
              testID="cert-report-people-page-deceased-location-input"
            />
          )}
          <CustomSelect
            items={yesNo}
            label="8. Are there any people (refugees) from other neighborhoods that require first aid?"
            onChange={handleRefugeesFirstAidChange}
            isInvalid={isRefugeesFirstAidInvalid}
            testID="cert-report-people-page-shelter-select"
            formControlProps={{
              paddingBottom: 3,
            }}
          />
          <CustomSelect
            items={yesNo}
            label="9. Are there any people (refugees) from other neighborhoods that require shelter?"
            onChange={handleRefugeesShelterChange}
            isInvalid={isRefugeesShelterInvalid}
            testID="cert-report-people-page-shelter-select"
            formControlProps={{
              paddingBottom: 3,
            }}
          />
          <Box mt={200} />
        </ScrollView>
        <NavigationButtons validateData={validateData} />
      </KeyboardAvoidingView>
    </>
  );
};

export default PeoplePage;
