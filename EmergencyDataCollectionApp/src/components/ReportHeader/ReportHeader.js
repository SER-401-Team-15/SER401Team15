import React from "react";
import { Text, View, StyleSheet, StatusBar } from "react-native";

import Theme from "../../utils/Theme";

const ReportHeader = (props) => {
  return (
    <View>
      <View style={styles.headerContainer}>
        <Text style={styles.textHeader}>{props.title}</Text>
        <Text style={styles.textSubtitle}>{props.subtitle}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: StatusBar.currentHeight,
    marginBottom: 10,
  },
  textHeader: {
    fontSize: Theme.TYPOGRAPHY.FONT_SIZE.MED_LARGE,
    fontWeight: "bold",
    textAlign: "left",
  },
  textSubtitle: {
    fontSize: Theme.TYPOGRAPHY.FONT_SIZE.MEDIUM,
    textAlign: "left",
  },
});

export default ReportHeader;
