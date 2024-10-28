import Featured from "@/components/Featured";
import Header from "@/components/Header";
import NewProduct from "@/components/NewProducts";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default function Home({featuredProduct, newProducts}:{featuredProduct: any; newProducts: any;}) {
  
  return (
    <div>
      <Header />
      <Featured product={featuredProduct} />
      <NewProduct products={newProducts} />
    </div>
  );
}

export async function getServerSideProps() {
  const featuredProductId = '6719b9c58443e30f138d3f4b';
  await mongooseConnect();
  const featuredProduct = await Product.findById(featuredProductId);
  const newProducts = await Product.find({}, null, { sort: { '_id': -1 }, limit: 10 });

  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
    },
  };
}
