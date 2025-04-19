import React, {useEffect, useState} from 'react'
import Hero from './Components/Hero'
import Services from './Components/Services'
import Contact from './Components/Contact'
import { ThemeProvider } from './Context/ThemeContext'
import Loader from './Components/Loader'


const App = () => {
  const [isLoading, setIsLoading] = useState(true)
  
 

  // fetch('http://localhost:5001/api/status', {
  //   method: 'GET',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // })
  //   .then(response => response.json())
  //   .then(data => console.log(data))
  //   .catch(error => console.error('Error:', error));

  
  useEffect(() => {
   const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000) // Adjust the duration as needed

    return () => clearTimeout(timer)
  }, [])
  return (
    <ThemeProvider>
      <div className=' relative min-h-screen bg-white dark:bg-gray-900 text-red-500 dark:text-yellow-500 transition-colors duration-500'>
        <Loader isLoading={isLoading} />
        {!isLoading && (
        <>
          <Hero />
          <Services />
          <Contact />
        </>
      )}
      </div>
    </ThemeProvider>
  )
}

export default App