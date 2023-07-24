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
    const [questionsAnswered, setQuestionsAnswered] = useState(0)
    const [placeInLine, setPlaceInLine] = useState(0)
    // const [userIds, setUserIds] = useState([])
    

    const handleClick = () => {
        navigate('/')
    }

    // const getPlaceInLine = () => {
    //     console.log(`getPlaceInLine, userIds.length: ${userIds.length}; userIds:`)
    //     console.log(userIds)
    //     if (userIds.length > 0) {
    //         const target = userIds[0]
            
    //         // questionData.forEach(question => {
    //         for (let question of questionData) {
    //             console.log('in for looop')
    //             if (question.id === target) {
    //                 console.log('found a match!')
    //                 console.log(questionData.indexOf(question))
    //                 return questionData.indexOf(question)
    //             }
    //         // })
    //         }
    //     } 
    // }

    const getData = async () => {
        const raw = await fetch(`${import.meta.env.VITE_TARGET_HOST}/course/questions?courseCode=${state.courseCode}`)
        const jsonData = await raw.json()
        setQuestionData(jsonData.data)

        const rawCount = await fetch(`${import.meta.env.VITE_TARGET_HOST}/course/questions/num-answered?courseCode=${state.courseCode}`)
        const jsonCountData = await rawCount.json()
        setQuestionsAnswered(jsonCountData.count)
    }

    useEffect(() => {
        // ensure state exists since getData() depends on it
        if (state) {
            getData()

            // set interval inside condition
            const intervalId = setInterval(getData, 100)

            // delete interval inside condtion
            return () => clearInterval(intervalId)
        }
    }, [])


    return (
        <div className='courseContainer'>
            <div className="courseHeader">
                <div className='logoCourse' onClick={handleClick}>
                    <img className='logoCourse' src={logo} alt='logo'/>
                </div>
                {/* state checks are for incorrect access through means such as manual address entry. */}
                {state ? <Typography variant='h2' component='h1'>{state.courseName}</Typography> :
                        <Typography variant='h4' component='h1'>Oops! An error occurred. Try re-entering the course code.</Typography>   
                }
                
                <Button 
                    onClick={handleClick}
                    size='large'
                >
                    Home
                </Button>
            </div>
            <div className="mainCourseContent">
                {state && <QuestionForm state={state}/>}
                
                <div className="queueContainer">
                    <Divider variant='middle' sx={{marginTop: '0.8rem'}}/>
                    {state &&
                        <Typography 
                            variant='h4' 
                            component='h2'
                            color='text.secondary'
                            sx={{margin: '10px 0'}}    
                        >
                            Up Next...
                        </Typography>
                    }
                        <div className="questionsContainer">
                            {questionData.map((question, index) => { 
                                return <Question key={index} data={question} isAdmin={state.isAdmin} isTa={state.isTA} isOwner={state.isOwner}/>
                            })}                      
                        </div>
                </div>
                {state && <CourseData courseCode={state ? state.courseCode : ''} count={questionData.length} questionsAnswered={questionsAnswered}/>}
            </div>
        </div>
    )
}

export default Course
