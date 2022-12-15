import { screen } from "@testing-library/react";

import VaccineContent from "../../components/vaccine/VaccineContent";

import { rest } from "msw";

import { setupServer } from "msw/node";
import { renderWithProviders } from "../utils/test-utils";

const server = setupServer(
  rest.get("/vaccine", (req, res, ctx) => {
    return res(
      ctx.json({
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
    renderWithProviders(<VaccineContent />);

    expect(await screen.findByTestId("vaccine-image")).toBeInTheDocument();
  });
});
