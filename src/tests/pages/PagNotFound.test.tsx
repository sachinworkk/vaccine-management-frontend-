import { MemoryRouter, Route, Routes } from "react-router-dom";

import { renderWithProviders } from "../test-utils";

import PageNotFound from "../../pages/PageNotFound";

import { screen } from "@testing-library/react";

describe("PageNotFound", () => {
  it("Page not found", async () => {
    renderWithProviders(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(`Page not found`)).toBeInTheDocument;
  });
});
