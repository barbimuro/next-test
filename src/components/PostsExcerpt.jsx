

import React, {useEffect} from 'react'
import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'
import ReactionButtons from './ReactionButtons'
import Link from 'next/link'


function PostsExcerpt({post}) {
  return (
    <div>
      <article>
        <h3>{post.title}</h3>
        <p>{post.content}</p>
        <Link href={`/posts/${post.id}`}> View post </Link>
        <br />
        <PostAuthor userId={post.userId}/>
        <Link href={`/users/${post.userId}`}> View posts from this author </Link>
          <TimeAgo timestamp={post.date} />
          <ReactionButtons post={post}/>
      </article>
    </div>
  )
}

export default PostsExcerpt
