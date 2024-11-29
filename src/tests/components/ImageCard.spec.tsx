import { render, screen, fireEvent } from "@testing-library/react";
import ImageCard from "@/components/ImageCard";

describe("ImageCard Component", () => {
  const mockProps = {
    title: "Beautiful Artwork",
    author: "John Doe",
    image: "/images/artwork.jpg",
    price: "150",
    likes: 45,
    liked: false,
    onLikeToggle: jest.fn(),
  };

  it("renders the title in uppercase", () => {
    render(<ImageCard {...mockProps} />);
    const titleElement = screen.getByText("BEAUTIFUL ARTWORK");
    expect(titleElement).toBeInTheDocument();
  });

  it("renders the author", () => {
    render(<ImageCard {...mockProps} />);
    const authorElement = screen.getByText("John Doe");
    expect(authorElement).toBeInTheDocument();
  });

  it("renders the image with correct src and alt attributes", () => {
    render(<ImageCard {...mockProps} />);
    const imageElement = screen.getByAltText("Beautiful Artwork");
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute("src", "/images/artwork.jpg");
  });

  it("renders the price with currency", () => {
    render(<ImageCard {...mockProps} />);
    const priceElement = screen.getByText("150.00");
    expect(priceElement).toBeInTheDocument();
    const currencyElement = screen.getByText("€");
    expect(currencyElement).toBeInTheDocument();
  });

  it("renders the like button with the correct state", () => {
    render(<ImageCard {...mockProps} />);
    const likeButton = screen.getByRole("button", { name: "thumb-up" });
    expect(likeButton).toBeInTheDocument();
  });

  it("toggles the like button when clicked", () => {
    render(<ImageCard {...mockProps} />);
    const likeButton = screen.getByRole("button", { name: "thumb-up" });
    fireEvent.click(likeButton);
    expect(mockProps.onLikeToggle).toHaveBeenCalledTimes(1);
  });

  it("renders the correct number of likes with leading zeros", () => {
    render(<ImageCard {...mockProps} />);
    const likesElement = screen.getByText("045");
    expect(likesElement).toBeInTheDocument();
  });
});
