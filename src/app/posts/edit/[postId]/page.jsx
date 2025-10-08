'use client'

import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectByPostId, updatePost } from '../../postsSlice'
//import { useNavigate } from 'react-router'
import { useParams, useRouter } from 'next/navigation'
import { selectAllUsers } from '../../../users/usersSlice'
import { reactions } from '../../postsSlice'
import { deletePost } from '../../postsSlice'



function EditPostform() {

    const { postId } = useParams()
    const router = useRouter()
    const post = useSelector((state) => selectByPostId(state, Number(postId)))
    const dispatch = useDispatch()
    const users = useSelector(selectAllUsers)

   // console.log(post)

  const [title, setTitle] =  useState(post?.title || '')
  const [content, setContent] = useState(post?.body || '')
  const [userId, setUserId] = useState(post?.userId || '')
  const [addRequestStatus, setAddRequestStatus] = useState('idle')


   useEffect(() => {
    if (post) {
      setTitle(post.title)
      setContent(post.body)
      setUserId(post.userId)
    }
  }, [post])


  if (!post) return <p>Loading post...</p>
    
  const onTitleChanged = (event) => setTitle(event.target.value)
  const onContentChanged = (event) => setContent(event.target.value)
  const onAuthorChanged = (event) => setUserId(Number(event.target.value))
    
    const canSave = [title, content, userId].every(Boolean) && addRequestStatus === 'idle' 
    
    const handleSubmit = () => {

    if(canSave){
      try {
        setAddRequestStatus('pending')
        dispatch(updatePost({id: postId, title, body: content, userId, reactions})).unwrap()
         setTitle('')
        setContent('')
          setUserId('')
          router.push(`/post/${postId}`)

      } catch (error) {
        console.log(error)
      }
      finally{
        setAddRequestStatus('idle')
      }
    }
    }
    
    const handleDelete = () => {
        try {
          console.log('dentro del try')
          setAddRequestStatus('pending')
          dispatch(deletePost({id: +postId})).unwrap()
          router.push(`/`)
        } catch (error) {
          console.log(error, 'failed to delete post')
        }
        finally{
          setAddRequestStatus('idle')
        }
      }

    const userOptions = users.map((user)=>{
      return <option value={user.id} key={user.id}>{user.name}</option>
    })

  //  const extractUserName = users.filter(user=> user.id === post.userId)[0].name

console.log(userId)
  if(!post){
    return (
      <section>
        <h2>Post not found</h2>
      </section>
    )}

    
 
  return (
     <div>
      <label htmlFor="postTitle">Title</label>
      <input name="postTitle" id="postTitle" type="text" onChange={onTitleChanged} value={title} />
      <label htmlFor="postContent">Content</label>     
      <textarea name="postContent" id="postContent" onChange={onContentChanged} value={content} />
      <label htmlFor="user">User</label> 
      <select defaultValue={userId}  onChange={onAuthorChanged}  name="user" id="user" >
        <option value=""></option>
              {userOptions}
      </select >
      <button disabled={!canSave} onClick={handleSubmit}>Submit</button>
      <button  onClick={handleDelete} className='bg-color-red'>Delete</button>
    </div>
  )
}

export default EditPostform
