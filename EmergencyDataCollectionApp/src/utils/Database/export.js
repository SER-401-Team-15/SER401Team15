import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { Platform } from "react-native";

import { queryReportsByMultipleIds } from "./OfflineSQLiteDB";

async function writeFile(contents) {
  console.log("We are writing to file: ", contents);
  const timestamp = new Date().toISOString().replace(/[:.-]/g, "_");
  const fileName = FileSystem.documentDirectory + `exported-reports-${timestamp}.csv`;
  
  try {
    // First write the file to local storage
    await FileSystem.writeAsStringAsync(fileName, contents, {
      encoding: FileSystem.EncodingType.UTF8,
    });
    
    if (Platform.OS === "ios") {
      const share = await Sharing.isAvailableAsync();
      if (!share) {
        console.log("Sharing not available");
        return { success: false, message: "Sharing not available on this device" };
      }
      
      // Return a promise that resolves when sharing is complete
      return {
        success: true,
        shareAction: async () => {
          try {
            await Sharing.shareAsync(fileName);
            return true;
          } catch (error) {
            console.error("Error sharing file:", error);
            return false;
          }
        }
      };
      
    } else if (Platform.OS === "android") {
      const permissions =
        await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
      
      if (permissions.granted) {
        try {
          const androidUri = await FileSystem.StorageAccessFramework.createFileAsync(
            permissions.directoryUri,
            `exported-reports-${timestamp}`,
            "text/csv"
          );
          
          await FileSystem.writeAsStringAsync(androidUri, contents, {
            encoding: FileSystem.EncodingType.UTF8,
          });
          
          return { success: true };
        } catch (error) {
          console.error("Error saving file on Android:", error);
          
          // Fall back to share sheet if SAF fails
          return {
            success: true,
            shareAction: async () => {
              try {
                await Sharing.shareAsync(fileName);
                return true;
              } catch (error) {
                console.error("Error sharing file:", error);
                return false;
              }
            }
          };
        }
      } else {
        // No permissions, fall back to share sheet
        return {
          success: true,
          shareAction: async () => {
            try {
              await Sharing.shareAsync(fileName);
              return true;
            } catch (error) {
              console.error("Error sharing file:", error);
              return false;
            }
          }
        };
      }
    } else {
      return {
        success: true,
        shareAction: async () => {
          try {
            await Sharing.shareAsync(fileName);
            return true;
          } catch (error) {
            console.error("Error sharing file:", error);
            return false;
          }
        }
      };
    }
  } catch (error) {
    console.error("Error in writeFile:", error);
    return { success: false, message: "Failed to write export file" };
  }
}

