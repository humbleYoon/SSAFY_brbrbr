import React from 'react'
import { Route, Switch } from 'react-router-dom'

import RobotPage from './pages/RobotPage'
import AdminPage from './pages/AdminPage'

function App() {
  return (
    <Switch>
      <Route path="/" component={RobotPage} exact />
      <Route
        path="/everyoneisadmineveryoneisadmineveryoneisadmin"
        component={AdminPage}
        exact
      />
    </Switch>
  )
}

export default App
