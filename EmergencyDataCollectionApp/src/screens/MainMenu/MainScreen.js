import { Icon, AlertCircleIcon, Box } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, StyleSheet, Dimensions, Text, ScrollView } from "react-native";

import CustomButton from "../../components/CustomForms/CustomButton/CustomButton";
import Theme from "../../utils/Theme";

const windowWidth = Dimensions.get("window").width;

const buttonMargin = 10;
const containerPadding = 10;
const baseButtonWidth =
  (windowWidth + 15 - containerPadding * 2 - buttonMargin * 3) / 2;

const MainScreen = () => {
  const navigation = useNavigation();

  const handleStartNewMYNReport = () => {
    navigation.navigate("MYNReportNavigation");
  };

  const handleReviewSavedReports = () => {
    navigation.navigate("Saved Reports");
  };

  const handleStartNewCERTReport = () => {
    navigation.navigate("CERTReportNavigation");
  };

  const handleStartNewHazardReport = () => {
    navigation.navigate("StartNewHazardReport", { screen: "Start" });
  };

  const handleCopyToUSB = () => {
    navigation.navigate("Export Reports");
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <Box
          sx={{
            marginTop: 20,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Icon
            as={AlertCircleIcon}
            size="lg"
            sx={{
              marginLeft: 12,
              marginRight: 10,
              marginTop: 3,
            }}
          />
          <Text
            style={{
              fontSize: Theme.TYPOGRAPHY.FONT_SIZE.MED_LARGE,
            }}
          >
            Report an emergency
          </Text>
        </Box>
        <View style={styles.buttonContainer}>
          <CustomButton
            title="New Ready Neighbor Report"
            onPress={handleStartNewMYNReport}
            buttonStyle={styles.buttonStyleWide}
            textStyle={styles.textStyle}
          />
          <CustomButton
            title="New CERT Report"
            onPress={handleStartNewCERTReport}
            buttonStyle={styles.buttonStyleShort}
            textStyle={styles.textStyle}
          />
          <CustomButton
            title="New HAZARD Report"
            onPress={handleStartNewHazardReport}
            buttonStyle={styles.buttonStyleShort}
            textStyle={styles.textStyle}
          />
        </View>

        <Box
          sx={{
            marginTop: 20,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Icon
            as={AlertCircleIcon}
            size="lg"
            sx={{
              marginLeft: 12,
              marginRight: 10,
              marginTop: 3,
            }}
          />
          <Text
            style={{
              fontSize: Theme.TYPOGRAPHY.FONT_SIZE.MED_LARGE,
            }}
          >
            Review and Export Reports
          </Text>
        </Box>
        <View style={styles.buttonContainer}>
          <CustomButton
            title="View Saved Reports"
            onPress={handleReviewSavedReports}
            buttonStyle={styles.buttonStyleWide}
            textStyle={styles.textStyle}
          />
          <CustomButton
            title="Export Reports"
            onPress={handleCopyToUSB}
            buttonStyle={styles.buttonStyleShort}
            textStyle={styles.textStyle}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: containerPadding,
  },
  buttonContainer: {
    backgroundColor: "#fff",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginTop: 5,
  },
  buttonStyleWide: {
    margin: buttonMargin,
    width: baseButtonWidth,
    height: 150,
    alignItems: "flex-start",
  },
  buttonStyleShort: {
    margin: buttonMargin,
    width: baseButtonWidth - 30,
    height: 150,
    alignItems: "flex-start",
  },
  textStyle: {
    fontSize: Theme.TYPOGRAPHY.FONT_SIZE.MEDIUM,
    fontWeight: "bold",
  },
});
