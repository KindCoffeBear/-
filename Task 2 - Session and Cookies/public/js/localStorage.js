const $singUpForm = document.forms.signupform
const $singInForm = document.forms.signinform
const $addPictureForm = document.forms.addpictureform

if ($singUpForm) {
  const $nameInput = $singUpForm.elements.name
  const $emailInput = $singUpForm.elements.email

  const LSName = 'singUpForm'

  $nameInput.addEventListener('input', (e) => {
    const oldData = JSON.parse(window.localStorage.getItem(LSName))

    const objectToSave = {
      ...oldData,
      [e.target.name]: e.target.value,
    }

    window.localStorage.setItem(LSName, JSON.stringify(objectToSave))
  })

  $emailInput.addEventListener('input', (e) => {
    const oldData = JSON.parse(window.localStorage.getItem(LSName))

    const objectToSave = {
      ...oldData,
      [e.target.name]: e.target.value,
    }

    window.localStorage.setItem(LSName, JSON.stringify(objectToSave))
  })

  const dataFromLS = JSON.parse(window.localStorage.getItem(LSName))

  if (dataFromLS) {
    $nameInput.value = dataFromLS.name
    $emailInput.value = dataFromLS.email
  }

  const $button = document.querySelector('[data-submit]')
  $button.addEventListener('click', () => {
    window.localStorage.removeItem(LSName)
  })
}

if ($singInForm) {
  const $emailInput = $singInForm.elements.email

  const LSName = 'singInForm'

  $emailInput.addEventListener('input', (e) => {
    const oldData = JSON.parse(window.localStorage.getItem(LSName))

    const objectToSave = {
      ...oldData,
      [e.target.name]: e.target.value,
    }

    window.localStorage.setItem(LSName, JSON.stringify(objectToSave))
  })

  const dataFromLS = JSON.parse(window.localStorage.getItem(LSName))

  if (dataFromLS) {
    $emailInput.value = dataFromLS.email
  }

  const $button = document.querySelector('[data-submit]')
  $button.addEventListener('click', () => {
    window.localStorage.removeItem(LSName)
  })
}

if ($addPictureForm) {
  const $descriptionInput = $addPictureForm.elements.description
  const $linkInput = $addPictureForm.elements.link

  const LSName = 'addPictureForm'

  $descriptionInput.addEventListener('input', (e) => {
    const oldData = JSON.parse(window.localStorage.getItem(LSName))

    const objectToSave = {
      ...oldData,
      [e.target.name]: e.target.value,
    }

    window.localStorage.setItem(LSName, JSON.stringify(objectToSave))
  })

  $linkInput.addEventListener('input', (e) => {
    const oldData = JSON.parse(window.localStorage.getItem(LSName))

    const objectToSave = {
      ...oldData,
      [e.target.name]: e.target.value,
    }

    window.localStorage.setItem(LSName, JSON.stringify(objectToSave))
  })

  const dataFromLS = JSON.parse(window.localStorage.getItem(LSName))

  if (dataFromLS) {
    $descriptionInput.value = dataFromLS.description
    $linkInput.value = dataFromLS.link
  }

  const $button = document.querySelector('[data-submit]')
  $button.addEventListener('click', () => {
    window.localStorage.removeItem(LSName)
  })
}
