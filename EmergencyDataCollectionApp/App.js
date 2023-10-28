import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import Welcome from "./src/screens/Welcome";

export default function App() {
  return (
    <View style={styles.container}>
      {/* Render the WelcomeScreen component */}
      <Welcome />

      {/* Comment out or remove this to hide the old content */}
      {/*
      <Text>Hello SER401!</Text>
      <StatusBar style="auto" />
      */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
