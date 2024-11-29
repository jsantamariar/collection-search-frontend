import { render, screen, act } from "@testing-library/react";
import axios from "axios";
import useImageFetch from "@/hooks/useImageFetch";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const TestComponent = () => {
  const {
    filteredImages,
    searchQuery,
    isLoading,
    hasMore,
    setSearchQuery,
    toggleLike,
  } = useImageFetch();

  return (
    <div>
      <input
        placeholder="Search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {isLoading && <p>Loading...</p>}
      <ul>
        {filteredImages.map((image) => (
          <li key={image.id}>
            <span>{image.title}</span>
            <button onClick={() => toggleLike(image.id)}>
              {image.liked ? "Unlike" : "Like"}
            </button>
          </li>
        ))}
      </ul>
      {!hasMore && <p>No more images</p>}
    </div>
  );
};

describe("useImageFetch hook", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("fetches and renders images", async () => {
    const mockImages = [
      {
        id: 1,
        title: "Image 1",
        author: "Author 1",
        likes_count: 10,
        liked: false,
        main_attachment: { big: "big1", small: "small1" },
      },
    ];

    mockedAxios.get.mockResolvedValueOnce({ data: mockImages });

    await act(async () => {
      render(<TestComponent />);
    });

    expect(mockedAxios.get).toHaveBeenCalledWith(expect.any(String), {
      params: { page: 1 },
    });
    expect(screen.getByText("Image 1")).toBeInTheDocument();
  });

  it("stops fetching when there are no more images", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: [] });

    await act(async () => {
      render(<TestComponent />);
    });

    expect(screen.getByText("No more images")).toBeInTheDocument();
  });
});
