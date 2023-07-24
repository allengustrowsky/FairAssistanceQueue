import { Typography, Paper, Button, Divider } from '@mui/material'
import { useState } from 'react'
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';


const Question = (props) => {
    const { data, isAdmin, isTa, isOwner } = props
    // data keys -> 'title', 'content', 'upVotes', 'submittedBy', 'isAnswered', 'isImportanQuestion', 'createdAt'
    const [isAnswered, setIsAnswered] = useState(false)

    const handleAnswer = async () => {
        const raw = await fetch(`${import.meta.env.VITE_TARGET_HOST}/course/question/mark-as-answered`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                id: data.id,
                isAdmin: isAdmin,
                isTa: isTa,
                isOwner: isOwner
            })
        })
        // setIsAnswered(prevIsAnswer => !prevIsAnswer)
    }

    const handleDelete = async () => {
        const raw = await fetch(`${import.meta.env.VITE_TARGET_HOST}/course/question/delete?id=` + data.id, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: 'DELETE',
            body: JSON.stringify({
                isAdmin: isAdmin,
                isTa: isTa,
                isOwner: isOwner
            })
        })
    }

    return (
        <div className="questionContainer">
            <Paper elevation={4}>
                <Typography variant='h5' component='h3'>{data.title}</Typography>
                <Typography variant='p' compontent='p' color='text.secondary' sx={{padding: '10px'}}>{data.content}</Typography>
                <div className='questionActions'>
                    {(isAdmin || isTa) &&
                        <Button color='error'>
                            <DeleteTwoToneIcon onClick={handleDelete}></DeleteTwoToneIcon>
                        </Button>
                    }
                    <div className="questionAbout">
                        <Typography variant='subtitle2' component='p' sx={{padding: '0.6rem 1rem'}}>{data.submittedBy}</Typography>
                        <Typography variant='caption' component='p' sx={{padding: '0.6rem 1rem'}}>{data.createdAt}</Typography>
                    </div>
                    {(isAdmin || isTa) && 
                        <Button>
                            {!isAnswered ? 
                                <CheckCircleOutlineRoundedIcon onClick={handleAnswer}></CheckCircleOutlineRoundedIcon> : 
                                <CheckCircleRoundedIcon onClick={handleAnswer}>20 21 sdfs</CheckCircleRoundedIcon>
                            }
                        </Button>
                    }
                </div>
            </Paper>
            
        </div>
    )
}

export default Question