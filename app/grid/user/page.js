// pages/index.js
"use client";
import React, { useEffect, useState } from 'react';
import MultiSelectFilter from '../../../component/MultiSelectFilter/MultiSelectFilter';
import DynamicTable from '../../../component/DynamicTable/DynamicTable';
import styles from './user.module.css';

export default function Home() {
  const initialData = [
    { id: 1,Name: 'John Doe', Age: 30, Occupation: 'Developer', Country: 'USA', Name1: 'John Doe', Age1: 30, Occupation1: 'Developer', Country1: 'USA',Name2: 'John Doe', Age2: 30, Occupation2: 'Developer', Country2: 'USA',Name3: 'John Doe', Age3: 30, Occupation3: 'Developer', Country3: 'USA' },
  ]
  const [options, setOptions] = useState([]);
  const [userData, setUserData] = useState(initialData);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSave = (updatedRow) => {
    setData((prevData) =>
      prevData.map((row) =>
        row.Name === updatedRow.Name ? updatedRow : row
      )
    );
  };

  useEffect(() => {
    // First side effect
    fetch('http://localhost:5000/users')
      .then(response => response.json())
      .then(data => setUserData(data));
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
      <DynamicTable data={userData} onSave={handleSave} />
    </div>
    </div>
  );
}
