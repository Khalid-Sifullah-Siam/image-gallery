import { imagesData } from "@/lib/db";
import PhotoCard from "../PhotoCard.tsx/PhotoCard";

const PhotosSection = () => {
    return (
        <section aria-label="Photo gallery" className="w-full flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Photo Gallery</h2>
            <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {
                    imagesData.map(imageData => <PhotoCard key={imageData.id} imageData={imageData} /> )
                }
            </div>
        </section>
    );
};

export default PhotosSection;