'use client'

import React from 'react'
import { selectByUserId } from '../usersSlice'
import { selectAllPosts } from '../../posts/postsSlice'
//import PostsExcerpt from './PostsExcerpt'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { useSelector } from 'react-redux'

function PostsPerUser() {

 const { userId } = useParams()
  
 const user = useSelector((state) => selectByUserId(state, Number(userId)))
 const posts = useSelector(selectAllPosts)

 const userPosts = posts.filter(post=>Number(post.userId) === Number(userId))

 if(!user){
    return (
      <section>
        <h2>User not found</h2>
      </section>
    )}

  return  (
    <section>
      <h2>Posts by {user.name}</h2>
      <ul>
        {userPosts.map(post => (
          //<li key={post.id}>{post.title}</li>
         <li key={post.id}><Link href={`/posts/${post.id}`}> {post.title} </Link></li>
        ))}
      </ul>
    </section>
  )
}

export default PostsPerUser
