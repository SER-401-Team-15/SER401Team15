export const StructureType = [
  { label: "Single Family", value: "SF" },
  { label: "Duplex", value: "D" },
  { label: "Apartment", value: "A" },
  { label: "Accessory Dwelling Unit", value: "ADU" },
  { label: "Commercial Building", value: "CB" },
  { label: "Empty Lot", value: "EL" },
];

export const StructureCondition = [
  { label: "Habitable(Can have some damage)", value: "H" },
  { label: "Affected(Books off shelves Etc)", value: "A" },
  { label: "Minor(<30 days to repair)", value: "M" },
  { label: "Major(>30 days to repair)", value: "MJR" },
  { label: "Destroyed(Off foundation or pancaked)", value: "D" },
  { label: "Inaccessible", value: "I" },
];

export const HazardFire = [
  { label: "No Fires", value: "N" },
  { label: "Fires out", value: "F" },
  { label: "Still burning", value: "B" },
];

export const HazardPropane = [
  { label: "No propane or gas on site", value: "N" },
  { label: "Propane or gas turned off", value: "O" },
  { label: "There is a leak", value: "L" },
  { label: "Unkown if there is any propane on site", value: "U" },
];

export const HazardWater = [
  { label: "Water is turned off", value: "O" },
  { label: "Water is leaking", value: "L" },
  { label: "Major spill", value: "M" },
  { label: "Unknown if water is off", value: "U" },
];

export const HazardElectrical = [
  { label: "Power Off", value: "N" },
  { label: "Power On", value: "O" },
  { label: "Wires down", value: "D" },
  { label: "Power status unknown", value: "U" },
];

export const HazardChemical = [
  { label: "No Chemicals on site", value: "N" },
  { label: "No Leaks", value: "NL" },
  { label: "Chemicals leaking", value: "L" },
  { label: "Unknown if there are chemicals hazards", value: "U" },
];
