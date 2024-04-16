import { useAtom } from "jotai";
import { KeyboardAvoidingView } from "native-base";
import React, { useState } from "react";
import { Platform, ScrollView } from "react-native";

import { hazardReportAtom, hazardTabsStatusAtom } from "./HazardPageAtoms";
import NavigationButtons from "./components/NavigationButtons";
import CustomDateTimePickerComponent from "../../components/CustomForms/CustomDateTimePickerComponent/CustomDateTimePickerComponent";
import CustomTextArea from "../../components/CustomForms/NativeBase/CustomTextArea/CustomTextArea";
import EverythingCamera from "../../components/EverythingCamera/EverythingCamera";
import LineSeparator from "../../components/LineSeparator/LineSeparator";

export default function SecondScreen() {
  const [hazardReport, setHazardReport] = useAtom(hazardReportAtom);
  const [hazardTabsStatus, setHazardTabsStatus] = useAtom(hazardTabsStatusAtom);
  const [inputText] = useState("");
  const [endTime] = useState(new Date());

  const handleEndTimeChange = (event, selectedDate) => {
    const currentDate = selectedDate || hazardReport.info.endTime;
    setHazardReport((prev) => ({
      ...prev,
      info: {
        ...prev.info,
        endTime: currentDate,
      },
    }));
  };

  const handleNotesChange = (value) => {
    setHazardReport((prev) => ({
      ...prev,
      note: {
        NotesTextArea: value,
      },
    }));
  };

  const validateData = () => {
    setHazardTabsStatus((prev) => ({
      ...prev,
      isSecondPageValidated: false,
    }));

    setHazardReport((prev) => ({
      ...prev,
      report: {
        ...prev.report,
        Notes: inputText,
        EndTime: endTime,
      },
    }));

    const currentTabIndex = hazardTabsStatus.tabIndex;
    setHazardTabsStatus((prev) => ({
      ...prev,
      isSecondPageValidated: true,
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
            value={hazardReport.info.endTime}
            handleDataTimeChange={handleEndTimeChange}
            isRequired
          />
          <CustomTextArea
            label="2. Additional Notes:"
            placeholder="Any additional notes you would like to add?"
            value={hazardReport.note.NotesTextArea}
            onChangeText={handleNotesChange}
            testID="hazard-report-note-page-additional-notes-textarea"
            formControlProps={{
              marginTop: 2,
            }}
          />
          <EverythingCamera />
        </ScrollView>
        <NavigationButtons validateData={validateData} />
      </KeyboardAvoidingView>
    </>
  );
}
