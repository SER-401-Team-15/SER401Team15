import React, { createContext, useState } from "react";

import {
  addReport,
  queryReportsByType,
} from "../../utils/Database/OfflineSQLiteDB";
const HazardReportContext = createContext();

export const HazardReportProvider = ({ children }) => {
  const [hazardReport, setHazardReport] = useState({
    ReportType: "",
    StartTime: new Date().toLocaleString(),
    Lat: null,
    Long: null,
    Accuracy: null,
    Picture: null,
    EndTime: "",
    Notes: "",
  });
  const [isUpdateMode, setUpdateMode] = useState(false);
  const [hazardReports, setHazardReports] = useState([hazardReport]);

  const saveHazardReport = (data) => {
    console.log("Saving hazard report", data);
    setHazardReport(data);
    setHazardReports((prevReports) => [...prevReports, data]);
  };

  const saveHazardReportToDB = (data) => {
    console.log("Saving hazard report to DB", data);
    addReport("Hazard", data, (success, error) => {
      if (success) {
        console.log("Hazard report added successfully");
      } else {
        console.error("Error adding hazard report", error);
      }
    });
  };
  const getAllHazardReportsFromDB = () => {
    queryReportsByType("Hazard", setHazardReports);
  };
  const updateHazardReportInDB = (id, data) => {};

  return (
    <HazardReportContext.Provider
      value={{
        hazardReport,
        hazardReports,
        saveHazardReport,
        saveHazardReportToDB,
        getAllHazardReportsFromDB,
        updateHazardReportInDB,
        isUpdateMode,
        setUpdateMode,
      }}
    >
      {children}
    </HazardReportContext.Provider>
  );
};

export default HazardReportContext;
