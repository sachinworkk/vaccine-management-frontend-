import { fireEvent, screen, waitFor } from "@testing-library/react";

import VaccineContent from "../../components/vaccine/VaccineContent";

import { rest } from "msw";

import { setupServer } from "msw/node";
import { renderWithProviders } from "../utils/test-utils";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

const vaccinesMockData = [
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
];

const server = setupServer(
  rest.get("/vaccine", (req, res, ctx) => {
    return res(
      ctx.json({
        vaccines: vaccinesMockData,
      }),
      ctx.delay(150)
    );
  }),
  rest.post("/vaccine", (req, res, ctx) => {
    vaccinesMockData.push({
      id: 14,
      vaccineImageUrl:
        "https://res.cloudinary.com/dr8t3y3cp/image/upload/v1670903226/vaccine-management/vaccines/btsm2zdjsddhdpxir9vs.png",
      name: "Added Vaccine",
      stage: "Exploratory",
      description: "This is a test vaccine.",
      numberOfDoses: 2,
      isMandatory: true,
    });

    return res(
      ctx.json({
        vaccine: {
          id: 14,
          vaccineImageUrl:
            "https://res.cloudinary.com/dr8t3y3cp/image/upload/v1670903226/vaccine-management/vaccines/btsm2zdjsddhdpxir9vs.png",
          name: "Phizer",
          stage: "Exploratory",
          description: "This is a vaccine for COVID.",
          numberOfDoses: 4,
          isMandatory: true,
        },
        message: "Vaccine created successfully",
      }),
      ctx.delay(150)
    );
  })
);

describe("VaccineContent", () => {
  beforeAll(() => {
    server.listen();
  });

  beforeEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  it("When the vaccine is loading", () => {
    renderWithProviders(<VaccineContent />);

    const text = screen.queryByText("Loading...")?.innerHTML;

    expect(text).toBe("Loading...");
  });

  it("When the vaccine list contains data", async () => {
    renderWithProviders(<VaccineContent />);

    expect(await screen.findByRole("grid")).toBeInTheDocument();
  });

  it("When the vaccine list is empty", async () => {
    server.use(
      rest.get("/vaccine", (req, res, ctx) => {
        return res(
          ctx.json({
            vaccines: [],
          }),
          ctx.delay(150)
        );
      })
    );

    renderWithProviders(<VaccineContent />);

    expect(await screen.findByTestId("vaccine-image")).toBeInTheDocument();
  });

  it("When the vaccine information is filled and Add Vaccine is clicked", async () => {
    renderWithProviders(<VaccineContent />);

    expect(await screen.findByRole("grid")).toBeInTheDocument();

    expect(
      await screen.findByRole("button", { name: "add-button" })
    ).toBeInTheDocument();

    userEvent.click(screen.getByRole("button", { name: "add-button" }));

    const name = screen.getByRole("textbox", { name: "Full Name" });
    const description = screen.getByRole("textbox", { name: "Description" });
    const numberOfDoses = screen.getByRole("spinbutton", {
      name: "Number of Doses",
    });

    const stage = screen.getByRole("combobox", {
      name: "Stage",
    });

    const isMandatory = screen.getByRole("checkbox", {
      name: "Is mandatory",
    });

    const vaccineImageUploader: HTMLInputElement = screen.getByTestId(
      "vaccine-image-uploader"
    );

    userEvent.type(name, "Added Vaccine");
    userEvent.type(description, "This is a test vaccine");
    userEvent.type(numberOfDoses, "2");
    userEvent.selectOptions(stage, "Exploratory");
    userEvent.click(isMandatory);

    const fakeFile = new File(["(⌐□_□)"], "chucknorris.png", {
      type: "image/png",
      lastModified: Date.now(),
    });

    await act(async () => {
      await waitFor(() => {
        userEvent.upload(vaccineImageUploader, fakeFile);
      });
    });

    await waitFor(() => expect(vaccineImageUploader?.files?.length).toBe(1));

    await act(async () => {
      userEvent.click(screen.getByText("Add"));
    });

    await waitFor(() => expect(screen.getByText("Add")).not.toBeInTheDocument);

    expect(await screen.findByRole("grid")).toBeInTheDocument();

    const addedVaccineText = screen.getByText("Added Vaccine");

    expect(addedVaccineText).toBeInTheDocument();
  });

  it("Error validation on add Vaccine", async () => {
    renderWithProviders(<VaccineContent />);

    expect(await screen.findByRole("grid")).toBeInTheDocument();

    expect(
      await screen.findByRole("button", { name: "add-button" })
    ).toBeInTheDocument();

    userEvent.click(screen.getByRole("button", { name: "add-button" }));

    await act(async () => {
      userEvent.click(screen.getByText("Add"));
    });

    const nameFieldError = await screen.findByText("Name cannot be empty");
    expect(nameFieldError).toBeInTheDocument();

    const stageFiledError = await screen.findByText("Stage cannot be empty");
    expect(stageFiledError).toBeInTheDocument();

    const vaccineInputFieldError = await screen.findByText(
      "Please provide a valid vaccine image"
    );
    expect(vaccineInputFieldError).toBeInTheDocument();

    const descriptionFieldError = await screen.findByText(
      "Description cannot be empty"
    );
    expect(descriptionFieldError).toBeInTheDocument();
  });
});
