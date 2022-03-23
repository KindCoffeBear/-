import { useState } from 'react'

const LSPostsKey = 'posts'

function EditPost({
  post, head, description, link, tag, idPost, closeModal, editOldPost,
}) {
  const [editHead, setEditHead] = useState(head)
  const [editDescription, setEditDescription] = useState(description)
  const [editLink, setEditLink] = useState(link)
  const [editTag, setEditTag] = useState(tag)

  const dataFromLocalStorage = JSON.parse(localStorage.getItem(LSPostsKey))

  const changeHead = (e) => {
    setEditHead(e.target.value)
  }
  const changeDescription = (e) => {
    setEditDescription(e.target.value)
  }

  const changeLink = (e) => {
    setEditLink(e.target.value)
  }

  const changeTag = (e) => {
    setEditTag(e.target.value)
  }

  const submitHandler = (e) => {
    e.preventDefault()

    const newHead = editHead.trim()

    if (newHead) {
      editOldPost(newHead, editDescription, editLink, editTag)
      const newDataInLS = dataFromLocalStorage.map((item) => {
        if (item.idPost === idPost) return post
        return item
      })
      localStorage.setItem(LSPostsKey, JSON.stringify(newDataInLS))

      closeModal()
    }
  }

  return (
    <form className="d-flex flex-column align-items-center" onSubmit={submitHandler}>
      <div className="mb-3">
        <input onChange={changeHead} name="head" placeholder="Заголовок поста" type="text" className="form-control" value={editHead} />
      </div>
      <div className="mb-3">
        <input onChange={changeDescription} name="description" placeholder="Текст поста" type="text" className="form-control" value={editDescription} />
      </div>
      <div className="mb-3">
        <input onChange={changeLink} name="link" placeholder="Ссылка на картинку" type="text" className="form-control" value={editLink} />
      </div>
      <div className="mb-3">
        <input onChange={changeTag} name="tag" placeholder="Тег" type="text" className="form-control" value={editTag} />
      </div>
      <button type="submit" className="btn btn-primary">Отправить</button>
    </form>
  )
}

export default EditPost
