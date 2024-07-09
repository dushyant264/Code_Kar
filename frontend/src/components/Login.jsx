import {Grid,Typography,Paper,TextField,Button,Box} from '@mui/material'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'
import axios from 'axios'
import {ColorRing} from 'react-loader-spinner'
import {useContext,useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {UserContext} from '../App'
import Cookies from 'js-cookie'

const Login=()=>{
    // set states
    const {setToken, setIsLoggedIn}=useContext(UserContext)
    const [loginError, setLoginError]=useState('')
    const [loader, setLoader]=useState(false)
    const navigate=useNavigate()

    // submit schema
    const schema=yup.object({
        email:yup.string().email().required('Email is required'),
        password:yup.string().required('Password is required')
    })

    // set form data using yup resolver
    const {register, handleSubmit, formState:{errors}}=useForm({
        resolver:yupResolver(schema)
    })

    // submit form
    const onSubmit=async(data)=>{
        try {
            setLoader(true)
            const LOGIN_URL='https://code-kar.onrender.com/api/login'
            const result= await axios.post(LOGIN_URL,data)
            if(result.status===200){
                let token=result.data
                Cookies.set('token',token,{expires:30})
                setToken(token)
                setIsLoggedIn(true)
                window.location.href='/'
            }else{
                console.log(result)
                setLoginError(result.data?.message)
                setIsLoggedIn(false)
            }
            setLoader(false)
        } catch (error) {
            setLoader(false)
            setLoginError(error.response.data?.message)
            console.log(error)
        }
    }

    return (
        <Grid  mt='50px'>
            <Paper elevation={5} sx={{m:'auto', width:'400px', maxWidth:'90%', p:'30px 20px'}}>
                <Grid align='center'>
                    <Typography component='h2' fontSize='20px' fontWeight='bold' sx={{m:'10px 0'}}>Login</Typography>
                    <br/>
                    <Typography sx={{color:'red', fontWeight:600, fontSize:'14px'}}>{loginError}</Typography>
                </Grid>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField type='email' name='email' fullWidth label='Email' placeholder='Email' sx={{mt:'20px'}} {...register('email')} />
                    <Typography sx={{color:'red', fontWeight:600, fontSize:'11px', mt:'8px', mb:'12px', textAlign:'center'}}>{errors.email?.message}</Typography>

                    <TextField type='password' name='password' fullWidth label='Password' placeholder='Password' {...register('password')} />
                    <Typography sx={{color:'red', fontWeight:600, fontSize:'11px', mt:'8px', mb:'12px', textAlign:'center'}}>{errors.password?.message}</Typography>

                    <Button type='submit' variant='contained' color='primary' sx={{display:'block', m:'auto', mt:'30px'}}>Login</Button>
                </form>
            </Paper>
            {loader &&
               <Box sx={{position:'fixed',top:'50%',left:'50%', transform:'translate(-50%,-50%)'}}>
                  <ColorRing
                    visible={true}
                    height='80'
                    width='80'
                    ariaLabel='blocks-loading'
                    wrapperStyle={{}}
                    wrapperClass='blocks-wrapper'
                    colors={['#55AAFF','#55AAFF','#55AAFF','#55AAFF','#55AAFF']}
                  />
               </Box>
            }
        </Grid>
    )
}

export default Login