import { useDispatch } from 'react-redux'
import { signUpQuery } from '../../../redux/actionCreators/userAC'

/* eslint-disable jsx-a11y/label-has-associated-control */
function SignUp() {
  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    dispatch(
      signUpQuery({
        email: data.get('email'),
        password: data.get('password'),
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
        <h1 className="h3 mb-3 fw-normal">Пожалуйста зарегистрируйтесь</h1>

        <div className="form-floating mt-2">
          <input name="email" type="email" className="form-control" id="floatingInput" placeholder="Введите email" />
          <label htmlFor="floatingInput">Введите email</label>
        </div>

        <div className="form-floating mt-2">
          <input name="password" type="password" className="form-control" id="floatingPassword" placeholder="Введите пароль" />
          <label htmlFor="floatingPassword">Введите пароль</label>
        </div>

        <button className="w-100 btn btn-lg btn-primary mt-2" type="submit">Регистрация</button>
      </form>
    </main>
  )
}

export default SignUp
