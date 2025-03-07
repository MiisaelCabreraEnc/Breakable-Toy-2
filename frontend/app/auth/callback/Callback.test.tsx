import { render, screen, waitFor } from "@testing-library/react";
import Callback from "./page";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

// Mockeamos `useRouter` correctamente
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

jest.mock("js-cookie", () => ({
  set: jest.fn(),
}));

jest.mock(
  "../../../components/atoms/CiruclarProgress/CircularProgress",
  () => () => <div data-testid="circular-progress" />
);

describe("Callback Component", () => {
  let pushMock: jest.Mock;

  beforeEach(() => {
    pushMock = jest.fn();

    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
    jest.clearAllMocks();
    fetchMock.mockClear();
  });

  test("Shows spinner when loading", () => {
    //When
    render(<Callback />);

    //Then
    expect(screen.getByTestId("circular-progress")).toBeInTheDocument();
  });

  test("Makes a call to the API with the auth code and saves the access token", async () => {
    //Given
    const mockToken = "mock_access_token";

    Object.defineProperty(window, "location", {
      value: { search: "?code=test_code" },
      writable: true,
    });

    fetchMock.mockResponseOnce(JSON.stringify({ access_token: mockToken }));

    //When
    render(<Callback />);

    //Then
    await waitFor(() =>
      expect(Cookies.set).toHaveBeenCalledWith("token", mockToken, {
        expires: 1 / 24,
      })
    );

    await waitFor(() => expect(pushMock).toHaveBeenCalledWith("/me/dashboard"));
  });

  test("redirects to / if an error ocurres during authentication", async () => {
    //When
    Object.defineProperty(window, "location", {
      value: { search: "?code=test_code" },
      writable: true,
    });

    const originalConsoleError = console.error;
    console.error = jest.fn();

    fetchMock.mockReject(new Error("API error"));

    //When
    render(<Callback />);

    //Then
    await waitFor(() => expect(pushMock).toHaveBeenCalledWith("/"));

    console.error = originalConsoleError;
  });
});
