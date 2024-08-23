// pages/index.js
"use client";
import React, { useEffect, useState } from 'react';
import MultiSelectFilter from '../../../component/MultiSelectFilter/MultiSelectFilter';
import DynamicTable from '../../../component/DynamicTable/DynamicTable';
import styles from './workspace.module.css';

export default function Home() {
  const initialData = [
    { id: 1,Name: 'John Doe', Age: 30, Occupation: 'Developer', Country: 'USA', Name1: 'John Doe', Age1: 30, Occupation1: 'Developer', Country1: 'USA',Name2: 'John Doe', Age2: 30, Occupation2: 'Developer', Country2: 'USA',Name3: 'John Doe', Age3: 30, Occupation3: 'Developer', Country3: 'USA' },
    { id: 2,Name: 'Doe', Age: 30, Occupation: 'Developer', Country: 'USA', Name1: 'John Doe', Age1: 30, Occupation1: 'Developer', Country1: 'USA',Name2: 'John Doe', Age2: 30, Occupation2: 'Developer', Country2: 'USA',Name3: 'John Doe', Age3: 30, Occupation3: 'Developer', Country3: 'USA' },
    { id: 3,Name: 'John', Age: 30, Occupation: 'Developer', Country: 'USA', Name1: 'John Doe', Age1: 30, Occupation1: 'Developer', Country1: 'USA',Name2: 'John Doe', Age2: 30, Occupation2: 'Developer', Country2: 'USA',Name3: 'John Doe', Age3: 30, Occupation3: 'Developer', Country3: 'USA' },
    { id: 4,Name: 'John Doe', Age: 30, Occupation: 'Developer', Country: 'USA', Name1: 'John Doe', Age1: 30, Occupation1: 'Developer', Country1: 'USA',Name2: 'John Doe', Age2: 30, Occupation2: 'Developer', Country2: 'USA',Name3: 'John Doe', Age3: 30, Occupation3: 'Developer', Country3: 'USA' },
    { id: 5,Name: 'Doe', Age: 30, Occupation: 'Developer', Country: 'USA', Name1: 'John Doe', Age1: 30, Occupation1: 'Developer', Country1: 'USA',Name2: 'John Doe', Age2: 30, Occupation2: 'Developer', Country2: 'USA',Name3: 'John Doe', Age3: 30, Occupation3: 'Developer', Country3: 'USA' },
    { id: 6,Name: 'John', Age: 30, Occupation: 'Developer', Country: 'USA', Name1: 'John Doe', Age1: 30, Occupation1: 'Developer', Country1: 'USA',Name2: 'John Doe', Age2: 30, Occupation2: 'Developer', Country2: 'USA',Name3: 'John Doe', Age3: 30, Occupation3: 'Developer', Country3: 'USA' },
    { id: 7,Name: 'John Doe', Age: 30, Occupation: 'Developer', Country: 'USA', Name1: 'John Doe', Age1: 30, Occupation1: 'Developer', Country1: 'USA',Name2: 'John Doe', Age2: 30, Occupation2: 'Developer', Country2: 'USA',Name3: 'John Doe', Age3: 30, Occupation3: 'Developer', Country3: 'USA' },
    { id: 8,Name: 'Doe', Age: 30, Occupation: 'Developer', Country: 'USA', Name1: 'John Doe', Age1: 30, Occupation1: 'Developer', Country1: 'USA',Name2: 'John Doe', Age2: 30, Occupation2: 'Developer', Country2: 'USA',Name3: 'John Doe', Age3: 30, Occupation3: 'Developer', Country3: 'USA' },
    { id: 9,Name: 'John', Age: 30, Occupation: 'Developer', Country: 'USA', Name1: 'John Doe', Age1: 30, Occupation1: 'Developer', Country1: 'USA',Name2: 'John Doe', Age2: 30, Occupation2: 'Developer', Country2: 'USA',Name3: 'John Doe', Age3: 30, Occupation3: 'Developer', Country3: 'USA' },
    { id: 10,Name: 'John Doe', Age: 30, Occupation: 'Developer', Country: 'USA', Name1: 'John Doe', Age1: 30, Occupation1: 'Developer', Country1: 'USA',Name2: 'John Doe', Age2: 30, Occupation2: 'Developer', Country2: 'USA',Name3: 'John Doe', Age3: 30, Occupation3: 'Developer', Country3: 'USA' },
    { id: 11,Name: 'Doe', Age: 30, Occupation: 'Developer', Country: 'USA', Name1: 'John Doe', Age1: 30, Occupation1: 'Developer', Country1: 'USA',Name2: 'John Doe', Age2: 30, Occupation2: 'Developer', Country2: 'USA',Name3: 'John Doe', Age3: 30, Occupation3: 'Developer', Country3: 'USA' },
    { id: 12,Name: 'John', Age: 30, Occupation: 'Developer', Country: 'USA', Name1: 'John Doe', Age1: 30, Occupation1: 'Developer', Country1: 'USA',Name2: 'John Doe', Age2: 30, Occupation2: 'Developer', Country2: 'USA',Name3: 'John Doe', Age3: 30, Occupation3: 'Developer', Country3: 'USA' },
    { id: 13,Name: 'John Doe', Age: 30, Occupation: 'Developer', Country: 'USA', Name1: 'John Doe', Age1: 30, Occupation1: 'Developer', Country1: 'USA',Name2: 'John Doe', Age2: 30, Occupation2: 'Developer', Country2: 'USA',Name3: 'John Doe', Age3: 30, Occupation3: 'Developer', Country3: 'USA' },
    { id: 14,Name: 'Doe', Age: 30, Occupation: 'Developer', Country: 'USA', Name1: 'John Doe', Age1: 30, Occupation1: 'Developer', Country1: 'USA',Name2: 'John Doe', Age2: 30, Occupation2: 'Developer', Country2: 'USA',Name3: 'John Doe', Age3: 30, Occupation3: 'Developer', Country3: 'USA' },
    { id: 15,Name: 'John', Age: 30, Occupation: 'Developer', Country: 'USA', Name1: 'John Doe', Age1: 30, Occupation1: 'Developer', Country1: 'USA',Name2: 'John Doe', Age2: 30, Occupation2: 'Developer', Country2: 'USA',Name3: 'John Doe', Age3: 30, Occupation3: 'Developer', Country3: 'USA' },
  
    // Add more rows as needed
  ];
  const [workspaceData, setWorkspaceData] = useState(initialData);

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [options, setOptions] = useState([]);

  

  const handleSave = (updatedRow) => {
    setData((prevData) =>
      prevData.map((row) =>
        row.Name === updatedRow.Name ? updatedRow : row
      )
    );
  };

  useEffect(() => {
    // First side effect
    fetch('http://localhost:5000/workspaces')
      .then(response => response.json())
      .then(data => setWorkspaceData(data));
  }, []); // Run only once on mount



  useEffect(() => {
    // Simulating an API call
    setTimeout(() => {
      setOptions(['Option 1', 'Option 2', 'Option 3', 'Option 4']);
    }, 1000);
  }, []);

  return (
    <div>
      <MultiSelectFilter
        options={options}
        selectedOptions={selectedOptions}
        onChange={setSelectedOptions}
        placeholder="Select options"
      />
    <div className={styles.childtable}>
      <DynamicTable data={workspaceData} onSave={handleSave} />
    </div>
    </div>
  );
}
