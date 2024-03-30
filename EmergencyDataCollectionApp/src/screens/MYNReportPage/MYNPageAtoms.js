import { atom, atomWithReset } from "jotai/utils";

export const mynTabsStatusAtom = atomWithReset({
  isInfoPageValidated: false,
  isLocationPageValidated: false,
  isHazardPageValidated: false,
  isPeoplePageValidated: false,
  isAnimalPageValidated: false,
  isNotePageValidated: false,
  tabIndex: 0,
  enableDataValidation: true,
});

export const mynReportAtom = atomWithReset({
  mynPicture: {
    number: 1,
  },
  info: {
    reportType: "MYN",
    reportNumber: null,
    reportID: "",
    groupName: "",
    startTime: new Date(),
    latitude: 0,
    longitude: 0,
    accuracy: 100,
  },
  location: {
    numberOfVisit: "",
    roadCondition: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  },
  hazard: {
    structureType: "",
    structureCondition: "",
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
  },
  animal: {
    anyPetsOrFarmAnimals: "",
    selectedAnimalStatus: [],
    animalNotes: "",
  },
  note: {
    NotesTextArea: "",
  },
});
