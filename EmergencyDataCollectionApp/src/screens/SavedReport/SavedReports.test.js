import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { NativeBaseProvider } from "native-base";
import React from "react";

import SavedReports, { ReportItem, ReportGroup } from "./SavedReports";
import mockReportsData from "../../utils/constants/mockReportsData";

const inset = {
  frame: { x: 0, y: 0, width: 0, height: 0 },
  insets: { top: 0, left: 0, right: 0, bottom: 0 },
};

describe("Mock Data Import Test", () => {
  it("should import mockReportsData", () => {
    expect(mockReportsData).toBeDefined();
  });
});
jest.mock('expo-font', () => ({
  loadAsync: jest.fn().mockResolvedValue(true),
  isLoaded: jest.fn().mockReturnValue(true),
  loadedNativeFonts: [],
}));

describe("ReportItem", () => {
  const mockFireReport = {
    id: "1",
    title: "Fire Incident",
    address: "123 Street",
  };
  const mockEarthquakeReport = {
    id: "2",
    title: "Earthquake",
    address: "123 Street",
  };

  it("renders correctly with a fire incident report", async () => {
    const { getByText } = render(
      <NativeBaseProvider initialWindowMetrics={inset}>
        <ReportItem
          report={mockFireReport}
          onSelect={() => {}}
          isSelected={false}
        />
      </NativeBaseProvider>,
    );
    await waitFor(() => {
      expect(getByText("Fire Incident")).toBeTruthy();
    });
  });

  it("renders correctly with a earthquake report", async () => {
    const { getByText } = render(
      <NativeBaseProvider initialWindowMetrics={inset}>
        <ReportItem
          report={mockEarthquakeReport}
          onSelect={() => {}}
          isSelected={false}
        />
      </NativeBaseProvider>,
    );
    await waitFor(() => {
      expect(getByText("Earthquake")).toBeTruthy();
    });
  });
});

describe("ReportGroup", () => {
  const mockGroup = {
    type: "Emergency",
    reports: [mockReportsData[0].reports[0]],
  };

  it("renders correctly with a group type Emergency", () => {
    const { getByText } = render(
      <NativeBaseProvider initialWindowMetrics={inset}>
        <ReportGroup
          group={mockGroup}
          onSelect={() => {}}
          selectedReports={{}}
        />
      </NativeBaseProvider>,
    );
    expect(getByText("Emergency")).toBeTruthy();
    expect(getByText("Fire Incident")).toBeTruthy();
  });
});

describe("SavedReports", () => {
  it("renders correctly", () => {
    const { getByText } = render(
      <NativeBaseProvider initialWindowMetrics={inset}>
        <SavedReports />
      </NativeBaseProvider>,
    );
    expect(getByText("Select All")).toBeTruthy();
  });

  it("handles select all and deselect all", () => {
    const { getByText } = render(
      <NativeBaseProvider initialWindowMetrics={inset}>
        <SavedReports />
      </NativeBaseProvider>,
    );
    const selectAllButton = getByText("Select All");
    fireEvent.press(selectAllButton);
    expect(getByText("Deselect All")).toBeTruthy();
    fireEvent.press(selectAllButton);
    expect(getByText("Select All")).toBeTruthy();
  });
});
