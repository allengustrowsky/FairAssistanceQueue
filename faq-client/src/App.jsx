import { useState, useEffect } from 'react'
// import reactLogo from './assets/react.svg'
import logo from './assets/FAQ_logo.svg'
import './App.css'  
import Course from '../components/Course'
import CreateCourse from '../components/CreateCourse'
import { useNavigate } from 'react-router-dom'
import { Button, TextField, Typography, Paper } from '@mui/material'

function App() {
  const [testData, setTestData] = useState('')
  const [formData, setFormData] = useState({
    classCode: '',
    adminKey: '',
  })
  const navigate = useNavigate()


// useEffect(() => {
//     const getData = async () => {
//         console.log('useEffect()')
//         const raw = await fetch('http://127.0.0.1:5000/members')
//         console.log(raw)
//         const jsonData = await raw.json()
//         console.log(jsonData)
//         setTestData(jsonData)
//     }
//     getData()
//   }, [])

const handleChange = (event) => {
    const { value, id } = event.target
    setFormData(prevFormData => {
        return {
            ...prevFormData,
            [id]: value,
        }
    })
}

const handleClick = () => {
    // make verification request
    let isAdmin = true
    let isTa = true
    navigate(`/index/${12}`)
}

const handleCreate = () => {
    console.log('createCourse()')
    navigate(`/create`)
}

// DELETE ME ONLY A TEST
const click = async () => {
    const raw = await fetch('http://127.0.0.1:5000/course/index')
    const jsonData = await raw.json()
    console.log(`response; ${jsonData.message}`)
}

  return (
    <div className="app">
        <img className='logo' src={logo} alt='FAQ logo'/>
        <div className="formContainer">
            <Typography variant='h2' component='h1'>Fair Assistance Queue</Typography>
            {/* DELETE BELOW BUTTON - ONLY A TEST */}
            <Button onClick={click}>Click me!</Button>
            <div className="formInputs">
                <Paper 
                    elevation={4} 
                    // sx={{marginBottom: '1rem'}}
                >
                    <TextField 
                        id='classCode'
                        value={formData.classCode}
                        onChange={handleChange}
                        label='Class code' 
                        sx={{width: '20rem'}}
                    />
                </Paper>
                <Paper elevation={4}>
                    <TextField 
                        id='adminKey'
                        value={formData.adminKey}
                        onChange={handleChange}
                        label='Admin key (optional)' 
                        sx={{width: '20rem'}}
                    />
                </Paper>
                {(formData.classCode !== '') &&
                <Button 
                    variant='contained' 
                    size='large' 
                    // sx={{marginTop: '3rem'}}
                    onClick={handleClick}
                >
                    Join Room
                </Button> 
                }
            </div>
            
            <Button 
                onClick={handleCreate} 
                size='large'
                // sx={{marginTop: 'auto'}}
            >
                Create Course
            </Button>
        </div>
        
    </div>
  )
}

export default App
