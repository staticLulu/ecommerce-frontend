import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "./CartContext";

const Header = () => {
  const { cartProducts } = useContext(CartContext) as any;

  const pathList = [
    {
      href: '/',
      name: "Home"
    },
    {
      href: '/products',
      name: "All products"
    },
    {
      href: '/categories',
      name: "Categories"
    },
    {
      href: '/account',
      name: "Account"
    },
    {
      href: '/cart',
      name: `Cart (${cartProducts.length})`
    }
  ];
  return (
    <div className="bg-black">
      <div className="max-w-screen-xl mx-auto px-5">
        <div className="flex justify-between p-5">
          <Link href={'/'} className="text-white">Ecommerce</Link>
          <nav className="flex gap-5">
            {pathList.map((path: any, idx: number) => (
              <NavLink key={idx} href={path.href} name={path.name} />
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}


const NavLink = ({href, name}:{href: any; name: string;}) => {
  return (
    <Link href={href} className="text-[#aaa]">{name}</Link>
  )
}
export default Header;