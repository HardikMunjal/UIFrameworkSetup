// pages/index.js
"use client";
import React, { useState } from 'react';
import DynamicTable from '../../../component/DynamicTable/DynamicTable';

const initialData = [
  { id: 1,Name: 'John Doe', Age: 30, Occupation: 'Developer', Country: 'USA', Name1: 'John Doe', Age1: 30, Occupation1: 'Developer', Country1: 'USA',Name2: 'John Doe', Age2: 30, Occupation2: 'Developer', Country2: 'USA',Name3: 'John Doe', Age3: 30, Occupation3: 'Developer', Country3: 'USA' },
  { id: 2, Name: 'Jane Smith', Age: 25, Occupation: 'Designer', Country: 'Canada' },
  { id: 3,Name: 'Sam Brown', Age: 35, Occupation: 'Manager', Country: 'UK' },
  // Add more rows as needed
];

export default function Home() {
  const [data, setData] = useState(initialData);

  const handleSave = (updatedRow) => {
    setData((prevData) =>
      prevData.map((row) =>
        row.Name === updatedRow.Name ? updatedRow : row
      )
    );
  };

  return (
    <div>
      <h1>Dynamic Table with Edit Modal</h1>
      <DynamicTable data={data} onSave={handleSave} />
    </div>
  );
}
