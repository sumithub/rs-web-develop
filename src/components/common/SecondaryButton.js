export default function SecondaryButton({ onClick, disabled = false, type = "button", title }) {
    return <main>
        <button type={type} onClick={onClick} disabled={disabled} className="text-white text-lg font-medium bg-primary hover:bg-white hover:text-primary w-full mt-5 py-3 rounded-[10px] border border-primary cursor-pointer capitalize w-full">{title}</button>
    </main>
}