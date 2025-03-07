import { render, screen } from "@testing-library/react";
import AlbumSongTableItem from "./AlbumSongTableItem";
import Track from "../../../interfaces/Track";

describe("AlbumSongTableItem", () => {
  const mockTrack: Track = {
    id: "1",
    name: "Test Song",
    album: {
      id: "10",
      name: "Test Album",
      images: [{ url: "https://example.com/album.jpg" }],

      release_date: "2024",
    },
    duration_ms: 200000,
  };

  const mockTrackDuration = "3:20";

  test("renders track details correctly", () => {
    // Given
    const { name } = mockTrack;

    // When
    render(
      <table>
        <tbody>
          <AlbumSongTableItem
            track={mockTrack}
            index={0}
            trackDuration={mockTrackDuration}
          />
        </tbody>
      </table>
    );

    // Then
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText(name)).toBeInTheDocument();
    expect(screen.getByText(mockTrackDuration)).toBeInTheDocument();
  });

  test("renders table row with correct number of cells", () => {
    // Given
    const expectedCellCount = 3;

    // When
    render(
      <table>
        <tbody>
          <AlbumSongTableItem
            track={mockTrack}
            index={0}
            trackDuration={mockTrackDuration}
          />
        </tbody>
      </table>
    );

    // Then
    const tableRow = screen.getByRole("row");
    expect(tableRow.querySelectorAll("td")).toHaveLength(expectedCellCount);
  });
});
