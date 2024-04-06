import React, { useEffect, useState } from "react";
import { View, FlatList, SafeAreaView } from "react-native";

import ReportCard from "./components/ReportCard/ReportCard";
import ReportDetailsModal from "./components/ReportModal/ReportModal";
import ReportTypeRadioButton from "./components/ReportTypeRadioButton/ReportTypeRadioButton";
import styles from "./styles";
import { queryReportsByType } from "../../utils/Database/OfflineSQLiteDB";
export const ViewSavedReports = () => {
  const [reports, setReports] = useState([]);
  const [selectedType, setSelectedType] = useState("MYN");
  const [selectedReport, setSelectedReport] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      await queryReportsByType(selectedType, (fetchedReports) => {
        setReports(fetchedReports);
      });
    };
    fetchData();
  }, [selectedType]);

  const closeModal = () => {
    setModalVisible(false);
  };
  return (
    <SafeAreaView style={styles.area}>
      <View style={styles.list}>
        <ReportTypeRadioButton
          value={selectedType}
          onChange={setSelectedType}
        />
        <FlatList
          data={reports}
          keyExtractor={(item) => item.report_id.toString()}
          renderItem={({ item }) =>
            selectedType === "MYN" || selectedType === "CERT" ? (
              item.report_data &&
              item.report_data.info &&
              item.report_data.location ? (
                <ReportCard
                  reportId={item.report_id}
                  groupName={item.report_data.info.groupName}
                  startTime={item.report_data.info.startTime}
                  address={item.report_data.location.address}
                  city={item.report_data.location.city}
                  state={item.report_data.location.state}
                  zip={item.report_data.location.zip}
                  onPress={() => {
                    setSelectedReport(item);
                    setModalVisible(true);
                  }}
                />
              ) : null
            ) : (
              <ReportCard
                reportId={item.report_id}
                groupName="Hazard Report"
                startTime={item.report_data.startTime}
                reportType="Hazard"
                onPress={() => {
                  setSelectedReport(item);
                  setModalVisible(true);
                }}
              />
            )
          }
        />
      </View>
      <ReportDetailsModal
        report={selectedReport}
        visible={modalVisible}
        onClose={closeModal}
      />
    </SafeAreaView>
  );
};

export default ViewSavedReports;
