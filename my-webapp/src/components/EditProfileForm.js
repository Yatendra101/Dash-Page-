import React, { useState } from 'react';
import Select from 'react-select';

// Define the available roles
const roles = [
  'Product Designer',
  'Product Manager',
  'Frontend Developer',
  'Backend Developer'
];

// Define the available teams
const allTeams = [
  { value: 'Design', label: 'Design' },
  { value: 'Product', label: 'Product' },
  { value: 'Marketing', label: 'Marketing' },
  { value: 'Technology', label: 'Technology' }
];

const EditProfileForm = ({ person, onClose }) => {
  const [name, setName] = useState(person?.name || '');
  const [email, setEmail] = useState(person?.email || '');
  const [role, setRole] = useState(person?.role || roles[0]);
  const [status, setStatus] = useState(person?.status || 'Active');
  const [selectedTeams, setSelectedTeams] = useState(person?.teams.map(team => ({ value: team, label: team })) || []);

  const handleSave = () => {
    // Implement save functionality
    const teams = selectedTeams.map(team => team.value);
    console.log('Saving:', { name, email, role, status, teams });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex flex-col items-center mb-4">
          <img
            src={person?.image || 'default-image-url'} // Provide a default image URL if necessary
            alt={name}
            className="w-24 h-24 rounded-full mb-4"
          />
          <button
            onClick={() => console.log('Change Photo')}
            className="bg-blue-500 text-white py-1 px-2 rounded-md hover:bg-blue-600 transition"
          >
            Change Photo
          </button>
          <button
            onClick={() => console.log('Remove Photo')}
            className="bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-600 transition mt-2"
          >
            Remove Photo
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 border border-gray-300 rounded w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 border border-gray-300 rounded w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Role:</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="p-2 border border-gray-300 rounded w-full"
          >
            {roles.map((r, index) => (
              <option key={index} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Status:</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="p-2 border border-gray-300 rounded w-full"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Teams:</label>
          <Select
            isMulti
            options={allTeams}
            value={selectedTeams}
            onChange={setSelectedTeams}
            className="basic-multi-select"
            classNamePrefix="select"
          />
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400 transition ml-2"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileForm;
