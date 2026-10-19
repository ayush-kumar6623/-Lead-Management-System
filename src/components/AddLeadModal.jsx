import React, { useState, useEffect } from 'react'

function AddLeadModal({ isOpen, onClose, onSaveLead }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [mobile, setMobile] = useState('')
  const [service, setService] = useState('')
  const [services, setServices] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/services.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to load services')
        }
        return response.json()
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setServices(data)
        }
      })
      .catch(() => {
        setServices([
          'Web Development',
          'App Development',
          'Digital Marketing',
          'Graphic Designing',
          'SEO Services',
          'Software Testing'
        ])
      })
  }, [])

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!name.trim() || !email.trim() || !mobile.trim() || !service.trim()) {
      setError('All fields are required.')
      return
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailPattern.test(email)) {
      setError('Please enter a valid email address.')
      return
    }

    const mobilePattern = /^[0-9]{10}$/
    if (!mobilePattern.test(mobile)) {
      setError('Mobile number must be exactly 10 digits.')
      return
    }

    setError('')
    onSaveLead({
      id: Date.now(),
      name: name.trim(),
      email: email.trim(),
      mobile: mobile.trim(),
      service: service.trim(),
      followUps: []
    })

    setName('')
    setEmail('')
    setMobile('')
    setService('')
    onClose()
  }

  const handleCancel = () => {
    setName('')
    setEmail('')
    setMobile('')
    setService('')
    setError('')
    onClose()
  }

  return (
    <div className="modal-backdrop">
      <div className="modal-container">
        <div className="modal-header">
          <h3>Add New Lead</h3>
          <button className="close-btn" onClick={handleCancel}>
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {error && <div className="alert alert-danger">{error}</div>}

            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter lead full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Mobile Number (10 digits)</label>
              <input
                type="tel"
                className="form-control"
                placeholder="Enter 10-digit mobile number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Select Service</label>
              <select
                className="form-control"
                value={service}
                onChange={(e) => setService(e.target.value)}
              >
                <option value="">-- Choose a Service --</option>
                {services.map((srv, index) => (
                  <option key={index} value={srv}>
                    {srv}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={handleCancel}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save Lead
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddLeadModal
