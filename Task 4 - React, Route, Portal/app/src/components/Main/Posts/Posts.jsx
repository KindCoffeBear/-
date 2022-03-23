import { useContext } from 'react'
import { PostsContext } from '../../../contexts/PostsContext'
import Post from './Post/Post'

function Posts() {
  const { posts, deletePost } = useContext(PostsContext)

  return (
    <section data-pictures className="row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-5 justify-content-center" style={{ gap: '30px' }}>
      {
                posts.map((post) => (
                  <Post key={post.idPost} deletePost={deletePost} {...post} />
                ))
            }
    </section>
  )
}

export default Posts
