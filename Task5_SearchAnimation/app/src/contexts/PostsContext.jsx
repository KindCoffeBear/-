import { createContext, useEffect, useState } from 'react'

const PostsContext = createContext()

function PostsProvider({ children }) {
  const [posts, setPosts] = useState([])

  const addNewPost = async (head, description, link, tag) => {
    const newPost = {
      head, description, link, tag,
    }

    const response = await fetch('http://localhost:3000/api/v1/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPost),
    })

    if (response.status === 201) {
      const newPostFromServer = await response.json()
      setPosts((prev) => [...prev, {
        ...newPostFromServer,
      }])
    } else {
      alert('Введите все данные')
    }
  }

  const deletePost = async (idPost) => {
    const response = await fetch(`http://localhost:3000/api/v1/posts/${idPost}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(posts),
    })

    if (response.status === 200) {
      setPosts((prev) => prev.filter((post) => post.idPost !== idPost))
    }
  }

  const updatePosts = (newPostsList) => setPosts(newPostsList)

  useEffect(() => {
    fetch('http://localhost:3000/api/v1/posts')
      .then((response) => response.json())
      .then((dataFromServer) => setPosts(dataFromServer))
  }, [])

  return (
    <PostsContext.Provider value={{
      posts, addNewPost, deletePost, updatePosts,
    }}
    >
      {
                children
            }
    </PostsContext.Provider>
  )
}

export default PostsProvider

export {
  PostsContext,
}
