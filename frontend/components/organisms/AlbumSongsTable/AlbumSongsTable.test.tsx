import { render, screen } from "@testing-library/react";
import ArtistTopSongsTable from "./AlbumSongsTable";
import Track from "../../../interfaces/Track";

describe("ArtistTopSongsTable", () => {
  const mockTracks: Track[] = [
    {
      id: "1",
      name: "Test Song 1",
      album: {
        id: "1",
        name: "Test Album 1",
        images: [{ url: "https://example.com/album1.jpg" }],
        release_date: "2024",
      },
      duration_ms: 180000,
    },
    {
      id: "2",
      name: "Test Song 2",
      album: {
        id: "2",
        name: "Test Album 2",
        images: [{ url: "https://example.com/album2.jpg" }],
        release_date: "2024",
      },
      duration_ms: 220000,
    },
  ];

  const mockHeadings = ["#", "Album", "Song Name", "Duration"];

  test("renders table with correct headings", () => {
    // Given
    const { title, headings } = { title: "Top Songs", headings: mockHeadings };

    // When
    render(
      <ArtistTopSongsTable
        title={title}
        headings={headings}
        tracks={mockTracks}
      />
    );

    // Then
    expect(screen.getByText("Top Songs")).toBeInTheDocument();
    headings.forEach((heading) => {
      expect(screen.getByText(heading)).toBeInTheDocument();
    });
  });

  test("renders track details correctly", () => {
    // When
    render(
      <ArtistTopSongsTable
        title="Top Songs"
        headings={mockHeadings}
        tracks={mockTracks}
      />
    );

    // Then
    mockTracks.forEach((track, index) => {
      expect(screen.getByText(index + 1)).toBeInTheDocument();
      expect(screen.getByText(track.name)).toBeInTheDocument();
    });
    expect(screen.getByText("3:00")).toBeInTheDocument();
    expect(screen.getByText("3:40")).toBeInTheDocument();
  });

  test("renders correct number of table rows for tracks", () => {
    // Given
    const { tracks } = { tracks: mockTracks };

    // When
    render(
      <ArtistTopSongsTable
        title="Top Songs"
        headings={mockHeadings}
        tracks={tracks}
      />
    );

    const tableRows = screen.getAllByRole("row");
    expect(tableRows).toHaveLength(mockTracks.length + 1); // including heading
  });
});
