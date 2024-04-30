import { atomWithReset } from "jotai/utils";

export const hazardTabsStatusAtom = atomWithReset({
  isFirstPageValidated: false,
  isSecondPageValidated: false,
  isThirdPageValidated: false,
  tabIndex: 0,
  enableDataValidation: true,
});

export const hazardReportAtom = atomWithReset({
  hazardPicture: {
    number: 0,
  },
  info: {
    reportType: "HAZARD",
    hash: 0,
    reportID: "",
    groupName: "",
    squadName: "",
    startTime: "",
    endTime: "",
    numberOfVisit: "",
    roadCondition: "",
    hazardType: "",
  },
  location: {
    structureType: "",
    structureCondition: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    latitude: 0,
    longitude: 0,
    accuracy: 100,
  },
  hazard: {
    hazardFire: "",
    hazardPropane: "",
    hazardWater: "",
    hazardElectrical: "",
    hazardChemical: "",
  },
  people: {
    greenPersonal: "",
    yellowPersonal: "",
    redPersonal: "",
    trappedPersonal: "",
    personalRequiringShelter: "",
    deceasedPersonal: "",
    deceasedPersonalLocation: "",
    additionalPersonalRequiringAid: "",
    additionalPersonalRequiringShelter: "",
  },
  note: {
    NotesTextArea: "",
  },
});

export const isUpdateModeAtom = atomWithReset(false);
export const updateID = atomWithReset(null);
