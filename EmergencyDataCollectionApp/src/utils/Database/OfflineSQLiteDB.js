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
    return SQLite.openDatabaseSync("saved_reports.db");
  } catch (error) {
    console.error("Error opening SQLite database:", error);
    Alert.alert("Database Error", "Failed to open the SQLite database.");
    return null;
  }
}

const db = openDatabase();

export function setupDatabase(callback) {
  try{
      db.execSync(
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
  db.execSync(
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
}

export function queryAllReports(setReports) {
  db.execSync(
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
}

export function queryReportById(reportId, setReport) {
  db.execSync(
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
  db.execSync(
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
}

export function queryReportsByType(reportType, setReports) {
  db.execSync(
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
}

export function updateReportById(reportId, newData, callback) {
  if (!newData) {
    console.error("Report data is empty");
    callback?.(false, "Report data is empty");
    return;
  }
  db.execSync(
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
}

export function logAllReports() {
  // console.log('fetc')
  db.execSync(
    "select * from reports;",
    [],
    (_, result) => {
      console.log("Reports in database:", result.rows._array);
    },
    (t, error) => {
      console.error("Error querying reports", error);
    },
  );
}

export function logAllReportsByType(reportType) {
  db.execSync(
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
}

export function dropTable() {
  db.execSync("drop table reports;", [],
    (_, error) => {
      console.error("Error dropping table", error)
    }
  );
}
export function removeReportById(reportId, callback) {
  db.execSync(
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
}

export function truncateTable(callback) {
  db.execSync("delete from reports;", [], () => {
    console.log("Table truncated successfully");
    callback?.(true, null);
  },
  (_, error) => {
    console.error("Transaction error", error);
    callback?.(false, error);
  });
}

export const fetchHazardReports = (callback) => {
  const db = SQLite.openDatabaseSync("HazardReports.db");
  db.execSync(
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
};
