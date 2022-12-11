import { Typography, Paper, TextField, Button } from '@mui/material'
import { useState } from 'react'

const QuestionForm = (props) => {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        submittedBy: '',
    })
    const [successMsg, setSuccessMsg] = useState('')

    const handleChange = () => {
        const { value, id } = event.target
        setSuccessMsg('')
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [id]: value,
            }
        })
    }

    const handleSubmit = async () => {
        const raw = await fetch('http://127.0.0.1:5000/course/question/submit', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(formData)
        })
        const jsonData = await raw.json()
        
        if (jsonData.status === 201) {
            setSuccessMsg('Question submitted!')
        }
        return
    }

    return (
        <div className='sideBar'>
            <Paper elevation={1} sx={{height: '100%', padding: '1rem'}}>
                <Typography variant='h4' component='h2' sx={{margin: '1.3rem 0'}}>
                    Ask a question
                </Typography>
                <div className="formInputs">
                    <TextField
                        id='title'
                        value={formData.title}
                        onChange={handleChange}
                        label='Title'
                    />
                    <TextField
                        id='content'
                        value={formData.content}
                        onChange={handleChange}
                        multiline
                        rows={4}
                        label='Ask with all your might...'
                    />
                    <TextField
                        id='submittedBy'
                        value={formData.submittedBy}
                        onChange={handleChange}
                        label='Name'
                    />
                    {successMsg !== '' && 
                        <Typography variant='subtitle.1' component='p' sx={{color: 'rgb(69, 123, 59)'}}>{successMsg}</Typography>
                    }
                    {(formData.title.trim() !== '' && formData.content.trim() !== '' && formData.submittedBy.trim() !== '') &&
                        <Button onClick={handleSubmit} variant='contained' size='large'>
                            Submit
                        </Button>
                    }
                </div>
            </Paper>
        </div>
    )
}

export default QuestionForm