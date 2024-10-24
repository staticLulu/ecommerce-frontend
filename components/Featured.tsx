import Image from 'next/image';
import PrimaryButton from './PrimaryButton';
import DefaultButton from './DefaultButton';

const Featured = () => {
  return (
    <div className="p-5 max-w-screen-xl mx-auto bg-[#222] text-[#fff]">
      <div className="text-[#fff] py-10 px-0 items-center gap-10 flex w-full">
        <div className='w-[30%]'>
          <h1 className="m-0 font-normal text-4xl">Pro anymore</h1>
          <p className="text-[#aaa] text-sm">
            Next.js is a powerful React framework that enables developers to build fast, scalable, 
            and SEO-friendly web applications.
          </p>
          <div className='flex gap-2.5 mt-4'>
            <DefaultButton>Read more</DefaultButton>
            <PrimaryButton>Add to cart</PrimaryButton>
          </div>
        </div>
        <div className='w-[70%] flex justify-end'>
          <Image   
            src={'https://firebasestorage.googleapis.com/v0/b/next-ecommerce-admin-d58ab.appspot.com/o/images%2Fd7278dba-bf19-4cf7-af82-d0d7518ff8cf-m2.png?alt=media&token=cfb2e4fa-f8c0-46c7-bf33-6d9021331801'}
            alt='test'
            width={500}
            height={500}
          />
        </div>
      </div>

    </div>
  )
}

export default Featured;