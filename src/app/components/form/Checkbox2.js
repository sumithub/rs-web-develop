"use client"
export default function Checkbox2({ label, name, checked, onChange }) {
    return <div>
        <div className="h-5">
            {/* <div>
                <label className="text-base text-text-primary">{label}</label>
                <div className="text-base text-text-primary font-bold">{name}</div>
            </div> */}
            <input type="checkbox" className="h-5 w-5 ml-auto"
                onChange={() => { onChange(!checked) }}
                checked={checked} />
        </div>
    </div>
}