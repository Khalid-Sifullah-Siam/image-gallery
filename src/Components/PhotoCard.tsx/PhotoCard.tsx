import Image from "next/image";
import { FiBookmark } from "react-icons/fi";
import { ImageInfo } from "../../types/index.d";

const PhotoCard = ({ imageData }: { imageData: ImageInfo }) => {
  const { name, url, likes, shares } = imageData;

  return (
    <figure className="relative h-full w-full aspect-square group overflow-hidden rounded-xl">
      <Image
        alt={name}
        src={url}
        width={400}
        height={400}
        priority
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />

      <figcaption className="absolute bottom-0 w-full p-3 sm:p-4 text-white bg-slate-900/60 backdrop-blur-xs flex justify-between items-center gap-2 translate-y-full group-hover:translate-y-0 group-focus-within:translate-y-0 transition-transform duration-500 ease-in-out">
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-base sm:text-lg truncate">
            {name}
          </h3>
          <p className="text-xs sm:text-sm opacity-90 truncate">
            {likes} like | {shares} shares
          </p>
        </div>

        <button
          type="button"
          aria-label="Save photo"
          className="p-1.5 rounded-lg hover:bg-white/20 active:scale-95 transition-all shrink-0 cursor-pointer"
        >
          <FiBookmark size={22} aria-hidden="true" />
        </button>
      </figcaption>
    </figure>
  );
};

export default PhotoCard;
