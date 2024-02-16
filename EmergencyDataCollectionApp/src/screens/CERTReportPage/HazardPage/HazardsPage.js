import { useAtom } from "jotai/index";
import { NativeBaseProvider } from "native-base";
import React, { useState } from "react";
import { View, ScrollView, Alert } from "react-native";

import HazardChemicalSelect from "./components/HazardChemicalSelect";
import HazardElectricalSelect from "./components/HazardElectricalSelect";
import HazardFireSelect from "./components/HazardFireSelect";
import HazardPropaneSelect from "./components/HazardPropaneSelect";
import HazardWaterSelect from "./components/HazardWaterSelect";
import StructureConditionSelect from "./components/StructureConditionSelect";
import StructureTypeSelect from "./components/StructureTypeSelect";
import LineSeparator from "../../../components/LineSeparator/LineSeparator";
import { certReportAtom, certTabsStatusAtom } from "../CERTPageAtoms";
import NavigationButtons from "../components/NavigationButtons";

const HazardsPage = () => {
  const [certReport, setCERTReport] = useAtom(certReportAtom);
  const [certTabsStatus, setCERTTabsStatus] = useAtom(certTabsStatusAtom);

  const [isStructureTypeInvalid, setIsStructureTypeInvalid] = useState(false);
  const [isStructureConditionInvalid, setIsStructureConditionInvalid] =
    useState(false);
  const [isHazardFireInvalid, setIsHazardFireInvalid] = useState(false);
  const [isHazardPropaneInvalid, setIsHazardPropaneInvalid] = useState(false);
  const [isHazardWaterInvalid, setIsHazardWaterInvalid] = useState(false);
  const [isHazardElectricalInvalid, setIsHazardElectricalInvalid] =
    useState(false);
  const [isHazardChemicalInvalid, setIsHazardChemicalInvalid] = useState(false);

  const handleStructureTypeChange = (value) => {
    setCERTReport((prev) => ({
      ...prev,
      hazard: {
        ...prev.hazard,
        structureType: value,
      },
    }));
    setIsStructureTypeInvalid(false);
  };
  const handleStructureConditionChange = (value) => {
    setCERTReport((prev) => ({
      ...prev,
      hazard: {
        ...prev.hazard,
        structureCondition: value,
      },
    }));
    setIsStructureConditionInvalid(false);
  };
  const handleHazardFireChange = (value) => {
    setCERTReport((prev) => ({
      ...prev,
      hazard: {
        ...prev.hazard,
        hazardFire: value,
      },
    }));
    setIsHazardFireInvalid(false);
  };
  const handleHazardPropaneChange = (value) => {
    setCERTReport((prev) => ({
      ...prev,
      hazard: {
        ...prev.hazard,
        hazardPropane: value,
      },
    }));
    setIsHazardPropaneInvalid(false);
  };
  const handleHazardWaterChange = (value) => {
    setCERTReport((prev) => ({
      ...prev,
      hazard: {
        ...prev.hazard,
        hazardWater: value,
      },
    }));
    setIsHazardWaterInvalid(false);
  };
  const handleHazardElectricalChange = (value) => {
    setCERTReport((prev) => ({
      ...prev,
      hazard: {
        ...prev.hazard,
        hazardElectrical: value,
      },
    }));
    setIsHazardElectricalInvalid(false);
  };
  const handleHazardChemicalChange = (value) => {
    setCERTReport((prev) => ({
      ...prev,
      hazard: {
        ...prev.hazard,
        hazardChemical: value,
      },
    }));
    setIsHazardChemicalInvalid(false);
  };

  const validateData = () => {
    const requiredFieldsList = [];
    if (!certReport.hazard.structureType) {
      setIsStructureTypeInvalid(true);
      requiredFieldsList.push("► 1. Structure Type");
    }
    if (!certReport.hazard.structureCondition) {
      setIsStructureConditionInvalid(true);
      requiredFieldsList.push("► 2. Structure Condition");
    }
    if (!certReport.hazard.hazardFire) {
      setIsHazardFireInvalid(true);
      requiredFieldsList.push("► 3. Fire Hazard");
    }
    if (!certReport.hazard.hazardPropane) {
      setIsHazardPropaneInvalid(true);
      requiredFieldsList.push("► 4. Propane or Gas Hazard");
    }
    if (!certReport.hazard.hazardWater) {
      setIsHazardWaterInvalid(true);
      requiredFieldsList.push("► 5. Water Hazard");
    }
    if (!certReport.hazard.hazardElectrical) {
      setIsHazardElectricalInvalid(true);
      requiredFieldsList.push("► 6. Electrical Hazard");
    }
    if (!certReport.hazard.hazardChemical) {
      setIsHazardChemicalInvalid(true);
      requiredFieldsList.push("► 7. Chemical Hazard");
    }

    if (requiredFieldsList.length > 0 && certTabsStatus.enableDataValidation) {
      Alert.alert(
        "Validation Error",
        "Please fill in all required fields:\n" + requiredFieldsList.join("\n"),
      );
      setCERTTabsStatus((prev) => ({
        ...prev,
        isHazardPageValidated: false,
      }));
      return false;
    }

    const currentTabIndex = certTabsStatus.tabIndex;
    setCERTTabsStatus((prev) => ({
      ...prev,
      isHazardPageValidated: true,
      tabIndex: currentTabIndex + 1,
    }));
  };

  return (
    <NativeBaseProvider>
      <View style={{ flex: 1 }}>
        <LineSeparator />
        <ScrollView>
          <StructureTypeSelect
            onChange={handleStructureTypeChange}
            isInvalid={isStructureTypeInvalid}
          />
          <StructureConditionSelect
            onChange={handleStructureConditionChange}
            isInvalid={isStructureConditionInvalid}
          />
          <HazardFireSelect
            onChange={handleHazardFireChange}
            isInvalid={isHazardFireInvalid}
          />
          <HazardPropaneSelect
            onChange={handleHazardPropaneChange}
            isInvalid={isHazardPropaneInvalid}
          />
          <HazardWaterSelect
            onChange={handleHazardWaterChange}
            isInvalid={isHazardWaterInvalid}
          />
          <HazardElectricalSelect
            onChange={handleHazardElectricalChange}
            isInvalid={isHazardElectricalInvalid}
          />
          <HazardChemicalSelect
            onChange={handleHazardChemicalChange}
            isInvalid={isHazardChemicalInvalid}
          />
        </ScrollView>
        <NavigationButtons validateData={validateData} />
      </View>
    </NativeBaseProvider>
  );
};
export default HazardsPage;
