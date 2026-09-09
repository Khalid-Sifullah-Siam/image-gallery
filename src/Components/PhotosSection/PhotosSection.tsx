import PhotoCard from "../PhotoCard.tsx/PhotoCard";

const PhotosSection = () => {
    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <PhotoCard />
        </div>
    );
};

export default PhotosSection;