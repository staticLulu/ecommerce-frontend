import Link from "next/link";
import { useContext, useState } from "react";
import { CartContext } from "./CartContext";
import BarsIcon from "./icons/Bars";
import CloseIcon from "./icons/Close";

const Header = () => {
  const { cartProducts } = useContext(CartContext) as any;
  const [mobileNavActive, setMobileNavActive] = useState(false);

  const pathList = [
    { href: '/', name: "Home" },
    { href: '/products', name: "All Products" },
    // { href: '/categories', name: "Categories" },
    // { href: '/account', name: "Account" },
    { href: '/cart', name: `Cart (${cartProducts.length})` },
  ];

  const toggleMobileNav = () => setMobileNavActive(!mobileNavActive);

  return (
    <header className="bg-gray-800 text-gray-100 shadow-lg fixed top-0 w-full z-50">
      <div className="max-w-screen-xl mx-auto px-5 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-semibold text-white">
          Ecommerce
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex gap-3">
          {pathList.map((path, idx) => (
            <NavLink key={idx} href={path.href} name={path.name} closeMenu={() => {}} />
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-100 focus:outline-none"
          onClick={toggleMobileNav}
        >
          {mobileNavActive ? (
            <CloseIcon className="w-[30px] h-[30px]" />
          ) : (
            <BarsIcon className="w-[30px] h-[30px]" />
          )}
        </button>

        {/* Mobile Dropdown Menu */}
        {mobileNavActive && (
          <div className="md:hidden absolute top-[60px] left-0 right-0 bg-gray-900 py-4 shadow-lg">
            {pathList.map((path, idx) => (
              <div key={idx} className="py-2 px-6 text-center border-b border-slate-800">
                <NavLink href={path.href} name={path.name} closeMenu={() => setMobileNavActive(false)} />
              </div>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

const NavLink = ({ href, name, closeMenu }: { href: string; name: string; closeMenu: () => void }) => {
  return (
    <Link href={href} onClick={closeMenu} className="block w-full">
      <span className="block text-base text-gray-300 hover:text-white transition duration-300 py-2 px-4 whitespace-nowrap overflow-hidden text-ellipsis">
        {name}
      </span>
    </Link>
  );
};

export default Header;
