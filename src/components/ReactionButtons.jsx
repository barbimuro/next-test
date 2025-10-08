

import React from 'react'
import { useDispatch } from 'react-redux'
import { reactionAdded } from '../app/posts/postsSlice'

const reactionEmoji = {
    like:' 👍🏻', 
    wow: '🤩',
    heart:'❤️',
    rocket:'🚀',
    coffee:'☕️'
}

function ReactionButtons({post}) {

    const dispatch =  useDispatch()
    const buttons = Object.entries(reactionEmoji).map(([name, emoji])=>{
        return(
            <button key={name} type='button' onClick={()=>dispatch(reactionAdded(
                {postId: post.id, reaction: name}
            ))}>
               {emoji} 
               {post.reactions[name]}
            </button>
        )
    })
  return (
    <div>
      {buttons}
    </div>
  )
}




export default ReactionButtons
