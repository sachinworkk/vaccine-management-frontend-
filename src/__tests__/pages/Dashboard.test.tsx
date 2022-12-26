import { MemoryRouter, Route, Routes } from "react-router-dom";

import { renderWithProviders } from "../../utils/test-utils";

import { screen } from "@testing-library/react";

import Dashboard from "../../pages/Dashboard";

describe("Dashboard", () => {
  it("Page not found", async () => {
    renderWithProviders(
      <MemoryRouter initialEntries={["/dashboard"]}>
        <Routes>
          <Route path="*" element={<Dashboard />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/Welcome to the Vaccine Management System/i))
      .toBeInTheDocument;
  });
});
