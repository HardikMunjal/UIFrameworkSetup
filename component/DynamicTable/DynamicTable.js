"use client"
import React, { useState, useMemo } from 'react';
import styles from './DynamicTable.module.css';
import EditModal from '../EditModal/EditModal';


const DynamicTable = ({ data }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({});
    const [sortConfig, setSortConfig] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5); // Adjust the number of items per page
    const [selectedRow, setSelectedRow] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const columns = Object.keys(data[0]);

    // Handle multi-select filter change
    const handleFilterChange = (column, value) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [column]: prevFilters[column]
                ? prevFilters[column].includes(value)
                    ? prevFilters[column].filter((v) => v !== value)
                    : [...prevFilters[column], value]
                : [value],
        }));
    };

    // Apply filters to the data
    const filteredData = useMemo(() => {
        return data.filter((item) =>
            columns.every((column) =>
                filters[column] && filters[column].length > 0
                    ? filters[column].includes(item[column])
                    : true
            )
        );
    }, [filters, data, columns]);

    // Handle searching
    const searchedData = useMemo(() => {
        return filteredData.filter((item) =>
            columns.some((column) =>
                item[column].toString().toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm, filteredData, columns]);

    // Handle sorting
    const sortedData = useMemo(() => {
        if (sortConfig !== null) {
            return [...searchedData].sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return searchedData;
    }, [searchedData, sortConfig]);

    // Handle pagination
    const paginatedData = useMemo(() => {
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        return sortedData.slice(indexOfFirstItem, indexOfLastItem);
    }, [currentPage, sortedData, itemsPerPage]);

    const totalPages = Math.ceil(sortedData.length / itemsPerPage);

    const handleSort = (column) => {
        let direction = 'ascending';
        if (
            sortConfig &&
            sortConfig.key === column &&
            sortConfig.direction === 'ascending'
        ) {
            direction = 'descending';
        }
        setSortConfig({ key: column, direction });
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const openEditModal = (row) => {
        setSelectedRow(row);
        setIsModalOpen(true);
    };

    const closeEditModal = () => {
        setIsModalOpen(false);
        setSelectedRow(null);
    };

    const handleSave = (updatedRow) => {
        // Implement save logic here
        closeEditModal();
    };

    return (
        <div className={styles.tableWrapper}>
            {/* Filters */}
            <div className={styles.filters}>
                {/* {columns.map((column) => ( */}
                {['Name'].map((column) => (
                    <div key={column} className={styles.filterGroup}>
                        <label>{column}</label>
                        <select
                            multiple
                            value={filters[column] || []}
                            onChange={(e) =>
                                handleFilterChange(
                                    column,
                                    Array.from(e.target.selectedOptions, (option) => option.value)
                                )
                            }
                            className={styles.filterSelect}
                        >
                            {[...new Set(data.map((item) => item[column]))].map((value) => (
                                <option key={value} value={value}>
                                    {value}
                                </option>
                            ))}
                        </select>
                    </div>
                ))}
            </div>


            {/* Search Bar */}
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchBar}
            />

            {/* Table */}
            <table className={styles.table}>
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <th key={column} onClick={() => handleSort(column)}>
                                {column}{' '}
                                {sortConfig && sortConfig.key === column
                                    ? sortConfig.direction === 'ascending'
                                        ? '↑'
                                        : '↓'
                                    : ''}
                            </th>
                        ))}
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedData.map((row, index) => (
                        <tr key={row.id || index}> {/* Ensure `row.id` is unique for each row */}
                            {columns.map((column) => (
                                <td key={column}>{row[column]}</td>
                            ))}
                            <td>
                                <button
                                    className={styles.editButton}
                                    onClick={() => openEditModal(row)}
                                >
                                    Edit
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>

            {/* Pagination */}
            <div className={styles.pagination}>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index} // This ensures each button has a unique key
                        onClick={() => handlePageChange(index + 1)}
                        className={`${styles.pageButton} ${currentPage === index + 1 ? styles.active : ''
                            }`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>

            {/* Edit Modal */}
            {isModalOpen && (
                <EditModal
                    isOpen={isModalOpen}
                    onRequestClose={closeEditModal}
                    rowData={selectedRow}
                    onSave={handleSave}
                />
            )}
        </div>
    );
};

export default DynamicTable;
