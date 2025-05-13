export default function SecondaryButton({ onClick, disabled = false, type = "button", title, class_ = "" }) {
    return <main>
        <button type={type} onClick={onClick} disabled={disabled} className={`text-white text-base font-medium bg-primary hover:bg-white hover:text-primary w-full p-2 rounded-[10px] border border-primary cursor-pointer capitalize w-full disabled:pointer-events-none disabled:opacity-50 ${class_}`}>{title}</button>
    </main>
}