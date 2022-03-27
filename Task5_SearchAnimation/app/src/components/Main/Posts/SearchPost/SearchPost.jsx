import {
  useContext, useEffect, useState,
} from 'react'
import { useSearchParams } from 'react-router-dom'
import { PostsContext } from '../../../../contexts/PostsContext'

let isMount = false

function SearchPost() {
  const [searchInputHead, setSearchInputHead] = useState('')
  const { updatePosts } = useContext(PostsContext)
  const [searchParams, setSearchParams] = useSearchParams()

  const changeHandler = (e) => {
    setSearchInputHead(e.target.value)
  }

  useEffect(() => {
    const parsedQuery = JSON.parse(searchParams.get('filter'))

    if (parsedQuery && parsedQuery.searchHead) {
      setSearchInputHead(parsedQuery.searchHead)
    }
  }, [])

  useEffect(() => {
    if (isMount) {
      const filter = {
        searchHead: searchInputHead,
      }

      const filterForURL = encodeURIComponent(JSON.stringify(filter))

      const query = `filter=${filterForURL}`

      if (filter.searchHead) { setSearchParams(query) } else { setSearchParams('') }

      fetch(`http://localhost:3000/api/v1/posts/?${query}`)
        .then((response) => response.json())
        .then(updatePosts)
    } else {
      isMount = true
    }
  }, [searchInputHead])

  return (
    <form className="d-flex flex-column align-items-center">
      <div className="mb-3">
        <input onChange={changeHandler} name="head" placeholder="Поиск по заголовку" type="text" className="form-control" value={searchInputHead} />
      </div>
    </form>
  )
}

export default SearchPost
