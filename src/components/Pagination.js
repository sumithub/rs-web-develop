import React, { useState } from 'react';

const Pagination = ({ totalPages = 10, initialPage = 1 }) => {
    const [currentPage, setCurrentPage] = useState(initialPage);

    // Calculate the range of page numbers to display
    const getPageNumbers = () => {
        let pages = [];
        const maxVisibleButtons = 5; // Adjust based on your needs

        // Always show first page
        pages.push(1);

        if (totalPages <= maxVisibleButtons) {
            // Show all pages if total is small
            for (let i = 2; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Show ellipsis and selected range
            if (currentPage > 3) {
                pages.push('...');
            }

            // Pages around current page
            const startPage = Math.max(2, currentPage - 1);
            const endPage = Math.min(totalPages - 1, currentPage + 1);

            for (let i = startPage; i <= endPage; i++) {
                if (!pages.includes(i)) {
                    pages.push(i);
                }
            }

            if (currentPage < totalPages - 2) {
                pages.push('...');
            }

            // Always show last page if not already included
            if (totalPages > 1 && !pages.includes(totalPages)) {
                pages.push(totalPages);
            }
        }

        return pages;
    };

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            // You can add your own logic here, like fetching data for the selected page
            console.log(`Page changed to ${page}`);
        }
    };

    const pageNumbers = getPageNumbers();

    return (
        <div className="flex items-center justify-center space-x-1 my-4">
            {/* Previous button */}
            <button type='button'
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded-md cursor-pointer font-semibold ${currentPage === 1
                    ? 'text-border2 disabled:pointer-events-none'
                    : 'text-primary'
                    }`}
                aria-label="Previous page"
            >Prev
            </button>

            {/* Page numbers */}
            {pageNumbers.map((page, index) => (
                page === '...' ? (
                    <span key={`ellipsis-${index}`} className="px-3 py-1">
                        {page}
                    </span>
                ) : (
                    <button type='button'
                        key={`page-${page}`}
                        onClick={() => handlePageChange(page)}
                        className={`w-8 h-8 flex items-center justify-center rounded-md cursor-pointer text-sm ${currentPage === page
                            ? 'bg-primary text-white font-bold'
                            : 'text-text3 border border-border2 hover:bg-gray-100'
                            }`}
                        aria-label={`Page ${page}`}
                        aria-current={currentPage === page ? 'page' : undefined}>{page}
                    </button>
                )
            ))}

            {/* Next button */}
            <button type='button'
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded-md cursor-pointer font-semibold ${currentPage === totalPages
                    ? 'text-border2 disabled:pointer-events-none'
                    : 'text-primary'
                    }`}
                aria-label="Next page">Next
            </button>
        </div>
    );
};

// Demo component to show the pagination in action
const PaginationDemo = (class_ = "") => {
    return (
        <div className={`p-4 ${class_}`}>
            <Pagination totalPages={10} initialPage={1} />
        </div>
    );
};

export default PaginationDemo;