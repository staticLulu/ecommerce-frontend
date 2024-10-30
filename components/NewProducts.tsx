import ProductsGrid from "./ProductsGrid";

const NewProduct = ({products}:{products: any}) => {
  return (
    <div className="max-w-screen-2xl mx-auto p-5">
      <p className="text-3xl font-normal ">New Arrivals</p>

      <ProductsGrid products={products}/>
    </div>
  )
}

export default NewProduct;