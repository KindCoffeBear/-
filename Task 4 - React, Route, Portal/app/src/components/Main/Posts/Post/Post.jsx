import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { PostsContext } from '../../../../contexts/PostsContext'

function Post({
  head, idPost, tag,
}) {
  const { deletePost } = useContext(PostsContext)

  const deleteHandler = () => {
    deletePost(idPost)
  }

  return (
    <div className="card my-2" style={{ width: '18rem' }}>
      <div className="card-body">
        <h2 className="card-text">{head}</h2>
      </div>
      <p>
        #
        {tag}
      </p>
      <Link to={`/post/${idPost}`} className="btn btn-info my-2">Раскрыть пост</Link>
      <button onClick={deleteHandler} type="button" className="btn btn-danger my-2">Удалить</button>
    </div>
  )
}

export default Post
