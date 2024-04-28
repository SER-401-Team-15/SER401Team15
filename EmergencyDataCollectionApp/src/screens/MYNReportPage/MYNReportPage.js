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
import { TabView, SceneMap } from "react-native-tab-view";

import AnimalPage from "./AnimalPage/AnimalPage";
import HazardPage from "./HazardPage/HazardPage";
import InfoPage from "./InfoPage/InfoPage";
import LocationPage from "./LocationPage/LocationPage";
import { mynTabsStatusAtom } from "./MYNPageAtoms";
import NotePage from "./NotePage/NotePage";
import PeoplePage from "./PeoplePage/PeoplePage";
import LoadUserPreset from "./components/LoadUserPreset";
import LoadingScreen from "../../components/CustomFeedback/LoadingScreen/LoadingScreen";
import ReportHeader from "../../components/ReportHeader/ReportHeader";

const InfoRoute = () => (
  <Box flex={1}>
    <InfoPage />
  </Box>
);

const LocationRoute = () => (
  <Box flex={1}>
    <LocationPage />
  </Box>
);

const HazardRoute = () => (
  <Box flex={1}>
    <HazardPage />
  </Box>
);

const PeopleRoute = () => (
  <Box flex={1}>
    <PeoplePage />
  </Box>
);

const AnimalRoute = () => (
  <Box flex={1}>
    <AnimalPage />
  </Box>
);

const NoteRoute = () => (
  <Box flex={1}>
    <NotePage />
  </Box>
);

const initialLayout = { width: Dimensions.get("window").width };

const renderScene = SceneMap({
  firstTab: InfoRoute,
  secondTab: LocationRoute,
  thirdTab: HazardRoute,
  fourthTab: PeopleRoute,
  fifthTab: AnimalRoute,
  sixthTab: NoteRoute,
});

// TODO pass arg to tabs component then render with it
const TabsComponent = () => {
  const [mynTabsStatus, setMynTabsStatus] = useAtom(mynTabsStatusAtom);

  const [routes] = useState([
    { key: "firstTab", title: "Info" },
    { key: "secondTab", title: "Location" },
    { key: "thirdTab", title: "Hazard" },
    { key: "fourthTab", title: "People" },
    { key: "fifthTab", title: "Animal" },
    { key: "sixthTab", title: "Note" },
  ]);

  const canNavigateToTab = (targetIndex) => {
    const validationStates = [
      mynTabsStatus.isInfoPageValidated,
      mynTabsStatus.isLocationPageValidated,
      mynTabsStatus.isHazardPageValidated,
      mynTabsStatus.isPeoplePageValidated,
      mynTabsStatus.isAnimalPageValidated,
      mynTabsStatus.isNotePageValidated,
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
      setMynTabsStatus((prev) => ({
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
            const isActive = mynTabsStatus.tabIndex === i;
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
    [mynTabsStatus.tabIndex],
  );

  return (
    <TabView
      navigationState={{ index: mynTabsStatus.tabIndex, routes }}
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

// TODO pass arg to this, change subtitle on whether arg is null or not
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
          title="Ready Neighbor Report"
          subtitle="Creating new Report"
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
