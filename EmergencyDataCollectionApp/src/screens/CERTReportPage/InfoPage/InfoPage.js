import { Box } from "@gluestack-ui/themed";
import { useAtom } from "jotai";
import { KeyboardAvoidingView } from "native-base";
import React, { useState } from "react";
import { Alert, Platform, ScrollView } from "react-native";

import HelperText from "./components/HelperText";
import CustomDateTimePickerComponent from "../../../components/CustomForms/CustomDateTimePickerComponent/CustomDateTimePickerComponent";
import CustomInput from "../../../components/CustomForms/NativeBase/CustomInput/CustomInput";
import LineSeparator from "../../../components/LineSeparator/LineSeparator";
import { certReportAtom, certTabsStatusAtom } from "../CERTPageAtoms";
import NavigationButtons from "../components/NavigationButtons";

function InfoPage() {
  const [certReport, setCERTReport] = useAtom(certReportAtom);
  const [certTabsStatus, setCERTTabsStatus] = useAtom(certTabsStatusAtom);
  const [isGroupNameInvalid, setIsGroupNameInvalid] = useState(false);
  const [isSquadNameInvalid, setIsSquadNameInvalid] = useState(false);
  if (certReport.info.startTime === "") {
    setCERTReport((prev) => ({
      ...prev,
      info: {
        ...prev.info,
        startTime: new Date(),
      },
    }));
  }

  const handleGroupNameChange = (value) => {
    setCERTReport((prev) => ({
      ...prev,
      info: {
        ...prev.info,
        groupName: value,
      },
    }));
    setIsGroupNameInvalid(!value);
  };

  const handleSquadNameChange = (value) => {
    setCERTReport((prev) => ({
      ...prev,
      info: {
        ...prev.info,
        squadName: value,
      },
    }));
    setIsSquadNameInvalid(!value);
  };

  const handleDateTimeChange = (event, selectedDate) => {
    const currentDate = selectedDate || certReport.info.startTime;
    setCERTReport((prev) => ({
      ...prev,
      info: {
        ...prev.info,
        startTime: currentDate,
      },
    }));
  };

  const validateData = () => {
    const requiredFieldsList = [];
    if (!certReport.info.startTime)
      requiredFieldsList.push("► 1. Date and Time");
    if (!certReport.info.groupName) {
      setIsGroupNameInvalid(true);
      requiredFieldsList.push("► 2. CERT Group Name");
    }
    if (!certReport.info.squadName) {
      setIsSquadNameInvalid(true);
      requiredFieldsList.push("► 3. CERT Squad Name");
    }

    if (requiredFieldsList.length > 0 && certTabsStatus.enableDataValidation) {
      Alert.alert(
        "Validation Error",
        "Please fill in all required fields:\n" + requiredFieldsList.join("\n"),
      );
      setCERTTabsStatus((prev) => ({
        ...prev,
        isInfoPageValidated: false,
      }));
      return;
    }

    if (certReport.info.hash === 0) {
      // Generate hash between 100000000 and 999999999
      const min = 100000000;
      const max = 999999999;
      const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      certReport.info.hash = randomNumber;
    } else {
      certReport.info.reportID =
        certReport.info.reportType + "_" + certReport.info.hash;
    }

    const currentTabIndex = certTabsStatus.tabIndex;
    setCERTTabsStatus((prev) => ({
      ...prev,
      isInfoPageValidated: true,
      tabIndex: currentTabIndex + 1,
    }));
  };

  return (
    <>
      <LineSeparator />
      <HelperText />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 100}
      >
        <ScrollView>
          <CustomDateTimePickerComponent
            title="1. Select the date and time of the report"
            value={certReport.info.startTime}
            handleDataTimeChange={handleDateTimeChange}
            isRequired
          />
          <CustomInput
            label="2. What is the name of the CERT Group?"
            placeholder="Enter CERT Group Name"
            value={certReport.info.groupName}
            onChangeText={handleGroupNameChange}
            isInvalid={isGroupNameInvalid}
            errorMessage="Please enter CERT Group Number"
            testID="cert-report-info-page-group-name-input"
            formControlProps={{
              paddingTop: 3,
            }}
          />
          <CustomInput
            label="3. What is the name of the CERT Squad?"
            placeholder="Enter CERT Squad"
            value={certReport.info.squadName}
            onChangeText={handleSquadNameChange}
            isInvalid={isSquadNameInvalid}
            errorMessage="Please enter CERT Group Number"
            formControlProps={{
              paddingTop: 3,
            }}
          />
          <Box mt={200} />
        </ScrollView>
        <NavigationButtons validateData={validateData} />
      </KeyboardAvoidingView>
    </>
  );
}

export default InfoPage;
