import * as SQLite from "expo-sqlite";
import { Platform } from "react-native";

export function openDatabase() {
  if (Platform.OS === "web") {
    alert("Expo SQLite is not supported on web!");
    return {
      transaction: () => ({
        executeSql: () => {},
      }),
    };
  }

  return SQLite.openDatabase("saved_reports.db");
}

const db = openDatabase();

export function setupDatabase(callback) {
  db.transaction(
    (tx) => {
      tx.executeSql(
        "PRAGMA table_info(reports);",
        [],
        (_, { rows: { _array } }) => {
          const columnExists = _array.some(column => column.name === "image_paths");
      
          if (!columnExists) {
            addImagePathsColumn();
          }
        },
        (_, error) => console.error(" Error checking columns:", error)
      );
      
      tx.executeSql(
        "create table if not exists reports (report_id integer primary key not null, report_type text, report_data text, image_paths TEXT);",
        [],
        (_, result) => {
          callback?.(true, null);
        },
        (t, error) => {
          console.error("Error creating table", error);
          callback?.(false, error);
          return true;
        },
      );
    },
    (error) => {
      console.error("Transaction error", error);
      callback?.(false, error);
    },
    () => {
      callback?.(true, null);
    },
  );
}

function addImagePathsColumn() {
  db.transaction(tx => {
    tx.executeSql(
      "PRAGMA table_info(reports);",
      [],
      (_, { rows: { _array } }) => {
        const columnExists = _array.some(column => column.name === "image_paths");
        
        if (!columnExists) {
          tx.executeSql(
            "ALTER TABLE reports ADD COLUMN image_paths TEXT;",
            [],
            () => {},
            (_, error) => console.error("Error adding `image_paths` column:", error)
          );
        }
      },
      (_, error) => console.error("Error checking columns:", error)
    );
  });
}

