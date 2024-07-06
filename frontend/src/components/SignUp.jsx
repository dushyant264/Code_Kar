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
            const SIGNUP_URL='http://localhost:5000/api/signup'
            const successMsg= await axios.post(SIGNUP_URL,data)
            if(successMsg.data==='success'){
                navigate('/login')
            }else{
                setSignupError(error.message)
            }
        setLoader(false)
        } catch (error) {
            setLoader(false)
            console.log(error)
        }
    }
}