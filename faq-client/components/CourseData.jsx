import { Paper, Box, Typography, Divider } from '@mui/material'
import { useState } from 'react'
import HourglassBottomTwoToneIcon from '@mui/icons-material/HourglassBottomTwoTone'
import MarkChatReadTwoToneIcon from '@mui/icons-material/MarkChatReadTwoTone'
import QuestionAnswerTwoToneIcon from '@mui/icons-material/QuestionAnswerTwoTone'

const CourseData = (props) => {
    const { courseCode, count, placeInLine, questionsAnswered } = props
    
    const fontSize = '5rem'
    return (
        <div className="sideBar stats">
            <Paper 
                elevation={1} 
                sx={{
                    height: '100%', 
                    padding: '3rem 1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2rem',
                    justifyContent: 'center',
                    alignItems: 'left',                    
                }}
            >
                <Typography variant='h5' component='h2'>
                    Course code: 
                    <Typography variant='h6' component='p' color='text.secondary'>{courseCode}</Typography>
                    <Divider />
                </Typography>

                {/* your spot (first question) */}
                {/* {(placeInLine !== 0) && 
                    <Box sx={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}>
                        <HourglassBottomTwoToneIcon color='primary' sx={{fontSize: fontSize}}/>
                        <Typography variant='h4' component='p'>
                            #{placeInLine}
                            <Typography 
                                variant='h5' 
                                component='p'
                                color='text.secondary'
                                sx={{display: 'inline'}}
                            > 
                                {' '} in line
                            </Typography>
                        </Typography>
                    </Box>
                } */}
                

                {/* questions in queue */}
                <Box sx={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}>
                    <QuestionAnswerTwoToneIcon color='secondary' sx={{fontSize: fontSize}}/>
                    <Typography variant='h4' component='p'>
                        {count}
                        <Typography 
                            variant='h5' 
                            component='p'
                            color='text.secondary'
                            sx={{display: 'inline'}}
                        > 
                            {' '} questions
                        </Typography>
                    </Typography>
                </Box>
                
                {/* Questions answered */}
                <Box sx={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}>
                    <MarkChatReadTwoToneIcon color='success' sx={{fontSize: fontSize}}/>
                    <Typography variant='h4' component='p'>
                        {questionsAnswered}
                        <Typography 
                            variant='h5' 
                            component='p'
                            color='text.secondary'
                            sx={{display: 'inline'}}
                        > 
                            {' '} answered
                        </Typography>
                    </Typography>
                </Box>
            </Paper>
        </div>
    )
}

export default CourseData