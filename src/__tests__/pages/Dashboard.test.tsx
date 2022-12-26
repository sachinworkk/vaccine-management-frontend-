import { MemoryRouter, Route, Routes } from "react-router-dom";

import { renderWithProviders } from "../../utils/test-utils";

import { screen } from "@testing-library/react";

import Dashboard from "../../pages/Dashboard";

import * as routes from "../../routes/routes";

describe("Dashboard", () => {
  it("Page not found", async () => {
    renderWithProviders(
      <MemoryRouter initialEntries={[`${routes.DASHBOARD}`]}>
        <Routes>
          <Route path="*" element={<Dashboard />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/Welcome to the Vaccine Management System/i))
      .toBeInTheDocument;
  });
});
