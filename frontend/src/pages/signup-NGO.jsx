import { Link } from "react-router-dom";
import illustration from "../assets/signup-illustration.png";
import logo from "../assets/image.png";  

function SignupNGO() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6 relative">

      {/* Logo Top Right */}
      <img
        src={logo}
        alt="SkillBridge Logo"
        className="absolute top-6 right-6 w-20"
      />

      <div className="w-full max-w-5xl bg-white shadow-lg rounded-2xl grid grid-cols-1 md:grid-cols-2 overflow-hidden">

        {/* Form Section */}
        <div className="flex flex-col justify-center p-10">
          <h2 className="text-3xl font-semibold text-gray-800 mb-2">
            Create an Account
          </h2>
          <p className="text-gray-500 mb-6">
            Join SkillBridge to connect NGOs and volunteers.
          </p>

          <input
            type="text"
            placeholder="Enter username"
            className="w-full mb-3 px-4 py-3 border border-gray-300 rounded-lg"
          />

          <input
            type="email"
            placeholder="Enter your email"
            className="w-full mb-3 px-4 py-3 border border-gray-300 rounded-lg"
          />

          <input
            type="password"
            placeholder="Create a password"
            className="w-full mb-3 px-4 py-3 border border-gray-300 rounded-lg"
          />

          <input
            type="text"
            placeholder="Full Name"
            className="w-full mb-3 px-4 py-3 border border-gray-300 rounded-lg"
          />

          <select className="w-full mb-3 px-4 py-3 border border-gray-300 rounded-lg">
            <option>NGO / Organization</option>
          </select>

          <input
            type="text"
            placeholder="Location (Optional)"
            className="w-full mb-3 px-4 py-3 border border-gray-300 rounded-lg"
          />

          <input
            type="text"
            placeholder="Organization Description"
            className="w-full mb-3 px-4 py-3 border border-gray-300 rounded-lg"
          />

          <input
            type="text"
            placeholder="Website URL (optional)"
            className="w-full mb-3 px-4 py-3 border border-gray-300 rounded-lg"
          />

          <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg mt-3 transition">
            Create Account
          </button>

          <p className="text-sm mt-4 text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 font-semibold">
              Login
            </Link>
          </p>
        </div>

        {/* Image Section */}
        <div className="hidden md:flex items-center justify-center bg-blue-50 p-6">
          <img src={illustration} alt="illustration" className="w-4/5 max-w-sm" />
        </div>
      </div>
    </div>
  );
}

export default SignupNGO;
