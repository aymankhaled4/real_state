import cta from "../../assets/cta.png";

export default function CTA() {
  return (
    <section className="bg-[#f8f9ff] py-20 lg:py-24 px-4 md:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row items-center">
        <div className="w-full lg:w-[60%] px-10 lg:px-20 pt-15 lg:pt-20 pb-15 lg:pb-24 flex flex-col gap-6 bg-[#131b2e] rounded-2xl lg:rounded-e-none lg:rounded-s-2xl">
          <h2 className="text-[36px] lg:text-[48px] font-bold leading-12 tracking-[-1.2px] text-white">
            Join the Inner Circle of Architectural Excellence
          </h2>
          <p className="text-[18px] leading-7 text-[#7C839B] font-normal">
            Receive our weekly curated journal on modern heritage properties and
            market insights before they hit the public list.
          </p>
          <div className="flex items-center gap-4 mt-4">
            <input
              type="email"
              placeholder="Your email address"
              className="text-[#6B7280] bg-[#2a3142] w-[63%] lg:w-[70%] h-12 text-[16px] px-6 py-4.5 border border-[#FFFFFF33] focus:outline-none rounded-lg"
            />
            <button
              type="button"
              className="bg-[#006c4a] text-white text-[14px] px-6 lg:px-8 h-12 rounded-lg hover:bg-[#059669] transition-colors cursor-pointer">
              Subscribe Now
            </button>
          </div>
        </div>
        <div
          className="relative w-[40%] bg-cover bg-left rounded-e-2xl"
          style={{ backgroundImage: `url(${cta})`, height: "stretch" }}>
          <div className="absolute inset-0 bg-[#131e2d] opacity-85 rounded-e-2xl"></div>
        </div>
      </div>
    </section>
  );
}
