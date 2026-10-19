import React from 'react'

function HistoryModal({ isOpen, lead, onClose }) {
  if (!isOpen || !lead) return null

  const followUps = lead.followUps || []

  return (
    <div className="modal-backdrop">
      <div className="modal-container">
        <div className="modal-header">
          <h3>Follow-up History - {lead.name}</h3>
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
        </div>

        <div className="modal-body">
          <div className="lead-preview-info">
            <div><strong>Email:</strong> {lead.email}</div>
            <div><strong>Mobile:</strong> {lead.mobile}</div>
            <div><strong>Service:</strong> {lead.service}</div>
          </div>

          <h4 style={{ marginBottom: '12px', fontSize: '15px', color: '#333333' }}>
            Saved Follow-ups ({followUps.length})
          </h4>

          {followUps.length === 0 ? (
            <div className="empty-state" style={{ padding: '20px' }}>
              No follow-up messages added for this lead yet.
            </div>
          ) : (
            <div>
              {followUps.map((item, index) => (
                <div key={item.id || index} className="followup-item">
                  <div className="followup-date">{item.date}</div>
                  <div className="followup-message">{item.message}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default HistoryModal
