import { useAuth } from "@/contexts/auth";
import { Link } from "react-router-dom";

const Header = () => {
  const { token, logout, user } = useAuth();
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-blue-600">
          MyStore
        </Link>

        <nav className="space-x-6">
          <Link
            to="/"
            className="text-gray-700 hover:text-blue-600 transition font-medium"
          >
            Home
          </Link>

          {token && user?.role == "USER" && (
            <Link
              to="/favorite"
              className="text-gray-700 hover:text-blue-600 transition font-medium"
            >
              My Cart
            </Link>
          )}

          {token && user?.role == "USER" && (
            <Link
              to="/transfer"
              className="text-gray-700 hover:text-blue-600 transition font-medium"
            >
              Transfer
            </Link>
          )}
          {token && user?.role == "USER" && (
            <Link
              to="/my-orders"
              className="text-gray-700 hover:text-blue-600 transition font-medium"
            >
              My Order
            </Link>
          )}

          {token && user?.role == "ADMIN" && (
            <Link
              to="/admin"
              className="text-gray-700 hover:text-blue-600 transition font-medium"
            >
              Dashboard
            </Link>
          )}

          {token ? (
            <Link
              to="/login"
              onClick={logout}
              className="text-gray-700 hover:text-blue-600 transition font-medium"
            >
              Logout
            </Link>
          ) : (
            <Link
              to="/login"
              className="text-gray-700 hover:text-blue-600 transition font-medium"
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
