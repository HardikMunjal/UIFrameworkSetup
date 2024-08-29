import React from 'react';
import styles from './Pagination.module.css';

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const getPageNumbers = () => {
    const totalNumbers = 5;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {
      const startPage = Math.max(2, currentPage - 2);
      const endPage = Math.min(totalPages - 1, currentPage + 2);
      let pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

      const hasLeftSpill = startPage > 2;
      const hasRightSpill = (totalPages - endPage) > 1;
      const spillOffset = totalNumbers - (pages.length + 1);

      switch (true) {
        case (hasLeftSpill && !hasRightSpill): {
          pages = [1, '...', ...Array.from({ length: 3 + spillOffset }, (_, i) => startPage - 1 + i)];
          break;
        }
        case (!hasLeftSpill && hasRightSpill): {
          pages = [...Array.from({ length: 3 + spillOffset }, (_, i) => endPage - 2 + i), '...', totalPages];
          break;
        }
        case (hasLeftSpill && hasRightSpill):
        default: {
          pages = [1, '...', ...pages, '...', totalPages];
          break;
        }
      }
      return pages;
    }

    return Array.from({ length: totalPages }, (_, i) => i + 1);
  };

  return (
    <div className={styles.pagination}>
      {getPageNumbers().map((page, index) => (
        <button
          key={index}
          className={`${styles.paginationItem} ${currentPage === page ? styles.active : ''}`}
          onClick={() => onPageChange(page)}
          disabled={page === '...'}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
