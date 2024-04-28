import { Box } from "@gluestack-ui/themed";
import { useAtom } from "jotai";
import { KeyboardAvoidingView } from "native-base";
import React, { useState } from "react";
import { Alert, ScrollView, Platform } from "react-native";

import CustomInput from "../../../components/CustomForms/NativeBase/CustomInput/CustomInput";
import CustomSelect from "../../../components/CustomForms/NativeBase/CustomSelect/CustomSelect";
import LineSeparator from "../../../components/LineSeparator/LineSeparator";
import { personal, yesNo } from "../../../utils/constants/dropdownOptions";
import { mynReportAtom, mynTabsStatusAtom } from "../MYNPageAtoms";
import NavigationButtons from "../components/NavigationButtons";

const PeoplePage = () => {
  const [mynReport, setMynReport] = useAtom(mynReportAtom);
  const [mynTabsStatus, setMynTabsStatus] = useAtom(mynTabsStatusAtom);

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
  const [isCertSearchSelectInvalid, setIsCertSearchInvalid] = useState(false);

  const [showLocation, setShowLocation] = useState(false);

  const handleCertSearchChange = (value) => {
    setMynReport((prev) => ({
      ...prev,
      people: {
        ...prev.people,
        certSearch: value,
      },
    }));
    setIsCertSearchInvalid(!value);
  };
  const handleRefugeesFirstAidChange = (value) => {
    setMynReport((prev) => ({
      ...prev,
      people: {
        ...prev.people,
        refugeesFirstAid: value,
      },
    }));
    setIsRefugeesFirstAidInvalid(!value);
  };
  const handleRefugeesShelterChange = (value) => {
    setMynReport((prev) => ({
      ...prev,
      people: {
        ...prev.people,
        refugeesShelter: value,
      },
    }));
    setIsRefugeesFirstAidInvalid(!value);
  };
  const handleGreenPersonalChange = (value) => {
    setMynReport((prev) => ({
      ...prev,
      people: {
        ...prev.people,
        greenPersonal: value,
      },
    }));
    setIsGreenPersonalSelectInvalid(!value);
  };
  const handleYellowPersonalChange = (value) => {
    setMynReport((prev) => ({
      ...prev,
      people: {
        ...prev.people,
        yellowPersonal: value,
      },
    }));
    setIsYellowPersonalSelectInvalid(!value);
  };
  const handleRedPersonalChange = (value) => {
    setMynReport((prev) => ({
      ...prev,
      people: {
        ...prev.people,
        redPersonal: value,
      },
    }));
    setIsRedPersonalSelectInvalid(!value);
  };
  const handleTrappedPersonalChange = (value) => {
    setMynReport((prev) => ({
      ...prev,
      people: {
        ...prev.people,
        trappedPersonal: value,
      },
    }));
    setIsTrappedPersonalSelectInvalid(!value);
  };
  const handlePersonalRequiringShelterChange = (value) => {
    setMynReport((prev) => ({
      ...prev,
      people: {
        ...prev.people,
        personalRequiringShelter: value,
      },
    }));
    setIsPersonalRequiringShelterSelectInvalid(!value);
  };
  const handleDeceasedPersonalChange = (value) => {
    setMynReport((prev) => ({
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
    setMynReport((prev) => ({
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
    if (!mynReport.people.greenPersonal) {
      setIsGreenPersonalSelectInvalid(true);
      requiredFieldsList.push("► 1. Green Personal");
    }
    if (!mynReport.people.yellowPersonal) {
      setIsYellowPersonalSelectInvalid(true);
      requiredFieldsList.push("► 2. Yellow Personal");
    }
    if (!mynReport.people.redPersonal) {
      setIsRedPersonalSelectInvalid(true);
      requiredFieldsList.push("► 3. Red Personal");
    }
    if (!mynReport.people.trappedPersonal) {
      setIsTrappedPersonalSelectInvalid(true);
      requiredFieldsList.push("► 4. Trapped Personal");
    }
    if (!mynReport.people.personalRequiringShelter) {
      setIsPersonalRequiringShelterSelectInvalid(true);
      requiredFieldsList.push("► 5. Personal Requiring Shelter");
    }
    if (!mynReport.people.deceasedPersonal) {
      setIsDeceasedPersonalSelectInvalid(true);
      requiredFieldsList.push("► 6. Deceased Personal");
    }
    if (
      !mynReport.people.deceasedPersonalLocation &&
      mynReport.people.deceasedPersonal > 0
    ) {
      setIsDeceasedPersonalLocationInvalid(true);
      requiredFieldsList.push("► 7. Deceased Personal Location");
    }
    if (!mynReport.people.refugeesFirstAid) {
      setIsRefugeesFirstAidInvalid(true);
      requiredFieldsList.push(
        "► 8. Refugees from other Neighborhoods Needing First Aid",
      );
    }
    if (!mynReport.people.refugeesShelter) {
      setIsRefugeesShelterInvalid(true);
      requiredFieldsList.push(
        "► 9. Refugees from other Neighborhoods Shelter Aid",
      );
    }
    if (!mynReport.people.certSearch) {
      setIsCertSearchInvalid(true);
      requiredFieldsList.push("► 10. CERT Search this Address");
    }

    if (requiredFieldsList.length > 0 && mynTabsStatus.enableDataValidation) {
      Alert.alert(
        "Validation Error",
        "Please fill in all required fields:\n" + requiredFieldsList.join("\n"),
      );
      setMynTabsStatus((prev) => ({
        ...prev,
        isPeoplePageValidated: false,
      }));
      return;
    }

    const currentTabIndex = mynTabsStatus.tabIndex;
    setMynTabsStatus((prev) => ({
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
            testID="myn-report-people-page-rescued-green-select"
            formControlProps={{
              paddingBottom: 3,
            }}
          />
          <CustomSelect
            items={personal}
            label="2. How many rescued people are YELLOW?"
            onChange={handleYellowPersonalChange}
            isInvalid={isYellowPersonalSelectInvalid}
            testID="myn-report-people-page-rescued-yellow-select"
            formControlProps={{
              paddingBottom: 3,
            }}
          />
          <CustomSelect
            items={personal}
            label="3. How many rescued people are RED?"
            onChange={handleRedPersonalChange}
            isInvalid={isRedPersonalSelectInvalid}
            testID="myn-report-people-page-rescued-red-select"
            formControlProps={{
              paddingBottom: 3,
            }}
          />
          <CustomSelect
            items={personal}
            label="4. How many people are TRAPPED?"
            onChange={handleTrappedPersonalChange}
            isInvalid={isTrappedPersonalSelectInvalid}
            testID="myn-report-people-page-trapped-select"
            formControlProps={{
              paddingBottom: 3,
            }}
          />
          <CustomSelect
            items={personal}
            label="5. How many people need SHELTER?"
            onChange={handlePersonalRequiringShelterChange}
            isInvalid={isPersonalRequiringShelterSelectInvalid}
            testID="myn-report-people-page-shelter-select"
            formControlProps={{
              paddingBottom: 3,
            }}
          />
          <CustomSelect
            items={personal}
            label="6. How many rescued people are DECEASED?"
            onChange={handleDeceasedPersonalChange}
            isInvalid={isDeceasedPersonalSelectInvalid}
            testID="myn-report-people-page-rescued-deceased-select"
            formControlProps={{
              paddingBottom: 3,
            }}
          />
          {showLocation && (
            <CustomInput
              label="7. Where is the location of the deceased?"
              onChangeText={handleDeceasedPersonalLocationChange}
              value={mynReport.people.deceasedPersonalLocation}
              isInvalid={isDeceasedPersonalLocationInvalid}
              testID="myn-report-people-page-deceased-location-input"
            />
          )}
          <CustomSelect
            items={yesNo}
            label="8. Are there any people (refugees) from other neighborhoods that require first aid?"
            onChange={handleRefugeesFirstAidChange}
            isInvalid={isRefugeesFirstAidInvalid}
            testID="myn-report-people-page-shelter-select"
            formControlProps={{
              paddingBottom: 3,
            }}
          />
          <CustomSelect
            items={yesNo}
            label="9. Are there any people (refugees) from other neighborhoods that require shelter?"
            onChange={handleRefugeesShelterChange}
            isInvalid={isRefugeesShelterInvalid}
            testID="myn-report-people-page-shelter-select"
            formControlProps={{
              paddingBottom: 3,
            }}
          />
          <CustomSelect
            items={yesNo}
            label="10. Do you want CERT to search this address?"
            onChange={handleCertSearchChange}
            isInvalid={isCertSearchSelectInvalid}
            testID="myn-report-people-page-shelter-select"
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
