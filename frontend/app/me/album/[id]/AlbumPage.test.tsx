import { act, render, screen, waitFor } from "@testing-library/react";
import AlbumPage from "./page";
import { useParams } from "next/navigation";
import Cookies from "js-cookie";
import Artist from "../../../../interfaces/Artist";
import Track from "../../../../interfaces/Track";

interface AlbumData {
  id: string;
  image: string;
  release_date: string;
  name: string;
  artists: Artist[];
  album_type: string;
  copyrights: { text: string }[];
  total_tracks: number;
  tracks: { items: Track[] };
  total_duration: string;
}

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
  "../../../../components/organisms/AlbumData/AlbumData",
  () =>
    ({
      name,
      release_date,
      artists,
      total_tracks,
      total_duration,
      image,
    }: AlbumData) =>
      (
        <div data-testid="album-data">
          <img src={image} alt={name} />
          <p>{name}</p>
          <p>{release_date}</p>
          <p>{total_tracks}</p>
          <p>{total_duration}</p>
          <p>{artists[0]?.name}</p>
        </div>
      )
);

jest.mock(
  "../../../../components/organisms/AlbumSongsTable/AlbumSongsTable",
  () =>
    ({ tracks }: { tracks: Track[] }) =>
      (
        <table data-testid="album-songs-table">
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

describe("AlbumPage", () => {
  const mockAlbum = {
    id: "1",
    images: [{ url: "https://example.com/image.jpg" }],
    release_date: "2023-03-06",
    name: "Test Album",
    artists: [{ name: "Test Artist" }],
    album_type: "album",
    copyrights: [{ text: "All rights reserved" }],
    total_tracks: 10,
    tracks: {
      items: [
        { name: "Song 1", duration_ms: 180000 },
        { name: "Song 2", duration_ms: 200000 },
      ],
    },
    total_duration: "6:20",
  };

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
    render(<AlbumPage />);
    expect(screen.getByTestId("go-back")).toBeInTheDocument();
  });

  test("fetches album data and renders it", async () => {
    // Given
    fetchMock.mockResponseOnce(
      JSON.stringify({
        ...mockAlbum,
        total_duration: "6:20",
      })
    );

    // When
    render(<AlbumPage />);

    // Then
    await waitFor(() => {
      expect(screen.getByTestId("album-data")).toBeInTheDocument();
      expect(screen.getByText("Test Album")).toBeInTheDocument();
      expect(screen.getByText("2023-03-06")).toBeInTheDocument();
      expect(screen.getByText("Test Artist")).toBeInTheDocument();
      expect(screen.getByText("10")).toBeInTheDocument();
      expect(screen.getByText("6:20")).toBeInTheDocument();
    });
  });

  test("displays album songs table with the correct number of songs", async () => {
    // Given
    fetchMock.mockResponseOnce(
      JSON.stringify({
        ...mockAlbum,
        total_duration: "6:20",
      })
    );

    // When
    render(<AlbumPage />);

    // Then
    await waitFor(() => {
      const table = screen.getByTestId("album-songs-table");
      expect(table).toBeInTheDocument();
      expect(table.querySelectorAll("tbody tr").length).toBe(2); // 2 songs
    });
  });

  test("handles loading state correctly", async () => {
    //Given
    fetchMock.mockResponseOnce(
      JSON.stringify({
        id: "1",
        images: [{ url: "https://example.com/image.jpg" }],
        release_date: "2023-03-06",
        name: "Test Album",
        artists: [{ name: "Test Artist" }],
        album_type: "album",
        copyrights: [{ text: "All rights reserved" }],
        total_tracks: 10,
        tracks: {
          items: [
            { name: "Song 1", duration_ms: 180000 },
            { name: "Song 2", duration_ms: 200000 },
          ],
        },
        total_duration: "6:20",
      })
    );
    //When
    await act(async () => {
      render(<AlbumPage />);
    });

    //Then
    await waitFor(() => {
      expect(screen.getByTestId("album-data")).toBeInTheDocument();
      expect(screen.getByText("Test Album")).toBeInTheDocument();
    });
  });

  test("handles errors during API call", async () => {
    // Given
    Object.defineProperty(window, "location", {
      value: { search: "?code=test_code" },
      writable: true,
    });

    fetchMock.mockRejectOnce(new Error("API error"));

    // When
    render(<AlbumPage />);

    // Then
    await waitFor(() => {
      expect(screen.queryByTestId("album-data")).not.toBeInTheDocument();
    });
  });
});
