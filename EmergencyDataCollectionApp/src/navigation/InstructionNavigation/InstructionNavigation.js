import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import { View } from "react-native";

import CERTInstructions from "../../screens/Instructions/CERTInstructions";
import HazzardInstructions from "../../screens/Instructions/HazzardInstructions";
import HomeInstructions from "../../screens/Instructions/HomeInstructions";
import MYNInstructions from "../../screens/Instructions/MYNInstructions";
import UpLoadInstructions from "../../screens/Instructions/UploadInstructions";

const Tab = createMaterialTopTabNavigator();

function InstructionNavigation({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: "#111111",
          tabBarLabelStyle: { fontSize: 8, textAlignVertical: "bottom" },
          tabBarStyle: { backgroundColor: "#ffcc00", height: "10%" },
        }}
      >
        <Tab.Screen name="Basic" component={HomeInstructions} />
        <Tab.Screen name="CERT" component={CERTInstructions} />
        <Tab.Screen name="Ready Neighbor" component={MYNInstructions} />
        <Tab.Screen name="Hazzard" component={HazzardInstructions} />
        <Tab.Screen name="UpLoad Files" component={UpLoadInstructions} />
      </Tab.Navigator>
    </View>
  );
}

export default InstructionNavigation;
