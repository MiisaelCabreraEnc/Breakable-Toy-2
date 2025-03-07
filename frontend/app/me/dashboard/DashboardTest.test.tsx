import { render, screen, waitFor } from "@testing-library/react";
import Dashboard from "./page";
import Cookies from "js-cookie";

jest.mock("js-cookie", () => ({
  get: jest.fn(),
}));

jest.mock("../../../components/molecules/DashboardCard/DashboardCard", () => ({
  __esModule: true,
  default: jest.fn(() => <div data-testid="dashboard-card" />),
}));

describe("Dashboard", () => {
  const mockArtists = [
    {
      id: "1",
      name: "Artist 1",
      images: [{ url: "https://example.com/artist1.jpg" }],
      genres: ["pop"],
    },
    {
      id: "2",
      name: "Artist 2",
      images: [{ url: "https://example.com/artist2.jpg" }],
      genres: ["rock"],
    },
    {
      id: "3",
      name: "Artist 3",
      images: [{ url: "https://example.com/artist3.jpg" }],
      genres: ["jazz"],
    },
  ];

  beforeEach(() => {
    (Cookies.get as jest.Mock).mockReturnValue("mock_token");
    fetchMock.resetMocks();
  });

  test("fetches artist data and renders DashboardCard components", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ items: mockArtists }));

    render(<Dashboard />);

    await waitFor(() => {
      const cards = screen.getAllByTestId("dashboard-card");
      expect(cards.length).toBe(mockArtists.length);
    });
  });

  test("handles loading state correctly", async () => {
    fetchMock.mockResponseOnce(async () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(
            JSON.stringify({
              items: mockArtists,
            })
          );
        }, 500);
      });
    });

    render(<Dashboard />);

    expect(screen.queryByTestId("dashboard-card")).not.toBeInTheDocument();

    await waitFor(() => {
      const cards = screen.getAllByTestId("dashboard-card");
      expect(cards.length).toBe(mockArtists.length);
    });
  });

  test("handles API errors correctly", async () => {
    fetchMock.mockRejectOnce(new Error("API error"));

    const originalConsoleError = console.error;
    console.error = jest.fn();

    render(<Dashboard />);

    await waitFor(() => {
      expect(screen.queryByTestId("dashboard-card")).not.toBeInTheDocument();
    });

    console.error = originalConsoleError;
  });

  test("does not render artists until data is fetched", () => {
    fetchMock.mockResponseOnce(async () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(
            JSON.stringify({
              items: mockArtists,
            })
          );
        }, 1000);
      });
    });

    render(<Dashboard />);

    expect(screen.queryByTestId("dashboard-card")).not.toBeInTheDocument();
  });
});
