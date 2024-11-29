import { render, screen, fireEvent } from "@testing-library/react";
import Header from "@/components/Header";

describe("Header Component", () => {
  it("renders the logo with the correct alt text", () => {
    render(<Header onSearch={jest.fn()} />);
    const logo = screen.getByAltText("Logo");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("src", "/icons/collection-search-logo.svg");
  });

  it("renders the input with the correct placeholder", () => {
    render(<Header onSearch={jest.fn()} />);
    const input = screen.getByPlaceholderText("You're looking for something?");
    expect(input).toBeInTheDocument();
  });

  it("calls onSearch when typing in the input", () => {
    const mockOnSearch = jest.fn();
    render(<Header onSearch={mockOnSearch} />);
    const input = screen.getByPlaceholderText("You're looking for something?");

    fireEvent.change(input, { target: { value: "test query" } });

    expect(mockOnSearch).toHaveBeenCalledTimes(1);
    expect(mockOnSearch).toHaveBeenCalledWith("test query");
  });
});
