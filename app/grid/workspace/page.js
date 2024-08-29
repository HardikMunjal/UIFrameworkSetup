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
  const [page, setPage] = useState('0');
  const [count, setCount] = useState('0');
  let dropdownDataDb = [
    { data: [], id: 'MS1', type: 'Multi Select', selectedOption: [], fieldName: '', placeholder: 'Groups' },
    { data: [], id: 'MS2', type: 'Multi Select', selectedOption: [], fieldName: '', placeholder: 'Workspaces' },
    { data: [], id: 'MS3', type: 'Multi Select', selectedOption: [], fieldName: '', placeholder: 'Environment' }
  ]

  const [dropdownData, setDropdownData] = useState(dropdownDataDb);

  const handlerDropdownData = (option, id) => {
    setDropdownData(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, selectedOption: option } : item
      )
    );
  };

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
    let pno = page || 1;
    fetch(`http://localhost:5000/workspaces?page=${pno}`)
      .then(response => response.json())
      .then(data => {
        setWorkspaceData(data)
      }
      );
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
    // setTimeout(() => {
    //   setOptions(['Option 1', 'Option 2', 'Option 3', 'Option 4']);
    // }, 1000);
    fetch(`http://localhost:5000/workspaces/group`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: '',
    })
      .then(response => response.json())
      .then(datax => {
        console.log(datax);
        setDropdownData(prevItems => {
          console.log(prevItems)
          return prevItems.map(item => {
            console.log(item)
            return item.id === 'MS1' ? { ...item, data: datax } : item
          })
        });
        console.log(dropdownData)
      }
      )
  }, []);

  useEffect(() => {
    fetch(`http://localhost:5000/workspaces/environment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: '',
    })
      .then(response => response.json())
      .then(datax => {
        console.log(datax);
        setDropdownData(prevItems => {
          console.log(prevItems)
          return prevItems.map(item => {
            console.log(item)
            return item.id === 'MS2' ? { ...item, data: datax } : item
          })
        });
        console.log(dropdownData)
      }
      )
  }, []);

  useEffect(() => {
    fetch(`http://localhost:5000/workspaces/workspace`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: '',
    })
      .then(response => response.json())
      .then(datax => {
        console.log(datax);
        setDropdownData(prevItems => {
          console.log(prevItems)
          return prevItems.map(item => {
            console.log(item)
            return item.id === 'MS3' ? { ...item, data: datax } : item
          })
        });
        console.log(dropdownData)
      }
      )
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
        <DynamicTable data={workspaceData} dropdownData={dropdownData} onDropdownSelect={handlerDropdownData} count={count} onSave={handleSave} onFilterTrigger={handleFilters} />
      </div>
    </div>
  );
}
