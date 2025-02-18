import { render } from "@testing-library/react-native";
import React from "react";

import LoadingScreen from "./LoadingScreen";
import NativeBaseTestUtils from "../../../utils/NativeBaseTestUtils/NativeBaseTestUtils";

describe("LoadingScreen Component", () => {
  const renderComponent = (isVisible) =>
    render(
      <NativeBaseTestUtils>
        <LoadingScreen isVisible={isVisible} />
      </NativeBaseTestUtils>,
    );

  it("renders correctly when visible", () => {
    const { getByText } = renderComponent(true);
    expect(getByText("Loading")).toBeTruthy();
  });

  it("renders null when not visible", () => {
    const { queryByText } = renderComponent(false);
    expect(queryByText("Loading")).toBeNull();
  });

  it("displays the modal when isVisible is true", () => {
    const { getByTestId } = renderComponent(true);
    expect(getByTestId("loading-screen-modal")).toBeTruthy();
    expect(getByTestId("loading-screen-modal").props.visible).toBe(true);
  });

  it("does not display the modal when isVisible is false", () => {
    const { queryByTestId } = renderComponent(false);
    expect(queryByTestId("loading-screen-modal")).toBeTruthy();
    expect(queryByTestId("loading-screen-modal").props.visible).toBe(false);
  });

  it("has the expected style applied", () => {
    const { getByTestId } = renderComponent(true);
    expect(getByTestId("loading-screen-container").props.style).toEqual(
      expect.objectContaining({
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.9)",
      }),
    );
  });
});
