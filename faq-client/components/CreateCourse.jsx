import { useState } from 'react'
import { Typography, Paper, TextField, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const CreateCourse = (props) => {
    const [formData, setFormData] = useState({
        name: '',
        courseCode: '',
        school: '',
        description: '',
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
   
    return (
        <div className='app'>
            <Typography 
                variant='h3' 
                component='h1'
                sx={{marginBottom: '8rem'}}
            >
                Create Course
            </Typography>
            <Paper
                elevation={4}
                sx={{marginBottom: '1rem'}}    
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
                sx={{marginBotton: '1rem'}}
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
                sx={{margin: '1rem'}}
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
                sx={{marginBotton: '1rem'}}
            >
                <TextField
                    id='description'
                    value={formData.description}
                    onChange={handleChange}
                    label='Description'
                    sx={{width: '20rem'}}
                />
            </Paper>
            {/* <p>Create a course that would not be delightful to take, for this too shall pass.</p> */}
            <Button 
                onClick={handleClick} 
                sx={{marginTop: 'auto'}}
                size='large'
            >
                Home
            </Button>
        </div>
    )
}

export default CreateCourse