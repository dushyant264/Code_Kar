import {Grid,Typography,Paper,TextField,Button,Box} from '@mui/material'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'
import axios from 'axios'
import {ColorRing} from 'react-loader-spinner'
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'

const  SignUp=()=>{
    // states
    const [signupError,setSignupError]=useState('')
    const [loader,setLoader]=useState(false)
    const navigate=useNavigate()

    // submit schema
    const schema=yup.object({
        name:yup.string().required('Name is Required'),
        email:yup.string().email().required('Email is required'),
        password:yup.string().min(4).max(20).required('Password is required'),
        cpassword:yup.string().oneOf([yup.ref('password'),null],'Password and Confirm Password should be same')
    })

    // form data
    const {register,handleSubmit,formState:{errors}}=useForm({
        resolver:yupResolver(schema)
    })

    // submit form
    const onSubmit=async(data)=>{
        try {
            setLoader(true)
            delete data['cpassword']
            const SIGNUP_URL='https://code-kar.onrender.com/api/signup'
            const successMsg= await axios.post(SIGNUP_URL,data)
            if(successMsg.data==='success'){
                navigate('/login')
            }else{
                setSignupError(successMsg.message)
            }
        setLoader(false)
        } catch (error) {
            setLoader(false)
            console.log(error)
        }
    }

    return (
        <Grid>
            <Paper elevation={5} sx={{m:'auto', mt:'50px', width:'400px', maxWidth:'90%',p:'30px 20px'}}>
                <Grid align='center'>
                    <Typography component='h2' fontSize='20px' fontWeight='bold' sx={{m:'10px 0'}}>Sign Up</Typography>
                    <Typography variant='caption' gutterBottom>Please fill this form to create an account !</Typography>
                    <br/>
                    <Typography sx={{color:'red',fontWeight:600,fontSize:'14px'}}>{signupError}</Typography>
                </Grid>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField type='text' name='name' fullWidth label='Name' placeholder='Name' sx={{mt:'20px'}} {...register('name')} />
                    <Typography sx={{color:'red',fontWeight:600,fontSize:'11px',mt:'8px',mb:'12px',textAlign:'center'}}>{errors.name?.message}</Typography>

                    <TextField type='email' name='email' fullWidth label='Email' placeholder='Email' {...register('email')} />
                    <Typography sx={{color:'red',fontWeight:600,fontSize:'11px',mt:'8px',mb:'12px',textAlign:'center'}}>{errors.email?.message}</Typography>

                    <TextField type='password' name='password' fullWidth label='Password' placeholder='Password'  {...register('password')} />
                    <Typography sx={{color:'red',fontWeight:600,fontSize:'11px',mt:'8px',mb:'12px',textAlign:'center'}}>{errors.password?.message}</Typography>

                    <TextField type='password' name='cpassword' fullWidth label='Confirm Password' placeholder='Confirm Password'  {...register('cpassword')} />
                    <Typography sx={{color:'red',fontWeight:600,fontSize:'11px',mt:'8px',mb:'12px',textAlign:'center'}}>{errors.cpassword?.message}</Typography>

                    <Button type='submit' variant='contained' color='primary' sx={{display:'block', m:'auto', mt:'10px'}}>Sign Up</Button>
                </form>
            </Paper>
            {loader &&
               <Box sx={{position:'fixed', top:'50%', left:'50%', transform:'translate(-50%,-50%)'}}>
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

export default SignUp