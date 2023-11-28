import { useState, useCallback, useEffect } from "react";
import { Alert } from "react-native";

import { GPS_FETCHING_TIMEOUT } from "../../utils/constants/GlobalConstants";

const LocationManager_v2 = () => {
  const [locationData, setLocationData] = useState([]);
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);
  const [isLoggingLocationData, setIsLoggingLocationData] = useState(false);

  const handleLocationUpdate = useCallback((location) => {
    if (location?.coords && location.coords.accuracy <= 10) {
      setLocationData((prevData) => [...prevData, location]);
    } else if (location?.coords) {
      console.log(
        `Ignored location with accuracy: ${location.coords.accuracy}`,
      );
    } else {
      Alert.alert(
        "Location Error: ",
        location?.error || "Failed to fetch location",
      );
    }
  }, []);

  const startFetchingLocation = useCallback(() => {
    setIsFetchingLocation(true);
    setLocationData([]);
  }, []);

  const stopFetchingLocation = useCallback(() => {
    setIsFetchingLocation(false);
  }, []);

  const calculateAverageLocationAndAccuracy = (locations) => {
    const validLocations = locations.filter((loc) => loc.coords.accuracy <= 10);

    const averageData = validLocations.reduce(
      (acc, loc) => {
        acc.latitude += loc.coords.latitude;
        acc.longitude += loc.coords.longitude;
        acc.accuracy += loc.coords.accuracy;
        return acc;
      },
      { latitude: 0, longitude: 0, accuracy: 0 },
    );

    if (validLocations.length > 0) {
      averageData.latitude /= validLocations.length;
      averageData.longitude /= validLocations.length;
      averageData.accuracy /= validLocations.length;
    }

    return averageData;
  };

  const onStartFetch = useCallback(() => {
    startFetchingLocation();

    setTimeout(() => {
      stopFetchingLocation();
      setIsLoggingLocationData(true);
    }, GPS_FETCHING_TIMEOUT);
  }, [startFetchingLocation, stopFetchingLocation]);

  useEffect(() => {
    if (isLoggingLocationData) {
      console.log("Location Data:");
      locationData.forEach((location, index) => {
        console.log(`Location ${index}:`, location);
      });

      const averageData = calculateAverageLocationAndAccuracy(locationData);
      console.log(
        "Average Location:",
        averageData.latitude,
        averageData.longitude,
      );
      console.log("Average Accuracy:", averageData.accuracy);

      setIsLoggingLocationData(false);
    }
  }, [isLoggingLocationData, locationData]);

  return {
    locationData,
    isFetchingLocation,
    startFetchingLocation,
    stopFetchingLocation,
    handleLocationUpdate,
    onStartFetch,
  };
};

export default LocationManager_v2;
