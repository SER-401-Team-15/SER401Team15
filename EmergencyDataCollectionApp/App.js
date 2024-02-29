import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import CERTReportNavigation from "./src/navigation/CERTNavigation/CERTReportNavigation";
import HazardReportNavigation from "./src/navigation/HazardReportNavigation/HazardResportNavigation";
import InstructionNavigation from "./src/navigation/InstructionNavigation/InstructionNavigation";
import MynNavigation from "./src/navigation/MynNavigation/MynNavigation";
import SavedHazardReports from "./src/screens/HazardReports/SavedHazardReports";
import MainScreen from "./src/screens/MainScreen";
import ViewSavedMynReports from "./src/screens/ReviewReports/ViewSavedMynReports";
import SavedReports from "./src/screens/SavedReport/SavedReports";
import Settings from "./src/screens/Settings/AppSettings";
import Welcome from "./src/screens/welcome/Welcome";
import ReviewAndExportReports from "./src/screens/ReviewReports/ReviewAndExportReports"

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Welcome"
      >
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="MainScreen" component={MainScreen} />
        <Stack.Screen name="SavedReports" component={SavedReports} />
        <Stack.Screen name="AppSetting" component={Settings} />
        <Stack.Screen name="Instructions" component={InstructionNavigation} />
        <Stack.Screen
          name="SavedHazardReports"
          component={SavedHazardReports}
          options={{
            headerShown: true,
          }}
        />
        <Stack.Screen 
          name="MYNReportNavigation" 
          component={MynNavigation}
        />
        <Stack.Screen
          name="CERTReportNavigation"
          component={CERTReportNavigation}
        />
        <Stack.Screen
          name="StartNewHazardReport"
          component={HazardReportNavigation}
        />
        <Stack.Screen
          name="View Saved MYN Reports"
          component={ViewSavedMynReports}
          options={{
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="Review and Export Reports"
          component={ReviewAndExportReports}
          options={{
            headerShown: true,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
