import React from 'react'
import ManagePlaces from '../components/ManagePlaces'
import ManageEvents from '../components/ManageEvents'
import ManageRobots from '../components/ManageRobots'

function AdminPage() {
  return (
    <div>
      <ManagePlaces />
      <ManageEvents />
      <ManageRobots />
    </div>
  )
}

export default AdminPage
