import Link from "next/link";

const ButtonLink = ({href, children}: {href: string; children: any}) => {
  return (
    <Link 
      href={href} 
      className="
        bg-transparent 
        border 
        border-gray-200 
        px-4 
        py-2 
        rounded-md
      "
    >
      {children}
    </Link>
  )
}

export default ButtonLink;