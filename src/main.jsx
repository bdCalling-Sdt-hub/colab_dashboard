import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './routes/routes.jsx'
import Providers from './lib/Providers/Providers.jsx'
import { Toaster } from 'sonner'
import SocketProviders from './lib/SocketProviders.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Providers>
      <SocketProviders>
        <RouterProvider router={router} />
      </SocketProviders>
    </Providers>
    <Toaster position="top-right" richColors   toastOptions={{
        duration: 1500,
      }} />
  </StrictMode>,
)
