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
    <Link href={`/product/${_id}`} passHref>
      <div className="bg-white p-5 flex justify-center h-[120px] items-center rounded-lg">
        <Image 
          src={images?.[0]} 
          alt="products" 
          width={100} 
          height={100} 
          unoptimized 
          loading="lazy" 
          className="w-auto h-[80px]"
        />
      </div>

      <div className="mt-2.5">
        <p className="text-sm">{title}</p>
        <div className="flex items-center justify-between mt-0.5">
          <p className="text-2xl font-bold">${price}</p>
          <CustomButton outline onClick={() => addProduct(_id)}>
            <CartIcon className="w-4 h-4" />
            Add to cart
          </CustomButton>
        </div>
      </div>
    </Link>
  )
}

export default ProductBox;