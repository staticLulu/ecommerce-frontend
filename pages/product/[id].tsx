import { CartContext } from "@/components/CartContext";
import Header from "@/components/Header"
import CartIcon from "@/components/icons/Cart";
import ProductImages from "@/components/ProductImages";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import Image from "next/image";
import { useContext } from "react";

const ProductPage = ({product}:{product: any}) => {
  const { addProduct } = useContext(CartContext);
  return (
    <div className="mb-10">
      <Header />
      <div className="p-5 max-w-screen-2xl mx-auto mt-12">
        <div className="grid lg:grid-cols-2 mt-10 gap-10">
          <div className="bg-white p-5 rounded-xl shadow-sm grid justify-center w-full">
            <ProductImages images={product.images}/>
          </div>
          <div>
            <p className="text-2xl font-bold">{product.title}</p>
            <p>{product.description}</p>

            <div className="flex gap-4 items-center mt-4 ">
              <p className="text-3xl font-normal text-black">${product.price}</p>
              <button 
                className="
                  bg-primary 
                  text-white 
                  px-3 
                  py-2 
                  rounded-lg 
                
                  flex 
                  items-center 
                  gap-1.5
                "
                onClick={() =>addProduct(product._id)}
              >
                <CartIcon className="w-6 h-6"/>
                Add to cart
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default ProductPage;
export async function getServerSideProps(context: any) {
  await mongooseConnect();
  const { id } = context.query
  const product = await Product.findById(id);
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    }
  }
}