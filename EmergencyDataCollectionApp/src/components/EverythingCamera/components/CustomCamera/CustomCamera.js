import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import React, { useState } from "react";
import { View, Platform, Alert } from "react-native";
import Constants from "expo-constants";

import CustomImageButton from "../CustomImageButton/CustomImageButton";

export default function CustomCamera({ setImage }) {
  const [isPressed, setIsPressed] = useState(false);

  const handlePressIn = () => setIsPressed(true);
  const handlePressOut = () => setIsPressed(false);

  const getPermissionAsync = async () => {
    // Request camera permissions
    const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
    if (cameraPermission.status !== "granted") {
      Alert.alert("Permission required", "Camera access is required to take photos");
      return false;
    }
    
    // Request media library permissions
    const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
    if (mediaLibraryPermission.status !== "granted") {
      Alert.alert("Permission required", "Media library access is required to save photos");
      return false;
    }
    
    return true;
  }

  // More reliable simulator detection
  const isSimulator = () => {
    if (Platform.OS === 'ios') {
      return !Constants.isDevice || 
             Constants.platform?.ios?.model?.includes('Simulator') || 
             Constants.executionEnvironment === 'simulator';
    }
    return false;
  };

  const takePicture = async () => {
    if (isSimulator()) {
      Alert.alert(
        "Simulator Detected",
        "Camera is not available in iOS simulator. Please use a physical device or choose 'Upload Photo' instead.",
        [{ text: "OK" }]
      );
      return;
    }
  
    const hasPermissions = await getPermissionAsync();
    if (!hasPermissions) return;
  
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 1,
        aspect: [4, 3],
      });
  
      if (!result.canceled && result.assets && result.assets.length > 0) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error taking picture:", error);
      Alert.alert("Error", "There was a problem taking the picture. Please try again.");
    }
  };

  return (
    <View>
      <CustomImageButton
        onPress={takePicture}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        buttonText="Take Photo"
        isPressed={isPressed}
        isUploadButton={false}
      />
    </View>
  );
}
