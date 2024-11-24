import React from "react";
import Ticket from "./Ticket";

import urgentPriorityIcon from "./icons/urgent_color.svg";
import HighPriorityIcon from "./icons/high.svg";
import MediumPriorityIcon from "./icons/Med.svg";
import LowPriorityIcon from "./icons/Low.svg";
import NoPriorityIcon from "./icons/No-priority.svg";

import InProgressIcon from "./icons/in-progress.svg";
import DoneIcon from "./icons/Done.svg";
import BacklogIcon from "./icons/Backlog.svg";
import TodoIcon from "./icons/To-do.svg";
import CancelledIcon from "./icons/Cancelled.svg";
import AddIcon from "./icons/add.svg";
import ThreeDotsIcon from "./icons/3 dot menu.svg";

const KanbanBoard = ({ tickets, users, groupBy, sortBy }) => {
  const userMap = {};
  users.forEach((user) => {
    userMap[user.id] = user.name;
  });

  const priorityLabels = {
    4: "Urgent",
    3: "High",
    2: "Medium",
    1: "Low",
    0: "No priority",
  };

  const statusLabels = {
    inProgress: "In Progress",
    done: "Done",
    backlog: "Backlog",
    todo: "To Do",
    cancelled: "Cancelled",
  };

  const getPriorityIcon = (groupLabel) => {
    switch (groupLabel) {
      case "Urgent":
        return <img src={urgentPriorityIcon} alt="Urgent Priority Icon" />;
      case "High":
        return <img src={HighPriorityIcon} alt="High Priority Icon" />;
      case "Medium":
        return <img src={MediumPriorityIcon} alt="Medium Priority Icon" />;
      case "Low":
        return <img src={LowPriorityIcon} alt="Low Priority Icon" />;
      default:
        return <img src={NoPriorityIcon} alt="No Priority Icon" />;
    }
  };

  const getStatusIcon = (groupLabel) => {
    switch (groupLabel) {
      case "In progress":
        return <img src={InProgressIcon} alt="In Progress Icon" />;
      case "Done":
        return <img src={DoneIcon} alt="Done Icon" />;
      case "Backlog":
        return <img src={BacklogIcon} alt="Backlog Icon" />;
      case "Todo":
        return <img src={TodoIcon} alt="To Do Icon" />;
      case "Cancelled":
        return <img src={CancelledIcon} alt="Cancelled Icon" />;
      default:
        return null;
    }
  };

  const getIcon = (groupLabel) => {
    if (groupBy === "status") {
      return getStatusIcon(groupLabel);
    }
    return getPriorityIcon(groupLabel);
  };

  const groupedTickets = groupTickets(tickets, groupBy);

  if (groupBy === "status") {
    if (!groupedTickets.done) {
      groupedTickets.done = [];
    }
    if (!groupedTickets.cancelled) {
      groupedTickets.cancelled = [];
    }
  }

  const sortedTickets = sortGroupedTickets(groupedTickets, sortBy);

  return (
    <div className="kanban-board">
      <div className="columns">
        {Object.keys(sortedTickets).map((group) => {
          let groupLabel;
          if (groupBy === "user") {
            groupLabel = userMap[group];
          } else if (groupBy === "priority") {
            groupLabel = priorityLabels[group] || group;
          } else if (groupBy === "status") {
            groupLabel = statusLabels[group] || group;
          } else {
            groupLabel = group;
          }

          return (
            <div key={group} className={`column ${groupLabel}`}>
              <div className="column-header">
                <div className="label-logo">
                  {getIcon(groupLabel)}
                  <h2 className="column-title">{groupLabel}</h2>
                  <span className="task-count">
                    {sortedTickets[group].length}
                  </span>
                </div>
                <div className="img-logo">
                  <img src={AddIcon} alt="Add Icon" className="header-icon" />
                  <img
                    src={ThreeDotsIcon}
                    alt="Three Dots Icon"
                    className="header-icon"
                  />
                </div>
              </div>

              {sortedTickets[group].map((ticket) => (
                <div key={ticket.id}>
                  <Ticket ticket={ticket} userName={userMap[ticket.userId]} />
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const groupTickets = (tickets, groupBy) => {
  if (!Array.isArray(tickets)) {
    return [];
  }
  return tickets.reduce((groups, ticket) => {
    const groupKey = groupBy === "user" ? ticket.userId : ticket[groupBy];
    if (!groups[groupKey]) {
      groups[groupKey] = [];
    }
    groups[groupKey].push(ticket);
    return groups;
  }, {});
};

const sortGroupedTickets = (groupedTickets, sortBy) => {
  const sortedGroups = {};
  for (const group in groupedTickets) {
    sortedGroups[group] = groupedTickets[group].sort((a, b) => {
      if (sortBy === "priority") {
        return b.priority - a.priority;
      } else if (sortBy === "title") {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
  }
  return sortedGroups;
};

export default KanbanBoard;
