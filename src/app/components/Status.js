export default function Status({ status }) {
    return <div>
        <button className="bg-[#0396FF1A] rounded-4xl py-2 px-3 text-primary! text-sm text-center cursor-pointer disabled:pointer-events-none w-28">{status}</button>
    </div>
}