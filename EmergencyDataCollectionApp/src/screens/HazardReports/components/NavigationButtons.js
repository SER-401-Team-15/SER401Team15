import { useNavigation } from "@react-navigation/native";
import { useAtom, useAtomValue } from "jotai/index";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { imagesAtom } from "../../../components/EverythingCamera/ImagesAtom";
import { saveImages } from "../../../components/EverythingCamera/components/saveImage/saveImage";
import { addReport } from "../../../utils/Database/OfflineSQLiteDB";
import Theme from "../../../utils/Theme";
import { hazardReportAtom, hazardTabsStatusAtom } from "../HazardPageAtoms";

const Button = ({ title, onPress, buttonStyle }) => (
  <TouchableOpacity style={buttonStyle} onPress={onPress}>
    <Text style={styles.text}>{title}</Text>
  </TouchableOpacity>
);

const NavigationButtons = ({ validateData }) => {
  const [hazardTabsStatus, setHazardTabsStatus] = useAtom(hazardTabsStatusAtom);
  const hazardReport = useAtomValue(hazardReportAtom);
  const navigation = useNavigation();
  const images = useAtomValue(imagesAtom);

  const handleBackPress = () => {
    if (hazardTabsStatus.tabIndex === 0) {
      navigation.navigate("MainScreen");
    } else {
      setHazardTabsStatus((prevState) => ({
        ...prevState,
        tabIndex: prevState.tabIndex - 1,
      }));
    }
  };

  //
  const handleNextPress = () => {
    validateData();
  };

  const handleSavePress = () => {
    addReport("Hazard", hazardReport, images);
    let fileName = "ReadyNeighborCustomName";
    if (hazardReport.info.hash !== 0 && hazardReport.info.hash !== null) {
      fileName = hazardReport.info.hash;
    }
    if (Array.isArray(images) && images.length > 0) {
      saveImages(images, fileName).then((r) => console.log("saved", r));
    }
    navigation.navigate("MainScreen");
  };

  let leftButton;
  let rightButton;

  if (hazardTabsStatus.tabIndex === 2) {
    rightButton = (
      <Button
        title="Save"
        onPress={handleSavePress}
        buttonStyle={styles.button}
      />
    );
  } else if (hazardTabsStatus.tabIndex < 2) {
    rightButton = (
      <Button
        title="Next"
        onPress={handleNextPress}
        buttonStyle={styles.button}
      />
    );
  }

  if (hazardTabsStatus.tabIndex === 2) {
    leftButton = (
      <Button
        title="Edit"
        onPress={handleBackPress}
        buttonStyle={styles.cancelButton}
      />
    );
  } else if (hazardTabsStatus.tabIndex > 0) {
    leftButton = (
      <Button
        title="Back"
        onPress={handleBackPress}
        buttonStyle={styles.cancelButton}
      />
    );
  } else if (hazardTabsStatus.tabIndex === 0) {
    leftButton = (
      <Button
        title="Cancel"
        onPress={handleBackPress}
        buttonStyle={styles.cancelButton}
      />
    );
  }

  return (
    <View style={styles.container}>
      {leftButton}
      {rightButton}
    </View>
  );
};

const styles = {
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingVertical: 10,
    gap: 10,
  },
  cancelButton: {
    padding: Theme.BUTTON_PADDING.VERTICAL,
    alignItems: "center",
    width: "48%",
    borderColor: Theme.COLORS.BACKGROUND_YELLOW,
    borderWidth: 1,
    paddingVertical: Theme.BUTTON_PADDING.VERTICAL,
    borderRadius: Theme.RADIUS.BUTTON,
  },
  button: {
    padding: Theme.BUTTON_PADDING.VERTICAL,
    alignItems: "center",
    width: "48%",
    backgroundColor: Theme.COLORS.BACKGROUND_YELLOW,
    paddingVertical: Theme.BUTTON_PADDING.VERTICAL,
    borderRadius: Theme.RADIUS.BUTTON,
  },
  text: {
    color: Theme.COLORS.TEXT_BLACK,
  },
};

export default NavigationButtons;
