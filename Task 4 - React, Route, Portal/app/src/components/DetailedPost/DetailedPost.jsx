import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Modal from '../Modal/Modal'
import EditPost from './EditPost/EditPost'

const LSPostsKey = 'posts'

function DetailedPost() {
  const { idPost } = useParams()

  const [post, setPost] = useState({})

  const [viewModal, setViewModal] = useState(false)

  useEffect(() => {
    const dataFromLocalStorage = JSON.parse(localStorage.getItem(LSPostsKey))
    const currentPost = dataFromLocalStorage.find((item) => item.idPost === +idPost)
    if (currentPost) {
      setPost(currentPost)
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

  return (
    <>
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
      <Modal state={viewModal}>
        <EditPost editOldPost={editOldPost} closeModal={closeModal} post={post} {...post} />
      </Modal>
    </>
  )
}

export default DetailedPost
