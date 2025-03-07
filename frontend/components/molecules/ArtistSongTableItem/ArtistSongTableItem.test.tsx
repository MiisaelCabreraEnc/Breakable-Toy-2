import { render, screen } from "@testing-library/react";
import ArtistSongTableItem from "./ArtistSongTableItem";
import Track from "../../../interfaces/Track";

describe("ArtistSongTableItem", () => {
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
    const { name, album } = mockTrack;

    // When
    render(
      <table>
        <tbody>
          <ArtistSongTableItem
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
    expect(screen.getByAltText("")).toHaveAttribute("src", album.images[0].url);
  });

  test("renders the correct album link", () => {
    // Given
    const { id } = mockTrack.album;

    // When
    render(
      <table>
        <tbody>
          <ArtistSongTableItem
            track={mockTrack}
            index={0}
            trackDuration={mockTrackDuration}
          />
        </tbody>
      </table>
    );

    // Then
    const linkElement = screen.getByRole("link");
    expect(linkElement).toHaveAttribute("href", `/me/album/${id}`);
  });
});
