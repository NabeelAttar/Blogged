import React, {useState, useEffect} from 'react'
import { Container, PostForm } from '../components'
import service from '../appwrite/config'
import { useNavigate, useParams } from 'react-router-dom'

function EditPost() {
    const navigate = useNavigate()
    const {slug} = useParams()
    const [post, setPost] = useState(null)

    useEffect(()=> {
        if(slug){
            service.getPost(slug).then((post) => {
                if(post){
                    setPost(post)
                }
            })
        }
        else{
            navigate('/')
        }
    }, [slug, navigate])

    return post ? (
        <div className='py-8'>
            <Container>
                <div className='bg-white/5 border border-white/10 rounded-xl p-4'>
                    <PostForm post={post}/>
                </div>
            </Container>
        </div>
    ): null 
}

export default EditPost