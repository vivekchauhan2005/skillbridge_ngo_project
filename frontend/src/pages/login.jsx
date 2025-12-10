import { Link } from "react-router-dom";
import illustration from "../assets/signup-illustration.png";
import logo from "../assets/image.png"; 

function Login() {
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
            Login to your NGO Account
          </h2>
          <p className="text-gray-500 mb-6">
            Access SkillBridge to manage NGO projects and volunteers.
          </p>

          <input
            type="email"
            placeholder="Enter your email"
            className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />

          <input
            type="password"
            placeholder="Enter your password"
            className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />

          <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg transition">
            Login
          </button>

          <p className="text-sm mt-4 text-gray-600">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-blue-500 font-semibold">
              Sign up
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

export default Login;
