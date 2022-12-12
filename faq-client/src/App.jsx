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
    courseCode: '',
    adminKey: '',
  })
  const [error, setError] = useState('')
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
    setError('') // remove any validation errors
    setFormData(prevFormData => {
        return {
            ...prevFormData,
            [id]: value,
        }
    })
}

const handleSubmit = async () => {
    // make verification request
    const raw = await fetch('http://127.0.0.1:5000/course/sign-in', {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(formData)
    })
    const jsonData = await raw.json()
    console.log(jsonData)
    
    // handle invalid course code
    if (jsonData.status == 400) {
        setError(jsonData.message)
    } else { // successful request
        navigate(`/index/${jsonData.courseCode}`, {state: {
            courseCode: jsonData.courseCode,
            courseName: jsonData.courseName,
            courseId: jsonData.courseId,
            isAdmin: jsonData.isAdmin,
            isTA: jsonData.isTA
        }})
    }
}

const handleCreate = () => {
    console.log('createCourse()')
    navigate(`/create`)
}

  return (
    <div className="app">
        <img className='logo' src={logo} alt='FAQ logo'/>
        <div className="formContainer">
            <Typography variant='h2' component='h1'>Fair Assistance Queue</Typography>
            <div className="formInputs">
                <Paper 
                    elevation={4} 
                    // sx={{marginBottom: '1rem'}}
                >
                    <TextField 
                        id='courseCode'
                        value={formData.courseCode}
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
                {(error !== '') && 
                <Typography variant='h6' component='p' sx={{color: 'rgb(194, 63, 56)'}}>
                    {error}
                </Typography>
                }
                {(formData.courseCode.trim() !== '') &&
                <Button 
                    variant='contained' 
                    size='large' 
                    // sx={{marginTop: '3rem'}}
                    onClick={handleSubmit}
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
