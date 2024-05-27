// slices/usersSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types';
import { fetchData } from '../services/dataService';
import { AppThunk, RootState } from '../store';

interface UsersState {
    data: User[];
    isLoading: boolean;
    filterText: string;
    dataSize: 'small' | 'large';
}

const initialState: UsersState = {
    data: [],
    isLoading: false,
    filterText: '',
    dataSize: 'small',
};

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setData: (state, action: PayloadAction<User[]>) => {
            state.data = action.payload;
        },
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setFilterText: (state, action: PayloadAction<string>) => {
            state.filterText = action.payload;
        },
        setDataSize: (state, action: PayloadAction<'small' | 'large'>) => {
            state.dataSize = action.payload;
        },
    },
});

export const { setData, setIsLoading, setFilterText, setDataSize } = usersSlice.actions;

export const loadData = (size: 'small' | 'large'): AppThunk => async dispatch => {
    dispatch(setIsLoading(true));
    try {
        const newData = await fetchData(size);
        dispatch(setData(newData));
    } catch (error) {
        console.error('Ошибка получения данных:', error);
    } finally {
        dispatch(setIsLoading(false));
    }
};

export const selectFilteredData = (state: RootState) => {
    const { data, filterText } = state.users;
    return data.filter(user =>
        Object.values(user).some(value =>
            String(value).toLowerCase().includes(filterText.toLowerCase())
        )
    );
};

export const selectDataSize = (state: RootState) => state.users.dataSize;

export default usersSlice.reducer;
