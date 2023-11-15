import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

import styles from "./styles";
import Button from "../../components/Button";
import { useMYNReportContext } from "../../components/MYNReportContect";
import { Animals, AnimalStatus } from "../../components/dataLists";

const MYNReportAnimals = ({ addVisibleTab }) => {
  const [valueAnimals, setValueAnimals] = useState(null);
  const [valueAnimalStatus, setValueAnimalStatus] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [showAnimalStatus, setShowAnimalStatus] = useState(false);
  const [showAnimalTextBox, setShowAnimalTextBox] = useState(false);
  const [animalNotes, setAnimalNotes] = useState("");
  const mynReportObject = useMYNReportContext();

  const onLoad = () => {
    // Check if values in mynReportObject are not null before setting the state
    if (mynReportObject.AnyAnimals) {
      setValueAnimals(mynReportObject.AnyAnimals);
      setShowAnimalStatus(mynReportObject.AnyAnimals === "YY");
    }

    if (mynReportObject.AnimalStatus) {
      setValueAnimalStatus(mynReportObject.AnimalStatus);
      setShowAnimalTextBox(mynReportObject.AnimalStatus === "FA");
    }

    if (mynReportObject.AnimalNotes) {
      setAnimalNotes(mynReportObject.AnimalNotes);
    }
  };

  React.useEffect(() => {
    onLoad(); // Call onLoad when the component mounts
  }, []); 


  const handleAnimalChange = (item) => {
    setValueAnimals(item.value);
    setShowAnimalStatus(item.value === "YY");
    setValueAnimalStatus(null);
    setShowAnimalTextBox(false);
  };

  const handleAnimalStatusChange = (item) => {
    setValueAnimalStatus(item.value);
    setShowAnimalTextBox(item.value === "FA");
  };

  const saveDraft = () => {
    mynReportObject.AnyAnimals = valueAnimals;
    mynReportObject.AnimalStatus = valueAnimalStatus;
    mynReportObject.AnimalNotes = animalNotes;
    addVisibleTab("Finish");
  };

  return (
    <View style={styles.container}>
      <View style={styles.Upper}>
        <Text style={styles.textHeader}>ANIMALS</Text>
        <Text>Any pets or farm animals?*</Text>
        <Dropdown
          style={[styles.dropdown]}
          data={Animals}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? "" : ""}
          searchPlaceholder="Search..."
          value={valueAnimals}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={handleAnimalChange}
        />
        {showAnimalStatus && (
          <View style={styles.dropdownContainer}>
            <Text>Animal Status*</Text>
            <Dropdown
              style={[styles.dropdown]}
              data={AnimalStatus}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? "" : ""}
              searchPlaceholder="Search..."
              value={valueAnimalStatus}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={handleAnimalStatusChange}
            />
          </View>
        )}
        {showAnimalTextBox && (
          <View style={styles.textAreaContainer}>
            <Text>Additional Information about Farm Animals*</Text>
            <TextInput
              style={styles.textArea}
              underlineColorAndroid="transparent"
              placeholder="Other farm animals, like cows or horses that require attion, please make detailed notes"
              placeholderTextColor="grey"
              numberOfLines={20}
              multiline
              textAlignVertical="top"
              textAlign="left"
              onChangeText={(text) => setAnimalNotes(text)}
              value={animalNotes}
            />
          </View>
        )}
      </View>
      <View style={styles.Lower}>
        <Text>* are required fields</Text>
        <Button
          style={styles.bottomButtonContainer}
          title="Save current draft of report"
          onPress={saveDraft}
        />
      </View>
    </View>
  );
};

export default MYNReportAnimals;
