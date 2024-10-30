import Image from 'next/image';
import CustomButton from './CustomButton';
import ButtonLink from './ButtonLink';
import { CartContext } from './CartContext';
import { useContext } from 'react';

const Featured = ({product}:{product: any}) => {
  //@ts-ignore
  const { addProduct } = useContext(CartContext);
  function addFeaturedToCart() {
    addProduct(product._id);
  }

  return (
    <div className="p-5 max-w-screen-2xl mx-auto bg-[#222] text-[#fff] mt-12">
      <div className="text-[#fff] py-10 items-center justify-center gap-10 flex flex-col-reverse md:flex-row md:justify-evenly w-full">
        <div className='grid justify-center'>
          <h1 className="m-0 font-normal text-5xl">{product.title}</h1>
          <p className="text-[#aaa] text-sm">{product.description}</p>
          
          <div className='flex gap-1.5 mt-5'>
            <ButtonLink href={'/products/'+product._id}>Read more</ButtonLink>
            <CustomButton isPrimary onClick={addFeaturedToCart}>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                className="size-5"
              >
                <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
              </svg>
              Add to cart
            </CustomButton>
          </div>
        </div>
        <div className='flex justify-end'>
          <Image   
            src={'https://firebasestorage.googleapis.com/v0/b/next-ecommerce-admin-d58ab.appspot.com/o/images%2Fd7278dba-bf19-4cf7-af82-d0d7518ff8cf-m2.png?alt=media&token=cfb2e4fa-f8c0-46c7-bf33-6d9021331801'}
            alt='test'
            width={500}
            height={500}
            loading='lazy'
          />
        </div>
      </div>

    </div>
  )
}

export default Featured;