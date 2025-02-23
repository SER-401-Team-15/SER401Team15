import { Block, Text, theme } from "galio-framework";
import React from "react";
import { ScrollView, StyleSheet, Image } from "react-native";

import DrawerCustomItem from "./DrawerItem";
import Images from "../../../../utils/Images";

function CustomDrawerContent({
  drawerPosition,
  navigation,
  profile,
  focused,
  state,
  ...rest
}) {
  const screens = [
    { title: "Home", navigateTo: "HomeDrawer" },
    { title: "Settings", navigateTo: "AppSetting" },
    { title: "Instructions", navigateTo: "Instructions" },
    { title: "Credits", navigateTo: "Credits" },
  ];
  return (
    <Block
      style={styles.container}
      forceInset={{ top: "always", horizontal: "never" }}
    >
      <Block flex={0.06} style={styles.header}>
        <Image style={styles.logo} source={Images.DrawerLogo} />
      </Block>
      <Block flex={1}>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          {screens.map((item, index) => {
            return (
              <DrawerCustomItem
                title={item?.title}
                key={index}
                navigation={navigation}
                focused={state.index === index}
                navigateTo={item?.navigateTo}
              />
            );
          })}
          <Block
            flex = {1}
            style={{ marginTop: 24, marginVertical: 8, paddingHorizontal: 8 }}
          >
            <Block
              style={{
                borderColor: "rgba(0,0,0,0.2)",
                width: "100%",
                borderWidth: StyleSheet.hairlineWidth,
              }}
            />
            <Text
              color="#8898AA"
              style={{
                marginTop: 16,
                marginLeft: 8
              }}
            >
              DOCUMENTATION
            </Text>
          </Block>
          <DrawerCustomItem
            title="Neighbor Check Website"
            navigation={navigation}
          />
          <DrawerCustomItem title="Donation" navigation={navigation} />
          <DrawerCustomItem title="Source Code" navigation={navigation} />
        </ScrollView>
      </Block>
    </Block>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    paddingTop: theme.SIZES.BASE * 3,
    paddingBottom: theme.SIZES.BASE,
    justifyContent: "center",
  },
  logo: {
    width: 200 * 1.2,
    height: 48 * 1.2,
  },
});

export default CustomDrawerContent;
