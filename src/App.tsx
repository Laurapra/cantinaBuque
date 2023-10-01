import { PrimeReactProvider } from 'primereact/api';
import './App.css'
import DynamicGlobalStyle from './GlobalStyle';
import { RouterProvider } from 'react-router-dom';
import { appRouter } from './router';

function App() {

  return (
    <>
      <PrimeReactProvider>
        {/* <h1 className="text-red-500 bg-blue-500">SOsY PRO</h1> */}
        <RouterProvider router={appRouter} />
        <DynamicGlobalStyle />
      </PrimeReactProvider>
      
    </>
  )
}

export default App
