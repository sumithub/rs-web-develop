export default function SecondaryButton({ mainClass = "", onClick, disabled = false, type = "button", title, class_ = "" }) {
    return <main className={mainClass}>
        <button type={type} onClick={onClick} disabled={disabled} className={`text-white text-base font-medium bg-primary hover:bg-white hover:text-primary px-2 py-2 rounded-lg border border-primary cursor-pointer capitalize w-full disabled:pointer-events-none disabled:opacity-50 ${class_}`}>{title}</button>
    </main>
}