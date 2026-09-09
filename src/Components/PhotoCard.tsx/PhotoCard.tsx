import Image from "next/image";
import { BiSave } from "react-icons/bi";


const PhotoCard = () => {
    interface ImageInfo {
        id: number
        name: string
        url: string
        category: string
        title: string
        likes: number
        shares: number
    }

    const image: ImageInfo = {
        id: 1,
        name: "Image 1",
        url: "https://i.ibb.co.com/Cs5v91Jy/1-jpg.avif",
        category: "Category 1",
        title: "Title 1",
        likes: 102,
        shares: 50
    }
    return (
        <figure className="relative h-full group overflow-hidden">
            <Image alt={image.title} src={image.url} width={400} height={400} className="w-full h-full object-cover hover:scale-105 transition-all duration-500" />

            <figcaption className="absolute bottom-0 w-full p-2 text-white bg-slate-900/30 flex justify-between items-center gap-1.5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out">
                <div>
                    <p className="font-semibold text-sm">{image.title}</p>
                    <p className="text-xs opacity-90">{image.likes} like | {image.shares} shares</p>
                </div>

                <button>
                    <BiSave size={25} />
                </button>
            </figcaption>
        </figure>
    );
};

export default PhotoCard;