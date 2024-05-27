import React from 'react';
import { User } from '../types';

interface DataTableProps {
    data: User[];
    onSort: (key: keyof User) => void;
    onRowClick: (user: User) => void;
    sortConfig: { key: keyof User | null; direction: 'asc' | 'desc' };
}

const DataTable: React.FC<DataTableProps> = ({ data, onSort, onRowClick, sortConfig }) => {
    const getSortIndicator = (key: keyof User) => {
        if (sortConfig.key === key) {
            return sortConfig.direction === 'asc' ? '▲' : '▼';
        }
        return '';
    };

    return (
        <table className="table table-bordered">
            <thead>
            <tr>
                <th onClick={() => onSort('id')}>id {getSortIndicator('id')}</th>
                <th onClick={() => onSort('firstName')}>firstName {getSortIndicator('firstName')}</th>
                <th onClick={() => onSort('lastName')}>lastName {getSortIndicator('lastName')}</th>
                <th onClick={() => onSort('email')}>email {getSortIndicator('email')}</th>
                <th onClick={() => onSort('phone')}>phone {getSortIndicator('phone')}</th>
            </tr>
            </thead>
            <tbody>
            {data.map((user) => (
                <tr key={user.phone} onClick={() => onRowClick(user)}>
                    <td>{user.id}</td>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default DataTable;