function buildString(reports) {
  return new Promise((resolve) => {
    let csvString = "";
    
    // Add header row if needed
    // csvString += "Report_Type,Date_Time_Start,Group_Name,Squad_Name,Visit_Number,Road_Access_Status,Address,CERT_Search_Address,GPS_Lat,GPS_Long,GPS_Acc,Structure_Type,Structure_Condition,Fire_Hazards,Gas_Hazards,Water_Hazards,Electrical_Hazards,Chemical_Hazards,Number_GREEN,Number_YELLOW,Number_RED,Number_Deceased,Deceased_Location,People_Trapped,People_Needing_Shelter,Other_Neighbors_Requiring_Aid,Other_Neighbors_Requiring_Shelter,Pets_Or_Farm_Animals,Status_of_Animals,Hazard_Type,Notes,Photo_Links,Date_Time_End\n";
    
    for (let i = 0; i < reports.length; i++) {
      const element = reports[i];
      const report_data = element.report_data;
      
      // Report_Type
      const type = element.report_type === "MYN" ? "1," : 
                  element.report_type === "CERT" ? "2," : "3,";
      csvString += type;
      
      // Date_Time_Start
      csvString += (report_data.info.startTime || "") + ",";
      
      // Group_Name
      csvString += (report_data.info.groupName || "") + ",";
      
      // Squad_Name
      csvString += (report_data.info.squadName || "") + ",";
      
      // Visit_Number
      csvString += (report_data.location.numberOfVisit || "") + ",";
      
      // Road_Access_Status
      csvString += (report_data.location.roadCondition || "") + ",";
      
      // Address
      let address = "";
      if (element.report_type !== "Hazard") {
        address = (report_data.location.address || "") + " " + 
                 (report_data.location.city || "") + " " + 
                 (report_data.location.state || "") + " " + 
                 (report_data.location.zip || "");
      }
      csvString += address + ",";
      
      // CERT_Search_Address
      csvString += (report_data.people && report_data.people.certSearch ? report_data.people.certSearch : "") + ",";
      
      // GPS_Lat
      csvString += (report_data.location.latitude || "") + ",";
      
      // GPS_Long
      csvString += (report_data.location.longitude || "") + ",";
      
      // GPS_Acc
      csvString += (report_data.location.accuracy || "") + ",";
      
      // Structure_Type
      csvString += (report_data.hazard && report_data.hazard.structureType ? report_data.hazard.structureType : "") + ",";
      
      // Structure_Condition
      csvString += (report_data.hazard && report_data.hazard.structureCondition ? report_data.hazard.structureCondition : "") + ",";
      
      // Fire_Hazards
      csvString += (report_data.hazard && report_data.hazard.hazardFire ? report_data.hazard.hazardFire : "") + ",";
      
      // Gas_Hazards
      csvString += (report_data.hazard && report_data.hazard.hazardPropane ? report_data.hazard.hazardPropane : "") + ",";
      
      // Water_Hazards
      csvString += (report_data.hazard && report_data.hazard.hazardWater ? report_data.hazard.hazardWater : "") + ",";
      
      // Electrical_Hazards
      csvString += (report_data.hazard && report_data.hazard.hazardElectrical ? report_data.hazard.hazardElectrical : "") + ",";
      
      // Chemical_Hazards
      csvString += (report_data.hazard && report_data.hazard.hazardChemical ? report_data.hazard.hazardChemical : "") + ",";
      
      // Number_GREEN
      csvString += (report_data.people && report_data.people.greenPersonal ? report_data.people.greenPersonal : "") + ",";
      
      // Number_YELLOW
      csvString += (report_data.people && report_data.people.yellowPersonal ? report_data.people.yellowPersonal : "") + ",";
      
      // Number_RED
      csvString += (report_data.people && report_data.people.redPersonal ? report_data.people.redPersonal : "") + ",";
      
      // Number_Deceased
      csvString += (report_data.people && report_data.people.deceasedPersonal ? report_data.people.deceasedPersonal : "") + ",";
      
      // Deceased_Location
      csvString += (report_data.people && report_data.people.deceasedPersonalLocation ? report_data.people.deceasedPersonalLocation : "") + ",";
      
      // People_Trapped
      csvString += (report_data.people && report_data.people.trappedPersonal ? report_data.people.trappedPersonal : "") + ",";
      
      // People_Needing_Shelter
      csvString += (report_data.people && report_data.people.personalRequiringShelter ? report_data.people.personalRequiringShelter : "") + ",";
      
      // Other_Neighbors_Requiring_Aid
      csvString += (report_data.people && report_data.people.refugeesFirstAid ? report_data.people.refugeesFirstAid : "") + ",";
      
      // Other_Neighbors_Requiring_Shelter
      csvString += (report_data.people && report_data.people.refugeesShelter ? report_data.people.refugeesShelter : "") + ",";
      
      // Pets_Or_Farm_Animals
      let animalInfo = "";
      if (element.report_type === "MYN" && report_data.animal) {
        animalInfo = report_data.animal.anyPetsOrFarmAnimals || "";
      }
      csvString += animalInfo + ",";
      
      // Status_of_Animals
      let animalStatus = "";
      if (element.report_type === "MYN" && report_data.animal && report_data.animal.selectedAnimalStatus) {
        animalStatus = report_data.animal.selectedAnimalStatus.join(";");
      }
      csvString += animalStatus + ",";
      
      // Hazard_Type
      csvString += (report_data.info.hazardType || "") + ",";
      
      // Notes
      let notes = "";
      if (report_data.note && report_data.note.NotesTextArea) {
        notes = report_data.note.NotesTextArea.replace(/\n/g, " ");
      }
      csvString += notes + ",";
      
      // Photo_Links
      if (element.report_type === "Hazard") {
        const photoLink =
          report_data.hazardPicture && report_data.hazardPicture.number > 0
            ? `${report_data.info.hash}_${report_data.hazardPicture.number}.jpeg`
            : "";
        csvString += photoLink + ",";
      } else {
        csvString += (report_data.info.hash || "") + ",";
      }
      
      // Date_Time_End
      csvString += (report_data.info.endTime || "") + ",";
      
      csvString += "\n";
    }
    
    csvString = csvString.replaceAll("undefined", "");
    console.log("STRING: " + csvString);
    resolve(csvString);
  });
}

