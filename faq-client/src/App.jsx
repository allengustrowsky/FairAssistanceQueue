import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'  
import Course from '../components/Course'
import CreateCourse from '../components/CreateCourse'
import { Navigate, useNavigate } from 'react-router-dom'

function App() {
  const [testData, setTestData] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const getData = async () => {
        const raw = await fetch('http://127.0.0.1:5000/members')
        console.log(raw)
        const jsonData = await raw.json()
        console.log(jsonData)
        setTestData(jsonData)

    }
    getData()
  }, [])

const viewCourse = () => {
    console.log('viewCourse()')
    navigate(`/${12}`)
}

const createCourse = () => {
    console.log('createCourse()')
    navigate(`/create`)
}

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
        <button onClick={createCourse}>Create Course</button>
        <button onClick={viewCourse}>View Course</button>
    </div>
  )
}

export default App
