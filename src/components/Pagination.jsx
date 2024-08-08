import React from 'react';
import './pagination.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const handlePageClick = (page) => {
        if (page >= 1 && page <= totalPages) {
            onPageChange(page);
        }
    };

    const renderPageNumbers = () => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <button
                    key={i}
                    className={`page-item ${i === currentPage ? 'active' : ''}`}
                    onClick={() => handlePageClick(i)}
                >
                    {i}
                </button>
            );
        }
        return pages;
    };

    return (
        <div className="pagination">
            <button 
                className="page-item" 
                onClick={() => handlePageClick(currentPage - 1)} 
                disabled={currentPage === 1}
            >
                «
            </button>
            {renderPageNumbers()}
            <button 
                className="page-item" 
                onClick={() => handlePageClick(currentPage + 1)} 
                disabled={currentPage === totalPages}
            >
                »
            </button>
        </div>
    );
};

export default Pagination;
