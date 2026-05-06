import share from "../../assets/share.svg";
import message from "../../assets/message.svg";

export default function Footer() {
  return (
    <section className="bg-footer py-10 lg:py-12 px-4 lg:px-8 flex flex-col gap-6 lg:gap-10 transition-colors">
      <div className="flex flex-col lg:flex-row items-end justify-between gap-5">
        <div className="w-full lg:w-[40%]">
          <div>
            <h2 className="text-[20px] font-bold leading-7 text-white">
              DreamHome
            </h2>
            <p className="text-[12px] leading-5 text-slate-400 font-normal mt-4 w-[55%]">
              © 2026 DREAMHOME ARCHITECTURAL EDITORIAL. ALL RIGHTS RESERVED.
            </p>
          </div>
        </div>
        <div className="w-full lg:w-[60%]">
          <ul className="flex items-center lg:items-end gap-3 lg:gap-8 justify-start lg:justify-end">
            <li>
              <a
                href="#"
                className="text-[12px] leading-4 tracking-[0.3px] text-slate-400 font-medium hover:text-white transition-colors">
                PRIVACY POLICY
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-[12px] leading-4 tracking-[0.3px] text-slate-400 font-medium hover:text-white transition-colors">
                TERMS OF SERVICE
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-[12px] leading-4 tracking-[0.3px] text-slate-400 font-medium hover:text-white transition-colors">
                COOKIE SETTINGS
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-[12px] leading-4 tracking-[0.3px] text-slate-400 font-medium hover:text-white transition-colors">
                SUSTAINABILITY
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-[12px] leading-4 tracking-[0.3px] text-slate-400 font-medium hover:text-white transition-colors">
                PRESS
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex items-end justify-between border-t border-white/10 pt-6">
        <div className="flex items-center gap-4">
          <img src={share} alt="Share" />
          <img src={message} alt="Message" />
        </div>
        <div>
          <span className="text-[10px] text-slate-500 font-bold tracking-[1px] leading-3.75">
            DESIGNED FOR THE DISCERNING EYE
          </span>
        </div>
      </div>
    </section>
  );
}
