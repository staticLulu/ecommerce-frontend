import ProductBox from "./ProductBox";

const ProductsGrid = ({products}:{products: any}) => {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-10 pt-5">
      {products?.length > 0 && products.map((product: any, idx: number) => (
        <ProductBox key={idx} {...product}/>
      ))}
    </div>
  )
}

export default ProductsGrid;