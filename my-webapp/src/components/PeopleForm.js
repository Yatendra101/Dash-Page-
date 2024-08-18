import React from 'react';

const PeopleForm = ({ person, onClose }) => {
  if (!person) return null;

  const {
    name,
    image,
    username,
    role,
    dob,
    gender,
    nationality,
    contactNumber,
    email,
    workEmail,
    research = 'No research topics available',
    publications = [{ title: 'No publications available', year: '', journal: '' }] // Default single publication
  } = person;

  // Handle case where research might be an array
  const renderResearch = Array.isArray(research) ? research.join(', ') : research;

  // Handle case where publications might be an array
  const renderPublications = Array.isArray(publications)
    ? publications.map((pub, index) => (
        <div key={index}>
          <strong>{pub.title}</strong> ({pub.year}) - {pub.journal}
        </div>
      ))
    : publications;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl" style={{ height: '80vh', display: 'flex', flexDirection: 'column' }}>
        {/* Header with Close Button */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{name}'s Profile</h2>
          <button onClick={onClose} className="text-red-500 hover:text-red-700 text-xl">
            &times;
          </button>
        </div>
        
        {/* Profile Section */}
        <div className="flex" style={{ height: '33%' }}>
          <div className="w-1/3 flex items-center justify-center">
            <img src={image} alt={name} className="w-24 h-24 rounded-full" />
          </div>
          <div className="w-2/3 pl-4 flex flex-col justify-center">
            <h2 className="text-2xl font-bold">{name}</h2>
            <p><strong>Username:</strong> @{username}</p>
            <p><strong>Role:</strong> {role}</p>
          </div>
        </div>

        {/* Personal Information Section */}
        <div className="flex flex-col" style={{ height: '40%' }}>
          <h3 className="font-bold mb-2">Personal Information</h3>
          <p><strong>Date of Birth:</strong> {dob}</p>
          <p><strong>Gender:</strong> {gender}</p>
          <p><strong>Nationality:</strong> {nationality}</p>
          <p><strong>Contact Number:</strong> {contactNumber}</p>
          <p><strong>Email:</strong> {email}</p>
          <p><strong>Work Email:</strong> {workEmail}</p>
        </div>

        {/* Research and Publications Section */}
        <div className="flex-1 mt-4" style={{ height: '27%' }}>
          <h3 className="font-bold mb-2">Research and Publications</h3>
          <p><strong>Research:</strong> {renderResearch}</p>
          <div>
            <strong>Publications:</strong>
            {typeof renderPublications === 'string' ? (
              <p>{renderPublications}</p>
            ) : (
              <div>{renderPublications}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PeopleForm;
