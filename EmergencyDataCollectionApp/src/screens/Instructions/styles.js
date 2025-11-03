import { StyleSheet } from "react-native";

import Theme from "../../utils/Theme";

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  instruction: {
    fontSize: 12,
    marginBottom: 10,
  },
  placehodler: {
    fontSize: 20,
    fontWeight: "bold",
  },
  text: {
    fontSize: 16,
    fontWeight: "500",
  },
  accordion: {
    backgroundColor: Theme.COLORS.BACKGROUND_YELLOW,
    padding: 10,
  },
});

export default styles;
