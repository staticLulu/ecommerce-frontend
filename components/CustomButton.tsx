const CustomButton = ({children, isPrimary, outline, ...rest}: any) => {
  return (
    <button 
      className={`
        ${isPrimary 
          ? 'bg-primary text-white flex gap-1 items-center' 
          :outline ? 'border border-primary bg-transparent text-primary flex items-center gap-1'
          : "bg-transparent text-white border border-gray-200"
        } 
        py-1 
        px-3
        rounded-md
      `}
      {...rest}
    >
      {children}
    </button>
  )
}

export default CustomButton;