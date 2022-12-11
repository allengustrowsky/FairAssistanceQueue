import { useState } from 'react'
import { Typography, Paper, TextField, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import logo from '../src/assets/FAQ_logo.svg'

const CreateCourse = (props) => {
    const [formData, setFormData] = useState({
        name: '',
        courseCode: '',
        school: '',
        description: '',
        adminKey: '',
    })
    const navigate = useNavigate()

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
        navigate('/')
    }

    const handleSubmit = async () => {
        // submit request to create course
        const raw = await fetch('http://127.0.0.1:5000/course/create', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(formData)
        })
        const jsonData = await raw.json()

        navigate(`/view`, {state: jsonData})
    }
   
    return (
        <div className='app'>
            <div className="logo" onClick={handleClick}>
                <img className='logo' src={logo} alt='FAQ logo'/>
            </div>
            <div className="formContainer">
                <Typography 
                    variant='h3' 
                    component='h1'
                    // sx={{marginBottom: '8rem'}}
                >
                    Create Course
                </Typography>
                <div className="formInputs">
                    <Paper
                        elevation={4}
                    >
                        <TextField
                            id='name'
                            value={formData.name}
                            onChange={handleChange}
                            label='Name'
                            sx={{width: '20rem'}}
                        />
                    </Paper>

                    <Paper
                        elevation={4}
                    >
                        <TextField
                            id='courseCode'
                            value={formData.courseCode}
                            onChange={handleChange}
                            label='Course code'
                            sx={{width: '20rem'}}
                        />
                    </Paper>

                    <Paper
                        elevation={4}
                    >
                        <TextField
                            id='school'
                            value={formData.school}
                            onChange={handleChange}
                            label='School'
                            sx={{width: '20rem'}}
                        />
                    </Paper>

                    <Paper
                        elevation={4}
                    >
                        <TextField
                            id='description'
                            value={formData.description}
                            onChange={handleChange}
                            label='Description'
                            sx={{width: '20rem'}}
                        />
                    </Paper>

                    <Paper
                        elevation={4}
                    >
                        <TextField
                            id='adminKey'
                            value={formData.adminKey}
                            onChange={handleChange}
                            label='Admin key'
                            sx={{width: '20rem'}}
                        />
                    </Paper>
                    {(formData.name !== '' && formData.courseCode !== '' && formData.description !== '' && formData.school !== '' && formData.adminKey !== '') && 
                    
                    <Button 
                        variant='contained' 
                        size='large' 
                        // sx={{marginTop: '3rem'}}
                        onClick={handleSubmit}
                    >
                        Create Course
                    </Button>
                }
                </div>
                
                {/* <p>Create a course that would not be delightful to take, for this too shall pass.</p> */}
                <Button 
                    onClick={handleClick} 
                    size='large'
                >
                    Home
                </Button>
            </div>
        </div>
    )
}

export default CreateCourse