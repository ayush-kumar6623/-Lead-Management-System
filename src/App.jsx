import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import Leads from './components/Leads'
import AddLeadModal from './components/AddLeadModal'
import FollowUpModal from './components/FollowUpModal'
import HistoryModal from './components/HistoryModal'
import './App.css'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('digicoders_is_logged_in') === 'true'
  })

  const [activeTab, setActiveTab] = useState('dashboard')

  const [leads, setLeads] = useState(() => {
    const saved = localStorage.getItem('digicoders_leads')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed)) {
          const isDefaultMockLead = (lead) =>
            (lead.id === 1 && lead.name === 'Ayush Kumar') ||
            (lead.id === 2 && lead.name === 'Aman') ||
            (lead.id === 3 && lead.name === 'Amit')

          return parsed.filter((lead) => !isDefaultMockLead(lead))
        }
      } catch {
        return []
      }
    }
    return []
  })

  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isFollowUpModalOpen, setIsFollowUpModalOpen] = useState(false)
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false)
  const [selectedLead, setSelectedLead] = useState(null)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    localStorage.setItem('digicoders_leads', JSON.stringify(leads))
  }, [leads])

  const showSuccess = (msg) => {
    setSuccessMessage(msg)
    setErrorMessage('')
    setTimeout(() => {
      setSuccessMessage('')
    }, 4000)
  }

  const handleLogin = () => {
    setIsLoggedIn(true)
    localStorage.setItem('digicoders_is_logged_in', 'true')
    setActiveTab('dashboard')
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    localStorage.removeItem('digicoders_is_logged_in')
    setActiveTab('dashboard')
  }

  const handleSaveLead = (newLead) => {
    setLeads((prev) => [newLead, ...prev])
    showSuccess('New lead has been added successfully.')
  }

  const handleOpenFollowUpModal = (lead) => {
    setSelectedLead(lead)
    setIsFollowUpModalOpen(true)
  }

  const handleOpenHistoryModal = (lead) => {
    setSelectedLead(lead)
    setIsHistoryModalOpen(true)
  }

  const handleSaveFollowUp = (leadId, messageText) => {
    const newFollowUp = {
      id: Date.now(),
      date: new Date().toLocaleString(),
      message: messageText
    }

    setLeads((prevLeads) =>
      prevLeads.map((lead) => {
        if (lead.id === leadId) {
          const updatedFollowUps = lead.followUps ? [...lead.followUps, newFollowUp] : [newFollowUp]
          return { ...lead, followUps: updatedFollowUps }
        }
        return lead
      })
    )

    showSuccess('Follow-up message saved successfully.')
  }

  const handleOpenAddLeadFromDashboard = () => {
    setActiveTab('leads')
    setIsAddModalOpen(true)
  }

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />
  }

  return (
    <div className="app-container">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={handleLogout}
      />

      {activeTab === 'dashboard' && (
        <Dashboard
          leads={leads}
          setActiveTab={setActiveTab}
          onOpenAddLead={handleOpenAddLeadFromDashboard}
        />
      )}

      {activeTab === 'leads' && (
        <Leads
          leads={leads}
          onOpenAddLeadModal={() => setIsAddModalOpen(true)}
          onOpenFollowUpModal={handleOpenFollowUpModal}
          onOpenHistoryModal={handleOpenHistoryModal}
          successMessage={successMessage}
          errorMessage={errorMessage}
        />
      )}

      <AddLeadModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSaveLead={handleSaveLead}
      />

      <FollowUpModal
        isOpen={isFollowUpModalOpen}
        lead={selectedLead}
        onClose={() => {
          setIsFollowUpModalOpen(false)
          setSelectedLead(null)
        }}
        onSaveFollowUp={handleSaveFollowUp}
      />

      <HistoryModal
        isOpen={isHistoryModalOpen}
        lead={selectedLead}
        onClose={() => {
          setIsHistoryModalOpen(false)
          setSelectedLead(null)
        }}
      />
    </div>
  )
}

export default App
