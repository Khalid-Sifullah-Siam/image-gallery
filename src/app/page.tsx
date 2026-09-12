import HeroSection from "@/Components/HeroSection/HeroSection";
import Navbar from "@/Components/Navbar/Navbar";
import PhotosSection from "@/Components/PhotosSection/PhotosSection";

export default function Home() {
  return (
    <main className="flex justify-center items-start lg:items-center min-h-screen bg-sky-200 p-2 sm:p-4 md:p-6 lg:p-8">
      <div className="w-full max-w-screen-2xl mx-auto my-auto p-3.5 sm:p-6 md:p-10 lg:p-16 xl:p-20 bg-slate-100 rounded-xl sm:rounded-2xl shadow-lg">
        <Navbar />
        <HeroSection />
        <PhotosSection />
      </div>
    </main>
  );
}
