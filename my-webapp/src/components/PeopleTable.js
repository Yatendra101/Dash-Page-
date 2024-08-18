import React, { useMemo, useState } from 'react';
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table';
import { FaSearch, FaEdit, FaTrash, FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
import PeopleForm from './PeopleForm';
import EditProfileForm from './EditProfileForm';
import ConfirmationDialog from './ConfirmationDialog';

const columnHelper = createColumnHelper();

const PeopleTable = ({ data = [], statusFilter = 'All', onAddMember }) => {
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [editPerson, setEditPerson] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [personToDelete, setPersonToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [pageIndex, setPageIndex] = useState(0);
  const pageSize = 10;

  // Define columns
  const columns = useMemo(() => [
    columnHelper.accessor('name', {
      header: () => 'Name',
      cell: info => (
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => handleRowClick(info.row.original)}>
          <img
            src={info.row.original.image}
            alt={info.getValue()}
            className="w-8 h-8 rounded-full"
          />
          <div>
            <div>{info.getValue()}</div>
            <div className="text-gray-500 text-sm">@{info.row.original.username}</div>
          </div>
        </div>
      ),
    }),
    columnHelper.accessor('status', {
      header: () => 'Status',
      cell: info => (
        <div className="flex items-center space-x-2">
          <div
            className={`w-3 h-3 rounded-full ${info.getValue() === 'Active' ? 'bg-green-500' : 'bg-red-500'}`}
          />
          <span>{info.getValue()}</span>
        </div>
      ),
    }),
    columnHelper.accessor('role', {
      header: () => 'Role',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('email', {
      header: () => 'Email',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('teams', {
      header: () => 'Teams',
      cell: info => {
        const teams = info.getValue();
        return Array.isArray(teams) && teams.length > 0 ? teams.join(', ') : 'No teams';
      },
    }),
    columnHelper.accessor('actions', {
      header: () => 'Actions',
      cell: info => (
        <div className="flex space-x-2">
          <FaEdit
            className="text-blue-500 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation(); // Prevent row click
              handleEdit(info.row.original);
            }}
          />
          <FaTrash
            className="text-red-500 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation(); // Prevent row click
              handleDelete(info.row.original);
            }}
          />
        </div>
      ),
    }),
  ], []);

  // Filter data based on search query and status filter
  const filteredData = useMemo(() => {
    if (!data || data.length === 0) return [];

    const lowerCaseQuery = searchQuery.toLowerCase();

    return data.filter(item => {
      const matchesSearch = Object.values(item).some(value =>
        typeof value === 'string' || Array.isArray(value)
          ? value.toString().toLowerCase().includes(lowerCaseQuery)
          : false
      );
      const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [data, searchQuery, statusFilter]);

  // Set up table instance
  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      pagination: { pageIndex, pageSize },
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPageIndex,
  });

  const handleRowClick = (row) => {
    setSelectedPerson(row);
  };

  const handleEdit = (row) => {
    setEditPerson(row);
  };

  const handleDelete = (row) => {
    console.log('Handling delete for:', row); // Debug log
    setPersonToDelete(row);
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    console.log('Confirming delete for:', personToDelete); // Debug log
    if (personToDelete) {
      // Implement delete functionality here
      const updatedData = data.filter(person => person.id !== personToDelete.id);
      console.log('Updated data:', updatedData); // Debug log
      // Update the state or perform an API call to delete the person
    }
    setShowDeleteDialog(false);
    setPersonToDelete(null);
  };

  const closeDialog = () => {
    console.log('Closing delete dialog'); // Debug log
    setShowDeleteDialog(false);
    setPersonToDelete(null);
  };

  const closeForm = () => {
    setSelectedPerson(null);
  };

  const closeEditForm = () => {
    setEditPerson(null);
  };

  const handleSearchInput = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Team Members</h2>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchInput}
              placeholder="Search..."
              className="p-2 border border-gray-300 rounded"
            />
            <FaSearch
              className="text-gray-500 cursor-pointer"
            />
          </div>
          <button
            onClick={onAddMember}
            className="bg-purple-700 text-white py-2 px-4 rounded-md hover:bg-purple-800 transition"
          >
            Add Member
          </button>
        </div>
      </div>
      <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
        <thead className="bg-gray-50">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id} className="bg-gray-50">
              {headerGroup.headers.map(header => {
                const isSorted = header.column.getIsSorted();
                return (
                  <th key={header.id} className="text-left px-6 py-3">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {isSorted === 'desc' && <FaSortDown className="ml-2 text-gray-500" />}
                    {isSorted === 'asc' && <FaSortUp className="ml-2 text-gray-500" />}
                    {isSorted === null && <FaSort className="ml-2 text-gray-500" />}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map(row => (
              <tr
                key={row.id}
                className="hover:bg-gray-100 cursor-pointer"
                onClick={() => handleRowClick(row.original)}
              >
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="px-6 py-4">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="text-center py-4 text-gray-500">
                No results found
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="mt-4 flex justify-between">
        <button
          onClick={() => setPageIndex(old => Math.max(old - 1, 0))}
          disabled={pageIndex === 0}
          className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400 transition"
        >
          Previous
        </button>
        <button
          onClick={() => setPageIndex(old => Math.min(old + 1, Math.ceil(filteredData.length / pageSize) - 1))}
          disabled={pageIndex >= Math.ceil(filteredData.length / pageSize) - 1}
          className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400 transition"
        >
          Next
        </button>
      </div>
      {selectedPerson && (
        <PeopleForm person={selectedPerson} onClose={closeForm} />
      )}
      {editPerson && (
        <EditProfileForm person={editPerson} onClose={closeEditForm} />
      )}
      {showDeleteDialog && (
  <ConfirmationDialog
    isOpen={showDeleteDialog}
    onConfirm={confirmDelete}
    onClose={closeDialog}
  />
)}
      
    </div>
  );
};

export default PeopleTable;
