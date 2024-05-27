import { useState, useMemo } from 'react';
import { User } from '../types';

export const usePagination = (data: User[]) => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 50;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const currentData = useMemo(() => data.slice(indexOfFirstItem, indexOfLastItem), [data, currentPage, itemsPerPage]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return { currentPage, itemsPerPage, handlePageChange, currentData };
};