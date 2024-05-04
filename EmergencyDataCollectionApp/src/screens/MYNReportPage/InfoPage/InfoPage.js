import { Box } from "@gluestack-ui/themed";
import { useAtom } from "jotai";
import { KeyboardAvoidingView } from "native-base";
import React, { useState } from "react";
import { Alert, Platform, ScrollView } from "react-native";

import HelperText from "./components/HelperText";
import CustomDateTimePickerComponent from "../../../components/CustomForms/CustomDateTimePickerComponent/CustomDateTimePickerComponent";
import CustomInput from "../../../components/CustomForms/GluestackUI/CustomInput/CustomInput";
import LineSeparator from "../../../components/LineSeparator/LineSeparator";
import { mynReportAtom, mynTabsStatusAtom } from "../MYNPageAtoms";
import NavigationButtons from "../components/NavigationButtons";

function InfoPage() {
  const [mynReport, setMynReport] = useAtom(mynReportAtom);
  const [mynTabsStatus, setMynTabsStatus] = useAtom(mynTabsStatusAtom);

  const [isGroupNameInvalid, setIsGroupNameInvalid] = useState(false);
  if (mynReport.info.startTime === "") {
    setMynReport((prev) => ({
      ...prev,
      info: {
        ...prev.info,
        startTime: new Date(),
      },
    }));
  }

  const handleGroupNameChange = (value) => {
    setMynReport((prev) => ({
      ...prev,
      info: {
        ...prev.info,
        groupName: value.nativeEvent.text,
      },
    }));
    if (value.nativeEvent.text) setIsGroupNameInvalid(false);
  };

  const handleDataTimeChange = (event, selectedDate) => {
    const currentDate = selectedDate || mynReport.info.startTime;
    setMynReport((prev) => ({
      ...prev,
      info: {
        ...prev.info,
        startTime: currentDate,
      },
    }));
  };

  const validateData = () => {
    const requiredFieldsList = [];
    if (!mynReport.info.startTime)
      requiredFieldsList.push("► 1. Date and Time");

    if (!mynReport.info.groupName) {
      // TODO: uncomment before prs
      // requiredFieldsList.push("► 2. GPS Coordinates");
      setIsGroupNameInvalid(true);
      requiredFieldsList.push("► 3. Ready Neighbor Group Name");
    }

    if (requiredFieldsList.length > 0 && mynTabsStatus.enableDataValidation) {
      Alert.alert(
        "Validation Error",
        "Please fill in all required fields:\n" + requiredFieldsList.join("\n"),
      );
      setMynTabsStatus((prev) => ({
        ...prev,
        isInfoPageValidated: false,
      }));
      return;
    }

    if (mynReport.info.hash === 0) {
      // Generate hash between 100000000 and 999999999
      const min = 100000000;
      const max = 999999999;
      const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      mynReport.info.hash = randomNumber;
    } else {
      mynReport.info.reportID =
        mynReport.info.reportType + "_" + mynReport.info.hash;
    }

    const currentTabIndex = mynTabsStatus.tabIndex;
    setMynTabsStatus((prev) => ({
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
            value={mynReport.info.startTime}
            handleDataTimeChange={handleDataTimeChange}
            isRequired
          />
          <CustomInput
            label="3. What is the name of the Ready Neighbor Group?"
            placeholder="Enter Ready Neighbor Group Name"
            value={mynReport.info.groupName}
            onChange={handleGroupNameChange}
            isInvalid={isGroupNameInvalid}
            errorMessage="Please enter Ready Neighbor Group Name"
            testID="myn-report-info-page-group-name-input"
            formControlProps={{
              paddingTop: 20,
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
