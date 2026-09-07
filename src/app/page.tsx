import HeroSection from "@/Components/HeroSection/HeroSection";
import Navbar from "@/Components/Navbar/Navbar";
import PhotosSection from "@/Components/PhotosSection/PhotosSection";

export default function Home() {
  return (
    <main className="flex justify-center items-center min-h-screen bg-sky-200 p-2 sm:p-6">
      <div className="w-full max-w-screen-2xl mx-auto p-4 sm:p-8 md:p-12 lg:p-20 bg-slate-100 rounded-2xl shadow-lg">
        <Navbar />
        <HeroSection />
        <PhotosSection />
      </div>
    </main>
  );
}


