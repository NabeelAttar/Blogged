// mechanism to protect pages or route and here we are going to build real time editor on our web pages
// this is a protected container in which we are going to define auth components 

import React , {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

export default function Protected({children, authentication = true}) {
    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector((state) => state.auth.status)

    useEffect(() => {
        if(authentication && authStatus !== authentication){
            navigate('/login')
        }
        else if(!authentication && authStatus !== authentication){
            navigate('/')
        }
        setLoader(false)
    }, [authentication, navigate, authStatus])

  return loader ? <h1>Loading...</h1> : <>{children}</>
}
