import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import { useAtom } from "jotai";
import React, { useState } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { KeyboardAvoidingView, NativeBaseProvider } from "native-base";

import { hazardReportAtom, hazardTabsStatusAtom } from "./HazardPageAtoms";
import NavigationButtons from "./components/NavigationButtons";
import CustomButton from "../../components/CustomForms/CustomButton/CustomButton";
import CustomDateTimePickerComponent from "../../components/CustomForms/CustomDateTimePickerComponent/CustomDateTimePickerComponent";
import CustomTextArea from "../../components/CustomForms/NativeBase/CustomTextArea/CustomTextArea";
import LineSeparator from "../../components/LineSeparator/LineSeparator";
import Theme from "../../utils/Theme";

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

  const getPermissionAsync = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== "granted") {
      alert("Camera permissions are required");
    }
  };

  const takePicture = async () => {
    await getPermissionAsync();
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!result.cancelled) {
      hazardReport.hazardPicture.number++;
      const name =
        hazardReport.info.hash +
        "_" +
        hazardReport.hazardPicture.number +
        ".jpeg";
      const path = result.uri.substring(0, result.uri.lastIndexOf("/") + 1);
      result.assets[0].fileName = name;
      result.assets[0].uri = path + name;
    }
    console.log(result);
  };
  const imageLogic = () => {
    takePicture();
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
    <NativeBaseProvider>
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
      <CustomButton
        style={{
          marginTop: 20,
          width: "100%",
          borderColor: Theme.COLORS.BACKGROUND_YELLOW,
          borderWidth: 1,
          backgroundColor: Theme.COLORS.BACKGROUND_YELLOW_OPACITY_20,
          paddingVertical: Theme.BUTTON_PADDING.VERTICAL,
          borderRadius: Theme.RADIUS.BUTTON,
        }}
        title="Upload/take image"
        onPress={imageLogic}
      />
      </ScrollView>
      <NavigationButtons validateData={validateData} />
    </KeyboardAvoidingView>
  </NativeBaseProvider>
  );
}
