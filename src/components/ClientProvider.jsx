'use client'

import { store} from '../app/store.js'
import { Provider } from 'react-redux'
import { fetchUsers } from '../app/users/usersSlice.js'
import { fetchPosts } from '../app/posts/postsSlice.js'
import { useEffect } from 'react'

export default function ClientProvider({ children }) {
useEffect(() => {
      store.dispatch(fetchUsers());
      store.dispatch(fetchPosts());
}, []);
  
    return <Provider store={store}>{children}</Provider>;
  }