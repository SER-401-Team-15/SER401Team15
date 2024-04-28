import { useAtom } from "jotai";
import { Box, ChevronDownIcon, KeyboardAvoidingView } from "native-base";
import React, { useState } from "react";
import { View, Text, Alert, Platform, ScrollView } from "react-native";
import { MultiSelect } from "react-native-element-dropdown";

import { Animals, AnimalStatus } from "./components/selectOptions";
import CustomSelect from "../../../components/CustomForms/NativeBase/CustomSelect/CustomSelect";
import CustomTextArea from "../../../components/CustomForms/NativeBase/CustomTextArea/CustomTextArea";
import LineSeparator from "../../../components/LineSeparator/LineSeparator";
import Theme from "../../../utils/Theme";
import { mynReportAtom, mynTabsStatusAtom } from "../MYNPageAtoms";
import NavigationButtons from "../components/NavigationButtons";

const AnimalPage = () => {
  const [mynReport, setMynReport] = useAtom(mynReportAtom);
  const [mynTabsStatus, setMynTabsStatus] = useAtom(mynTabsStatusAtom);

  const [showAnimalStatus, setShowAnimalStatus] = useState(false);
  const [showAnimalTextBox, setShowAnimalTextBox] = useState(false);

  const [
    isAnyPetsOrFarmAnimalsSelectInvalid,
    setIsAnyPetsOrFarmAnimalsSelectInvalid,
  ] = useState(false);
  const [isSelectedAnimalStatusInvalid, setIsSelectedAnimalStatusInvalid] =
    useState(false);
  const [isAnimalNotesInvalid, setIsAnimalNotesInvalid] = useState(false);

  const handleAnyPetsOrFarmAnimalsChange = (value) => {
    setMynReport((prev) => ({
      ...prev,
      animal: {
        ...prev.animal,
        anyPetsOrFarmAnimals: value,
      },
    }));
    setIsAnyPetsOrFarmAnimalsSelectInvalid(!value);
    if (value === "YY") {
      setShowAnimalStatus(true);
    } else {
      setShowAnimalStatus(false);
      setShowAnimalTextBox(false);
    }
  };
  const handleSelectedAnimalStatusChange = (value) => {
    setMynReport((prev) => ({
      ...prev,
      animal: {
        ...prev.animal,
        selectedAnimalStatus: value,
      },
    }));
    setIsSelectedAnimalStatusInvalid(!value);
    setShowAnimalTextBox(value.some((value) => value.includes("FA")));
  };
  const handleAnimalNotesChange = (value) => {
    setMynReport((prev) => ({
      ...prev,
      animal: {
        ...prev.animal,
        animalNotes: value,
      },
    }));
    setIsAnimalNotesInvalid(!value);
  };

  const validateData = () => {
    const requiredFieldsList = [];
    if (!mynReport.animal.anyPetsOrFarmAnimals) {
      setIsAnyPetsOrFarmAnimalsSelectInvalid(true);
      requiredFieldsList.push("► 2. Any Animals");
    }
    if (
      mynReport.animal.anyPetsOrFarmAnimals === "YY" &&
      mynReport.animal.selectedAnimalStatus.length === 0
    ) {
      setIsSelectedAnimalStatusInvalid(true);
      requiredFieldsList.push("► 2. Animal Status");
    }
    if (
      !mynReport.animal.animalNotes &&
      mynReport.animal.selectedAnimalStatus.some((value) =>
        value.includes("FA"),
      )
    ) {
      setIsAnimalNotesInvalid(true);
      requiredFieldsList.push("► 3. Animal Notes");
    }

    if (requiredFieldsList.length > 0 && mynTabsStatus.enableDataValidation) {
      Alert.alert(
        "Validation Error",
        "Please fill in all required fields:\n" + requiredFieldsList.join("\n"),
      );
      setMynTabsStatus((prev) => ({
        ...prev,
        isAnimalPageValidated: false,
      }));
      return;
    }

    const currentTabIndex = mynTabsStatus.tabIndex;
    setMynTabsStatus((prev) => ({
      ...prev,
      isAnimalPageValidated: true,
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
            items={Animals}
            label="1. Any pets or farm animals?"
            onChange={handleAnyPetsOrFarmAnimalsChange}
            isInvalid={isAnyPetsOrFarmAnimalsSelectInvalid}
            testID="myn-report-animal-page-any-pets-or-farm-animals-select"
            formControlProps={{
              paddingBottom: 3,
            }}
          />

          {showAnimalStatus && (
            <View>
              <Text
                style={{
                  color: Theme.COLORS.TEXT_GREY,
                  fontSize: 13,
                  fontWeight: "bold",
                  paddingBottom: 5,
                }}
              >
                2. Animal Status*
              </Text>
              <MultiSelect
                style={{
                  borderColor: isSelectedAnimalStatusInvalid
                    ? Theme.COLORS.ERROR
                    : Theme.COLORS.BORDER_COLOR,
                  borderRadius: Theme.RADIUS.DEFAULT,
                  borderWidth: 1,
                  padding: 7,
                }}
                renderRightIcon={() => (
                  <Box mr="1">
                    <ChevronDownIcon color={Theme.COLORS.TEXT_GREY} size="6" />
                  </Box>
                )}
                data={AnimalStatus}
                labelField="label"
                valueField="value"
                placeholder="Multi Select"
                placeholderStyle={{
                  color: Theme.COLORS.TEXT_GREY,
                  fontSize: Theme.TYPOGRAPHY.FONT_SIZE.SMALL,
                }}
                searchPlaceholder="Search..."
                value={mynReport.animal.selectedAnimalStatus}
                onChange={handleSelectedAnimalStatusChange}
                search
              />
            </View>
          )}
          {showAnimalTextBox && (
            <CustomTextArea
              label="3. Additional Information about Farm Animals"
              placeholder="Other farm animals, like cows or horses that require attention, please make detailed notes"
              value={mynReport.animal.animalNotes}
              isRequired
              onChangeText={handleAnimalNotesChange}
              isInvalid={isAnimalNotesInvalid}
              errorMessage="Please fill in the required field"
              testID="myn-report-animal-page-animal-notes-textarea"
              formControlProps={{
                marginTop: 2,
              }}
            />
          )}
          <Box mt={200} />
        </ScrollView>
        <NavigationButtons validateData={validateData} />
      </KeyboardAvoidingView>
    </>
  );
};

export default AnimalPage;
