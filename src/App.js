import React, { useState, useEffect } from "react";
import KanbanBoard from "./components/KanbanBoard";
import "./App.css";
import LeftLogo from './components/icons/Display.svg';
import RightLogo from './components/icons/add.svg';

const App = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupBy, setGroupBy] = useState("status");
  const [sortBy, setSortBy] = useState("priority");
  const [loading, setLoading] = useState(true);

  const apiKey = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.quicksell.co/v1/internal/frontend-assignment`,
          {
            headers: {
              Authorization: `Bearer ${apiKey}`,
            },
          }
        );
        const data = await response.json();
        setTickets(data.tickets);
        setUsers(data.users);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tickets:", error);
        setLoading(false);
      }
    };

    fetchData();

    const savedGroupBy = localStorage.getItem("groupBy");
    const savedSortBy = localStorage.getItem("sortBy");
    if (savedGroupBy) setGroupBy(savedGroupBy);
    if (savedSortBy) setSortBy(savedSortBy);
  }, [apiKey]);

  useEffect(() => {
    localStorage.setItem("groupBy", groupBy);
    localStorage.setItem("sortBy", sortBy);
  }, [groupBy, sortBy]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="app">
      <header className="board-header">
        <div className="controls">
          <div className="dropdown">
            <button className="dropbtn">
              <img src={LeftLogo} alt="Left Logo" className="logo" />
              <p> DISPLAY </p>
              <img src={RightLogo} alt="Right Logo" className="logo" />
            </button>
            <div className="dropdown-content">
              <div className="sortTag">
                <label>Grouping</label>
                <select
                  value={groupBy}
                  onChange={(e) => setGroupBy(e.target.value)}
                >
                  <option value="status">Status</option>
                  <option value="user">User</option>
                  <option value="priority">Priority</option>
                </select>
              </div>
              <div className="sortTag">
                <label>Ordering</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="priority">Priority</option>
                  <option value="title">Title</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </header>
      <KanbanBoard
        tickets={tickets}
        users={users}
        groupBy={groupBy}
        sortBy={sortBy}
      />
    </div>
  );
};

export default App;
