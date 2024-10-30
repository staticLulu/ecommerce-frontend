import { CartContext } from "@/components/CartContext";
import Header from "@/components/Header";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import CustomInput from "@/components/CustomInput";

const CartPage = () => {
  const { cartProducts, addProduct, removeProduct, clearCart } = useContext(CartContext) as any;
  const [products, setProducts] = useState<any>([]);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [postalCode, setPostalCode] = useState<string>('');
  const [streetAddress, setStreetAddress] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  useEffect(() => {
    console.log('cart products?', cartProducts)
    if (cartProducts.length > 0) {
      axios.post('/api/cart', {ids: cartProducts}).then(response => {
        setProducts(response.data);
      });
    } else {
      setProducts([]);
    }
  }, [cartProducts]);

  useEffect(() => {
    //@ts-ignore
    if (typeof window === 'undefine') {
      return;
    }
    //@ts-ignore
    if ( window.location.href.includes('success')) {
      setIsSuccess(true);
      clearCart();
    }
  }, []);

  function moreOfThisProduct(id: any) {
    addProduct(id);
  }

  function lessOfThisProduct(id: any) {
    removeProduct(id);
  }

  async function doPayment() {
    const response = await axios.post('/api/checkout', {
      //@ts-ignore
      name, email, city, postalCode, streetAddress, country,
      cartProducts,
    });

    if (response.data.url) {
      window.location = response.data.url
    }
  }

  let total = 0;
  for (const productId of cartProducts) {
    const product = products.find((p: any) => p._id === productId);
    const price = product ? product.price : 0; // Use product.price if found, else 0
    total += price;
  }
  
  if (isSuccess) {
    return (
      <>
        <Header/>

        <div className="bg-white p-10 m-4 rounded-xl w-fit">
          <div className="grid gap-4">
            <h1 className="text-3xl font-bold">Thanks for your order!</h1>
            <p>We will email you when your order will be sent.</p>
          </div>
        </div>
      </>
    )
  }

  const buttonStyleProps = `{
    bg-gray-200 
    py-1 
    px-3.5 
    rounded-lg 
    text-lg
  }`
  return (
    <div>
      <Header />

      <div className="max-w-screen-xl mx-auto p-5 mt-16">
        <div className="grid md:grid-cols-2 gap-5 mt-10">
          <div className="bg-white p-[30px] rounded-md">
            <h2>Cart</h2>
            {!products?.length && (
              <div>
                Your carts is empty
              </div>
            )}

            {products?.length > 0 && (
              <table className="w-full">
                <thead>
                  <tr>
                    <ThSection>Product</ThSection>
                    <ThSection>Quantity</ThSection>
                    <ThSection>Price</ThSection>
                  </tr>
                </thead>

                <tbody>
                  {products.map((product: any, idx: number) => (
                    <tr key={idx}>
                      <TdSection>
                        <div 
                          className="
                            h-[130px] 
                            w-[130px] 
                            p-2.5 
                            bg-[#f0f0f0]/70 
                            rounded-lg 
                            shadow-sm 
                            border 
                            border-slate-200
                            flex 
                            items-center
                            justify-center
                          "
                        >
                          <Image 
                            src={product.images[0]} 
                            alt="product images" 
                            width={80} 
                            height={80} 
                            unoptimized 
                            loading="lazy"
                            className="object-cover object-center h-[80px] w-auto"
                          />
                        </div>
                        {product.title}
                      </TdSection>
                      <TdSection> 
                        <div className="flex gap-4 items-center">
                          <button 
                            onClick={() => lessOfThisProduct(product._id)} 
                            className={buttonStyleProps}
                          >
                            -
                          </button>
                          {cartProducts.filter((id: any) => id === product._id).length} 
                          <button 
                            onClick={() => moreOfThisProduct(product._id)} 
                            className={buttonStyleProps}
                          >
                            +
                          </button>
                        </div>

                      </TdSection>
                      <TdSection> ${cartProducts.filter((id: any) => id === product._id).length * product.price} </TdSection>
                    </tr>
                  ))}
                  <tr className="border-t border-slate-200">
                    <td></td>
                    <td></td>
                    <td className="pt-4 text-green-600">${total}</td>

                  </tr>
                </tbody>
              </table>
            )}

          </div>
          {!!cartProducts.length && (
            <div className="bg-white rounded-md p-[30px]">
              <p className="text-xl font-semibold">Order information</p>
              <div className="grid gap-2.5 mt-4">
                <CustomInput 
                  type="text" 
                  placeholder="Name" 
                  value={name} 
                  name="name"
                  onChange={(e: any) => setName(e.target.value)} 
                />
                <CustomInput 
                  type="text" 
                  placeholder="Email" 
                  value={email} 
                  name="email"
                  onChange={(e: any) => setEmail(e.target.value)} 
                />
                <div className="flex gap-1.5">
                  <CustomInput 
                    type="text" 
                    placeholder="City" 
                    value={city} 
                    name="city"
                    onChange={(e: any) => setCity(e.target.value)} 
                  />
                  <CustomInput 
                    type="text" 
                    placeholder="Postal Code" 
                    value={postalCode} 
                    name="postalCode"
                    onChange={(e: any) => setPostalCode(e.target.value)} 
                  />
                </div>
                <CustomInput 
                  type="text" 
                  placeholder="Street Address" 
                  value={streetAddress} 
                  name="streetAddress"
                  onChange={(e: any) => setStreetAddress(e.target.value)} 
                />
                <CustomInput 
                  type="text" 
                  placeholder="Country" 
                  value={country} 
                  name="country"
                  onChange={(e: any) => setCountry(e.target.value)} 
                />

                <button 
                  className="bg-black text-white rounded-md w-full py-1.5"
                  onClick={doPayment}
                >
                  Continue to payment
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}


const ThSection = ({children}:{children: any}) => {
  return (
    <th className="uppercase text-left text-[#ccc] font-normal text-sm">{children}</th>
  )
}
const TdSection = ({children}:{children: any}) => {
  return (
    <td className="py-2.5 border-t border-slate-200">{children}</td>
  )
}

export default CartPage;