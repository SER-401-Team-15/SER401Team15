import React from "react";
import { Text, View } from "react-native";

import styles from "./styles";

const CreditsPage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.placehodler}>Based on an APP concept by:</Text>
      <Text style={styles.text} />
      <Text style={styles.text}>Name: Daniel Novak in 2023</Text>
      <Text style={styles.text}>Email: Neighborcheckapp@gmail.com</Text>
      <Text style={styles.text} />
      
      <Text style={styles.placehodler}>Background:</Text>
      <Text style={styles.text} />
      <Text style={styles.text}>
        This application is a result of the capstone project in the year 2024.
      </Text>
      <Text style={styles.text} />
      
      <Text style={styles.placehodler}>App Developers:</Text>
      <Text style={styles.text} />
      <Text style={styles.text}>Arizona State University</Text>
      <Text style={styles.text}>SER 401-402</Text>
      <Text style={styles.text}>Team 15</Text>
      <Text style={styles.text} />
      <Text style={styles.text}>Name: David Hanley</Text>
      <Text style={styles.text}>Email: DavidHanley26@gmail.com</Text>
      <Text style={styles.text} />
      <Text style={styles.text}>Name: Cody Hughes</Text>
      <Text style={styles.text}>Email: clhughe9@asu.edu</Text>
      <Text style={styles.text} />
      <Text style={styles.text}>Name: Sarah Hunt</Text>
      <Text style={styles.text}>Email: sarah16hunt@gmail.com</Text>
      <Text style={styles.text} />
      <Text style={styles.text}>Name: Aman Sharma</Text>
      <Text style={styles.text}>Email: amandeepsharma96@hotmail.com</Text>
      <Text style={styles.text} />
      <Text style={styles.text}>Name: Sheldon Pang</Text>
      <Text style={styles.text}>Email: sheldonpang@asu.edu</Text>
      <Text style={styles.text} />
      
      <Text style={styles.placehodler}>Further Development and completion in 2025:</Text>
      <Text style={styles.text} />
      <Text style={styles.text}>Name: Sahil Tarun Parwani</Text>
      <Text style={styles.text}>Email: sparwan1@asu.edu</Text>
      <Text style={styles.text} />
      <Text style={styles.text}>Name: Akshata Vijay Kulkarni</Text>
      <Text style={styles.text}>Email: akulka89@asu.edu</Text>
    </View>
  );
};

export default CreditsPage;
