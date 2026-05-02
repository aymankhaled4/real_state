import { Link } from "react-router-dom";
import RegisterForm from "../components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <main className="min-h-screen flex">
      <div className="hidden lg:flex w-1/2 relative overflow-hidden flex-col justify-end p-12">
        <img
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80"
          alt="Luxury Villa"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-br from-[#0B1C30]/90 via-[#131b2e]/70 to-[#047857]/60" />
        <div className="relative z-10">
          <h2 className="text-4xl font-bold text-white leading-tight">
            Architecture <br />
            <span className="text-[#34d399]">Meets </span>
            <span className="text-[#34d399]">Ambition.</span>
          </h2>
          <p className="text-[#94a3b8] mt-4 text-[16px] leading-7 w-[70%]">
            Discover the world's most evocative living spaces curated for you.
          </p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center bg-[#f8f9ff] px-6 py-12">
        <div className="w-full max-w-md">
          <span className="text-[13px] font-bold text-[#006C4A] tracking-[1.6px]">
            GET STARTED
          </span>
          <h1 className="text-4xl font-bold text-[#0B1C30] mt-2 mb-2">
            Create account
          </h1>
          <p className="text-[#45464D] text-[15px] mb-8">
            Join thousands discovering architectural excellence.
          </p>
          <RegisterForm />
          <p className="text-center text-[14px] text-[#45464D] mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-[#047857] font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}