import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogBody,
  Icon,
  AlertCircleIcon,
  Heading,
  Button,
  ButtonText,
} from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { removeReportById } from "../../utils/Database/OfflineSQLiteDB";
import {exportToCSV, exportReportImages} from "../../utils/Database/export";
import Theme from "../../utils/Theme";
import styles from "../ViewSavedReports/styles";

export const ButtonContainer = ({ reports }) => {
  const [showConfirmDelete, setShowConfirmDelete] = React.useState(false);
  const [showExportAlert, setShowExportAlert] = React.useState(false);
  const [showExportErrorAlert, setShowExportErrorAlert] = React.useState(false);
  const [showExportSuccessAlert, setShowExportSuccessAlert] =
    React.useState(false);
  const navigation = useNavigation();

  function compileReports(callback) {
    const compiledReports = [];
    for (const k in reports) {
      if (reports[k.toString()]) {
        compiledReports.push(k);
      }
    }
    callback(compiledReports);
  }

  const handleExport = () => {
    for (const k in reports) {
      if (reports[k.toString()]) {
        try {
          compileReports(exportToCSV);
          setShowExportSuccessAlert(true);
        } catch (e) {
          console.log(e);
          setShowExportErrorAlert(true);
        }
        return;
      }
    }
    setShowExportAlert(true);
  };

  const handleExportImage = async () => {
    for (const k in reports) {
      if (reports[k.toString()]) {
        try {
          compileReports(exportReportImages);
          setShowExportSuccessAlert(true);
        } catch (e) {
          console.log(e);
          setShowExportErrorAlert(true);
        }
        return;
      }
    }
    setShowExportAlert(true);
  };
  

  const handleDelete = () => {
    setShowConfirmDelete(false);
    for (const k in reports) {
      if (reports[k.toString()]) {
        console.log("Report being deleted: " + k);
        removeReportById(k);
      }
    }
    navigation.navigate("MainScreen");
  };

  return (
    <>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleExport} style={styles.exportButton}>
          <Text style={styles.selectAllButtonText}>Export CSV</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleExportImage} style={styles.exportButton}>
          <Text style={styles.selectAllButtonText}>Export Image</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setShowConfirmDelete(true)}
          style={styles.deleteButton}
        >
          <Text style={styles.selectAllButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
      <AlertDialog
        isOpen={showConfirmDelete}
        onClose={() => {
          setShowConfirmDelete(false);
        }}
      >
        <AlertDialogBackdrop />
        <AlertDialogContent>
          <AlertDialogHeader>
            <Heading size="lg">WARNING</Heading>
            <Icon as={AlertCircleIcon} color={Theme.COLORS.WARNING} />
          </AlertDialogHeader>
          <AlertDialogBody>
            <Text size={Theme.TYPOGRAPHY.FONT_SIZE.LARGE}>
              Once reports are deleted, they can no longer be edited or exported
              in the app. Make sure all reports are properly exported and
              transferred from your device before deleting.
            </Text>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button
              variant="outline"
              size="sm"
              action="secondary"
              mr="$3"
              onPress={() => {
                handleDelete();
              }}
            >
              <ButtonText>Okay</ButtonText>
            </Button>
            <Button
              variant="outline"
              size="sm"
              action="secondary"
              mr="$3"
              onPress={() => {
                setShowConfirmDelete(false);
              }}
            >
              <ButtonText>Go back</ButtonText>
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        isOpen={showExportAlert}
        onClose={() => {
          setShowExportAlert(false);
        }}
      >
        <AlertDialogBackdrop />
        <AlertDialogContent>
          <AlertDialogHeader>
            <Heading size="lg" />
          </AlertDialogHeader>
          <AlertDialogBody>
            <Text size={Theme.TYPOGRAPHY.FONT_SIZE.SMALL} textAlign="center">
              Please select at least one report to export.
            </Text>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button
              variant="outline"
              size="sm"
              action="secondary"
              mr="$3"
              onPress={() => {
                setShowExportAlert(false);
              }}
            >
              <ButtonText>Go back</ButtonText>
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        isOpen={showExportErrorAlert}
        onClose={() => {
          setShowExportErrorAlert(false);
        }}
      >
        <AlertDialogBackdrop />
        <AlertDialogContent>
          <AlertDialogHeader>
            <Heading size="lg" />
          </AlertDialogHeader>
          <AlertDialogBody>
            <Text size={Theme.TYPOGRAPHY.FONT_SIZE.SMALL} textAlign="center">
              Error exporting reports.
            </Text>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button
              variant="outline"
              size="sm"
              action="secondary"
              mr="$3"
              onPress={() => {
                setShowExportErrorAlert(false);
              }}
            >
              <ButtonText>Go back</ButtonText>
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        isOpen={showExportSuccessAlert}
        onClose={() => {
          setShowExportSuccessAlert(false);
        }}
      >
        <AlertDialogBackdrop />
        <AlertDialogContent>
          <AlertDialogHeader>
            <Heading size="lg" />
          </AlertDialogHeader>
          <AlertDialogBody>
            <Text size={Theme.TYPOGRAPHY.FONT_SIZE.SMALL} textAlign="center">
              Reports exported successfully.
            </Text>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button
              variant="outline"
              size="sm"
              action="secondary"
              mr="$3"
              onPress={() => {
                setShowExportSuccessAlert(false);
              }}
            >
              <ButtonText>Okay</ButtonText>
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
