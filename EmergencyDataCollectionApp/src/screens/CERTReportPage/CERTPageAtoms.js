import { atomWithReset } from "jotai/utils";

export const certTabsStatusAtom = atomWithReset({
  isInfoPageValidated: false,
  isLocationPageValidated: false,
  isHazardPageValidated: false,
  isPeoplePageValidated: false,
  isNotePageValidated: false,
  tabIndex: 0,
  enableDataValidation: true,
});

export const certReportAtom = atomWithReset({
  certPicture: {
    number: 0,
  },
  info: {
    reportType: "CERT",
    hash: 0,
    reportID: "",
    groupName: "",
    squadName: "",
    startTime: "",
    endTime: "",
    hazardType: "",
  },
  location: {
    numberOfVisit: "",
    roadCondition: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    latitude: 0,
    longitude: 0,
    accuracy: 100,
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
    refugeesFirstAid: "",
    refugeesShelter: "",
    certSearch: "",
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
