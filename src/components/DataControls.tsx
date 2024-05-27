import React, { useState } from 'react';

interface DataControlsProps {
    filterText: string;
    onFilterChange: (filter: string) => void;
    onDataSizeChange: (size: 'small' | 'large') => void;
}

const DataControls: React.FC<DataControlsProps> = ({ filterText, onFilterChange, onDataSizeChange }) => {
    const [localFilterText, setLocalFilterText] = useState(filterText);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalFilterText(e.target.value);
    };

    const handleFilterClick = () => {
        onFilterChange(localFilterText);
    };

    return (
        <div className="mb-3">
            <input
                type="text"
                value={localFilterText}
                onChange={handleInputChange}
                placeholder="Filter..."
                className="form-control mb-2"
            />
            <button onClick={handleFilterClick} className="btn btn-primary mb-2">
                Найти
            </button>
            <div>
                <button onClick={() => onDataSizeChange('small')} className="btn btn-secondary me-2">
                    Small
                </button>
                <button onClick={() => onDataSizeChange('large')} className="btn btn-secondary">
                    Large
                </button>
            </div>
        </div>
    );
};

export default DataControls;
