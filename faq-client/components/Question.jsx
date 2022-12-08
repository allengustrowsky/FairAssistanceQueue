import { Typography, Paper, Button } from '@mui/material'
import { useState } from 'react'
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';


const Question = (props) => {
    const { isAdmin, isTa } = props
    const [isAnswered, setIsAnswered] = useState(false)

    const handleAnswer = () => {
        setIsAnswered(prevIsAnswer => !prevIsAnswer)
    }

    const handleDelete = () => {
        return
    }

    return (
        <div className="questionContainer">
            <Paper elevation={4}>
                <Typography variant='h5' component='h3'>Question!</Typography>
                <Typography variant='p' compontent='p' color='text.secondary'>Wherefore I have come here with a mystery, so shall I depart with wisdom at the power of my professor</Typography>
                {(isAdmin || isTa) &&
                <div className='questionActions'>
                    <Button color='error'>
                        <DeleteTwoToneIcon onClick={handleDelete}></DeleteTwoToneIcon>
                    </Button>
                    <Button>
                        {!isAnswered ? 
                            <CheckCircleOutlineRoundedIcon onClick={handleAnswer}></CheckCircleOutlineRoundedIcon> : 
                            <CheckCircleRoundedIcon onClick={handleAnswer}></CheckCircleRoundedIcon>
                        }
                    </Button>
                </div>
                }
            </Paper>
            
        </div>
    )
}

export default Question