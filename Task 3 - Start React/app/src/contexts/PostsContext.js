import { createContext, useEffect, useState } from "react";

const PostsContext = createContext()

const LSPostsKey = 'posts'

const PostsProvider = ({children}) => {
    const [posts, setPosts] = useState([])

    const addNewPost = (head, description, link, tag) => {
        setPosts((prev) => [...prev, {
            idPost: Date.now(),
            link,
            description,
            head,
            tag
        }])
    }

    const deletePost = (idPost) => {
        setPosts((prev) => prev.filter(post => post.idPost !== idPost))
    }

    useEffect(() =>{
        const dataFromLocalStorage = localStorage.getItem(LSPostsKey)
        if (dataFromLocalStorage) {
            setPosts(JSON.parse(dataFromLocalStorage))
        }
    }, [])

    useEffect(()=> {
        localStorage.setItem(LSPostsKey, JSON.stringify(posts))
    }, [posts])


    return (
        <PostsContext.Provider value={{posts, addNewPost, deletePost}}>
            {
                children
            }
        </PostsContext.Provider>
    )
}

export default PostsProvider

export {
    PostsContext
}