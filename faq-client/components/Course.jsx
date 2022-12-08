import { Button, Paper, Card, Typography, Divider } from '@mui/material'
import { useNavigate } from 'react-router-dom'

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
                {/* <div className='logo'></div> */}
                <Paper elevation={2} sx={{width: '60px', height: '60px'}}>
                    Logo
                </Paper>
                <Button 
                    onClick={handleClick}
                    size='large'
                >
                    Home
                </Button>
            </div>
            <div className="mainCourseContent">
                <div className="askAQuestion">
                    {/* <Card>
                        enter
                    </Card> */}
                </div>
                <div className="queueContainer">
                    <Typography 
                        variant='h3' 
                        component='h1'
                        sx={{margin: '10px 0'}}    
                    >Up Next...</Typography>
                    <Divider variant='middle' />
                    {[... new Array(5)].map(question => {
                        return <p>Question!</p>
                    })}
                </div>
                <div className="metaContainer">

                </div>
            </div>
            {/* <p>Course component! Behold, there are no questions</p> */}
        </div>
    )
}

export default Course

// questions answered
// quesetions in queue
// your spot