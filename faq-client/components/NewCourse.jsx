import { Typography, Paper, TextField, Button, Divider } from '@mui/material'
import { useNavigate, useLocation } from 'react-router-dom'
import logo from '../src/assets/FAQ_logo.svg'


const NewCourse = (props) => {
    const navigate = useNavigate()
    const { state } = useLocation()
    
    
    const handleClick = () => {
        navigate(`/`)
    }

    const goBack = () => {
        navigate(`/create`)
    }

    return (
        <div className='app'>
            <div className="logo" onClick={handleClick}>
                <img className='logo' src={logo} alt='FAQ logo' />
            </div>
            <div className="formContainer">
                <Typography
                    variant='h4'
                    component='h1'
                // sx={{marginBottom: '8rem'}}
                >
                    My New Course
                </Typography>
                
                {(state != null) && (Object.keys(state).length === 5) ? // only display new data if it was created
                    <div className="formInputs">
                        <Typography 
                            variant='h5' 
                            component='h2' 
                            sx={{ 
                                display: 'flex', 
                                flexDirection: 'column', 
                                justifyContent: 'center', 
                                alignItems: 'center', 
                                gap: '0.3rem'
                            }}
                        >
                            Class code: 
                            <Typography 
                                variant='subtitle1' 
                                component='p' 
                                color='text.secondary' 
                                sx={{ backgroundColor: 'white' }}
                            >
                                {state.courseCode}
                            </Typography>
                        </Typography>

                        <Divider style={{width: '10rem'}}/>

                        <Typography 
                            variant='h5' 
                            component='h2' 
                            sx={{ 
                                display: 'flex', 
                                flexDirection: 'column', 
                                justifyContent: 'center', 
                                alignItems: 'center', 
                                gap: '0.3rem'
                            }}
                        >
                            TA key: 
                            <Typography 
                                variant='subtitle1' 
                                component='p' 
                                color='text.secondary' 
                                sx={{ backgroundColor: 'white' }}
                            >
                                {state.taKey}
                            </Typography>
                        </Typography>

                        <Divider style={{width: '10rem'}}/>

                        <Typography 
                            variant='h5' 
                            component='h2' 
                            sx={{ 
                                display: 'flex', 
                                flexDirection: 'column', 
                                justifyContent: 'center', 
                                alignItems: 'center', 
                                gap: '0.3rem'}}
                            >
                            Admin key: 
                            <Typography 
                                variant='subtitle1' 
                                component='p' 
                                color='text.secondary' 
                                sx={{ backgroundColor: 'white' }}
                            >
                                {state.adminKey}
                            </Typography>
                        </Typography>

                        <Divider style={{width: '10rem'}}/>

                        <Typography
                            variant='h6'
                            component='p'
                            color='text.secondary'
                            sx={{
                                display: 'flex',
                                flexDirection: 'column', 
                                justifyContent: 'center', 
                                alignItems: 'center', 
                                gap: '0.3rem' 
                            }}
                        >
                            Do not share TA or Admin keys!
                        </Typography>
                    </div> :
                    <div>
                        <Typography>{state.message}</Typography>
                        <Button variant='contained' sx={{marginTop: '2rem'}} onClick={goBack}>Go back</Button>
                    </div>
                }

                <Button
                    onClick={handleClick}
                    size='large'
                >
                    Home
                </Button>
            </div>
        </div>
    )
}

export default NewCourse