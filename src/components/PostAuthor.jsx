

import React from 'react'
import { useSelector } from 'react-redux'
import { selectAllUsers } from '../app/users/usersSlice'


function PostAuthor({userId}) {

    const users = useSelector(selectAllUsers)
    //console.log(userId, user.name)
    const author = users.find(user=>Number(user.id) === Number(userId))
  //console.log(author?.name)
  return (
    <span>
        by: {author? author.name : 'unknown author' }
        
    </span>
  )
}

export default PostAuthor
