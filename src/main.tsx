import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { AppRoutes } from './AppRoutes'
import { HashRouter as Router } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <Router>
        <AppRoutes />
      </Router>
    </Provider>
  </StrictMode>,
)
