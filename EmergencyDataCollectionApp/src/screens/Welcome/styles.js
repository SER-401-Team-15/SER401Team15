import { Dimensions, StyleSheet } from "react-native";

import Theme from "../../utils/Theme";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: height * 0.15,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: height * 0.1,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "stretch",
    marginBottom: height * 0.06,
  },
  image: {
    width: width * 0.7,
    height: (width * 0.7) / 1.3,
    borderRadius: Theme.RADIUS.IMAGE,
  },
  image2: {
    width: width * 0.5,
    height: (width * 0.5) / 1.0,
    marginTop: height * 0.09,
    borderRadius: Theme.RADIUS.IMAGE,
  },
  title: {
    fontSize: Theme.TYPOGRAPHY.FONT_SIZE.XLARGE,
    fontWeight: Theme.TYPOGRAPHY.FONT_WEIGHT.BOLD,
    marginBottom: 15,
  },
  subtitle: {
    fontSize: Theme.TYPOGRAPHY.FONT_SIZE.MED_LARGE,
  },
  button: {
    backgroundColor: Theme.COLORS.BACKGROUND_YELLOW,
    paddingVertical: Theme.BUTTON_PADDING.VERTICAL,
    width: width * 0.8,
    borderRadius: Theme.RADIUS.BUTTON,
  },
  buttonText: {
    color: Theme.COLORS.TEXT_BLACK,
    fontSize: Theme.TYPOGRAPHY.FONT_SIZE.MED_LARGE,
    fontWeight: Theme.TYPOGRAPHY.FONT_WEIGHT.REGULAR,
    textAlign: "center",
  },
});
