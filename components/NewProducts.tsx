import ProductBox from "./ProductBox";

const NewProduct = ({products}:{products: any}) => {
  return (
    <div className="max-w-screen-xl mx-auto p-5">
      <p className="text-3xl font-normal ">New Arrivals</p>
      
      <div className="grid grid-cols-4 gap-10 pt-5">
        {products?.length > 0 && products.map((product: any, idx: number) => (
          <ProductBox key={idx} {...product}/>
        ))}
      </div>
    </div>
  )
}

export default NewProduct;