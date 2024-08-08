import React from 'react'
import routes from './routes';
import { useRoutes } from 'react-router-dom'

function App() {

  const router = useRoutes(routes);

  return (
    <div className='font-Roboto'>
      {router}
    </div>
  )
}

export default App
