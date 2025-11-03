import { Box, TextArea, FormControl, WarningOutlineIcon, Text, Button } from "native-base";
import React, { useState, useCallback, useRef, useEffect } from "react";
import { View } from "react-native";

import Theme from "../../../../utils/Theme";

const CustomTextArea = ({
  label,
  value,
  placeholder = "Enter text",
  isRequired = false,
  isInvalid = false,
  errorMessage = "Invalid input",
  onChangeText,
  testID,
  textAreaProps,
  formControlProps,
  w = "100%",
  maxW,
  maxLength = 300, // Default character limit
  showCharacterCount = true,
  showCompleteButton = false,
  onComplete,
}) => {
  const [localValue, setLocalValue] = useState(value || "");
  const [isCompleted, setIsCompleted] = useState(false);
  const debounceTimer = useRef(null);

  // Sync with parent value changes
  useEffect(() => {
    if (value !== undefined) {
      setLocalValue(value || "");
    }
  }, [value]);

  // Cleanup debounce timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);
  
  const borderColor = isInvalid
    ? Theme.COLORS.ERROR
    : Theme.COLORS.BORDER_COLOR;

  // Debounced change handler to improve performance
  const handleChangeText = useCallback((text) => {
    // Enforce character limit
    const limitedText = text.substring(0, maxLength);
    setLocalValue(limitedText);
    
    // Clear existing timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    
    // Debounce the actual onChangeText call to improve performance
    debounceTimer.current = setTimeout(() => {
      if (onChangeText) {
        onChangeText(limitedText);
      }
    }, 300); // 300ms debounce delay
  }, [maxLength, onChangeText]);

  const handleComplete = () => {
    setIsCompleted(true);
    if (onComplete) {
      onComplete(localValue);
    }
  };

  const remainingChars = maxLength - localValue.length;
  const isNearLimit = remainingChars <= 50;

  return (
    <Box alignItems="center" w="100%">
      <FormControl
        isRequired={isRequired}
        isInvalid={isInvalid}
        w={w}
        maxW={maxW}
        {...formControlProps}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          {label && <FormControl.Label flex={1}>{label}</FormControl.Label>}
          {showCharacterCount && (
            <Text 
              fontSize="sm" 
              color={isNearLimit ? Theme.COLORS.ERROR : Theme.COLORS.TEXT_GREY}
              fontWeight={isNearLimit ? "bold" : "normal"}
            >
              {localValue.length}/{maxLength} characters
            </Text>
          )}
        </View>
        <TextArea
          value={localValue}
          onChangeText={handleChangeText}
          accessibilityLabel={placeholder}
          placeholder={placeholder}
          mt="1"
          testID={testID}
          borderColor={borderColor}
          maxLength={maxLength}
          multiline
          textAlignVertical="top"
          scrollEnabled={true}
          blurOnSubmit={false}
          returnKeyType="done"
          enablesReturnKeyAutomatically={false}
          {...textAreaProps}
        />
        {showCompleteButton && !isCompleted && localValue.length > 0 && (
          <Button
            size="sm"
            variant="outline"
            colorScheme="yellow"
            mt="2"
            onPress={handleComplete}
            _text={{ fontSize: "sm" }}
          >
            Note complete
          </Button>
        )}
        {isCompleted && (
          <Text fontSize="sm" color="green.600" mt="1" fontWeight="bold">
            ✓ Note completed
          </Text>
        )}
        {isInvalid && (
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            {errorMessage}
          </FormControl.ErrorMessage>
        )}
      </FormControl>
    </Box>
  );
};

// Memoize the component to prevent unnecessary re-renders
export default React.memo(CustomTextArea, (prevProps, nextProps) => {
  // Only re-render if these specific props change
  return (
    prevProps.value === nextProps.value &&
    prevProps.isInvalid === nextProps.isInvalid &&
    prevProps.maxLength === nextProps.maxLength &&
    prevProps.showCharacterCount === nextProps.showCharacterCount &&
    prevProps.showCompleteButton === nextProps.showCompleteButton
  );
});
