import { CiSearch } from "react-icons/ci";
import img from "../../assets/home.png";
import box from "../../assets/box.png";

interface Props {
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  searchHandler: () => void;
}

export default function Hero({
  inputValue,
  setInputValue,
  searchHandler,
}: Props) {
  return (
    <section className="px-4 md:px-6 lg:px-8 py-18 md:py-24 lg:py-32 bg-[#f8f9ff] flex flex-col lg:flex-row items-start gap-8 lg:gap-16 ">
      <div className="w-full lg:w-[50%]">
        <h1 className="text-4xl md:text-5xl lg:text-7xl tracking-[-1.8px] leading-11 lg:leading-23 font-bold text-[#0B1C30]">
          Architecture <div className="text-[#047857]">Meets </div>
          <div className="text-[#047857]">Ambition.</div>
        </h1>
        <p className="text-[16px] leading-6.5 text-[#45464D] mt-4 w-full lg:w-[60%]">
          Discover the world's most evocative living spaces. Our editorial
          selection prioritizes high-end design, sustainable luxury, and
          architectural permanence.
        </p>
        <div className="flex items-center justify-between bg-white rounded-2xl mt-8 px-4 py-2 shadow-md">
          <CiSearch className="w-4.5 h-4.5" />
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            type="text"
            placeholder="Search by city or architectural style..."
            className="w-[62%] lg:w-[70%] h-12 text-[14px] px-4 focus:outline-none"
          />
          <button
            onClick={searchHandler}
            type="button"
            className="bg-[#131b2e] text-[14px] text-white px-8 py-3 rounded-lg hover:bg-[#1b2743] transition-colors cursor-pointer">
            Search Listings
          </button>
        </div>
      </div>
      <div className="w-full lg:w-[50%] relative min-h-110 lg:min-h-125">
        <img
          src={img}
          alt="homepage"
          className="w-xl absolute lg:-top-2.5 lg:-right-4"
        />
        <img
          src={box}
          alt="box"
          className="w-48 h-48 absolute bottom-0 lg:top-72 lg:left-35"
        />
      </div>
    </section>
  );
}
