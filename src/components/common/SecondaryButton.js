import Link from "next/link";

export default function SecondaryButton({ mainClass = "", onClick, disabled = false, type = "button", title, class_ = "", isLink = false, link = "" }) {
 
         if (isLink) {
        return <div className={`${mainClass}`}>
        <Link href={link} type={type} onClick={onClick} disabled={disabled} className={`text-white text-base font-medium bg-primary hover:bg-white hover:text-primary px-2 py-2 rounded-lg capitalize w-full ${disabled ? 'bg-gray-300 border-0 cursor-default' : 'border border-primary cursor-pointer'} ${class_}`}>{title}</Link>
         </div>}

         return <div className={`${mainClass}`}>
         <button type={type} onClick={onClick} disabled={disabled} className={`text-white text-base font-medium bg-primary hover:bg-white hover:text-primary px-2 py-2 rounded-lg capitalize w-full ${disabled ? 'bg-gray-300 border-0 cursor-default' : 'border border-primary cursor-pointer'} ${class_}`}>{title}</button>
    </div>
}