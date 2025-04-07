import { useEffect, useRef, useState } from "react"
import Image from "next/image"

export default function Search({ mainClass = "", selected, onRemove, hideSearchText = false, title, onSearch,
    // onClickItem, list, loading
}) {
    const [search, setSearch] = useState("")
    const [isOpen, setIsOpen] = useState(false)
    console.log(isOpen)
    const ref = useRef(null);
    useEffect(() => {
        const checkIfClickedOutside = (e) => {
            //@ts-ignore
            if (ref.current && (!ref.current.contains(e.target))) {
                setIsOpen(false)
            }
        };
        if (typeof window !== "undefined") {
            document.addEventListener('mousedown', checkIfClickedOutside);
            return () => {
                document.removeEventListener('mousedown', checkIfClickedOutside);
            };
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return <div className="w-[30%]" ref={ref}>
        <div className="relative w-full!">
            {selected ? <div className="bg-light-bg h-8 line-clamp-1 rounded py-1 px-2 w-full text-base focus-visible:outline-none">
                {selected?.name}
            </div> :
                <input type="text" className="block md:py-2 pl-2 text-left w-full z-10 text-sm placeholder:text-text3 bg-[#F6F8FB] border border-[#E6E6E6] rounded-lg focus-visible:outline-none shadow-[0.84px_0.84px_2.52px_0px_#0000000F]"
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value)
                    }}
                    placeholder="Search by customer name, review content, or source." />


            }
            <span className="absolute text-center top-1 right-0 py-2 px-2">
                <Image src="/images/search.svg" alt="search" height={14} width={14} unoptimized={true} />
            </span>
            {/* <div className="">
                    <span role="button" onClick={() => {
                        if (selected) {
                            onRemove()
                            setSearch("")
                        } else {
                            setIsOpen(true)
                            onSearch(search)
                        }
                    }} 
                    className="bg-text-primary rounded flex justify-center items-center h-8 md:w-40 w-14">
                        {selected ? <Image src="/images/close1.svg" alt="search" height={30} width={30} unoptimized={true} className="w-8 h-8 mx-auto shrink-0" />
                            : <Image src="/images/search.svg" alt="search" height={14} width={14} unoptimized={true} className="w-5 h-5 mx-auto shrink-0" />}
                    </span>
                </div> */}
        </div>

    </div>
}