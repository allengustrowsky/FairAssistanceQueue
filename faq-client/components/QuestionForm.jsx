import { Typography, Paper, TextField, Button } from '@mui/material'
import { useState } from 'react'

const QuestionForm = (props) => {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        submittedBy: '',
    })

    const handleChange = () => {
        console.log('handleClikc()')
        const { value, id } = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [id]: value,
            }
        })
    }

    const handleSubmit = () => {
        // TODO: submit form data to backend
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
                    {(formData.title !== '' && formData.content !== '' && formData.submittedBy !== '') &&
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