import { Dimensions, StyleSheet } from "react-native";

import Theme from "../../utils/Theme";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#ffffff",
    justifyContent: "space-evenly", // Distribute content evenly
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  mainLogo: {
    width: width * 0.85, // Make CERT logo prominent
    height: height * 0.25, // Larger size for main logo
    resizeMode: "contain",
  },
  cleanLogo: {
    width: width * 0.8, // Bigger size as requested
    height: height * 0.25,
    resizeMode: "contain",
  },
  buttonContainer: {
    paddingHorizontal: 40,
    width: "100%",
    paddingBottom: height * 0.05,
  },
  getStartedButton: {
    backgroundColor: Theme.COLORS.BACKGROUND_YELLOW,
    paddingVertical: Theme.BUTTON_PADDING.VERTICAL,
    borderRadius: Theme.RADIUS.BUTTON,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: Theme.COLORS.TEXT_BLACK,
  },
});
