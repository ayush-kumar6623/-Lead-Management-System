import React from 'react'

function Dashboard({ leads, setActiveTab, onOpenAddLead }) {
  const totalLeads = leads.length
  const totalFollowUps = leads.reduce((acc, lead) => acc + (lead.followUps ? lead.followUps.length : 0), 0)
  const recentLeads = [...leads].slice(-3).reverse()

  return (
    <div className="main-content">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome to DigiCoders Technologies Lead Management System</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Leads</h3>
          <div className="stat-number">{totalLeads}</div>
        </div>

        <div className="stat-card green">
          <h3>Total Follow-ups</h3>
          <div className="stat-number">{totalFollowUps}</div>
        </div>

        <div className="stat-card orange">
          <h3>Active Services</h3>
          <div className="stat-number">6</div>
        </div>
      </div>

      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="quick-actions-btns">
          <button className="btn btn-primary" onClick={() => setActiveTab('leads')}>
            View All Leads
          </button>
          <button className="btn btn-secondary" onClick={onOpenAddLead}>
            + Add New Lead
          </button>
        </div>
      </div>

    </div>
  )
}

export default Dashboard
