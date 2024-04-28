import { useAtom } from "jotai";
import { Box } from "native-base";
import React, { useState, useCallback, useEffect } from "react";
import {
  Dimensions,
  Animated,
  Pressable,
  StyleSheet,
  View,
  Alert,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TabView } from "react-native-tab-view";

import FirstScreen from "./FirstScreen";
import { hazardTabsStatusAtom } from "./HazardPageAtoms";
import SecondScreen from "./SecondScreen";
import ThirdScreen from "./ThirdScreen";
import LoadUserPreset from "./components/LoadUserPreset";
import LoadingScreen from "../../components/CustomFeedback/LoadingScreen/LoadingScreen";
import ReportHeader from "../../components/ReportHeader/ReportHeader";
const FirstRoute = ({ route }) => {
  console.log("route", route);
  return (
    <Box flex={1}>
      <FirstScreen route={route} />
    </Box>
  );
};

const SecondRoute = () => (
  <Box flex={1}>
    <SecondScreen />
  </Box>
);

const ThirdRoute = () => (
  <Box flex={1}>
    <ThirdScreen />
  </Box>
);

const initialLayout = { width: Dimensions.get("window").width };

const renderScene = ({ route }) => {
  switch (route.key) {
    case "firstTab":
      return <FirstRoute route={route} />;
    case "secondTab":
      return <SecondRoute />;
    case "thirdTab":
      return <ThirdRoute />;
    default:
      return null;
  }
};
const TabsComponent = () => {
  const [hazardTabsStatus, setHazardTabsStatus] = useAtom(hazardTabsStatusAtom);

  const [routes] = useState([
    { key: "firstTab", title: "Report" },
    { key: "secondTab", title: "Details" },
    { key: "thirdTab", title: "Review" },
  ]);

  const canNavigateToTab = (targetIndex) => {
    const validationStates = [
      hazardTabsStatus.isFirstPageValidated,
      hazardTabsStatus.isSecondPageValidated,
      hazardTabsStatus.isThirdPageValidated,
    ];

    for (let i = 0; i < targetIndex; i++) {
      if (!validationStates[i]) {
        return false;
      }
    }

    return true;
  };

  const handleIndexChange = (newIndex) => {
    if (canNavigateToTab(newIndex)) {
      setHazardTabsStatus((prev) => ({
        ...prev,
        tabIndex: newIndex,
      }));
    } else {
      Alert.alert(
        "Tab Locked",
        "Please complete the necessary information in the current tab.",
      );
    }
  };

  const renderTabBar = useCallback(
    (props) => {
      return (
        <Box flexDirection="row" justifyContent="space-between">
          {props.navigationState.routes.map((route, i) => {
            const isActive = hazardTabsStatus.tabIndex === i;
            const isDisabled = !canNavigateToTab(i);
            const borderColor = isActive ? "yellow.500" : "transparent";
            const textColor = isActive
              ? "#000"
              : isDisabled
                ? "#d1d1da"
                : "#a1a1aa";
            return (
              <Pressable
                key={i}
                onPress={() => handleIndexChange(i)}
                style={styles.tabBarPressable}
              >
                <Box
                  borderBottomWidth={isActive ? 3 : 0}
                  borderColor={borderColor}
                  pb="5px"
                  alignItems="center"
                >
                  <Animated.Text
                    style={[styles.tabBarText, { color: textColor }]}
                  >
                    {route.title}
                  </Animated.Text>
                </Box>
              </Pressable>
            );
          })}
        </Box>
      );
    },
    [hazardTabsStatus.tabIndex],
  );

  return (
    <TabView
      navigationState={{ index: hazardTabsStatus.tabIndex, routes }}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={handleIndexChange}
      initialLayout={initialLayout}
      swipeEnabled={false}
      style={{ marginTop: -5 }}
      lazy
      lazyPreloadDistance={0}
    />
  );
};

export default () => {
  const insets = useSafeAreaInsets();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  LoadUserPreset();

  return (
    <>
      <LoadingScreen isVisible={isLoading} />
      <View
        style={{
          flex: 1,
          paddingHorizontal: 20,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        }}
      >
        <ReportHeader
          title="Hazard Reporting"
          subtitle="Creating new Hazard Report"
        />
        <TabsComponent />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  tabBarPressable: {
    paddingVertical: 12,
    alignItems: "center",
  },
  tabBarText: {
    fontSize: 16,
    letterSpacing: -0.5,
  },
});
