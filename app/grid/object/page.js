// pages/index.js
"use client";
import React, { useEffect, useState } from 'react';
import MultiSelectFilter from '../../../component/MultiSelectFilter/MultiSelectFilter';
import DynamicTable from '../../../component/DynamicTable/DynamicTable';
import styles from './object.module.css';

export default function Home() {
  const initialData = []
  const [objectData, setObjectData] = useState(initialData);
  const [count, setCount] = useState('0');
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [options, setOptions] = useState([]);
  const [filters, setFilters] = useState([]);
  const [page, setPage] = useState('0');

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
    fetch('http://localhost:5000/objects')
      .then(response => response.json())
      .then(data => setObjectData(data));
  }, [page]); // Run only once on mount

  useEffect(() => {
    fetch(`http://localhost:5000/workspaces/count`)
      .then(response => response.json())
      .then(data => {
        setCount(data[0].total_count)
      }
      );
  }, []); // Run only once on mount



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
      <DynamicTable data={objectData} count={count} onSave={handleSave} onFilterTrigger={handleFilters}/>
    </div>
    </div>
  );
}
