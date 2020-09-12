import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Nav from './Components/Nav'


const App = () => {
  return (
    <BrowserRouter>
    <Nav />
        <Switch>
          <Route exact path='/' component={Home} />
        </Switch>
    </BrowserRouter>
  )
}

export default App