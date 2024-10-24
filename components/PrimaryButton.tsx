const PrimaryButton = ({children}:{children: any}) => {
  return (
    <button className="bg-primary text-white py-2 px-4 rounded-md">{children}</button>
  )
}

export default PrimaryButton;