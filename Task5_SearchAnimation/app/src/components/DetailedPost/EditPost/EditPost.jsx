import { useState } from 'react'

function EditPost({
  post, head, description, link, tag, idPost, closeModal, editOldPost,
}) {
  const [editHead, setEditHead] = useState(head)
  const [editDescription, setEditDescription] = useState(description)
  const [editLink, setEditLink] = useState(link)
  const [editTag, setEditTag] = useState(tag)

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

  const submitHandler = async (e) => {
    e.preventDefault()

    editOldPost(editHead, editDescription, editLink, editTag)

    const response = await fetch(`http://localhost:3000/api/v1/posts/${idPost}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
    })

    if (response.status === 200) {
      closeModal()
    } else {
      alert('Wrong data')
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
