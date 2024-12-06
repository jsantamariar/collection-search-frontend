import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/utils/constants";

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

export const useImageFetch = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [filteredImages, setFilteredImages] = useState<Image[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
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
      const { data } = await axios.get(BASE_URL, {
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
      await axios.post(`${BASE_URL}/${id}/likes`, {});
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
  return {
    images,
    filteredImages,
    searchQuery,
    isLoading,
    hasMore,
    toggleLike,
    setSearchQuery,
    page,
  };
};
