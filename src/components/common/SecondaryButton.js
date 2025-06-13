import Link from "next/link";

export default function SecondaryButton({ mainClass = "", onClick, disabled = false, type = "button", title, class_ = "", isLink = false, link = "" }) {
 
         if (isLink) {
        return <div className={`${mainClass}`}>
        <Link href={link} type={type} onClick={onClick} disabled={disabled} className={`text-white text-base font-medium bg-primary hover:bg-white hover:text-primary px-2 py-2 rounded-lg border border-primary cursor-pointer capitalize w-full disabled:pointer-events-none disabled:opacity-50 ${class_}`}>{title}</Link>
         </div>}

         return <div className={`${mainClass}`}>
         <button type={type} onClick={onClick} disabled={disabled} className={`text-white text-base font-medium bg-primary hover:bg-white hover:text-primary px-2 py-2 rounded-lg border border-primary cursor-pointer capitalize w-full disabled:pointer-events-none disabled:opacity-50 ${class_}`}>{title}</button>
    </div>
}