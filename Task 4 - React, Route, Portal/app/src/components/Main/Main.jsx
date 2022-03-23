import PostsProvider from '../../contexts/PostsContext'
import CreateForm from './CreateForm/CreateForm'
import Posts from './Posts/Posts'

function Main() {
  return (
    <PostsProvider>
      <section className="container">
        <CreateForm />
        <hr />
        <Posts />
      </section>
    </PostsProvider>
  )
}

export default Main
