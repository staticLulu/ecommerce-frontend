const CustomButton = ({children, isPrimary, outline, ...rest}: any) => {
  return (
    <button 
      className=" 
        bg-secondary 
        text-white 
        flex 
        gap-1 
        items-center
        py-1 
        px-3
        rounded-md
        hover:bg-secondary/80
        hover:scale-105
        transition-all
        duration-100
        ease-linear
        hover:backdrop-blur-xl
      "
      {...rest}
    >
      {children}
    </button>
  )
}

export default CustomButton;