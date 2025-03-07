import { render, screen } from "@testing-library/react";
import HorizontalScroll from "./HorizontalScroll";

jest.mock("../../../components/molecules/MiniCard/MiniCard", () => ({
  __esModule: true,
  default: jest.fn(() => <div data-testid="mini-card" />),
}));

describe("HorizontalScroll", () => {
  const mockCards = [
    { id: "1", name: "Card 1", imageUrl: "https://example.com/image1.jpg" },
    { id: "2", name: "Card 2", imageUrl: "https://example.com/image2.jpg" },
  ];

  test("renders cards correctly", () => {
    render(<HorizontalScroll cards={mockCards} type="album" />);

    // Verificamos que las tarjetas se renderizan correctamente
    expect(screen.getAllByTestId("mini-card")).toHaveLength(mockCards.length);
  });

  test("renders MiniCard when type is track", () => {
    render(<HorizontalScroll cards={mockCards} type="track" />);

    // Verificamos que se renderiza MiniCard sin el Link
    const miniCards = screen.getAllByTestId("mini-card");
    expect(miniCards).toHaveLength(mockCards.length);

    // Verificamos que no hay ningún Link
    const links = screen.queryAllByRole("link");
    expect(links).toHaveLength(0);
  });

  test("renders Link when type is not track", () => {
    render(<HorizontalScroll cards={mockCards} type="album" />);

    // Verificamos que se renderiza un Link alrededor de cada MiniCard
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(mockCards.length);

    // Verificamos que los links tienen la URL esperada
    expect(links[0]).toHaveAttribute("href", "/me/album/1");
    expect(links[1]).toHaveAttribute("href", "/me/album/2");
  });

  test("does not render results until data is fetched", () => {
    fetchMock.mockResponseOnce(async () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(
            JSON.stringify({
              items: mockCards,
            })
          );
        }, 1000);
      });
    });

    render(<HorizontalScroll cards={[]} type="album" />);

    expect(screen.queryByTestId("horizontal-scroll")).not.toBeInTheDocument();
  });
});
