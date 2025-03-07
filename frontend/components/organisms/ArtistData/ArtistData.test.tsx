import { render, screen } from "@testing-library/react";
import ArtistData from "./ArtistData";

describe("ArtistData", () => {
  const mockProps = {
    name: "Test Artist",
    image: "https://example.com/artist.jpg",
    followers: "10000",
    genres: ["pop", "rock"],
  };

  test("renders artist data correctly", () => {
    // Given
    const { name, image, followers, genres } = mockProps;

    // When
    render(<ArtistData {...mockProps} />);

    // Then
    expect(screen.getByText(name)).toBeInTheDocument();
    expect(screen.getByText(followers + " Followers")).toBeInTheDocument();
    expect(screen.getByText("pop,")).toBeInTheDocument();
    expect(screen.getByText("rock")).toBeInTheDocument();
    expect(screen.getByAltText("")).toHaveAttribute("src", image);
  });
});
