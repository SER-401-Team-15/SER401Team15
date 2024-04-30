import {
  Radio,
  RadioGroup,
  HStack,
  RadioIndicator,
  RadioIcon,
  RadioLabel,
  CircleIcon,
  Box,
} from "@gluestack-ui/themed";
import React from "react";
import { Text } from "react-native";

import Theme from "../../../../utils/Theme";

const ReportTypeRadioButton = ({ value, onChange }) => {
  return (
    <Box mb="$4">
      <Text
        style={{
          fontSize: Theme.TYPOGRAPHY.FONT_SIZE.MED_LARGE,
          fontWeight: Theme.TYPOGRAPHY.FONT_WEIGHT.BOLD,
          marginBottom: Theme.SPACING.SMALL,
        }}
      >
        Select a report type to review
      </Text>
      <RadioGroup value={value} onChange={onChange}>
        <HStack space="2xl">
          <Radio value="MYN">
            <RadioIndicator mr="$2">
              <RadioIcon as={CircleIcon} />
            </RadioIndicator>
            <RadioLabel>Ready Neighbor</RadioLabel>
          </Radio>
          <Radio value="CERT">
            <RadioIndicator mr="$2">
              <RadioIcon as={CircleIcon} />
            </RadioIndicator>
            <RadioLabel>CERT</RadioLabel>
          </Radio>
          <Radio value="Hazard">
            <RadioIndicator mr="$2">
              <RadioIcon as={CircleIcon} />
            </RadioIndicator>
            <RadioLabel>Hazard</RadioLabel>
          </Radio>
        </HStack>
      </RadioGroup>
    </Box>
  );
};

export default ReportTypeRadioButton;
