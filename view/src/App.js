import { Routes, Route } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorPage, Home, Signin, Signup } from './pages'

import './App.css';

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorPage}>
      <Routes>
        <Route path='/' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/home' element={<Home />} />
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
