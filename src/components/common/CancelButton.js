export default function CancelButton({ onClick, disabled = false, type = "button", class_ = "" }) {
    return <main>
        <button type={type} onClick={onClick} disabled={disabled} className={`text-base font-medium bg-dark hover:bg-white text-text3 w-full py-2 rounded-[10px] border border-dark hover:border-border-color cursor-pointer ${class_}`}>Cancel</button>
    </main>
}