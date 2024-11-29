import { IoThumbsUpOutline } from "react-icons/io5";
import { FiRotateCw } from "react-icons/fi";

interface ImageCardProps {
  title: string;
  author: string;
  image: string;
  price: string;
  likes: number;
  liked: boolean;
  onLikeToggle: () => void;
}

const ImageCard: React.FC<ImageCardProps> = ({
  title,
  author,
  image,
  price,
  likes,
  liked,
  onLikeToggle,
}) => {
  return (
    <div className="relative border rounded-md shadow-lg overflow-hidden">
      <div className="absolute top-2 left-2 bg-opacity-70 text-black px-2 py-1 rounded-md text-sm font-medium flex">
        {price}
        <p className="text-[8px] ml-[2px] mt-[1.5px]">€</p>
      </div>

      {/* Images */}
      <img src={image} alt={title} className="w-full h-64 object-cover" />

      <div className="absolute top-2 right-2 flex flex-col items-center gap-1">
        {/* Like Button */}
        <button
          onClick={onLikeToggle}
          className={`w-10 h-10 flex items-center justify-center rounded-full ${
            liked ? "bg-green-500" : "bg-gray-300"
          }`}
        >
          <IoThumbsUpOutline style={{ transform: "scaleX(-1)" }} />
        </button>
        <span className="text-white text-md font-light">
          {likes.toString().padStart(3, "0")}
        </span>

        {/* Share Button */}
        <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white">
          <FiRotateCw className="w-5 h-5" style={{ transform: "scaleX(-1)" }} />
        </button>
        <span className="text-white text-md font-light">000</span>
      </div>

      {/* Detalles */}
      <div className="p-4 bg-white text-center">
        <h3 className="text-lg font-semibold text-black">{title}</h3>
        <div className="flex justify-center items-center gap-1 ">
          <p className="text-sm text-[#C2C2BC] font-medium">by</p>
          <p>{author}</p>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
