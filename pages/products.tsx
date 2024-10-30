import Header from "@/components/Header"
import ProductsGrid from "@/components/ProductsGrid";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

const ProductsPage = ({products}:{products: any}) => {
  console.log(products);
  
  return (
    <div>
      <Header />

      <div className="max-w-screen-2xl mx-auto mt-20 p-5">
        <h1 className="text-2xl font-bold">All products</h1>
        <ProductsGrid products={products}/>
      </div>
    </div>
  )
}

export default ProductsPage;
export async function getServerSideProps() {
  await mongooseConnect();
  const products = await Product.find({}, null, {sort:{'_id' : -1}});  

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    }
  }
}