import { Box } from "@gluestack-ui/themed";
import { useAtom } from "jotai";
import { KeyboardAvoidingView } from "native-base";
import React from "react";
import { Alert, Platform, ScrollView } from "react-native";

import CustomDateTimePickerComponent from "../../../components/CustomForms/CustomDateTimePickerComponent/CustomDateTimePickerComponent";
import CustomTextArea from "../../../components/CustomForms/NativeBase/CustomTextArea/CustomTextArea";
import EverythingCamera from "../../../components/EverythingCamera/EverythingCamera";
import LineSeparator from "../../../components/LineSeparator/LineSeparator";
import { certReportAtom, certTabsStatusAtom } from "../CERTPageAtoms";
import NavigationButtons from "../components/NavigationButtons";

const NotePage = () => {
  const [certReport, setCERTReport] = useAtom(certReportAtom);
  const [certTabsStatus, setCERTTabsStatus] = useAtom(certTabsStatusAtom);
  if (certReport.info.endTime === "") {
    setCERTReport((prev) => ({
      ...prev,
      info: {
        ...prev.info,
        endTime: new Date(),
      },
    }));
  }

  const handleDataTimeChange = (event, selectedDate) => {
    const currentDate = selectedDate || certReport.info.endTime;
    setCERTReport((prev) => ({
      ...prev,
      info: {
        ...prev.info,
        endTime: currentDate,
      },
    }));
  };

  const handleNotesChange = (value) => {
    setCERTReport((prev) => ({
      ...prev,
      note: {
        NotesTextArea: value,
      },
    }));
  };

  const validateData = () => {
    const requiredFieldsList = [];
    if (!certReport.info.endTime) {
      requiredFieldsList.push("► 1. Invalid Onsite Date");
    }

    if (requiredFieldsList.length > 0) {
      Alert.alert(
        "Validation Error",
        "Please fill in all required fields:\n" + requiredFieldsList.join("\n"),
      );
      setCERTTabsStatus((prev) => ({
        ...prev,
        isNotePageValidated: false,
      }));
      return;
    }

    const currentTabIndex = certTabsStatus.tabIndex;
    setCERTTabsStatus((prev) => ({
      ...prev,
      isNotePageValidated: true,
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
          <CustomDateTimePickerComponent
            title="1. Need to change the date and time of the report?"
            value={certReport.info.endTime}
            handleDataTimeChange={handleDataTimeChange}
            isRequired
          />
          <CustomTextArea
            label="2. Additional Notes:"
            placeholder="Any additional notes you would like to add?"
            value={certReport.note.NotesTextArea}
            onChangeText={handleNotesChange}
            testID="cert-report-note-page-additional-notes-textarea"
            formControlProps={{
              marginTop: 2,
            }}
          />
          <EverythingCamera />
          <Box mt={200} />
        </ScrollView>
        <NavigationButtons validateData={validateData} />
      </KeyboardAvoidingView>
    </>
  );
};

export default NotePage;
