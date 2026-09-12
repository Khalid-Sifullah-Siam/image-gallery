import Image from "next/image";
import { BiSave } from "react-icons/bi";


const PhotoCard = () => {
    interface ImageInfo {
        id: number
        name: string
        url: string
        category: string
        likes: number
        shares: number
    }

    const image: ImageInfo = {
        id: 1,
        name: "Image 1",
        url: "https://i.ibb.co.com/Cs5v91Jy/1-jpg.avif",
        category: "Category 1",
        likes: 102,
        shares: 50
    }
    return (
        <figure className="relative h-full w-full aspect-square group overflow-hidden rounded-xl">
            <Image alt={image.name} src={image.url} width={400} height={400} priority className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />

            <figcaption className="absolute bottom-0 w-full p-3 sm:p-4 text-white bg-slate-900/60 backdrop-blur-xs flex justify-between items-center gap-2 translate-y-full group-hover:translate-y-0 group-focus-within:translate-y-0 transition-transform duration-500 ease-in-out">
                <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-base sm:text-lg truncate">{image.name}</h3>
                    <p className="text-xs sm:text-sm opacity-90 truncate">{image.likes} like | {image.shares} shares</p>
                </div>

                <button type="button" aria-label="Save photo" className="p-1.5 rounded-lg hover:bg-white/20 active:scale-95 transition-all shrink-0 cursor-pointer">
                    <BiSave size={24} aria-hidden="true" />
                </button>
            </figcaption>
        </figure>
    );
};

export default PhotoCard;