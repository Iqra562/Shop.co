import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)

// import { ViteReactSSG } from 'vite-react-ssg'
// import {routes} from './config/routes/index.jsx'
// import { BrowserRouter, Route, Routes } from 'react-router-dom';

// export const createApp = ViteReactSSG(
//   () => (
//     <BrowserRouter>
//       <Routes>
//         {routes.map((r, i) => (
//           <Route key={i} path={r.path} element={r.element} />
//         ))}
//       </Routes>
//     </BrowserRouter>
//   ),
//   { routes }
// );
