// HazardReportContext.js
import React, { createContext, useState, useEffect } from 'react';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('HazardReports.db');

const HazardReportContext = createContext();

export const HazardReportProvider = ({ children }) => {
  const [hazardReport, setHazardReport] = useState({
    ReportType: '',
    StartTime: new Date().toLocaleString(),
    Lat: null,
    Long: null,
    Accuracy: null,
    Picture: null,
    EndTime: '',
    Notes: '',
  });

  const [hazardReports, setHazardReports] = useState([hazardReport]);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS HazardReport (id INTEGER PRIMARY KEY AUTOINCREMENT, ReportType TEXT, StartTime TEXT, Lat REAL, Long REAL, Accuracy REAL, Picture TEXT, EndTime TEXT, Notes TEXT);',
        [],
        () => console.log('Table created'),
        (_, error) => console.log('Table creation error', error)
      );
    });
  }, []);

  const saveHazardReport = (data) => {
    setHazardReport(data);
    setHazardReports(prevReports => [...prevReports, data]);
  };

  const saveHazardReportToDB = (data) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO HazardReport (ReportType, StartTime, Lat, Long, Accuracy, Picture, EndTime, Notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?);',
        [data.ReportType, data.StartTime, data.Lat, data.Long, data.Accuracy, data.Picture, data.EndTime, data.Notes],
        () => console.log('Report inserted'),
        (_, error) => console.log('Report insert error', error),
      );
    });
  };

  const getAllHazardReportsFromDB = () => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM HazardReport;',
        [],
        (_, { rows: { _array } }) => setHazardReports(_array),
        (_, error) => console.log('Report fetch error', error)
      );
    });
  };

  return (
    <HazardReportContext.Provider value={{ hazardReport, hazardReports, saveHazardReport, saveHazardReportToDB, getAllHazardReportsFromDB }}>
      {children}
    </HazardReportContext.Provider>
  );
};

export default HazardReportContext;