import React from "react";
import { Text, View, ScrollView } from "react-native";

import styles from "./styles";

const HomeInstructions = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.placehodler}>What this App is for:</Text>
        <Text style={styles.text}>
          The NeighborCheck app is used by READY NEIGHBOR groups, CERT search
          and rescue teams, and public sector workers to gather critical
          information for utilization by Emergency Operations Centers
          immediately after a major disaster.
        </Text>
        <Text style={styles.placehodler}>How the App is organized:</Text>
        <Text style={styles.text}>
          The App is divided into 3 sections that are specifically tailored to
          READY NEIGHBOR activities, CERT activities, and hazards that public
          sector workers and other may come across and wish to report. The
          sections of the app for READY NEIGHBOR and CERT activity are modeled
          after the FEMA rapid needs assessment Form and are tailored to match
          their activity sequence. The section used by public sector workers
          allows them to locate, describe, and photograph locations that may be
          hazards to the public and impede rescue efforts. Public sector workers
          may include, PUD workers, City and county road crews, Police and Fire
          personnel. For READY NEIGHBOR and CERT users of this App, the data
          collection sequence mirrors the natural sequence of search and rescue
          activity as teams go house to house.
        </Text>
        <Text style={styles.placehodler}>
          How to use the NeighborCheck App- Tips for saving time:
        </Text>
        <Text style={styles.text}>
          The <Text style={{ fontWeight: "bold" }}>USER PREFERENCES</Text>{" "}
          button To help make the data entry faster you can pre-load certain
          common data field answers like City , State and ZIP code. Press the{" "}
          <Text style={{ fontWeight: "bold" }}>USER PREFERENCES</Text> button
          and fill out only the fields that pertain to your activity. READY
          NEIGHBOR people only fill out READY NEIGHBOR Group Name fields CERT
          people only fill out the Cert group number and Cert Squad Name fields
          ALL users fill out the CITY, ZIP, and STATE fields
        </Text>
      </View>
    </ScrollView>
  );
};

export default HomeInstructions;
