import { StyleSheet } from "react-native";

import Theme from "../../utils/Theme";

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 50, // Add bottom padding to ensure content doesn't get cut off
  },
  container: {
    padding: 16,
    marginTop: 15,
    minHeight: '100%', // Ensure it takes up the full height but doesn't force unnecessary spacing
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  formSection: {
    marginBottom: 20, // Add spacing between form sections
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingVertical: 20,
    gap: 10,
    marginTop: 30, // Add margin to separate from form fields
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
  },
  cancelButton: {
    padding: Theme.BUTTON_PADDING.VERTICAL,
    alignItems: "center",
    width: "48%",
    borderColor: Theme.COLORS.BACKGROUND_YELLOW,
    borderWidth: 1,
    paddingVertical: Theme.BUTTON_PADDING.VERTICAL,
    borderRadius: Theme.RADIUS.BUTTON,
  },
  Savebutton: {
    padding: Theme.BUTTON_PADDING.VERTICAL,
    alignItems: "center",
    width: "48%",
    backgroundColor: Theme.COLORS.BACKGROUND_YELLOW,
    paddingVertical: Theme.BUTTON_PADDING.VERTICAL,
    borderRadius: Theme.RADIUS.BUTTON,
  },
  text: {
    color: Theme.COLORS.TEXT_BLACK,
  },
  input: {
    marginBottom: 15, // Add spacing between input fields
  },
});

export default styles;
