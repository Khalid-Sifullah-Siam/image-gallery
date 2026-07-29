import Navbar from "@/Components/Navbar/Navbar";

export default function Home() {
  return (
    <main className="flex justify-center items-center min-h-screen bg-sky-200">
      <div className="w-full max-w-screen-2xl mx-auto p-20 bg-slate-100 rounded-2xl shadow-lg">
        <Navbar />
        <h1 className="text-5xl font-bold text-green-600">
          Welcome to Image Gallery
        </h1>
      </div>
    </main>
  );
}
