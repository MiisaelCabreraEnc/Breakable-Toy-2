import { render, screen } from "@testing-library/react";
import TableHeadings from "./TableHeadings";

describe("TableHeadings", () => {
  const mockHeadings = ["#", "Album", "Song Name", "Duration"];

  test("renders table headings correctly", () => {
    // Given
    const headings = mockHeadings;

    // When
    render(
      <table>
        <TableHeadings headings={headings} />
      </table>
    );

    // Then
    headings.forEach((heading) => {
      expect(screen.getByText(heading)).toBeInTheDocument();
    });
  });

  test("renders the correct number of headings", () => {
    // Given
    const headings = mockHeadings;

    // When
    render(
      <table>
        <TableHeadings headings={headings} />
      </table>
    );

    // Then
    expect(screen.getAllByRole("columnheader")).toHaveLength(headings.length);
  });
});
