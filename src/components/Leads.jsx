import React from 'react'

function Leads({
  leads,
  onOpenAddLeadModal,
  onOpenFollowUpModal,
  onOpenHistoryModal,
  successMessage,
  errorMessage
}) {
  return (
    <div className="main-content">
      <div className="page-header">
        <div>
          <h1>Leads Management</h1>
          <p style={{ color: '#6c757d', fontSize: '14px', marginTop: '4px' }}>
            View and manage all customer inquiries and follow-ups
          </p>
        </div>
        <button className="btn btn-primary" onClick={onOpenAddLeadModal}>
          + Add Lead
        </button>
      </div>

      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

      <div className="table-wrapper">
        {leads.length === 0 ? (
          <div className="empty-state">
            No leads found. Click the &ldquo;+ Add Lead&rdquo; button above to create your first lead.
          </div>
        ) : (
          <table className="leads-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile Number</th>
                <th>Service</th>
                <th>Follow-ups</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead, index) => {
                const followUpsCount = lead.followUps ? lead.followUps.length : 0

                return (
                  <tr key={lead.id}>
                    <td>{index + 1}</td>
                    <td><strong>{lead.name}</strong></td>
                    <td>{lead.email}</td>
                    <td>{lead.mobile}</td>
                    <td>
                      <span className="badge badge-service">{lead.service}</span>
                    </td>
                    <td>
                      <button
                        className="btn-history"
                        onClick={() => onOpenHistoryModal(lead)}
                        title="Click to view history"
                      >
                        History ({followUpsCount})
                      </button>
                    </td>
                    <td>
                      <div className="action-cell">
                        <a href={`tel:${lead.mobile}`} className="btn-call" title="Call lead">
                          Call
                        </a>
                        <a href={`mailto:${lead.email}`} className="btn-mail" title="Mail lead">
                          Mail
                        </a>
                        <button
                          className="btn-followup"
                          onClick={() => onOpenFollowUpModal(lead)}
                          title="Add follow-up note"
                        >
                          + Follow-up
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default Leads
