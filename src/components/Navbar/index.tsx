import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="h-20 shadow-md flex items-center px-5 bg-blue-100">
      <span className="text-2xl italic font-bold text-blue-600 w-1/2">
        RegionApp
      </span>
      <span>
        <Link
          to={"/home"}
          className="text-blue-600 hover:text-blue-300 transition-colors font-semibold"
        >
          Home
        </Link>
      </span>
    </div>
  );
};

export default Navbar;