export function exportToCSV(data, onComplete) {
  let queryIds = data[0];
  for (let i = 1; i < data.length; i++) {
    queryIds += ",";
    queryIds += data[i];
  }
  console.log("Data being exported: " + queryIds);
  
  queryReportsByMultipleIds(data, async (fetchedReports) => {
    console.log("Data from db: " + JSON.stringify(fetchedReports, null, 2));
    
    try {
      const csvString = await buildString(fetchedReports);
      console.log("CSV String: " + csvString);
      
      const result = await writeFile(csvString);
      
      if (result.success) {
        if (result.shareAction) {
          // If we have a sharing action, wait for it to complete
          const sharingResult = await result.shareAction();
          if (onComplete) {
            onComplete({ 
              success: sharingResult, 
              message: sharingResult ? "Report exported successfully" : "Failed to share the export file"
            });
          }
        } else {
          // Direct save was successful (Android SAF)
          if (onComplete) {
            onComplete({ success: true, message: "Report exported successfully" });
          }
        }
      } else {
        if (onComplete) {
          onComplete({ success: false, message: result.message || "Failed to export report" });
        }
      }
    } catch (error) {
      console.error("Error in exportToCSV:", error);
      if (onComplete) {
        onComplete({ success: false, message: "An error occurred during export" });
      }
    }
  });
}

export async function exportReportImages(data) {
  let queryIds = data[0];
  for (let i = 1; i < data.length; i++) {
    queryIds += ",";
    queryIds += data[i];
  }
  queryReportsByMultipleIds(data, async (fetchedReports) => {
    console.log("Data from db: " + JSON.stringify(fetchedReports, null, 2));

    const imageUris = fetchedReports.reduce((acc, report) => {
      console.log("Processing report: ", report);
      if (typeof report.image_paths === 'string') {
        try {
          const parsedPaths = JSON.parse(report.image_paths);
          if (Array.isArray(parsedPaths)) {
            console.log("Found image paths: ", parsedPaths);
            return acc.concat(parsedPaths);
          }
        } catch (e) {
          console.error("Error parsing image paths: ", e);
        }
      } else if (Array.isArray(report.image_paths)) {
        console.log("Found image paths: ", report.image_paths);
        return acc.concat(report.image_paths);
      } else {
        console.log("No image paths found in report: ", report);
      }
      return acc;
    }, []);

    console.log("Extracted image URIs: " + JSON.stringify(imageUris, null, 2));

    if (imageUris.length === 0) {
      console.log("No images", "No images found in selected reports.");
      return;
    }

    try {
      console.log("Checking image existence and preparing for export...");
      for (const uri of imageUris) {
        console.log(`Checking existence of image: ${uri}`);
        const fileInfo = await FileSystem.getInfoAsync(uri);
        if (!fileInfo.exists) {
          console.warn(`Image not found: ${uri}`);
          continue;
        }

        console.log(`Preparing image for export: ${uri}`);

        if (await Sharing.isAvailableAsync()) {
          await Sharing.shareAsync(uri);
        } else {
          console.log("Cannot share images on this device.");
        }
      }
      console.log("Successfully Images exported!");
    } catch (error) {
      console.error("Error exporting images:", error);
    }
  });
}

export default {exportToCSV, exportReportImages};
