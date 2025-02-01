import {
  MenuIcon,
  ExternalLinkIcon,
  FavouriteIcon,
  StarIcon,
  SettingsIcon,
  HelpCircleIcon,
  ShareIcon,
  GlobeIcon,
  Icon,
} from "@gluestack-ui/themed";
import { theme } from "galio-framework";
import { Box, Text } from 'native-base';
import React from "react";
import { StyleSheet, TouchableOpacity, Linking } from "react-native";

import Theme from "../../../../utils/Theme";

class DrawerCustomItem extends React.Component {
  renderIcon = () => {
    const { title, focused } = this.props;

    switch (title) {
      case "Home":
        return (
          <Text
            as={MenuIcon}
            size="md"
            color={focused ? "white" : Theme.COLORS.TEXT_BLACK}
          />
        );
      case "Settings":
        return (
          <Text
            as={SettingsIcon}
            size="md"
            color={focused ? "white" : Theme.COLORS.TEXT_BLACK}
          />
        );
      case "Instructions":
        return (
          <Text
            as={HelpCircleIcon}
            size="md"
            color={focused ? "white" : Theme.COLORS.TEXT_BLACK}
          />
        );
      case "Credits":
        return (
          <Text
            as={GlobeIcon}
            size="md"
            color={focused ? "white" : Theme.COLORS.TEXT_BLACK}
          />
        );
      case "Neighbor Check Website":
        return (
          <Text
            as={ExternalLinkIcon}
            size="md"
            color={focused ? "white" : Theme.COLORS.TEXT_BLACK}
          />
        );
      case "Contribute":
        return (
          <Text
            as={StarIcon}
            size="md"
            color={focused ? "white" : Theme.COLORS.TEXT_BLACK}
          />
        );
      case "Donation":
        return (
          <Text
            as={FavouriteIcon}
            size="md"
            color={focused ? "white" : Theme.COLORS.TEXT_BLACK}
          />
        );
      case "Source Code":
        return (
          <Text
            as={ShareIcon}
            size="md"
            color={focused ? "white" : Theme.COLORS.TEXT_BLACK}
          />
        );
      default:
        return null;
    }
  };

  render() {
    const { focused, title, navigation, navigateTo } = this.props;

    const containerStyles = [
      styles.defaultStyle,
      focused ? [styles.activeStyle, styles.shadow] : null,
    ];

    return (
      <TouchableOpacity
        style={{ height: 60 }}
        onPress={() => {
          if (title === "Donation") {
            Linking.openURL("https://www.bellelealand.net/donations").catch(
              (err) => console.error("An error occurred", err),
            );
          } else if (title === "Neighbor Check Website") {
            Linking.openURL("https://neighborcheckapp.wixsite.com/home").catch(
              (err) => console.error("An error occured", err),
            );
          } else if (title === "Contribute") {
            Linking.openURL(
              "https://github.com/SER-401-Team-15/SER401Team15",
            ).catch((err) => console.error("An error occurred", err));
          } else if (title === "Source Code") {
            Linking.openURL(
              "https://github.com/SER-401-Team-15/SER401Team15",
            ).catch((err) => console.error("An error occurred", err));
          } else {
            navigation.navigate(navigateTo);
          }
        }}
      >
        <Box flex row style={containerStyles}>
          <Box middle flex={0.1} style={{ marginRight: 5 }}>
            {this.renderIcon()}
          </Box>
          <Box row center flex={0.9}>
            <Text
              size={15}
              bold={!!focused}
              color={focused ? "white" : "rgba(0,0,0,0.5)"}
            >
              {title}
            </Text>
          </Box>
        </Box>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  defaultStyle: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 2,
  },
  activeStyle: {
    backgroundColor: Theme.COLORS.BACKGROUND_YELLOW,
    borderRadius: Theme.RADIUS.BUTTON,
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
  },
});

export default DrawerCustomItem;
