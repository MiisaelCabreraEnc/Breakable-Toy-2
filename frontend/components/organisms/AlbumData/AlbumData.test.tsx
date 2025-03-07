import { render, screen } from "@testing-library/react";
import AlbumData from "./AlbumData";

describe("AlbumData", () => {
  const mockProps = {
    name: "Test Album",
    image: "https://example.com/album.jpg",
    artists: [
      {
        id: "1",
        name: "Artist 1",
        images: [{ url: "https://example.com/album.jpg" }],
        followers: "1",
        genres: ["pop", "rock"],
      },
      {
        id: "2",
        name: "Artist 2",
        images: [{ url: "https://example.com/album.jpg" }],
        followers: "2",
        genres: ["funk", "punk"],
      },
    ],
    release_date: "2023-03-06",
    total_tracks: 10,
    total_duration: "40:00",
  };

  test("renders album details correctly", () => {
    // Given
    const { name, image, artists, total_tracks, total_duration } = mockProps;

    // When
    render(<AlbumData {...mockProps} />);

    // Then
    expect(screen.getByText(name)).toBeInTheDocument();
    expect(screen.getByAltText("")).toHaveAttribute("src", image);
    artists.forEach((artist, index) => {
      expect(
        screen.getByText(artist.name + (index < artists.length - 1 ? "," : ""))
      ).toBeInTheDocument();
    });
    expect(screen.getByText("Year: 2023")).toBeInTheDocument();
    expect(
      screen.getByText(`Number of songs: ${total_tracks}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`Total duration: ${total_duration}`)
    ).toBeInTheDocument();
  });

  test("renders artist links with correct href", () => {
    // Given
    const { artists } = mockProps;

    // When
    render(<AlbumData {...mockProps} />);

    // Then
    artists.forEach((artist, index) => {
      const linkElement = screen.getByText(
        artist.name + (index < artists.length - 1 ? "," : "")
      );
      expect(linkElement).toHaveAttribute("href", `/me/artist/${artist.id}`);
    });
  });
});
