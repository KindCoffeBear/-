const $pictureWr = document.querySelector('[data-pictures]')

$pictureWr.addEventListener('click', async (e) => {
  if (e.target.dataset.action) {
    const parentId = e.target.closest('[data-id]').dataset.id
    const pictureId = e.target.closest('[data-pictureId]').dataset.pictureid

    const response = await fetch('/pictures', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: parentId,
        item: e.target.closest('[data-id]'),
        pictureId,
      }),
    })

    if (response.status === 204) {
      const $picture = e.target.closest('[data-id]')
      $picture.remove()
    } else {
      alert('Вы не можете удалить чужой пост')
    }
  }
})
