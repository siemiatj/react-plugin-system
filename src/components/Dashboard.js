import React from 'react';
import { Link } from 'react-router';

const Dashboard = () => (
  <div className="dashboard">
    <div className="content">This is the main dashboard view</div>
    <footer>
      <Link
        to={'todos'}
        activeStyle={{
          textDecoration: 'none',
          color: 'black',
        }}
      >
        Todos
      </Link>
    </footer>
  </div>
);

export default Dashboard;
