"use client"
import { useState } from "react";
import Search from "../form/Search";
import Model from "./Model";

export default function LocationsDropdown({ onClose, id, onLocationSelect, selectedLocation }) {
    const [search, setSearch] = useState("")

    // Sample locations data
    const locations = [
        "4517 washington ave. manchester, Kentucky 39495",
        "2972 Westheimer Rd. santa ana, lllinois 85486",
        "4140 Parker Rd. allentown, New Mexico 31134",
        "2464 Royal Ln. Mesa, New Jersey 45463"
    ];

    // Filter locations based on search
    const filteredLocations = locations.filter(location =>
        location.toLowerCase().includes(search.toLowerCase())
    );

    const handleLocationSelect = (location) => {
        if (onLocationSelect) {
            onLocationSelect(location);
        }
        onClose();
    };

    return <Model onClose={onClose} closeButton={false}
        modalClass="w-[14%]! shadow-[0px_0px_40px_0px_#0000001A]!"
        flexClass="items-start! justify-start!"
        class_="top-36! left-3! inset-0 items-start! justify-end!"
        modelHeaderClass="bg-white! p-0!"
        modalBodyClass="px-2! pb-3!"
        overlayClass="bg-white! opacity-0!"
    >
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

            {filteredLocations.map((location, index) => {
                const isSelected = selectedLocation === location;
                return (
                    <div key={index}>
                        <div
                            className={`${isSelected ? "bg-dark p-2.5 rounded-md" : ""} cursor-pointer hover:bg-gray-100 rounded-md ${isSelected ? "" : "p-2.5"}`}
                            onClick={() => handleLocationSelect(location)}
                        >
                            <h2 className={`text-sm capitalize ${isSelected ? "text-primary" : "text-text3"}`}>
                                {location}
                            </h2>
                        </div>
                        {index < filteredLocations.length - 1 && (
                            <hr className="border-t border-border2 my-3.5" />
                        )}
                    </div>
                )
            })}

            {filteredLocations.length === 0 && (
                <div className="py-4 text-center">
                    <p className="text-sm text-text3">No locations found</p>
                </div>
            )}
        </div>
    </Model>
}