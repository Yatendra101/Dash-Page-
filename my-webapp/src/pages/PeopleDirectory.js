import React, { useState } from 'react';
import PeopleTable from '../components/PeopleTable';
import { generateMockData } from '../data/mockData'; // Import your data generator
import AddMemberForm from '../components/AddMemberForm'; // Import AddMemberForm

const PeopleDirectory = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearch = (query) => setSearchQuery(query);
  const handleFilterChange = (status) => setStatusFilter(status);
  const handleAddMember = () => setIsModalOpen(true);

  const handleCloseModal = () => setIsModalOpen(false);

  const handleSubmitForm = (data) => {
    // Handle form submission logic here
    console.log(data);
    setIsModalOpen(false);
  };

  return (
    <div className="p-8">
      
      <PeopleTable
        data={generateMockData()} // Pass your data here
        searchQuery={searchQuery}
        statusFilter={statusFilter}
        onSearch={handleSearch}
        onFilterChange={handleFilterChange}
        onAddMember={handleAddMember}
      />
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Add New Member</h2>
            <AddMemberForm onSubmit={handleSubmitForm} />
            <button
              onClick={handleCloseModal}
              className="mt-4 w-full bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PeopleDirectory;
