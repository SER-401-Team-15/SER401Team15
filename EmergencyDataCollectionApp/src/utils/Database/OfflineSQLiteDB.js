import * as SQLite from "expo-sqlite";
import { Platform, Alert } from "react-native";

export function openDatabase() {
  if (Platform.OS === "web") {
    alert("Expo SQLite is not supported on web!");
    return {
      transaction: () => ({
        executeSql: () => {},
      }),
    };
  }

  try {
    return SQLite.openDatabase("saved_reports.db");
  } catch (error) {
    console.error("Error opening SQLite database:", error);
    Alert.alert("Database Error", "Failed to open the SQLite database.");
    return null;
  }
}

const db = openDatabase();

export function setupDatabase(callback) {
  try{
    db.transaction(
      (tx) => {
        tx.executeSql(
          "create table if not exists reports (report_id integer primary key not null, report_type text, report_data text);",
          [],
          (_, result) => {
            console.log("Table created", result);
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
        console.log("Transaction successful for creating table");
        callback?.(true, null);
      },
    );
  } catch(error) {
    console.error("Error opening SQLite database:", error);
    Alert.alert("Database Error", "Failed to open the SQLite database.");
  }
}

export function addReport(reportType, data, callback) {
  if (!reportType || !data) {
    console.error("Report type or data is empty");
    callback?.(false, "Report type or data is empty");
    return;
  }

  db.transaction(
    (tx) => {
      tx.executeSql(
        "insert into reports (report_type, report_data) values (?, ?)",
        [reportType, JSON.stringify(data)],
        () => {
          console.log("Report added successfully");
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
    () => {
      console.log("Transaction successful for adding report");
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
              return { ...row, report_data: JSON.parse(row.report_data) };
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
    null,
    () => {
      console.log("Transaction successful for querying all reports");
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
            console.log("No report found with ID", reportId);
            setReport(null);
          }
        },
        (t, error) => {
          console.error("Error querying report by ID", error);
        },
      );
    },
    null,
    () => {
      console.log("Transaction successful for querying report by ID");
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
            console.log("No report found with IDs", reportIds);
            setReports(null);
          }
        },
        (t, error) => {
          console.error("Error querying report by IDs", error);
        },
      );
    },
    null,
    () => {
      console.log("Transaction successful for querying report by IDs");
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
              return { ...row, report_data: parsedData };
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
    () => {
      console.log("Transaction successful for querying reports by type");
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
          console.log(`Report with ID ${reportId} updated successfully`);
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
    () => {
      console.log("Transaction successful for updating report");
    },
  );
}

export function logAllReports() {
  // console.log('fetc')
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
    null,
    () => {
      console.log("Transaction successful for logging all reports");
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
    null,
    () => {
      console.log("Transaction successful for logging reports by type");
    },
  );
}

export function dropTable() {
  db.transaction(
    (tx) => {
      tx.executeSql("drop table reports;", []);
    },
    (error) => console.error("Error dropping table", error),
    () => {
      console.log("Database reset successful");
    },
  );
}
export function removeReportById(reportId, callback) {
  db.transaction(
    (tx) => {
      tx.executeSql(
        "delete from reports where report_id = ?;",
        [reportId],
        () => {
          console.log(`Report with ID ${reportId} removed successfully`);
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
    () => {
      console.log("Transaction successful for removing report by ID");
    },
  );
}

export function truncateTable(callback) {
  db.transaction(
    (tx) => {
      tx.executeSql("delete from reports;", [], () => {
        console.log("Table truncated successfully");
        callback?.(true, null);
      });
    },
    (error) => {
      console.error("Transaction error", error);
      callback?.(false, error);
    },
    () => {
      console.log("Transaction successful for truncating table");
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
        console.log("Hazard Reports fetched: ", _array);
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
