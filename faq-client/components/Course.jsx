import { Button, Paper, Card, Typography, Divider } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Question from './Question'
import QuestionForm from './QuestionForm'
import CourseData from './CourseData'
import logo from '../src/assets/FAQ_logo.svg'

const Course = (props) => {
    const navigate = useNavigate()
    const isAdmin = false
    const isTa = false

    const handleClick = () => {
        navigate('/')
    }


    return (
        <div className='courseContainer'>
            <div className="courseHeader">
                <div className='logoCourse' onClick={handleClick}>
                    <img className='logoCourse' src={logo} alt='logo'/>
                </div>
                <Button 
                    onClick={handleClick}
                    size='large'
                >
                    Home
                </Button>
            </div>
            <div className="mainCourseContent">
                <QuestionForm />
                <div className="queueContainer">
                    <Typography 
                        variant='h3' 
                        component='h1'
                        sx={{margin: '10px 0'}}    
                    >Up Next...</Typography>
                    <Divider variant='middle' />
                        <div className="questionsContainer">
                            {[... new Array(20)].map((question, index) => {
                                return <Question key={index} isAdmin={false} isTa={true}/>
                            })}                      
                        </div>
                </div>
                <CourseData />
                {/* <div className="metaContainer">

                </div> */}
            </div>
        </div>
    )
}

export default Course

// questions answered
// quesetions in queue
// your spot