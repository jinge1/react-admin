import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

// import './index.css'
// import './App.css'

const HomePage = lazy(() => import('../views/Home'))
const LoginPage = lazy(() => import('../views/Login'))
const RegisterPage = lazy(() => import('../views/Register'))

export default function CommRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  )
}

