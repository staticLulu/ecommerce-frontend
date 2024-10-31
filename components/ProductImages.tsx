import Image from "next/image";
import { useState } from "react";

const ProductImages = ({images}:{images: any}) => {
  const [activeImage, setActiveImage] = useState<any>(images?.[0])

  return (
    <div>
      <div className="h-[400px] w-[400px] flex items-center">
        <Image 
          src={activeImage} 
          alt="product" 
          width={400} 
          height={400} 
          unoptimized
          loading="lazy"
          className="w-full h-[280px] object-contain object-center"
        />
      </div>

      <div className="flex mt-6 gap-2 p-2 justify-center">
        {images.map((image: any, idx: number) => (
          <div 
            key={idx} 
            className={`
              border-2 
              ${image === activeImage 
                ? "border-green-400" 
                : "border-transparent"
              } 
              p-1.5 
              rounded-lg 
              cursor-pointer
            `}
            onClick={() => setActiveImage(image)}
          >
            <Image 
              src={image} 
              alt="image product" 
              width={80} 
              height={80} 
              unoptimized 
              loading="lazy" 
              className="h-[60px] w-[60px] object-contain object-center"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductImages;