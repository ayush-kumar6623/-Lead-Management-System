import React from 'react'

function Navbar({ activeTab, setActiveTab, onLogout }) {
  return (
    <nav className="navbar">
      <div className="nav-brand">DigiCoders LMS</div>
      <div className="nav-links">
        <button
          className={activeTab === 'dashboard' ? 'nav-btn active' : 'nav-btn'}
          onClick={() => setActiveTab('dashboard')}
        >
          Dashboard
        </button>
        <button
          className={activeTab === 'leads' ? 'nav-btn active' : 'nav-btn'}
          onClick={() => setActiveTab('leads')}
        >
          Leads
        </button>
        <button className="btn-logout" onClick={onLogout}>
          Logout
        </button>
      </div>
    </nav>
  )
}

export default Navbar
