import { useMemo } from 'react';
import { User } from '../types';

export const useFilter = (data: User[], filterText: string) => {
    return useMemo(() => {
        return data.filter(user =>
            Object.values(user).some(value =>
                String(value).toLowerCase().includes(filterText.toLowerCase())
            )
        );
    }, [data, filterText]);
};