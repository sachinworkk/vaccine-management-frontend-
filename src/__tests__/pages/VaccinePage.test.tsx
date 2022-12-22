import { rest } from "msw";
import { setupServer } from "msw/node";

import { act } from "react-dom/test-utils";

import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { renderWithProviders } from "../utils/test-utils";

import VaccinePage from "../../pages/VaccinPage";

import { MemoryRouter, Routes, Route } from "react-router-dom";

let vaccinesMockData = [
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
    vaccinesMockData = [
      ...vaccinesMockData,
      {
        id: 14,
        vaccineImageUrl:
          "https://res.cloudinary.com/dr8t3y3cp/image/upload/v1670903226/vaccine-management/vaccines/btsm2zdjsddhdpxir9vs.png",
        name: "Added Vaccine",
        stage: "Exploratory",
        description: "This is a test vaccine.",
        numberOfDoses: 2,
        isMandatory: true,
      },
    ];

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
  }),

  rest.put("/vaccine/1", (req, res, ctx) => {
    vaccinesMockData = vaccinesMockData.map((vaccine) =>
      vaccine.id === 1
        ? {
            id: 1,
            vaccineImageUrl:
              "https://res.cloudinary.com/dr8t3y3cp/image/upload/v1670903226/vaccine-management/vaccines/btsm2zdjsddhdpxir9vs.png",
            name: "Edited Vaccine",
            stage: "Exploratory",
            description: "This is a vaccine for COVID.",
            numberOfDoses: 4,
            isMandatory: true,
          }
        : { ...vaccine }
    );

    return res(
      ctx.json({
        vaccine: {
          id: 1,
          vaccineImageUrl:
            "https://res.cloudinary.com/dr8t3y3cp/image/upload/v1670903226/vaccine-management/vaccines/btsm2zdjsddhdpxir9vs.png",
          name: "Edited Vaccine",
          stage: "Exploratory",
          description: "This is a vaccine for COVID.",
          numberOfDoses: 4,
          isMandatory: true,
        },
        message: "Vaccine updated successfullyy",
      }),
      ctx.delay(150)
    );
  }),

  rest.delete("/vaccine/1", (req, res, ctx) => {
    vaccinesMockData = vaccinesMockData.filter((vaccine) => vaccine.id !== 1);

    return res(
      ctx.json({
        message: "Vaccine deleted successfully",
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

  it("Displays is loading when fetching vaccines", () => {
    renderWithProviders(
      <MemoryRouter initialEntries={["/vaccine"]}>
        <Routes>
          <Route path="/vaccine" element={<VaccinePage />} />
        </Routes>
      </MemoryRouter>
    );

    const text = screen.getByText("Loading...")?.innerHTML;

    expect(text).toBe("Loading...");
  });

  it("Displays vaccine list once vaccines are fetched", async () => {
    renderWithProviders(
      <MemoryRouter initialEntries={["/vaccine"]}>
        <Routes>
          <Route path="/vaccine" element={<VaccinePage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(await screen.findByRole("grid")).toBeInTheDocument();
  });

  it("Displays add vaccine image when vaccine list is empty", async () => {
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

    renderWithProviders(
      <MemoryRouter initialEntries={["/vaccine"]}>
        <Routes>
          <Route path="/vaccine" element={<VaccinePage />} />
        </Routes>
      </MemoryRouter>
    );

    const addVaccineImageElement = await screen.findByText("AddVaccine.svg");

    expect(addVaccineImageElement?.innerHTML).toBe("AddVaccine.svg");
  });

  it("Displays added vaccine in the list once user adds the vaccine", async () => {
    renderWithProviders(
      <MemoryRouter initialEntries={["/vaccine"]}>
        <Routes>
          <Route path="/vaccine" element={<VaccinePage />} />
        </Routes>
      </MemoryRouter>
    );

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

    const vaccineImageUploader: HTMLInputElement = screen.getByLabelText(
      "Upload Vaccine Image"
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
      userEvent.click(
        screen.getByRole("button", {
          name: "Add",
        })
      );
    });

    await waitFor(() => expect(screen.getByText("Add")).not.toBeInTheDocument);

    expect(await screen.findByRole("grid")).toBeInTheDocument();

    const addedVaccineText = screen.getByText("Added Vaccine");

    expect(addedVaccineText).toBeInTheDocument();
  });

  it("Displays edited vaccine in the list once user edits the existing vaccine", async () => {
    renderWithProviders(
      <MemoryRouter initialEntries={["/vaccine"]}>
        <Routes>
          <Route path="/vaccine" element={<VaccinePage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(await screen.findByRole("grid")).toBeInTheDocument();

    const button = screen.getAllByRole("button", { name: "edit" })[0];

    userEvent.click(button);

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

    const vaccineImageUploader: HTMLInputElement = screen.getByLabelText(
      "Upload Vaccine Image"
    );

    userEvent.type(name, "Edited Vaccine");
    userEvent.type(description, "This is a vaccine for COVID.");
    userEvent.type(numberOfDoses, "4");
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
      userEvent.click(
        screen.getByRole("button", {
          name: "Edit",
        })
      );
    });

    await waitFor(() => expect(screen.getByText("Edit")).not.toBeInTheDocument);

    expect(await screen.findByRole("grid")).toBeInTheDocument();

    const editedVaccineText = screen.getByText("Edited Vaccine");

    expect(editedVaccineText).toBeInTheDocument();
  });

  it("Displays error validations while adding vaccine with empty value", async () => {
    renderWithProviders(
      <MemoryRouter initialEntries={["/vaccine"]}>
        <Routes>
          <Route path="/vaccine" element={<VaccinePage />} />
        </Routes>
      </MemoryRouter>
    );

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

  it("Displays error validations while adding vaccine with invalid value", async () => {
    renderWithProviders(
      <MemoryRouter initialEntries={["/vaccine"]}>
        <Routes>
          <Route path="/vaccine" element={<VaccinePage />} />
        </Routes>
      </MemoryRouter>
    );

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

    const vaccineImageUploader: HTMLInputElement = screen.getByLabelText(
      "Upload Vaccine Image"
    );

    userEvent.type(name, "Sachin       ");
    userEvent.type(description, "         ");
    userEvent.type(numberOfDoses, "2147483649");
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
      userEvent.click(
        screen.getByRole("button", {
          name: "Add",
        })
      );
    });

    await waitFor(() => expect(screen.getByText("Add")).not.toBeInTheDocument);

    const maximumNumberOfDosesError = await screen.findByText(
      "Number of doses cannot be more than 2147483647"
    );
    expect(maximumNumberOfDosesError).toBeInTheDocument();

    const descriptionFieldError = await screen.findByText(
      "Description cannot be empty"
    );
    expect(descriptionFieldError).toBeInTheDocument();
  });

  it("Displays all the vaccines in the list except the deleted vaccine when user deletes vaccine", async () => {
    renderWithProviders(
      <MemoryRouter initialEntries={["/vaccine"]}>
        <Routes>
          <Route path="/vaccine" element={<VaccinePage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(await screen.findByRole("grid")).toBeInTheDocument();

    const button = screen.getAllByRole("button", { name: "delete" })[0];

    userEvent.click(button);

    await waitFor(() =>
      userEvent.click(
        screen.getByRole("button", {
          name: "Delete",
        })
      )
    );

    expect(await screen.findByRole("grid")).toBeInTheDocument();

    expect(screen.queryByText("Edited Vaccine")).not.toBeInTheDocument();
  });
});
