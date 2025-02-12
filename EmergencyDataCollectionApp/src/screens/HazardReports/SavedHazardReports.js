import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as SQLite from "expo-sqlite";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";

import Button from "./components/Button";
const db = SQLite.openDatabase("HazardReports.db");

const SavedHazardReports = () => {
  const [hazardReports, setHazardReports] = useState([]);
  const [, setCurrentReport] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Button
          title="Back"
          color="#000"
          onPress={() => navigation.navigate("MainScreen")}
        />
      ),
    });
    fetchReports();
  }, []);
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Button
          title="Back"
          onPress={() => navigation.navigate("MainScreen")}
        />
      ),
    });
    fetchReports();
  }, []);

  const fetchReports = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM HazardReport;",
        [],
        (_, { rows: { _array } }) => setHazardReports(_array),
        (_, error) => console.log("Report fetch error", error),
      );
    });
  };

  const deleteReport = (id) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM HazardReport WHERE id = ?;",
        [id],
        fetchReports,
        (_, error) => console.log("Report delete error", error),
      );
    });
  };

  const openEditModal = (report) => {
    setCurrentReport(report);
    navigation.navigate("StartNewHazardReport", {
      screen: "HazardReportPage",
      params: { report },
    });
  };

  if (!hazardReports.length) {
    return (
      <View style={styles.centered}>
        <Text>No report available. Please add a report.</Text>
        <Button
          title="Go Back"
          onPress={() => navigation.navigate("MainScreen")}
        />
      </View>
    );
  }
  const hazardTypeToIcon = {
    LA: "fire",
    CU: "cloud",
    RB: "road",
    PL: "plane",
    LZ: "leaf",
    MP: "map",
    MF: "fire",
    FZ: "freeze",
    HM: "hamburger",
    QA: "question",
    SS: "ship",
    VI: "video",
    PD: "podcast",
    SE: "search",
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={hazardReports}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardContent}>
              <FontAwesome
                name={hazardTypeToIcon[item.ReportType]}
                size={24}
                color="orange"
                styles={styles.icon}
              />

              <View style={styles.textContainer}>
                <Text>
                  Report Type:{" "}
                  {item.ReportType ? item.ReportType : "Not available"}
                </Text>
                <Text>
                  Start Time:{" "}
                  {item.StartTime ? item.StartTime : "Not available"}
                </Text>
                <Text>
                  End Time: {item.EndTime ? item.EndTime : "Not available"}
                </Text>
                <Text>
                  Latitude: {item.Lat ? item.Lat.toFixed(3) : "Not available"}
                </Text>
                <Text>
                  Longitude:{" "}
                  {item.Long ? item.Long.toFixed(3) : "Not available"}
                </Text>
                <Text>
                  Accuracy:{" "}
                  {item.Accuracy ? item.Accuracy.toFixed(2) : "Not available"}
                </Text>
                <Text>Notes: {item.Notes}</Text>
                <TouchableOpacity onPress={() => deleteReport(item.id)}>
                  <Text style={styles.deleteButton}>Delete Report</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => openEditModal(item)}>
                  <Text style={styles.editButton}>Edit Report</Text>
                </TouchableOpacity>
              </View>
              {item.Picture && (
                <Image source={{ uri: item.Picture }} style={styles.image} />
              )}
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    gap: 2,
  },
  modalView: {
    margin: 10,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    marginTop: 30,
  },
  card: {
    flex: 1,
    borderRadius: 6,
    backgroundColor: "#fff",
    marginVertical: 6,
    marginHorizontal: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 3,
  },
  cardContent: {
    flexDirection: "row",
    padding: 10,
  },
  textContainer: {
    flex: 3,
    paddingRight: 10,
    marginTop: 20,
  },
  image: {
    flex: 1,
    width: null,
    height: 100,
    borderRadius: 6,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  editButton: {
    marginTop: 10,
    color: "black",
    backgroundColor: "#FFCC00",
    padding: 10,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButton: {
    marginTop: 10,
    color: "black",
    backgroundColor: "#FFCC00",
    padding: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 8,
    width: 200,
    textAlign: "center",
  },
  icon: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginBottom: 10,
  },
});

export default SavedHazardReports;
