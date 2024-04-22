import React from "react";
import { View, Text, Platform } from "react-native";

import styles from "./styles";

const UpLoadInstructions = () => {
  const isAndroid = Platform.OS === "android";

  return (
    <View style={styles.container}>
      {isAndroid ? (
        <>
          <Text style={styles.title}>Copy Files Instructions For Android</Text>
          <Text style={styles.instruction}>
            1. Connect a USB storage device to your Android device.
          </Text>
          <Text style={styles.instruction}>
            2. On your Android device, open Files by Google Files by Google.
          </Text>
          <Text style={styles.instruction}>
            3. Under 'Storage devices', tap your USB storage device.
          </Text>
          <Text style={styles.instruction}>
            4. Find the file you want to copy.
          </Text>
          <Text style={styles.instruction}>
            5. Next to a file you want to copy, tap the Down arrow. If you can't
            find the Down arrow next to the files, tap List view List.
          </Text>
          <Text style={styles.instruction}>
            {" "}
            - To copy one file: Tap the Down arrow and then Copy to.
          </Text>
          <Text style={styles.instruction}> - To copy multiple files:</Text>
          <Text style={styles.instruction}>
            {" "}
            a. Tap the Down arrow and then Select.
          </Text>
          <Text style={styles.instruction}>
            {" "}
            b. Next to each file you want to copy, check the circle.
          </Text>
          <Text style={styles.instruction}>
            {" "}
            c. At the top, tap More More and then Copy to.
          </Text>
          <Text style={styles.instruction}>
            6. Choose where you want to copy the file.
          </Text>
          <Text style={styles.instruction}>7. Tap Copy here.</Text>
        </>
      ) : (
        <>
          <Text style={styles.title}>Copy Files Instructions For iPhone</Text>
          <Text style={styles.instruction}>
            1. Connect your iPhone or computer to an external storage device,
            such as a USB drive or SD card.
          </Text>
          <Text style={styles.instruction}>
            2. To connect to iPhone, you might need a cable adapter.
          </Text>
          <Text style={styles.instruction}>
            3. Note: If an alert appears on iPhone asking whether to trust this
            computer, select Trust. See the Apple Support article About the
            ‘Trust This Computer’ alert.
          </Text>
          <Text style={styles.instruction}>
            4. Use a supported app (like Files or Pages) to copy files to the
            storage device. See Organize files and folders in Files on iPhone.
          </Text>
          <Text style={styles.instruction}>
            5. Disconnect the storage device, then connect it to the device
            where you want the copied files to appear.
          </Text>
          <Text style={styles.instruction}>
            6. Copy the files to the connected device.
          </Text>
        </>
      )}
    </View>
  );
};

export default UpLoadInstructions;
