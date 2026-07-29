import { FaSearch } from "react-icons/fa";


const HeroSection = () => {
    return (
        <div className="w-full grid lg:flex gap-4">
        
        
           <input type="text" placeholder="Search..." className="inline-block w-10/12 py-2 px-4 bg-slate-200 border-2 border-slate-400 focus:outline-none" />
          <button className="flex justify-center items-center gap-2 border py-2 px-4 cursor-pointer rounded-xl">
               <FaSearch />
            <span className="font-bold">Search</span>
            </button>
       
         

        <button className="font-bold text-white border px-4 bg-slate-700 cursor-pointer rounded-xl hover:bg-slate-950 active:translate-y-0.5 transition-all duration-150">
          UPLOAD
        </button>
        </div>
    );
};

export default HeroSection;