import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'

import './App.css'

const HomePage = lazy(() => import('./components/Home'))
const LoginPage = lazy(() => import('./components/Login'))
const RegisterPage = lazy(() => import('./components/Register'))

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
        </Switch>
      </Suspense>
      <div className="App">
        <header className="App-header">
          <p>
            Edit9 <code>src/App.js</code> and save to reload.
          </p>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </ul>
          </nav>
        </header>
      </div>
    </BrowserRouter>
  )
}

export default App
