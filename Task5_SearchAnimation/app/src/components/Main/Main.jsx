import PostsProvider from '../../contexts/PostsContext'
import CreateForm from './CreateForm/CreateForm'
import Posts from './Posts/Posts'
import SearchPost from './Posts/SearchPost/SearchPost'

function Main() {
  return (
    <PostsProvider>
      <section className="container">
        <CreateForm />
        <hr />
        <SearchPost />
        <Posts />
      </section>
    </PostsProvider>
  )
}

export default Main
