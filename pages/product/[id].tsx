import { CartContext } from "@/components/CartContext";
import CustomButton from "@/components/CustomButton";
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
      <div className="p-5 max-w-screen-xl mx-auto mt-12">
        <div className="grid lg:grid-cols-2 mt-10 gap-10">
          <div className="bg-white p-5 rounded-xl shadow-sm grid justify-center w-full">
            <ProductImages images={product.images}/>
          </div>
          <div>
            <p className="text-3xl font-bold">{product.title}</p>
            <p className="my-4 text-slate-500 text-lg leading-8">{product.description}</p>

            <div className="flex gap-4 items-center">
              <p className="text-3xl font-normal text-black">${product.price}</p>
              <CustomButton onClick={() =>addProduct(product._id)}>
                <CartIcon className="w-5 h-5"/>
                Add to cart
              </CustomButton>
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