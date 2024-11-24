import React from 'react';
import userProfile from './icons/userProfile.svg'; 
import threeDash from './icons/No-priority.svg';

const Ticket = ({ ticket, userName }) => {
  return (
    <div className="task-card">
      <div className="task-header">
        <p className="task-id">{ticket.id}</p>
        <img className="avatar" src={userProfile} alt={`${userName} Avatar`} /> 
      </div>
      <h3 className="task-title">{ticket.title}</h3>
      <div className="task-footer">
        <button className="feature-request-btn">
          <span className="circle" /> 
          Feature Request
        </button>
        <button className="three-dash-btn">
          <img className="avatar" src={threeDash} alt="No Priority Icon" /> 
        </button>
      </div>
    </div>
  );
};

export default Ticket;
