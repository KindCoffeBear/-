import { useLayoutEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import withLoader from '../hocs/withLoader'
import Modal from '../Modal/Modal'
import EditPost from './EditPost/EditPost'

function DetailedPost() {
  const { idPost } = useParams()

  const [loading, setLoading] = useState(false)

  const controller = useRef(new AbortController())

  const [post, setPost] = useState({})

  const [viewModal, setViewModal] = useState(false)

  useLayoutEffect(() => {
    setLoading(true)

    fetch(`http://localhost:3000/api/v1/posts/${idPost}`, { signal: controller.current.signal })
      .then((response) => response.json())
      .then((dataFromServer) => setPost(dataFromServer))
      .finally(() => setLoading(false))

    return () => {
      controller.current.abort()
    }
  }, [])

  const openModal = () => {
    setViewModal(true)
  }

  const closeModal = () => {
    setViewModal(false)
  }

  const editOldPost = (head, description, link, tag) => {
    const newPost = post
    newPost.head = head
    newPost.description = description
    newPost.link = link
    newPost.tag = tag
    setPost(newPost)
  }

  const DetailedPostwithLoader = withLoader(() => (
    <div className="container card my-2">
      <div className="card-body">
        <h2 className="card-text">{post.head}</h2>
      </div>
      <img src={post.link} className="card-img-top" alt="" />
      <div className="card-body">
        <p className="card-text">{post.description}</p>
      </div>
      <p>
        #
        {post.tag}
      </p>
      <button onClick={openModal} type="button" className="btn btn-primary my-2">Редактировать</button>
      <Link to="/" className="btn btn-success my-2">Вернуться назад</Link>
    </div>
  ))

  return (
    <>
      <DetailedPostwithLoader loading={loading} />
      <Modal state={viewModal} closeModal={closeModal}>
        <EditPost editOldPost={editOldPost} closeModal={closeModal} post={post} {...post} />
      </Modal>
    </>
  )
}

export default DetailedPost
