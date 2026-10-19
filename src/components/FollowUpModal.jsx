import React, { useState } from 'react'

function FollowUpModal({ isOpen, lead, onClose, onSaveFollowUp }) {
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  if (!isOpen || !lead) return null

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!message.trim()) {
      setError('Please enter a follow-up message.')
      return
    }

    setError('')
    onSaveFollowUp(lead.id, message.trim())
    setMessage('')
    onClose()
  }

  const handleCancel = () => {
    setMessage('')
    setError('')
    onClose()
  }

  return (
    <div className="modal-backdrop">
      <div className="modal-container">
        <div className="modal-header">
          <h3>Add Follow-up</h3>
          <button className="close-btn" onClick={handleCancel}>
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {error && <div className="alert alert-danger">{error}</div>}

            <div className="lead-preview-info">
              <div><strong>Lead Name:</strong> {lead.name}</div>
              <div><strong>Mobile:</strong> {lead.mobile}</div>
              <div><strong>Service:</strong> {lead.service}</div>
            </div>

            <div className="form-group">
              <label>Follow-up Message</label>
              <textarea
                className="form-control"
                rows="4"
                placeholder="Enter details of conversation or next action..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={handleCancel}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save Follow-up
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default FollowUpModal
