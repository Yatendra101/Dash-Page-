import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import PeopleDirectory from './pages/PeopleDirectory';
import AddMemberForm from './components/AddMemberForm';
import { generateMockData } from './data/mockData'; // Import mock data generator
import './App.css';

const mockData = generateMockData();
const currentUser = mockData[0]; // Simulating the current user

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Pass currentUser to Navbar */}
        <Navbar onSearch={setSearchQuery} currentUser={currentUser} />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 p-4"> {/* Main content area */}
            <Routes>
              {/* Pass currentUser to Dashboard */}
              <Route path="/" element={<Dashboard currentUser={currentUser} />} />
              <Route path="/people" element={<PeopleDirectory searchQuery={searchQuery} />} />
              <Route path="/add-member" element={<AddMemberForm />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;
