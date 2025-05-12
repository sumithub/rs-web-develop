export default function SecondaryButton({ onClick, disabled = false, type = "button", title }) {
    return <main>
        <button type={type} onClick={onClick} disabled={disabled} className="text-white text-base font-medium bg-primary hover:bg-white hover:text-primary w-full py-2 rounded-[10px] border border-primary cursor-pointer capitalize w-full">{title}</button>
    </main>
}