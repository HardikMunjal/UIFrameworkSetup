"use client"
import React, { useState, useMemo } from 'react';
import styles from './DynamicTable.module.css';
import EditModal from '../EditModal/EditModal';
import MultiSelectFilter from '../MultiSelectFilter/MultiSelectFilter';


const DynamicTable = ({ data, dropdownData, onDropdownSelect, count, onSave, onFilterTrigger }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(1); // Adjust the number of items per page
    const [selectedRow, setSelectedRow] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [options, setOptions] = useState(['Option 1', 'Option 2', 'Option 3', 'Option 4']);
    // let dropdownDataDb = [
    //     { data: ['Option 1', 'Option 2', 'Option 3', 'Option 4'], id: 'MS1', type: 'Multi Select', selectedOption: [], fieldName: '', placeholder: 'Groups' },
    //     { data: ['Option 5', 'Option 6', 'Option 3', 'Option 4'], id: 'MS2', type: 'Multi Select', selectedOption: [], fieldName: '', placeholder: 'Workspaces' },
    //     { data: ['Option 1', 'Option 2', 'Option 3', 'Option 4'], id: 'MS1', type: 'Multi Select', selectedOption: [], fieldName: '', placeholder: 'Environment' },
    //     { data: ['Option 5', 'Option 6', 'Option 3', 'Option 4'], id: 'MS2', type: 'Multi Select', selectedOption: [], fieldName: '', placeholder: 'Workspaces' },
    // ]
    //const [dropdownData, setDropdownData] = useState(dropdownDataF1);
    console.log(dropdownData)
    let filters = {
        currentPage: 1,
        sortColumn: ''
    }

    const columns = data.length && Object.keys(data[0]) || [];

    let total_page_count = count;
    // Handle sorting

    let setDropSelectedOptions = function (option, id) {
        onDropdownSelect(option, id);
    }
    const sortedData = useMemo(() => {
        if (sortConfig !== null) {
            return [...data].sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return data;
    }, [data, sortConfig]);

    // Handle pagination
    const paginatedData = useMemo(() => {
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        //console.log(onFilterTrigger)
        filters.currentPage = currentPage;
        onFilterTrigger(filters)
        return sortedData.slice(indexOfFirstItem, indexOfLastItem);
    }, [currentPage, sortedData, itemsPerPage]);

    const totalPages = Math.ceil(total_page_count / itemsPerPage);

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


    const [selectedRows, setSelectedRows] = useState([]);

    const handleSelectRow = (id) => {
        if (selectedRows.includes(id)) {
            setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
        } else {
            setSelectedRows([...selectedRows, id]);
        }
    };

    const handleSelectAll = () => {
        if (selectedRows.length === data.length) {
            setSelectedRows([]);
        } else {
            setSelectedRows(data.map((item) => item.id));
        }
    };


    return (
        <div className={styles.tableWrapper}>
           {dropdownData && dropdownData.length && (
            <div className={styles.parentBox}>
                {dropdownData.map((drop) => (
                    <div className={styles.childBox}>
                        <MultiSelectFilter
                            options={drop.data}
                            selectedOptions={drop.selectedOption}
                            id={drop.id}
                            onChange={setDropSelectedOptions}
                            placeholder={drop.placeholder}
                        />
                    </div>
                ))}
            </div>
            )}
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
                        <th>
                            <input
                                type="checkbox"
                                checked={selectedRows.length === data.length}
                                onChange={handleSelectAll}
                            />
                        </th>
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
                            <td>
                                <input
                                    type="checkbox"
                                    checked={selectedRows.includes(row.id)}
                                    onChange={() => handleSelectRow(row.id)}
                                />
                            </td>
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
