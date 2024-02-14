/**
 * @module MYNResults
 * @description React component for displaying and saving the results of the MYN report.
 * @returns {JSX.Element} Rendered component.
 */
// React and React Native imports
import React from "react";
import { ScrollView, View, Text } from "react-native";

// Custom styles and components
import styles from "./styles";
import Button from "../../components/Button";
import { useReportContext } from "../../components/ReportContext";
// Data lists for displaying
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
} from "../../components/dataLists";
// Database utility class
import { dbClass } from "../../utils/Database/db";

/**
 * @description Functional component representing the MYN Results.
 *
 * @function MYNResults
 * @returns {JSX.Element} Rendered component.
 */

const MYNResults = () => {
  /**
   * @description Function to save the MYN report to the database.
   *
   * @function saveReport
   */
  const saveReport = () => {
    const db = new dbClass();
    if (Report.dbID) {
      db.clearTableByID([Report.dbID]);
    }
    db.addRow(Report);
    db.printAllEntries();
  };
  const Report = useReportContext();

  /**
   * @description Helper function to get the label from a data list based on the provided value.
   *
   * @function getLabelFromList
   * @param {string} value - The value to find in the data list.
   * @param {Array} list - The data list to search for the value.
   * @returns {string} The label corresponding to the provided value in the data list.
   */
  const getLabelFromList = (value, list) => {
    const item = list.find((item) => item.value === value);
    return item ? item.label : value;
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <Button title="Save Report" onPress={saveReport} />
        <View style={styles.box}>
          <Text style={styles.boldText}>Report Start</Text>
          <Text>{`Start Time: ${Report.StartTime}`}</Text>
          <Text>{`GPS: ${Report.Lat}, ${Report.Long}`}</Text>
          <Text>{`Accuracy: ${Report.Accuracy} meters`}</Text>
          <Text>{`MYN Group Name: ${Report.GroupName}`}</Text>
        </View>

        <View style={styles.box}>
          <Text style={styles.boldText}>Location Data</Text>
          <Text>{`Visit Number: ${getLabelFromList(
            Report.VisitNumber,
            visitNumbers,
          )}`}</Text>
          <Text>{`Road Access: ${getLabelFromList(
            Report.RoadAccess,
            RoadCondition,
          )}`}</Text>
          <Text>{`Location Address: ${Report.LocationAddress}`}</Text>
        </View>

        <View style={styles.box}>
          <Text style={styles.boldText}>Structure/Hazards</Text>
          <Text>{`Structure Type: ${getLabelFromList(
            Report.StructureType,
            StructureType,
          )}`}</Text>
          <Text>{`Structure Condition: ${getLabelFromList(
            Report.StructureCondition,
            StructureCondition,
          )}`}</Text>
          <Text>{`Fire Hazards: ${getLabelFromList(
            Report.FireHazards,
            HazzardFire,
          )}`}</Text>
          <Text>{`Propane or Gas Hazards: ${getLabelFromList(
            Report.PropaneOrGasHazards,
            HazzardPropane,
          )}`}</Text>
          <Text>{`Water Hazards: ${getLabelFromList(
            Report.WaterHazards,
            HazzardWater,
          )}`}</Text>
          <Text>{`Electrical Hazards: ${getLabelFromList(
            Report.ElectricalHazards,
            HazzardElectrical,
          )}`}</Text>
          <Text>{`Chemical Hazards: ${getLabelFromList(
            Report.ChemicalHazards,
            HazzardChemical,
          )}`}</Text>
        </View>

        <View style={styles.box}>
          <Text style={styles.boldText}>Personal</Text>
          <Text>{`Rescued People Green: ${Report.RescuedPeopleGreen}`}</Text>
          <Text>{`Rescued People Yellow: ${Report.RescuedPeopleYellow}`}</Text>
          <Text>{`Rescued People Red: ${Report.RescuedPeopleRed}`}</Text>
          <Text>{`People Trapped: ${Report.PeopleTrapped}`}</Text>
          <Text>{`People Need Shelter: ${Report.PeopleNeedShelter}`}</Text>
          <Text>{`Deceased People: ${Report.DeceasedPeople}`}</Text>
          <Text>{`Deceased People Location: ${Report.DeceasedPeopleLocation}`}</Text>
        </View>

        <View style={styles.box}>
          <Text style={styles.boldText}>Animals</Text>
          <Text>{`Any Animals: ${getLabelFromList(
            Report.AnyAnimals,
            Animals,
          )}`}</Text>
          <Text>{`Animal status: ${getLabelFromList(
            Report.AnimalStatus,
            AnimalStatus,
          )}`}</Text>
          <Text>{`Animal Notes: ${Report.AnimalNotes}`}</Text>
        </View>

        <View style={styles.box}>
          <Text style={styles.boldText}>Finish</Text>
          <Text>{`Finish Time: ${Report.FinishTime}`}</Text>
          <Text>{`Notes: ${Report.Notes}`}</Text>
        </View>
        <Button title="Save Report" onPress={saveReport} />
      </View>
    </ScrollView>
  );
};

export default MYNResults;
