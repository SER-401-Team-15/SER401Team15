import {
  Center,
  FormControl,
  Select,
  CheckIcon,
  WarningOutlineIcon,
  Input,
} from "native-base";
import React, { useEffect, useState } from "react";

import Theme from "../../../../utils/Theme";

const CustomSelect = ({
  items, // required
  onChange, // required
  selectedValue,
  placeholder = "Select an option",
  label,
  isRequired = true,
  isInvalid = false,
  isReadOnly = true,
  errorMessage = "Please make a selection!",
  testID,
  enableFilter = false,
  selectProps,
  formControlProps,
  selectedItemStyle,
  w = "100%",
  maxW,
}) => {
  const [filterText, setFilterText] = useState("");
  const [selected, setSelected] = useState(selectedValue);
  useEffect(() => {
    setSelected(selectedValue);
  }, [selectedValue]);
  const displayedItems = enableFilter
    ? items.filter((item) =>
        item.label.toLowerCase().startsWith(filterText.toLowerCase()),
      )
    : items;

  return (
    <Center>
      <FormControl
        w={w}
        maxW={maxW}
        isRequired={isRequired}
        isInvalid={isInvalid}
        isReadOnly={isReadOnly}
        {...formControlProps}
      >
        {label && <FormControl.Label>{label}</FormControl.Label>}
        {enableFilter && (
          <Input
            placeholder="Type to filter..."
            mt="1"
            value={filterText}
            onChangeText={(text) => setFilterText(text)}
            autoCapitalize="none"
          />
        )}
        <Select
          minWidth="200"
          accessibilityLabel={placeholder}
          placeholder={placeholder}
          _selectedItem={{
            bg: Theme.COLORS.BACKGROUND_GREY,
            endIcon: <CheckIcon size={5} />,
            ...selectedItemStyle,
          }}
          mt="1"
          testID={testID}
          selectedValue={selected}
          onValueChange={(itemValue) => {
            onChange(itemValue);
            setSelected(itemValue);
            if (enableFilter) setFilterText("");
          }}
          {...selectProps}
        >
          {displayedItems.map(({ label, value }, index) => (
            <Select.Item key={index} label={label} value={value} />
          ))}
        </Select>
        {isInvalid && (
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            {errorMessage}
          </FormControl.ErrorMessage>
        )}
      </FormControl>
    </Center>
  );
};

export default CustomSelect;
