import { useState, useEffect } from "react";
import axios from "axios";
import Header from "@/components/Header";
import ImageCard from "@/components/ImageCard";
import Loading from "@/components/Loading";

interface Image {
  id: number;
  title: string;
  author: string;
  price?: string;
  main_attachment: {
    big: string;
    small: string;
  };
  likes_count: number;
  liked: boolean;
}

const HomePage: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [filteredImages, setFilteredImages] = useState<Image[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1); // Página actual
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  useEffect(() => {
    fetchImages();
  }, [page]);

  useEffect(() => {
    const filtered = images.filter((image) =>
      image.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredImages(filtered);
  }, [searchQuery, images]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
          document.documentElement.scrollHeight &&
        !isLoading &&
        hasMore
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading, hasMore]);

  const fetchImages = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get("http://localhost:3100/images", {
        params: { page },
      });

      if (data.length === 0) {
        setHasMore(false);
      } else {
        setImages((prev) => (page === 1 ? data : [...prev, ...data]));
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleLike = async (id: number) => {
    try {
      await axios.post(`http://localhost:3100/images/${id}/likes`, {}); // Body vacío
      setImages((prev) =>
        prev.map((image) =>
          image.id === id
            ? {
                ...image,
                liked: !image.liked,
                likes_count: image.liked
                  ? image.likes_count - 1
                  : image.likes_count + 1,
              }
            : image
        )
      );
    } catch (error) {
      console.error(`Error toggling like for image ${id}:`, error);
    }
  };

  return (
    <div>
      <Header
        onSearch={(query) => {
          setSearchQuery(query);
        }}
      />
      {isLoading && page === 1 ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
          {filteredImages.map((image) => (
            <ImageCard
              key={image.id}
              title={image.title}
              author={image.author}
              image={image.main_attachment.big}
              price={`${image.price ?? "0.00"}`}
              likes={image.likes_count}
              liked={image.liked}
              onLikeToggle={() => toggleLike(image.id)}
            />
          ))}
        </div>
      )}
      {isLoading && page > 1 && (
        <p className="text-center">Loading more images...</p>
      )}
      {!hasMore && !isLoading && (
        <p className="text-center">No more images to load.</p>
      )}
    </div>
  );
};

export default HomePage;
