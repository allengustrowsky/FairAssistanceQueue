import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  const [testData, setTestData] = useState('')
  useEffect(() => {
    const getData = async () => {
        const raw = await fetch('http://localhost:5000/members')
        console.log(raw)
        const jsonData = await raw.json()
        console.log(jsonData)
        setTestData(jsonData)

    }
    getData()
  }, [])


  return (
    <div className="App">
        <h1>Test call page</h1>
        {testData === '' ? 
        <h3>Loading...</h3>
        : 
        testData['members'].map((member, index) => {
            return <p key={index}>{member}</p>
        })

        }
    </div>
  )
}

export default App
