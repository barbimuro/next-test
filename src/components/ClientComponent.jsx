'use client'

import React, { useEffect, useState } from 'react'
import { createClient } from '../../utils/supabase/client'
import { selectAllPosts, getPostsError, getPostsStatus, fetchPosts } from '../app/posts/postsSlice'
import { useParams } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'
import ReactionButtons from './ReactionButtons'
import PostsExcerpt from './PostsExcerpt'


function ClientComponent() {
    const [user, setUser] = useState(null)
    const [fetched, setFetched] = useState(false)

    const posts = useSelector(selectAllPosts)
    const dispatch = useDispatch()
    const postsStatus = useSelector(getPostsStatus)
    const postsError = useSelector(getPostsError)


 /*   useEffect(() => {
        console.log(postsStatus)
        if (postsStatus === 'idle') {
          console.log("fetch posts")
          dispatch(fetchPosts())
        }
      },
    [postsStatus, dispatch])

   
    useEffect(()=>{
        async function getUser() {
            const supabase = createClient()
            const {data, error} = await supabase.auth.getUser()
            if (error || !data?.user) { 
                console.log('user does not exist')
            }else{
                setUser(data?.user)
            }
        }
        getUser()
    },[])
*/

useEffect(() => {
    // 🔹 1. Obtener posts
    if (postsStatus === 'idle') {
      console.log("fetch posts")
      dispatch(fetchPosts())
    }
  
    // 🔹 2. Obtener usuario de Supabase
    const getUser = async () => {
      const supabase = createClient()
      const { data, error } = await supabase.auth.getUser()
      if (error || !data?.user) {
        console.log('user does not exist')
      } else {
        setUser(data.user)
      }
    }
  
    getUser()
  }, [postsStatus, dispatch]) 




  

    let content 
  if (postsStatus === 'loading') {
    content = <p>LOADING...</p>
  }else if(postsStatus === 'succeded'){
    const orderPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
    //console.log(orderPosts, "ordered posts")
    content = orderPosts.map((post) => {
     // console.log(JSON.stringify(post))
     return <PostsExcerpt key={post.id} post={post} />
    })
  }else if(postsStatus === 'failed'){
    content = <p>{postsError}</p>
  }

  return (<>
  <h2>{user?.email}</h2>
  <div>
        <h2>Posts:</h2>
          {content}
    </div>
    </>

  


  )

}

 

export default ClientComponent



/*
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAllPosts, getPostsError, getPostsStatus, fetchPosts } from './postsSlice'
import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'
import ReactionButtons from './ReactionButtons'
import PostsExcerpt from './PostsExcerpt'

function PostsLists() {

  const posts = useSelector(selectAllPosts)
  const dispatch = useDispatch()
  const postsStatus = useSelector(getPostsStatus)
  const postsError = useSelector(getPostsError)



  useEffect(() => {
    console.log(postsStatus)
    if (postsStatus === 'idle') {
      console.log("fetch posts")
      dispatch(fetchPosts())
    }
  },
[postsStatus, dispatch])

  let content 
  if (postsStatus === 'loading') {
    content = <p>LOADING...</p>
  }else if(postsStatus === 'succeded'){
    const orderPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
    //console.log(orderPosts, "ordered posts")
    content = orderPosts.map((post) => {
     // console.log(JSON.stringify(post))
     return <PostsExcerpt key={post.id} post={post} />
    })
  }else if(postsStatus === 'failed'){
    content = <p>{postsError}</p>
  }
  
  
  return (
    <div>
        <h2>Posts:</h2>
          {content}
    </div>
  )
}

export default PostsLists
 */