import RecommendCategoryCard from "./RecommendCategoryCard";

const RecommendedCategories = () => {

  return (
    <div className="max-w-screen-xl mx-auto mt-6 mb-8 p-5 container">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        <RecommendCategoryCard title="Iphone" total="10 products" image={"/iphone15.png"} />
        <RecommendCategoryCard title="Samsung" total="10 products" image={"/s24-ultra.webp"} />
        <RecommendCategoryCard title="Laptops" total="10 products" image={"/macbook2.png"} />
        <RecommendCategoryCard title="Headphone" total="10 products" image={"/airpod.png"} />
      </div>
    </div>
  )
}

export default RecommendedCategories;