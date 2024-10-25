import { CartContext } from "@/components/CartContext";
import CustomButton from "@/components/CustomButton";
import Header from "@/components/Header";
import { useContext } from "react";

const CartPage = () => {
  const { cartProducts } = useContext(CartContext) as any;
  return (
    <div>
      <Header />

      <div className="max-w-screen-xl mx-auto p-5">
        <div className="grid grid-cols-2 gap-10 mt-10">
          <div className="bg-white p-[30px] rounded-md">
            {!cartProducts?.length && (
              <div>
                Your carts is empty
              </div>
            )}
            {cartProducts?.length > 0 && (
              <div>
                <h2>Cart</h2>
                {cartProducts.map((productId: any, idx: number) => (
                  <div key={idx}>{productId}</div>
                ))}
              </div>
            ) }
          </div>
          {!!cartProducts.length && (
            <div className="bg-white rounded-md p-[30px]">
              <p className="text-xl font-semibold">Order information</p>

              <div className="grid gap-1 mb-2">
                <input type="text" placeholder="Address" className="border border-gray-200 w-full" />
                <input type="text" placeholder="Address" className="border border-gray-200 w-full" />
              </div>

              <button 
                className="bg-black text-white rounded-md w-full py-1.5"
              >
                Continue to payment
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CartPage;