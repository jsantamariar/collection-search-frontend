interface ImageCardProps {
  title: string;
  author: string;
  image: string;
  price: string;
  likes: number;
  liked: boolean;
  onLikeToggle: () => void;
}

export const ImageCard = ({
  title,
  author,
  image,
  price,
  likes,
  liked,
  onLikeToggle,
}: ImageCardProps) => {
  return (
    <div className="relative border rounded-md shadow-lg overflow-hidden">
      <div className="absolute top-2 left-2 bg-opacity-70 text-black px-2 py-1 rounded-md text-sm font-normal flex">
        {price}.00
        <p className="text-[8px] ml-[2px] mt-[1.5px]">€</p>
      </div>

      {/* Images */}
      <img src={image} alt={title} className="w-full h-64 object-cover" />

      <div className="absolute top-2 right-2 flex flex-col items-center gap-0">
        {/* Like Button */}
        <button
          onClick={onLikeToggle}
          className={"w-10 h-10 flex items-center justify-center rounded-full"}
        >
          {liked ? (
            <img
              src="/icons/thumb-up-liked.svg"
              alt="thumb-up-fill"
              className="w-8 h-8"
            />
          ) : (
            <img
              src="/icons/thumb-up-disliked.svg"
              alt="thumb-up"
              className="w-8 h-8"
            />
          )}
        </button>
        <span className="text-white text-lg font-light">
          {likes.toString().padStart(3, "0")}
        </span>

        {/* Share Button */}
        <button className="w-10 h-10 flex items-center justify-center rounded-ful">
          <img src="/icons/restart.svg" alt="restart" className="w-8 h-8" />
        </button>
        <span className="text-white text-lg font-light">000</span>
      </div>

      {/* Details */}
      <div className="p-4 bg-white text-center">
        <h3 className="text-xl font-light text-black tracking-normal font-sans">
          {title.toUpperCase()}
        </h3>
        <div className="flex justify-center items-center gap-1">
          <p className="text-sm text-[#C2C2BC] font-medium font-serif">by</p>
          <p className="font-serif text-sm">{author}</p>
        </div>
      </div>
    </div>
  );
};
