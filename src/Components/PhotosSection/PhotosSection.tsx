import PhotoCard from "../PhotoCard.tsx/PhotoCard";

const PhotosSection = () => {
    return (
        <section aria-label="Photo gallery" className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <h2 className="sr-only">Photo Gallery</h2>
            <PhotoCard />
        </section>
    );
};

export default PhotosSection;