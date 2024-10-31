import ProductsGrid from "./ProductsGrid";

const NewProduct = ({products}:{products: any}) => {
  return (
    <div className="max-w-screen-xl mx-auto p-5 container">
      <p className="text-3xl font-semibold ">Recommended items</p>

      <ProductsGrid products={products}/>
    </div>
  )
}

export default NewProduct;