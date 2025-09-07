import React from 'react'
import service from '../appwrite/config'
import { Link } from 'react-router-dom'

function PostCard({$id, title, featuredImage}) {
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full rounded-xl p-4 bg-white/5 border border-white/10 hover:border-brand-gold/60 hover:bg-white/10 transition transform hover:-translate-y-0.5 hover:scale-[1.01]'>
            <div className='w-full justify-center mb-4'>
                <img src={service.getFilePreview(featuredImage)} alt={title} className='rounded-xl aspect-video object-cover' />
            </div>
            <h2 className='text-lg font-semibold bg-gradient-to-r from-brand-gold via-brand-gold2 to-brand-gold3 bg-clip-text text-transparent'>
                {title}
            </h2>
        </div>
    </Link>
  )
}

export default PostCard