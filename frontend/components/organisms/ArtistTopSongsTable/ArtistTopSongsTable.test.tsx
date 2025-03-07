import { render, screen } from "@testing-library/react";
import ArtistTopSongsTable from "./ArtistTopSongsTable";
import Track from "../../../interfaces/Track";

describe("ArtistTopSongsTable", () => {
  const mockTracks: Track[] = [
    {
      id: "1",
      name: "Song 1",
      duration_ms: 180000,
      album: {
        name: "Album 1",
        id: "1",
        images: [{ url: "https://example.com/image.jpg" }],
        release_date: "2024",
      },
    },
    {
      id: "2",
      name: "Song 2",
      duration_ms: 200000,
      album: {
        name: "Album 2",
        id: "2",
        images: [{ url: "https://example.com/image2.jpg" }],
        release_date: "2024",
      },
    },
  ];
  const mockHeadings = ["#", "Album", "Song Name", "Duration"];

  test("renders table with songs correctly", () => {
    // Given
    const title = "Top Songs";
    const headings = mockHeadings;

    // When
    render(
      <ArtistTopSongsTable
        title={title}
        headings={headings}
        tracks={mockTracks}
      />
    );
    const tdElements = screen.getAllByRole("cell");

    // Then
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText("Top Songs")).toBeInTheDocument();
    expect(tdElements).toHaveLength(mockTracks.length * mockHeadings.length);
  });

  test("calculates and displays track duration correctly", () => {
    // Given
    const title = "Top Songs";
    const headings = mockHeadings;

    // When
    render(
      <ArtistTopSongsTable
        title={title}
        headings={headings}
        tracks={mockTracks}
      />
    );

    // Then
    expect(screen.getByText("3:00")).toBeInTheDocument();
    expect(screen.getByText("3:20")).toBeInTheDocument();
  });

  test("renders headings correctly", () => {
    // Given
    const title = "Top Songs";
    const headings = mockHeadings;

    // When
    render(
      <ArtistTopSongsTable
        title={title}
        headings={headings}
        tracks={mockTracks}
      />
    );

    // Then
    expect(screen.getByText("Song Name")).toBeInTheDocument();
    expect(screen.getByText("Duration")).toBeInTheDocument();
  });

  test("does not render any songs if tracks array is empty", () => {
    // Given
    const title = "Top Songs";
    const headings = mockHeadings;

    // When
    render(
      <ArtistTopSongsTable title={title} headings={headings} tracks={[]} />
    );

    // Then
    expect(screen.queryAllByTestId("song-item")).toHaveLength(0);
  });
});
