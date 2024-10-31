import Image from "next/image";
import CustomButton from "./CustomButton";
import CartIcon from "./icons/Cart";
import { useContext } from "react";
import { CartContext } from "./CartContext";
import Link from "next/link";

const ProductBox = ({
  _id, 
  title, 
  description, 
  price,
  images,
}:{
  _id: string;
  title: string;
  description?: string;
  price: number;
  images: string;
}) => {
  const { addProduct } = useContext(CartContext) as any;
  return (
    <div>
      <Link href={`/product/${_id}`} passHref>
        <div 
          className="
            bg-white 
            p-5 
            flex 
            justify-center 
            h-[270px] 
            items-center 
            rounded-lg
            border
            border-slate-100
            shadow-sm
          ">
          <Image 
            src={images?.[0]} 
            alt="products" 
            width={200} 
            height={200} 
            unoptimized 
            loading="lazy" 
            className="
              w-auto 
              h-[160px] 
              object-cover 
              object-center 
              hover:scale-105 
              transition-all 
              duration-300
            "
          />
        </div>
      </Link>
      <div className="mt-2.5">
        <p className="text-lg text-primary">{title}</p>
        <div className="flex items-center justify-between mt-1">
          <p className="text-2xl font-bold ">${price}</p>
          <CustomButton outline onClick={() => addProduct(_id)}>
            <CartIcon className="w-4 h-4" />
            Add to cart
          </CustomButton>
        </div>
      </div>
    </div>
  )
}

export default ProductBox;