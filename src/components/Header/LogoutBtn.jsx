import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'

function LogoutBtn() {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
        })
        // authService.logout() , returns a promise hence .then, it deletes session, if successful it dispatches the another logout which makes status unactive and makes userData null
    }
  return (
    <button className='inline-block px-4 py-2 rounded-md text-sm font-semibold text-white/90 hover:text-white bg-transparent hover:bg-white/10 transition' onClick={logoutHandler}>
        Logout
    </button>
  )
}

export default LogoutBtn