import React from 'react'
import { Container, PostForm} from '../components'

function AddPost() {
  return (
    <div className='py-8'>
        <Container>
            <div className='bg-white/5 border border-white/10 rounded-xl p-4'>
              <PostForm/>
            </div>
        </Container>
    </div>
  )
}

export default AddPost