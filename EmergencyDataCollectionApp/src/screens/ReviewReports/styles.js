import { StyleSheet, Dimensions } from "react-native";

import Theme from "../../utils/Theme";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  header: {
    fontSize: Theme.TYPOGRAPHY.FONT_SIZE.LARGE,
    fontWeight: Theme.TYPOGRAPHY.FONT_WEIGHT.BOLD,
    marginTop: Theme.SPACING.LARGE,
    marginBottom: Theme.SPACING.SMALL,
  },
  reportContainer: {
    padding: Theme.SPACING.MED_LARGE,
    backgroundColor: Theme.COLORS.BACKGROUND_YELLOW,
    marginBottom: Theme.SPACING.SMALL,
    borderRadius: Theme.RADIUS.REPORT_CARD,
  },
  reportTime: {
    fontSize: Theme.TYPOGRAPHY.FONT_SIZE.MEDIUM,
    color: Theme.COLORS.TEXT_GREY,
  },
  reportAddress: {
    fontSize: Theme.TYPOGRAPHY.FONT_SIZE.LARGE,
    color: Theme.COLORS.TEXT_BLACK,
    flexWrap: "wrap",
  },
  area: {
    flex: 1,
    paddingTop: height * 0.02,
    backgroundColor: Theme.COLORS.BACKGROUND_WHITE,
  },
  list: {
    paddingHorizontal: width * 0.06,
  },
});