import Search from "../form/Search";
import Model from "./Model";

export default function LocationsDropdown({ onClose, id }) {
    return <Model onClose={onClose} modalClass="w-1/5!">
        <div className="pt-1">
            <div>
                <Search
                    mainClass='w-full!'
                    placeholder="Search Location..."
                    onSearch={(s) => {
                        setSearch(s)
                    }}
                />
            </div>
            <hr className="border-t border-border2 my-3.5" />
            <div className="bg-dark p-2.5 rounded-sm">
                <h2 className="text-base text-primary capitalize">4517 washington ave. manchester, Kentucky 39495</h2>
            </div>
            <hr className="border-t border-border2 my-3.5" />
            <h2 className="text-base text-text3">2972 Westheimer Rd. santa ana, lllinois 85486</h2>
            <hr className="border-t border-border2 my-3.5" />
            <h2 className="text-base text-text3">4140 Parker Rd. allentown, New Mexico 31134</h2>
            <hr className="border-t border-border2 my-3.5" />
            <h2 className="text-base text-text3">2464 Royal Ln. Mesa, New Jersey 45463</h2>
        </div>
    </Model>
}