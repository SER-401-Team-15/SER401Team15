import { render } from "@testing-library/react-native";
import React from "react";

import Welcome from "./Welcome";

jest.mock("../../utils/Database/OfflineSQLiteDB", () => ({
  setupDatabase: jest.fn().mockImplementation((callback) => callback()),
}));

describe("<Welcome />", () => {
  it("renders correctly", () => {
    const { getByText, getByTestId } = render(<Welcome />);
    expect(getByText("Neighbor Check")).toBeTruthy();
    expect(getByTestId("welcomeImage")).toBeTruthy();
    expect(getByTestId("getStartedButton")).toBeTruthy();
    expect(getByText("Get Started")).toBeTruthy();
  });
});
