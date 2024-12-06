import { Header, ImageCard, Loading } from "@/components";
import { useImageFetch } from "@/hooks";

export const HomePage = () => {
  const {
    filteredImages,
    isLoading,
    hasMore,
    toggleLike,
    setSearchQuery,
    page,
  } = useImageFetch();

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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-10">
          {filteredImages.map((image, index) => (
            <ImageCard
              key={`${image.id} - ${index}`}
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
      {filteredImages.length === 0 && !isLoading && (
        <p className="text-center text-xl mt-10">No images found.</p>
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
