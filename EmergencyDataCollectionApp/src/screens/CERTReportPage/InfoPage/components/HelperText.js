import React from "react";
import { Text, View, StyleSheet } from "react-native";

import Theme from "../../../../utils/Theme";

const HelperText = () => {
  return (
    <View>
      <View style={styles.headerContainer}>
        <Text style={styles.textSubtitle}>*Fill out required fields</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    marginBottom: 20,
  },
  textSubtitle: {
    fontSize: Theme.TYPOGRAPHY.FONT_SIZE.MEDIUM,
    color: Theme.COLORS.TEXT_GREY,
    textAlign: "left",
  },
});

export default HelperText;
