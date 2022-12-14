import { rest } from "msw";
import { setupServer } from "msw/node";

import { act } from "react-dom/test-utils";

import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { MemoryRouter, Route, Routes } from "react-router-dom";

import { renderWithProviders } from "../test-utils";

import * as routes from "../../routes/routes";

import SignUpPage from "../../pages/SignUpPage";

const server = setupServer(
  rest.post(`${routes.SIGN_UP}`, (req, res, ctx) => {
    return res(
      ctx.json({
        user: {
          id: 1,
          name: "Admin",
          gender: "male",
          dateOfBirth: "1997/02/10",
          email: "admin@test.com",
          address: "USA",
        },
        message: "User created successfully",
      }),
      ctx.delay(50)
    );
  })
);

describe("SignUp Page", () => {
  beforeAll(() => {
    server.listen();
  });

  beforeEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  it("Redirects to login page when user signup is successful", async () => {
    renderWithProviders(
      <MemoryRouter initialEntries={[`${routes.SIGN_IN}`, `${routes.SIGN_UP}`]}>
        <Routes>
          <Route path={routes.SIGN_UP} element={<SignUpPage />} />
          <Route
            path={routes.SIGN_IN}
            element={
              <>
                <h1>Welcome to login page</h1>
              </>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    const email = screen.getByRole("textbox", { name: "Email" });
    const gender = screen.getByRole("radio", {
      name: "Male",
    });
    const address = screen.getByRole("textbox", { name: "Address" });
    const password = screen.getByLabelText("Password");
    const fullName = screen.getByRole("textbox", { name: "Full Name" });
    const dateOfBirth = screen.getByLabelText("Date Of Birth");
    const confirmPassword = screen.getByLabelText("Confirm Password");

    userEvent.click(gender);
    userEvent.type(address, "Admin");
    userEvent.type(fullName, "Admin");
    userEvent.type(password, "password");
    userEvent.type(email, "test@gmail.com");
    await userEvent.type(dateOfBirth, "1970-01-01");
    userEvent.type(confirmPassword, "password");

    await act(async () => {
      userEvent.click(
        screen.getByRole("button", {
          name: "Sign Up",
        })
      );
    });

    await screen.findByText(/Welcome to login page/i);

    expect(screen.getByText(/Welcome to login page/i)).toBeInTheDocument();
  });

  it("Displays validation errors when empty value was added", async () => {
    renderWithProviders(
      <MemoryRouter initialEntries={[`${routes.SIGN_IN}`, `${routes.SIGN_UP}`]}>
        <Routes>
          <Route path={routes.SIGN_UP} element={<SignUpPage />} />
          <Route
            path={routes.SIGN_IN}
            element={
              <>
                <h1>Welcome to login page</h1>
              </>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    const email = screen.getByLabelText("Email");
    const gender = screen.getByLabelText("Male");
    const address = screen.getByLabelText("Address");
    const password = screen.getByLabelText("Password");
    const fullName = screen.getByLabelText("Full Name");
    const dateOfBirth = screen.getByLabelText("Date Of Birth");
    const confirmPassword = screen.getByLabelText("Confirm Password");

    userEvent.click(gender);
    userEvent.type(address, " ");
    userEvent.type(fullName, " ");
    userEvent.type(password, " ");
    userEvent.type(email, " ");
    await userEvent.type(dateOfBirth, " ");
    userEvent.type(confirmPassword, " ");

    await act(async () => {
      userEvent.click(
        screen.getByRole("button", {
          name: "Sign Up",
        })
      );
    });

    expect(screen.getByText("Name cannot be empty")).toBeInTheDocument;
    expect(screen.getByText("Please provide a valid date")).toBeInTheDocument;
    expect(screen.getByText("Address cannot be empty")).toBeInTheDocument;
    expect(screen.getByText("Email cannot be empty")).toBeInTheDocument;
    expect(screen.getByText("Password cannot be empty")).toBeInTheDocument;
    expect(screen.getByText("Password does not match")).toBeInTheDocument;
  });

  it("Displays validation errors when invalid value was provided", async () => {
    renderWithProviders(
      <MemoryRouter initialEntries={[`${routes.SIGN_IN}`, `${routes.SIGN_UP}`]}>
        <Routes>
          <Route path={routes.SIGN_UP} element={<SignUpPage />} />
          <Route
            path={routes.SIGN_IN}
            element={
              <>
                <h1>Welcome to login page</h1>
              </>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    const email = screen.getByLabelText("Email");
    const gender = screen.getByLabelText("Male");
    const address = screen.getByLabelText("Address");
    const password = screen.getByLabelText("Password");
    const fullName = screen.getByLabelText("Full Name");
    const dateOfBirth = screen.getByLabelText("Date Of Birth");
    const confirmPassword = screen.getByLabelText("Confirm Password");

    userEvent.click(gender);
    userEvent.type(address, "Admin");
    userEvent.type(fullName, "Admin");
    userEvent.type(password, "password");
    userEvent.type(email, "test");
    await userEvent.type(dateOfBirth, new Date().toISOString());
    userEvent.type(confirmPassword, "password123");

    await act(async () => {
      userEvent.click(
        screen.getByRole("button", {
          name: "Sign Up",
        })
      );
    });

    expect(
      screen.getByText(
        `"Date of birth" age must be larger than or equal to 18 years old`
      )
    ).toBeInTheDocument;

    expect(screen.getByText(`Please provide a valid email`)).toBeInTheDocument;

    expect(screen.getByText(`Password does not match`)).toBeInTheDocument;
  });
});
