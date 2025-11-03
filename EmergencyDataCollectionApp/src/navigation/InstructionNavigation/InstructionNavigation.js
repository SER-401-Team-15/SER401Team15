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
          tabBarLabelStyle: { 
            fontSize: 14, 
            fontWeight: "bold",
            textAlignVertical: "bottom" 
          },
          tabBarStyle: { backgroundColor: "#ffcc00", height: "10%" },
        }}
      >
        <Tab.Screen name="BASIC" component={HomeInstructions} />
        <Tab.Screen name="CERT" component={CERTInstructions} />
        <Tab.Screen name="READY NEIGHBOR" component={MYNInstructions} />
        <Tab.Screen name="HAZARD" component={HazzardInstructions} />
        <Tab.Screen name="UPLOAD FILES" component={UpLoadInstructions} />
      </Tab.Navigator>
    </View>
  );
}

export default InstructionNavigation;
