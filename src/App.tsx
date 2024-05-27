import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DataTable from './components/DataTable';
import UserDetails from './components/UserDetails';
import AddUserForm from './components/AddUserForm';
import Pagination from './components/Pagination';
import DataControls from './components/DataControls';
import 'bootstrap/dist/css/bootstrap.min.css';
import { RootState } from './store';
import { loadData, selectDataSize, setFilterText, setDataSize } from './slices/usersSlice';
import { User } from './types';
import { useSorting } from './hooks/useSorting';
import ErrorBoundary from "./components/ErrorBoundary";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const allData = useSelector((state: RootState) => state.users.data);
  const isLoading = useSelector((state: RootState) => state.users.isLoading);
  const dataSize = useSelector(selectDataSize);
  const filterText = useSelector((state: RootState) => state.users.filterText);
  const [filteredData, setFilteredData] = useState<User[]>(allData);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 50;
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const { sortedData, sortConfig, handleSort } = useSorting(paginatedData);

  useEffect(() => {
    dispatch(loadData(dataSize) as any);
  }, [dataSize, dispatch]);

  useEffect(() => {
    setFilteredData(allData);
  }, [allData]);

  const handleFilterChange = (filter: string) => {
    dispatch(setFilterText(filter));
    const lowercasedFilter = filter.toLowerCase();
    setFilteredData(
        allData.filter(
            (user) =>
                user.firstName.toLowerCase().includes(lowercasedFilter) ||
                user.lastName.toLowerCase().includes(lowercasedFilter) ||
                user.email.toLowerCase().includes(lowercasedFilter) ||
                user.phone.toLowerCase().includes(lowercasedFilter)
        )
    );
    setCurrentPage(1); // Reset to the first page after filtering
  };

  const handleDataSizeChange = (size: 'small' | 'large') => {
    dispatch(setDataSize(size));
  };

  const handleRowClick = (user: User) => {
    setSelectedUser(user);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
      <ErrorBoundary>
      <div className="container">
        <h1 className="mt-4 mb-4">Data Table</h1>
        <DataControls filterText={filterText} onFilterChange={handleFilterChange} onDataSizeChange={handleDataSizeChange} />
        <AddUserForm />
        {isLoading ? (
            <div className="d-flex justify-content-center">
              <div className="spinner-border" role="status">
                <span className="sr-only"></span>
              </div>
            </div>
        ) : (
            <>
              <DataTable data={sortedData} onRowClick={handleRowClick} onSort={handleSort} sortConfig={sortConfig} />
              {selectedUser && <UserDetails user={selectedUser} />}
              <Pagination
                  itemsPerPage={itemsPerPage}
                  totalItems={filteredData.length}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
              />
            </>
        )}
      </div>
      </ErrorBoundary>
  );
};

export default App;
