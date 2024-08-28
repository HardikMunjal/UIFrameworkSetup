// components/MultiSelectDropdown.js
import { useState, useEffect, useRef } from 'react';

const MultiSelectDropdown = ({ options, selectedOptions, id, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleSelect = (option) => {
    if (selectedOptions.includes(option)) {
      onChange(selectedOptions.filter((item) => item !== option),id);
    } else {
      onChange([...selectedOptions, option],id);
    }
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="multiselect-dropdown" ref={dropdownRef}>
      <div className="dropdown-header" onClick={() => setIsOpen(!isOpen)}>
        {selectedOptions.length > 0 ? selectedOptions.join(', ') : <span className="placeholder">{placeholder}</span>}
        <span className={`arrow ${isOpen ? 'open' : ''}`}></span>
      </div>
      {isOpen && (
        <div className="dropdown-menu">
          {options.map((option) => (
            <label key={option} className="dropdown-item">
              <input
                type="checkbox"
                checked={selectedOptions.includes(option)}
                onChange={() => handleSelect(option)}
              />
              {option}
            </label>
          ))}
        </div>
      )}
      <style jsx>{`
        .multiselect-dropdown {
          position: relative;
          width: 200px;
        }
        .dropdown-header {
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
          background-color: #fff;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .placeholder {
          color: #888;
        }
        .dropdown-menu {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          border: 1px solid #ccc;
          border-radius: 4px;
          background-color: #fff;
          z-index: 1000;
          max-height: 200px;
          overflow-y: auto;
        }
        .dropdown-item {
          padding: 10px;
          cursor: pointer;
          display: flex;
          align-items: center;
        }
        .dropdown-item input {
          margin-right: 8px;
        }
        .arrow {
          transition: transform 0.2s;
        }
        .arrow.open {
          transform: rotate(180deg);
        }
      `}</style>
    </div>
  );
};

export default MultiSelectDropdown;
