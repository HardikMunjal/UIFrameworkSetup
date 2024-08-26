// pages/index.js
"use client";
import React, { useEffect, useState } from 'react';
import MultiSelectFilter from '../../../component/MultiSelectFilter/MultiSelectFilter';
import DynamicTable from '../../../component/DynamicTable/DynamicTable';
import styles from './workspace.module.css';

export default function Home() {
  const initialData = [
     ];
  const [workspaceData, setWorkspaceData] = useState(initialData);

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [options, setOptions] = useState([]);
  const [filters, setFilters] = useState([]);
  const [page, setPage] = useState('0');
  const [count, setCount] = useState('0');

  const handleFilters = (updatedFilters) => {
    console.log(updatedFilters)
    setPage(updatedFilters.currentPage)
    console.log(page)
    //setFilters(updatedFilters);
  };  

  const handleSave = (updatedRow) => {
    setData((prevData) =>
      prevData.map((row) =>
        row.Name === updatedRow.Name ? updatedRow : row
      )
    );
  };

  useEffect(() => {
    // First side effect
    let pno= page || 1;
    fetch(`http://localhost:5000/workspaces?page=${pno}`)
      .then(response => response.json())
      .then(data => {
        setCount(data[0].total_count)
        data.forEach(e => {delete e.total_count});
        setWorkspaceData(data)
      }
    );
  }, [page]); // Run only once on mount



  useEffect(() => {
    // Simulating an API call
    setTimeout(() => {
      setOptions(['Option 1', 'Option 2', 'Option 3', 'Option 4']);
    }, 1000);
  }, []);

  return (
    <div>
      {/* <MultiSelectFilter
        options={options}
        selectedOptions={selectedOptions}
        onChange={setSelectedOptions}
        placeholder="Select options"
      /> */}
    <div className={styles.childtable}>
      <DynamicTable data={workspaceData} count={count} onSave={handleSave} onFilterTrigger={handleFilters} />
    </div>
    </div>
  );
}
