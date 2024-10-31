import Image from "next/image";

const RecommendCategoryCard = ({title, total, image}:{title: string; total: string; image: any;}) => {
  return (
    <div 
      className="
        bg-slate-100 
        p-4 
        rounded-lg 
        relative 
        w-auto 
        h-[180px] 
        overflow-hidden
        hover:scale-105
        transition-all
        ease-linear
        duration-150
        cursor-pointer
        shadow-[0px_1px_6px_0px_rgba(0,0,0,0.15)]
      "
    >
      <div>
        <p className="font-bold text-lg">{title}</p>
        <p className="text-slate-500">{total}</p>
      </div>

      <div className="absolute right-[-28px] bottom-[-22px]">
        <Image 
          src={image} 
          alt="categories" 
          width={160} 
          height={160} 
          loading="lazy"
          unoptimized
          className="object-cover object-top w-auto h-[140px]"
        />
      </div>
    </div>
  )
}

export default RecommendCategoryCard;