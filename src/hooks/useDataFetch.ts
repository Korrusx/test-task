import { useState } from 'react';
import { User } from '../types';
import { fetchData } from '../services/dataService';

export const useDataFetch = (setData: React.Dispatch<React.SetStateAction<User[]>>, dataSize: 'small' | 'large') => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const loadData = async () => {
        setIsLoading(true);
        try {
            const newData = await fetchData(dataSize);
            setData(newData);
        } catch (error) {
            console.error('Ошибка получения данных:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return { isLoading, loadData };
};