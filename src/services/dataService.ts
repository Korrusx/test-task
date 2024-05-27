import { User } from '../types';

export const fetchData = async (size: 'small' | 'large'): Promise<User[]> => {
    const url = size === 'small'
        ? 'http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}'
        : 'http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}';

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Ошибка получения данных');
    }
    const newData: User[] = await response.json();
    return newData;
};