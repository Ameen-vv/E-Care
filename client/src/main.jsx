import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import Contexts from './store/Contexts'


ReactDOM.createRoot(document.getElementById('root')).render(
  <Contexts>
  <App />
  </Contexts>
)
