import { render, screen, waitFor } from "@testing-library/react";
import ArtistPage from "./page";
import { useParams } from "next/navigation";
import Cookies from "js-cookie";
import Artist from "../../../../interfaces/Artist";
import Track from "../../../../interfaces/Track";
import Album from "../../../../interfaces/Album";

jest.mock("next/navigation", () => ({
  useParams: jest.fn(),
}));

jest.mock("js-cookie", () => ({
  get: jest.fn(),
}));

jest.mock("../../../../components/molecules/GoBack/GoBack", () => () => (
  <div data-testid="go-back" />
));

jest.mock(
  "../../../../components/organisms/ArtistData/ArtistData",
  () =>
    ({ name, followers, genres, images }: Artist) =>
      (
        <div data-testid="artist-data">
          <img src={images[0].url} alt={name} />
          <p>{name}</p>
          <p>{followers}</p>
          <p>{genres.join(", ")}</p>
        </div>
      )
);

jest.mock(
  "../../../../components/organisms/ArtistTopSongsTable/ArtistTopSongsTable",
  () =>
    ({ title, tracks }: { title: string; tracks: Track[] }) =>
      (
        <table data-testid="artist-top-songs-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Song Name</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            {tracks.map((track, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{track.name}</td>
                <td>{track.duration_ms}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )
);

jest.mock(
  "../../../../components/organisms/HorizontalScroll/HorizontalScroll",
  () =>
    ({ cards }: { cards: Album[] }) =>
      (
        <div data-testid="album-horizontal-scroll">
          {cards.map((card, index) => (
            <div key={index}>{card.name}</div>
          ))}
        </div>
      )
);

describe("ArtistPage", () => {
  const mockArtistData = {
    id: "1",
    name: "Test Artist",
    followers: { total: 1500000 },
    genres: ["pop", "rock"],
    images: [{ url: "https://example.com/artist.jpg" }],
  };

  const mockTracks = [
    { name: "Song 1", duration_ms: 180000 },
    { name: "Song 2", duration_ms: 200000 },
  ];

  const mockAlbums = [
    { name: "Album 1", release_date: "2023-01-01" },
    { name: "Album 2", release_date: "2023-02-01" },
  ];

  const originalConsoleError = console.error;

  beforeEach(() => {
    (useParams as jest.Mock).mockReturnValue({ id: "1" });
    (Cookies.get as jest.Mock).mockReturnValue("mock_token");
    fetchMock.resetMocks();
    console.error = jest.fn();
  });

  afterEach(() => {
    console.error = originalConsoleError;
  });

  test("displays the GoBack component", () => {
    render(<ArtistPage />);
    expect(screen.getByTestId("go-back")).toBeInTheDocument();
  });

  test("fetches artist data and renders it", async () => {
    // Given
    fetchMock.mockResponseOnce(JSON.stringify(mockArtistData));
    fetchMock.mockResponseOnce(JSON.stringify({ tracks: mockTracks }));
    fetchMock.mockResponseOnce(JSON.stringify({ items: mockAlbums }));

    // When
    render(<ArtistPage />);

    // Then
    await waitFor(() => {
      expect(screen.getByTestId("artist-data")).toBeInTheDocument();
      expect(screen.getByText("Test Artist")).toBeInTheDocument();
      expect(screen.getByText("1.5 M")).toBeInTheDocument();
      expect(screen.getByText("pop, rock")).toBeInTheDocument();
    });
  });

  test("displays artist top songs table", async () => {
    // Given
    fetchMock.mockResponseOnce(JSON.stringify(mockArtistData));
    fetchMock.mockResponseOnce(JSON.stringify({ tracks: mockTracks }));

    // When
    render(<ArtistPage />);

    // Then
    await waitFor(() => {
      const table = screen.getByTestId("artist-top-songs-table");
      expect(table).toBeInTheDocument();
      expect(table.querySelectorAll("tbody tr").length).toBe(2); // 2 songs
    });
  });

  test("displays artist albums", async () => {
    // Given
    fetchMock.mockResponseOnce(JSON.stringify(mockArtistData));
    fetchMock.mockResponseOnce(JSON.stringify({ tracks: mockTracks }));
    fetchMock.mockResponseOnce(JSON.stringify({ items: mockAlbums }));

    // When
    render(<ArtistPage />);

    // Then
    await waitFor(() => {
      const scroll = screen.getByTestId("album-horizontal-scroll");
      expect(scroll).toBeInTheDocument();
      expect(scroll.querySelectorAll("div").length).toBe(2); // 2 albums
    });
  });

  test("handles loading state correctly", async () => {
    // Given
    fetchMock.mockResponseOnce(JSON.stringify(mockArtistData));

    // When
    render(<ArtistPage />);

    // Then
    expect(screen.queryByTestId("artist-data")).not.toBeInTheDocument(); // Should not render until data is fetched
  });

  test("handles errors during API call", async () => {
    // Given

    fetchMock.mockRejectOnce(new Error("API error"));

    // When
    render(<ArtistPage />);

    // Then
    await waitFor(() => {
      expect(screen.queryByTestId("artist-data")).not.toBeInTheDocument();
    });
  });
});
