export default function TableOrder({ title, sortBy, setSortBy, field }) {
    // Check if this field is currently being sorted
    const isCurrentField = sortBy && sortBy.includes(field);
    const sortDirection = isCurrentField ? sortBy.split(':')[1] : null;

    return <div>
        <div className={`flex items-center gap-[6px] ${isCurrentField ? "text-primary" : "text-secondary text-sm font-semibold"}`}>
            <div>{title}</div>
            <button type="button" className={`flex items-center justify-center cursor-pointer`}
                onClick={() => {
                    if (!isCurrentField) {
                        // Start with descending sort
                        if (setSortBy) {
                            setSortBy(field + ":desc");
                        }
                    } else if (sortDirection === "desc") {
                        // Switch to ascending
                        if (setSortBy) {
                            setSortBy(field + ":asc");
                        }
                    } else if (sortDirection === "asc") {
                        // Clear sorting
                        if (setSortBy) {
                            setSortBy("");
                        }
                    }
                }}
            >
                {isCurrentField ? <div className={`transition-all duration-300 ${isCurrentField ? "text-primary" : "text-secondary"}`}>
                    <svg
                        className={`transition-transform duration-300 ${sortDirection === "desc" ? "rotate-180" : ""}`}
                        xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 56 56"><path fill="currentColor" d="M28 4c13.255 0 24 10.745 24 24S41.255 52 28 52S4 41.255 4 28S14.745 4 28 4m-.219 30.695c-1.031 0-1.781.657-1.781 1.64c0 1.009.75 1.665 1.781 1.665h15.57c1.032 0 1.758-.656 1.758-1.664c0-.984-.726-1.64-1.757-1.64zm2.938-7.757c-1.031 0-1.758.656-1.758 1.64c0 1.008.727 1.664 1.758 1.664h12.633c1.03 0 1.757-.656 1.757-1.664c0-.984-.726-1.64-1.757-1.64zm3.242-7.758c-1.031 0-1.781.656-1.781 1.64c0 1.008.75 1.664 1.78 1.664h9.368c1.031 0 1.781-.656 1.781-1.664c0-.984-.75-1.64-1.78-1.64zm-13.764-5.32c-.515 0-.914.21-1.383.656l-7.921 7.922c-.329.304-.493.726-.493 1.218c0 .961.75 1.688 1.711 1.688c.516 0 .938-.164 1.243-.516l2.906-2.93l2.367-2.835l-.188 4.968v15.211c0 1.032.75 1.758 1.758 1.758c1.031 0 1.758-.727 1.758-1.758v-15.21l-.187-4.946l2.367 2.813l2.906 2.93c.305.327.75.515 1.242.515c.961 0 1.688-.727 1.688-1.688c0-.492-.14-.914-.446-1.218l-7.968-7.922c-.47-.47-.844-.657-1.36-.657" /></svg>
                </div> :
                    <div className={`transition-all duration-300 ${isCurrentField ? "text-primary" : "text-secondary"}`}>
                        <svg width="20" height="20" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.99996 0.666992C2.77996 0.666992 0.166626 3.28033 0.166626 6.50033C0.166626 9.72033 2.77996 12.3337 5.99996 12.3337C9.21996 12.3337 11.8333 9.72033 11.8333 6.50033C11.8333 3.28033 9.21996 0.666992 5.99996 0.666992ZM5.37579 9.50449C5.37579 9.56283 5.36413 9.61533 5.34079 9.67366C5.29413 9.77866 5.21246 9.86616 5.10163 9.91283C5.04913 9.93616 4.99079 9.94783 4.93246 9.94783C4.87413 9.94783 4.82163 9.93616 4.76329 9.91283C4.71079 9.88949 4.66413 9.86033 4.62329 9.81949L2.84996 8.04616C2.68079 7.87699 2.68079 7.59699 2.84996 7.42783C3.01913 7.25866 3.29913 7.25866 3.46829 7.42783L4.49496 8.45449V3.49616C4.49496 3.25699 4.69329 3.05866 4.93246 3.05866C5.17163 3.05866 5.36996 3.25699 5.36996 3.49616V9.50449H5.37579ZM9.14412 5.57866C9.05663 5.66616 8.94579 5.70699 8.83496 5.70699C8.72413 5.70699 8.61329 5.66616 8.52579 5.57866L7.49913 4.55199V9.51033C7.49913 9.74949 7.30079 9.94783 7.06163 9.94783C6.82246 9.94783 6.62413 9.74949 6.62413 9.51033V3.49616C6.62413 3.43783 6.63579 3.38533 6.65913 3.32699C6.70579 3.22199 6.78746 3.13449 6.89829 3.08783C7.00329 3.04116 7.12579 3.04116 7.23079 3.08783C7.28329 3.11116 7.32996 3.14033 7.37079 3.18116L9.14412 4.95449C9.31329 5.12949 9.31329 5.40366 9.14412 5.57866Z" fill="#1F2933" />
                        </svg>
                    </div>}
            </button>
        </div>
    </div>
}