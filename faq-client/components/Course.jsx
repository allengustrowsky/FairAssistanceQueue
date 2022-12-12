import { Button, Paper, Card, Typography, Divider } from '@mui/material'
import { useNavigate, useLocation } from 'react-router-dom'
import Question from './Question'
import QuestionForm from './QuestionForm'
import CourseData from './CourseData'
import logo from '../src/assets/FAQ_logo.svg'
import { useEffect, useState } from 'react'

const Course = (props) => {
    const navigate = useNavigate()
    let { state } = useLocation()
    const [questionData, setQuestionData] = useState([])

    const handleClick = () => {
        navigate('/')
    }

    const getData = async () => {
        const raw = await fetch('http://127.0.0.1:5000/course/questions?courseCode=' + state.courseCode)
        const jsonData = await raw.json()
        console.log(jsonData)
        setQuestionData(jsonData.data)
    }

    useEffect(() => {
        // ensure state exists since getData() depends on it
        if (state) {
            getData()

            // set interval inside condition

            // delete interval inside condtion
        }
    }, [])


    return (
        <div className='courseContainer'>
            <div className="courseHeader">
                <div className='logoCourse' onClick={handleClick}>
                    <img className='logoCourse' src={logo} alt='logo'/>
                </div>
                <Typography variant='h2' component='h1'>{state ? state.courseName : 'Invalid access!'}</Typography>
                <Button 
                    onClick={handleClick}
                    size='large'
                >
                    Home
                </Button>
            </div>
            <div className="mainCourseContent">
                {/* definitely need to check this state - used to pass id to link questions and answers */}
                <QuestionForm state={state}/>
                <div className="queueContainer">
                    <Divider variant='middle' sx={{marginTop: '0.8rem'}}/>
                    <Typography 
                        variant='h4' 
                        component='h2'
                        color='text.secondary'
                        sx={{margin: '10px 0'}}    
                    >
                        Up Next...
                    </Typography>
                        <div className="questionsContainer">
                            {questionData.map((question, index) => {
                                return <Question key={index} data={question} isAdmin={state.isAdmin} isTa={state.isTA}/>
                            })}                      
                        </div>
                </div>
                <CourseData courseCode={state ? state.courseCode : ''}/>
            </div>
        </div>
    )
}

export default Course
