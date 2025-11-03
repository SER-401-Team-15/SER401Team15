import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";

import { formatDate } from "../../../screens/MYNReportPage/components/formatDate";
import Theme from "../../../utils/Theme";

const CustomDateTimePickerComponent = ({
  title = "Select date and time",
  value,
  handleDataTimeChange,
  testIdSelectDate, // optional
  testIdSelectTime, // optional
  testIdDateTimePicker, // optional
  is24Hour = false, // optional
  isRequired = false, // optional
}) => {
  const [isDatePicker, setIsDatePicker] = useState(true);
  const [showPicker, setShowPicker] = useState(false);

  return (
    <View>
      <View>
        <Text style={styles.titleText}>
          {title}
          {isRequired && <Text style={styles.requiredAsterisk}>*</Text>}
        </Text>
      </View>

      <View>
        <Text style={styles.dateDisplay}>{formatDate(value)}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          testID={testIdSelectDate}
          style={[styles.button, { marginRight: 5 }]}
          onPress={() => {
            setIsDatePicker(true);
            setShowPicker(true);
          }}
        >
          <Text style={styles.buttonText}>Edit Date</Text>
        </TouchableOpacity>

        <TouchableOpacity
          testID={testIdSelectTime}
          style={[styles.button, { marginLeft: 5 }]}
          onPress={() => {
            setIsDatePicker(false);
            setShowPicker(true);
          }}
        >
          <Text style={styles.buttonText}>Edit Time</Text>
        </TouchableOpacity>
      </View>

      {showPicker && isDatePicker && (
        <DateTimePicker
          testID={testIdDateTimePicker}
          value={value || new Date()}
          mode="date"
          is24Hour={is24Hour}
          display="default"
          onChange={(event, date) => {
            setShowPicker(false);
            handleDataTimeChange(event, date);
          }}
        />
      )}

      {showPicker && !isDatePicker && (
        <DateTimePicker
          testID={testIdDateTimePicker}
          value={value || new Date()}
          mode="time"
          is24Hour={is24Hour}
          display="default"
          onChange={(event, date) => {
            setShowPicker(false);
            handleDataTimeChange(event, date);
          }}
        />
      )}
    </View>
  );
};

const styles = {
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  dateDisplay: {
    fontSize: Theme.TYPOGRAPHY.FONT_SIZE.MEDIUM,
    color: Theme.COLORS.TEXT_BLACK,
    marginTop: 5,
    marginBottom: 10,
    borderWidth: 1,
    padding: Theme.SPACING.SMALL,
    borderColor: Theme.COLORS.SEPARATOR_GREY,
    borderRadius: Theme.RADIUS.DEFAULT,
  },
  titleText: {
    fontSize: 13,
    color: Theme.COLORS.TEXT_GREY,
    fontWeight: "700",
  },
  button: {
    width: "48%",
    borderColor: Theme.COLORS.BACKGROUND_YELLOW,
    borderWidth: 1,
    backgroundColor: Theme.COLORS.BACKGROUND_YELLOW_OPACITY_20,
    paddingVertical: Theme.BUTTON_PADDING.VERTICAL,
    borderRadius: Theme.RADIUS.BUTTON,
  },
  buttonText: {
    textAlign: "center",
    color: Theme.COLORS.TEXT_BLACK,
  },
  requiredAsterisk: {
    color: Theme.COLORS.ERROR,
  },
};

export default CustomDateTimePickerComponent;