export function addReport(reportType, data, imageUris = [], callback) {
  if (!reportType || !data) {
    console.error("Report type or data is empty");
    callback?.(false, "Report type or data is empty");
    return;
  }
  
  const cleanedData = sanitizeReportData(reportType, data);
  
  const imagePaths = imageUris ? JSON.stringify(imageUris.map(uri => uri.replace(/'/g, "''"))) : null;

  db.transaction(
    (tx) => {
      tx.executeSql(
        "insert into reports (report_type, report_data, image_paths) values (?, ?, ?)",
        [reportType, JSON.stringify(cleanedData), imagePaths],
        () => {
          callback?.(true, null);
        },
        (t, error) => {
          console.error("Error inserting report", error);
          callback?.(false, error);
          return true;
        },
      );
    },
    (error) => {
      console.error("Transaction error", error);
      callback?.(false, error);
    },
  );
}

export function queryAllReports(setReports) {
  db.transaction(
    (tx) => {
      tx.executeSql(
        "select * from reports;",
        [],
        (_, { rows: { _array } }) => {
          const reports = _array.map((row) => {
            try {
              return { ...row,
                report_data: JSON.parse(row.report_data),
                image_paths: row.image_paths ? row.image_paths : null 
              };
            } catch (error) {
              console.error("Error parsing JSON for row", row.report_id, error);
              return { ...row, report_data: null };
            }
          });
          setReports(reports);
        },
        (t, error) => {
          console.error("Error querying reports", error);
        },
      );
    },
  );
}

export function queryReportById(reportId, setReport) {
  db.transaction(
    (tx) => {
      tx.executeSql(
        "select * from reports where report_id = ?;",
        [reportId],
        (_, { rows: { _array } }) => {
          if (_array.length > 0) {
            try {
              const report = _array.map((row) => ({
                ...row,
                report_data: JSON.parse(row.report_data),
              }))[0];
              setReport(report);
            } catch (error) {
              console.error("Error parsing JSON for report", reportId, error);
              setReport(null);
            }
          } else {
            setReport(null);
          }
        },
        (t, error) => {
          console.error("Error querying report by ID", error);
        },
      );
    },
  );
}

export function queryReportsByMultipleIds(reportIds, setReports) {
  let query = "select * from reports where report_id in (";
  for (let i = 0; i < reportIds.length; i++) {
    if (i !== 0) {
      query += ", ";
    }
    query += reportIds[i];
  }
  query += ");";
  db.transaction(
    (tx) => {
      tx.executeSql(
        query,
        [],
        (_, { rows: { _array } }) => {
          if (_array.length > 0) {
            try {
              const reports = _array.map((row) => ({
                ...row,
                report_data: JSON.parse(row.report_data),
              }));
              setReports(reports);
            } catch (error) {
              console.error("Error parsing JSON for reports", reportIds, error);
              setReports(null);
            }
          } else {
            setReports(null);
          }
        },
        (t, error) => {
          console.error("Error querying report by IDs", error);
        },
      );
    },
  );
}

export function queryReportsByType(reportType, setReports) {
  db.transaction(
    (tx) => {
      tx.executeSql(
        "select * from reports where report_type = ?;",
        [reportType],
        (_, { rows: { _array } }) => {
          const processedReports = _array.map((row) => {
            try {
              const parsedData = JSON.parse(row.report_data);
              return { ...row,
                report_data: parsedData,
                image_paths: row.image_paths ? row.image_paths : null 
              };
            } catch (error) {
              console.error("Error parsing JSON for row", row.report_id, error);
              return { ...row, report_data: null };
            }
          });
          setReports(processedReports);
        },
        (t, error) => {
          console.error("Error querying reports by type", error);
        },
      );
    },
    (error) => {
      console.error("Transaction error on querying reports by type", error);
    },
  );
}

export function updateReportById(reportId, newData, callback) {
  if (!newData) {
    console.error("Report data is empty");
    callback?.(false, "Report data is empty");
    return;
  }

  db.transaction(
    (tx) => {
      tx.executeSql(
        "UPDATE reports SET report_data = ? WHERE report_id = ?",
        [JSON.stringify(newData), reportId],
        () => {
          callback?.(true, null);
        },
        (t, error) => {
          console.error(`Error updating report with ID ${reportId}`, error);
          callback?.(false, error);
          return true;
        },
      );
    },
    (error) => {
      console.error("Transaction error", error);
      callback?.(false, error);
    },
  );
}

// Debug functions - only used during development
export function logAllReports() {
  db.transaction(
    (tx) => {
      tx.executeSql(
        "select * from reports;",
        [],
        (_, result) => {
          console.log("Reports in database:", result.rows._array);
        },
        (t, error) => {
          console.error("Error querying reports", error);
        },
      );
    },
  );
}

export function logAllReportsByType(reportType) {
  db.transaction(
    (tx) => {
      tx.executeSql(
        "select * from reports where report_type = ?;",
        [reportType],
        (_, result) => {
          console.log(
            `Reports of type ${reportType} in database:`,
            result.rows._array,
          );
        },
        (t, error) => {
          console.error("Error querying reports", error);
        },
      );
    },
  );
}

export function dropTable() {
  db.transaction(
    (tx) => {
      tx.executeSql("drop table reports;", []);
    },
    (error) => console.error("Error dropping table", error),
  );
}
export function removeReportById(reportId, callback) {
  db.transaction(
    (tx) => {
      tx.executeSql(
        "delete from reports where report_id = ?;",
        [reportId],
        () => {
          callback?.(true, null);
        },
        (t, error) => {
          console.error("Error removing report by ID", error);
          callback?.(false, error);
        },
      );
    },
    (error) => {
      console.error("Transaction error", error);
      callback?.(false, error);
    },
  );
}

export function truncateTable(callback) {
  db.transaction(
    (tx) => {
      tx.executeSql("delete from reports;", [], () => {
        callback?.(true, null);
      });
    },
    (error) => {
      console.error("Transaction error", error);
      callback?.(false, error);
    },
  );
}

export const fetchHazardReports = (callback) => {
  const db = SQLite.openDatabase("HazardReports.db");

  db.transaction((tx) => {
    tx.executeSql(
      "SELECT * FROM HazardReport;",
      [],
      (_, { rows: { _array } }) => {
        const mappedReports = _array.map((report) => ({
          ...report,
          report_id: report.id,
          report_data: {
            info: {
              startTime: report.StartTime,
            },
          },
        }));
        callback(mappedReports);
      },
      (_, error) => console.log("Hazard Report fetch error", error),
    );
  });
};

function sanitizeReportData(reportType, data) {
  const cleanedData = JSON.parse(JSON.stringify(data));
  
  if (reportType === 'HAZARD' || reportType === 'Hazard') {
    if (cleanedData.info) {
      cleanedData.info.groupName = '';
      cleanedData.info.squadName = '';
    }
  }
  
  function removeEmptyStringFields(obj) {
    if (!obj || typeof obj !== 'object') return;
    
    Object.keys(obj).forEach(key => {
      if (obj[key] === '') {
        delete obj[key];
      } else if (typeof obj[key] === 'object') {
        removeEmptyStringFields(obj[key]);
      }
    });
  }
  
  removeEmptyStringFields(cleanedData);
  return cleanedData;
}
