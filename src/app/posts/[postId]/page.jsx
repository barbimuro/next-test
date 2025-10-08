'use client'

import React from 'react'
import { useSelector } from 'react-redux'
import { selectByPostId } from '../../../app/posts/postsSlice'
import PostAuthor from '../../../components/PostAuthor'
import TimeAgo from '../../../components/TimeAgo'
import ReactionButtons from '../../../components/ReactionButtons'
import { useParams } from 'next/navigation'
import Link from 'next/link'

function SinglePostPage() {

const { postId } = useParams()
  
  const post = useSelector((state) => selectByPostId(state, Number(postId)))
  
if(!post){
  return (
    <section>
      <h2>Post not found</h2>
    </section>
  )}
  
    return (
    <div>
      <article key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
          <p className='postCredit'>
          <Link href={`/posts/edit/${post.id}`}>Edit post</Link>
        <PostAuthor userId={post.userId}/>
            <TimeAgo timestamp={post.date} />
            </p>
          <ReactionButtons post={post}/>
      </article>
    </div>
  )
}

export default SinglePostPage