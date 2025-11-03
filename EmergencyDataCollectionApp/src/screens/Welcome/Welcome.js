import React, { useEffect } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

import styles from "./styles";
import { setupDatabase } from "../../utils/Database/OfflineSQLiteDB";
import Images from "../../utils/Images";

const Welcome = ({ navigation }) => {
  useEffect(() => {
    setupDatabase(() => {});
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={Images.certLogo}
          style={styles.mainLogo}
          testID="certLogoImage"
        />
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={Images.cleanLogo}
          style={styles.cleanLogo}
          testID="cleanLogoImage"
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.getStartedButton}
          onPress={() => navigation.navigate("App")}
          testID="getStartedButton"
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Welcome;
