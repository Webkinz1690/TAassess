import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Login from './Pages/Login'
import Nav from './Components/Nav'
import SignUp from './Pages/Signup';
import Home from './Pages/Home';
import AddPost from './Pages/AddPost';

const App = () => {
  return (
    <BrowserRouter>
    <Nav />
        <Switch>
        <Route exact path="/" component={Home} />
          <Route exact path='/login' component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/new" component={AddPost} />
        </Switch>
    </BrowserRouter>
  )
}

export default App