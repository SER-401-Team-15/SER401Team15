import { useAtomValue } from "jotai";
import { NativeBaseProvider } from "native-base";
import React from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";

import LineSeparator from "../../../components/LineSeparator/LineSeparator";
import ReportHeader from "../../../components/ReportHeader/ReportHeader";
import {
  visitNumbers,
  RoadCondition,
  StructureType,
  StructureCondition,
  HazzardFire,
  HazzardPropane,
  HazzardWater,
  HazzardElectrical,
  HazzardChemical,
  Animals,
  AnimalStatus,
} from "../../../components/dataLists";
import Theme from "../../../utils/Theme";
import { certReportAtom } from "../CERTPageAtoms";
import NavigationButtons from "../components/NavigationButtons";
import { formatDate } from "../components/formatDate";

const ReviewPage = () => {
  const certReport = useAtomValue(certReportAtom);

  const getLabelFromList = (value, list) => {
    const item = list.find((item) => item.value === value);
    return item ? item.label : value;
  };

  return (
    <NativeBaseProvider>
      <View
        style={{
          flex: 1,
          paddingHorizontal: 20,
        }}
      >
        <ReportHeader
          title="CERT Reporting"
          subtitle="Review entry before saving"
        />
        <LineSeparator />
        <View style={{ marginBottom: 10 }} />

        <ScrollView>
          <Text style={styles.boldText}>Info:</Text>
          <View style={styles.box}>
            <Text>{`Start Time: ${formatDate(certReport.info.startTime)}`}</Text>
            <Text>{`GPS: ${certReport.info.latitude}, ${certReport.info.longitude}`}</Text>
            <Text>{`Accuracy: ${certReport.info.accuracy} meters`}</Text>
            <Text>{`CERT Group Name: ${certReport.info.groupName}`}</Text>
          </View>

          <Text style={styles.boldText}>Location:</Text>
          <View style={styles.box}>
            <Text>{`Visit Number: ${getLabelFromList(
              certReport.location.numberOfVisit,
              visitNumbers,
            )}`}</Text>
            <Text>{`Road Access: ${getLabelFromList(
              certReport.location.roadCondition,
              RoadCondition,
            )}`}</Text>
            <Text>{`Location Address: ${certReport.location.address}`}</Text>
          </View>

          <Text style={styles.boldText}>Structure/Hazards:</Text>
          <View style={styles.box}>
            <Text>{`Structure Type: ${getLabelFromList(
              certReport.hazard.structureType,
              StructureType,
            )}`}</Text>
            <Text>{`Structure Condition: ${getLabelFromList(
              certReport.hazard.structureCondition,
              StructureCondition,
            )}`}</Text>
            <Text>{`Fire Hazards: ${getLabelFromList(
              certReport.hazard.hazardFire,
              HazzardFire,
            )}`}</Text>
            <Text>{`Propane or Gas Hazards: ${getLabelFromList(
              certReport.hazard.hazardPropane,
              HazzardPropane,
            )}`}</Text>
            <Text>{`Water Hazards: ${getLabelFromList(
              certReport.hazard.hazardWater,
              HazzardWater,
            )}`}</Text>
            <Text>{`Electrical Hazards: ${getLabelFromList(
              certReport.hazard.hazardElectrical,
              HazzardElectrical,
            )}`}</Text>
            <Text>{`Chemical Hazards: ${getLabelFromList(
              certReport.hazard.hazardChemical,
              HazzardChemical,
            )}`}</Text>
          </View>

          <Text style={styles.boldText}>Personnel:</Text>
          <View style={styles.box}>
            <Text>{`Rescued People Green: ${certReport.people.greenPersonal}`}</Text>
            <Text>{`Rescued People Yellow: ${certReport.people.yellowPersonal}`}</Text>
            <Text>{`Rescued People Red: ${certReport.people.redPersonal}`}</Text>
            <Text>{`People Trapped: ${certReport.people.trappedPersonal}`}</Text>
            <Text>{`People Need Shelter: ${certReport.people.personalRequiringShelter}`}</Text>
            <Text>{`Deceased People: ${certReport.people.deceasedPersonal}`}</Text>
            <Text>{`Deceased People Location: ${certReport.people.deceasedPersonalLocation}`}</Text>
          </View>

          <Text style={styles.boldText}>Animals:</Text>
          <View style={styles.box}>
            <Text>{`Any Animals: ${getLabelFromList(
              certReport.animal.anyPetsOrFarmAnimals,
              Animals,
            )}`}</Text>
            <Text>{`Animal status: ${getLabelFromList(
              certReport.animal.selectedAnimalStatus,
              AnimalStatus,
            )}`}</Text>
            <Text>{`Animal Notes: ${certReport.animal.animalNotes}`}</Text>
          </View>

          <Text style={styles.boldText}>Notes:</Text>
          <View style={styles.box}>
            <Text>{`Finish Time: ${formatDate(
              certReport.info.startTime,
            )}`}</Text>
            <Text>{`Notes: ${certReport.note.NotesTextArea}`}</Text>
          </View>
          <NavigationButtons />
        </ScrollView>
      </View>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  box: {
    borderWidth: 1,
    borderColor: Theme.COLORS.BORDER_COLOR,
    padding: 10,
    width: "100%",
    alignSelf: "center",
    marginBottom: 20,
    borderRadius: Theme.RADIUS.DEFAULT,
  },
  boldText: {
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default ReviewPage;
