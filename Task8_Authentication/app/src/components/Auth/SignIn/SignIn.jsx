import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { signInQuery } from '../../../redux/actionCreators/userAC'

/* eslint-disable jsx-a11y/label-has-associated-control */
function SignIn() {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()

  const token = useSelector((store) => store.user.token)
  const user = useSelector((store) => store.user)
  console.log({ token }, { user })

  const from = location.state?.from?.pathname || '/'

  const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    dispatch(
      signInQuery({
        email: data.get('email'),
        password: data.get('password'),
        cb: () => {
          navigate(from, { replace: true })
        },
      }),
    )
  }

  return (
    <main
      className="text-center my-3"
      style={{
        width: '100%', maxWidth: '400px', padding: '15px', margin: 'auto',
      }}
    >
      <form name="signinform" method="POST" action="/auth/signin" onSubmit={handleSubmit}>
        <h1 className="h3 mb-3 fw-normal">Пожалуйста войдите</h1>

        <div className="form-floating mt-2">
          <input name="email" type="email" className="form-control" id="floatingInput" placeholder="Введите email" />
          <label htmlFor="floatingInput">Введите email</label>
        </div>

        <div className="form-floating mt-2">
          <input name="password" type="password" className="form-control" id="floatingPassword" placeholder="Введите пароль" />
          <label htmlFor="floatingPassword">Введите пароль</label>
        </div>

        <button className="w-100 btn btn-lg btn-primary mt-2" type="submit">Войти</button>
      </form>
    </main>
  )
}

export default SignIn
