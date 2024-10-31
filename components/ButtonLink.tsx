import Link from "next/link";

const ButtonLink = ({href, children}: {href: string; children: any}) => {
  return (
    <Link 
      href={href} 
      className="
        bg-transparent 
        border 
        border-slate-300 
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