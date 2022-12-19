import { rest } from "msw";
import { setupServer } from "msw/node";

import { act } from "react-dom/test-utils";

import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { MemoryRouter, Route, Routes } from "react-router-dom";

import { renderWithProviders } from "../utils/test-utils";

import LoginPage from "../../pages/LoginPage";

const server = setupServer(
  rest.post("/signin", (req, res, ctx) => {
    return res(
      ctx.json({
        user: {
          id: 0,
          name: "Admin",
          gender: "male",
          dateOfBirth: "1997/02/10",
          email: "admin@test.com",
          address: "USA",
        },
        accessToken: "zxcxcadESDFXCVXCVZzxczxcszxcsxzx",
        refreshToken: "axzcsadwsdfSDFSCVxcvxcvxcvesdfes",
        message: "User logged in successfully",
      }),
      ctx.delay(150)
    );
  })
);

describe("LoginForm", () => {
  beforeAll(() => {
    server.listen();
  });

  beforeEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  it("Redirects to dashboard page when user login is successfully", async () => {
    renderWithProviders(
      <MemoryRouter initialEntries={["/dashboard", "/"]}>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <>
                <h1>Welcome to dashboard page</h1>
              </>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    const email = screen.getByLabelText("Email");
    const password = screen.getByLabelText("Password");

    userEvent.type(email, "test@gmail.com");
    userEvent.type(password, "password");

    await act(async () => {
      userEvent.click(screen.getByText("Sign In"));
    });

    await screen.findByText(/Welcome to dashboard page/i);

    expect(screen.getByText(/Welcome to dashboard page/i)).toBeInTheDocument();
  });
});
