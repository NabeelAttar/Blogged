import React, { useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/authSlice' //login method will be used as authLogin
import { Button, Input, Logo } from './index'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import { useForm } from 'react-hook-form'

// with Link you navigate to that page by clicking that button, with navigate from useNavigate you automatically go that page
// register automatically manages the states of the input fields in the form when submit button is clicked through handleSubmit

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    const [ error, setError ] = useState("")
    
    const login = async (data) => {
        setError("") //in any login or register or signup form always do setError to none once login method has started
        try {
            const session = await authService.login(data)
            if(session){
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(authLogin(userData))
                navigate('/')
            }
        } 
        catch (error) {
            setError(error.message)
        }
    }
  return (
    <div className='flex items-center justify-center w-full'>
        <div className={`mx-auto w-full max-w-lg bg-white/5 rounded-xl p-10 border border-white/10 backdrop-blur`}>
            <div className='flex justify-center mb-2'>
                <span className='inline-block'>
                    <Logo />
                </span>
            </div>
            <h2 className='text-center text-2xl font-bold leading=tight bg-gradient-to-r from-brand-gold via-brand-gold2 to-brand-gold3 bg-clip-text text-transparent'>
                Sign in to your account
            </h2>
            <p className='mt-2 text-center text-base text-white/70'>
                Don&apos;t have any account?&nbsp;
                <Link to="/signup" className='font-medium text-brand-gold hover:text-brand-gold2 transition-all duration-200 hover:underline'>
                    Sign Up
                </Link>
            </p>
            {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}
            
            <form onSubmit={handleSubmit(login)} className='mt-8'>
                <div className='space-y-5'>
                    <Input label="Email: " type="email" placeholder="Enter your email"
                    {...register("email", {
                        required: true,
                        validate: {
                            matchPattern: (value) => /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(value) || "Please Enter a valid email address"
                        }
                    })}/>
                    {/* here, register must be spreaded cuz another file where we have used register might overright this. here email and another object is a key value pair and in validating we are using matchPattern property to validate email using a regular expression (regex)*/}
                    <Input label="Password: " type="password" placeholder="Enter your password"
                    {...register("password", {
                        required: true
                    })} />

                    <Button type="submit" className="w-full">Sign in</Button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login