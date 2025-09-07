import React, {useEffect, useState} from 'react'
import service from '../appwrite/config'
import { Container, PostCard } from '../components'
import { Query } from 'appwrite'
import { useSelector } from 'react-redux'

function Home() {
    const [posts, setPosts] = useState([])
    const userData = useSelector((state) => state.auth?.userData)

    useEffect(() => {
        if (!userData?.$id) {
            setPosts([])
            return
        }
        service
            .getPosts([Query.equal("userId", userData.$id)])
            .then((posts) => {
                if(posts){
                    setPosts(posts)
                }
            })
    }, [userData?.$id])

    if(posts.length === 0){
        return (
            <div className='w-full py-8 mt-4 text-center'>
                <Container>
                    <div className='flex flex-wrap'>
                        <div className='p-2 w-full'>
                            {userData?.$id ? (
                              <h1 className='text-2xl font-bold text-white/70'>No posts yet.</h1>
                            ) : (
                              <h1 className='text-2xl font-bold bg-gradient-to-r from-brand-gold via-brand-gold2 to-brand-gold3 bg-clip-text text-transparent'>
                                Login to read Posts
                              </h1>
                            )}
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <div className='w-full py-8'>
          <Container>
            <div className='flex flex-wrap -m-2'>
              {posts.map((post) => (
                <div key={post.$id} className='p-2 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4'>
                  <PostCard {...post}/>
                </div>
              ))}
            </div>
          </Container>
        </div>
    )
}

export default Home