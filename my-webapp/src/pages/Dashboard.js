import React from 'react';

const Dashboard = ({ currentUser }) => {
  console.log('Dashboard currentUser:', currentUser); // Log currentUser to debug

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold">Welcome, {currentUser.name}!</h2> {/* Use currentUser name */}
    </div>
  );
};

export default Dashboard;
