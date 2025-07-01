import Link from "next/link"

export default function CancelButton({ mainClass = "", onClick, disabled = false, type = "button", class_ = "", title, isLink = false, link = "" }) {

    if (isLink) {
        return <div className={`${mainClass}`}>
            <Link href={link} type={type} className={`text-base font-medium bg-dark hover:bg-white text-text3 w-full p-2 rounded-lg border border-dark hover:border-border-color cursor-pointer capitalize disabled:pointer-events-none disabled:opacity-50 ${class_}`}>{title}</Link>
        </div>
    }

    return <main className={`${mainClass}`}>
        <button type={type} onClick={onClick} disabled={disabled} className={`text-base font-medium bg-dark hover:bg-white text-text3 w-full p-2 rounded-lg border border-dark hover:border-border-color cursor-pointer capitalize disabled:pointer-events-none disabled:opacity-50 ${class_}`}>{title}</button>
    </main>
}