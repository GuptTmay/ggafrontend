import './App.css'
import Hero from './container/Hero'
import Sidebar from './container/Sidebar'
import ToastManager from './components/ToastManager'

function App() {
  return (
   <div className='flex flex-row items-center h-screen overflow-hidden bg-amber-100'>
        <Sidebar></Sidebar>
        <Hero></Hero>
        <ToastManager></ToastManager>
    </div>
  )
}

export default App
