import React from 'react'
import { Route, Switch } from 'react-router-dom'

import RobotPage from './pages/RobotPage'
import AdminPage from './pages/AdminPage'
import LandingPage from './pages/LandingPage'

function App() {
  return (
    <Switch>
      <Route path="/" component={RobotPage} exact />
      <Route
        path="/everyoneisadmineveryoneisadmineveryoneisadmin"
        component={AdminPage}
        exact
      />
      <Route
        path="/thisislandingthisislandingthisislanding"
        component={LandingPage}
        exact
      />
    </Switch>
  )
}

export default App
