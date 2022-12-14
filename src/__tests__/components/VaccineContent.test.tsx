import { render, screen } from "@testing-library/react";

import VaccineContent from "../../components/vaccine/VaccineContent";

import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

jest.mock("react-redux");

jest.mock("../../hooks/hooks");

describe("VaccineContent", () => {
  it("When loading is true spinner is loaded", () => {
    const dispatch = jest.fn();

    (useAppDispatch as jest.Mock).mockReturnValue(dispatch);

    (useAppSelector as jest.Mock).mockReturnValue({
      isLoading: true,
      vaccines: [],
      selectedVaccine: {},
      isPerformingAction: false,
    });

    render(<VaccineContent />);

    const text = screen.queryByText("Loading...")?.innerHTML;

    expect(text).toBe("Loading...");
  });

  it("When the vaccine list is loaded", () => {
    const dispatch = jest.fn();

    (useAppDispatch as jest.Mock).mockReturnValue(dispatch);

    (useAppSelector as jest.Mock).mockReturnValue({
      isLoading: false,
      vaccines: [
        {
          id: 1,
          name: "Phizer",
          description: "Phizer is a drug test.",
          numberOfDoses: 2,
          isMandatory: true,
          stage: "Clinical development",
          vaccineImageUrl:
            "https://res.cloudinary.com/dr8t3y3cp/image/upload/v1670838728/vaccine-management/vaccines/jlecz4lcmo8qssludbvv.png",
        },
      ],
      selectedVaccine: {},
      isPerformingAction: false,
    });

    render(<VaccineContent />);

    const table = screen.getByRole("grid");

    expect(table).toBeInTheDocument();
  });

  it("When the vaccine list is empty show add vaccine image", () => {
    const dispatch = jest.fn();

    (useAppDispatch as jest.Mock).mockReturnValue(dispatch);

    (useAppSelector as jest.Mock).mockReturnValue({
      isLoading: false,
      vaccines: [],
      selectedVaccine: {},
      isPerformingAction: false,
    });

    render(<VaccineContent />);

    const vaccineImage = screen.getByTestId("vaccine-image");

    expect(vaccineImage).toBeInTheDocument();
  });
});
