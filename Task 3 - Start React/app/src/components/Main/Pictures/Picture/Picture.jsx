import { useContext } from "react"
import { PostsContext } from "../../../../contexts/PostsContext"

const Picture = ({head, idPost, description, link, tag}) => {

    const {deletePost} = useContext(PostsContext)

    const deleteHandler = () => {
        deletePost(idPost)
    }

    return (
        <div className="card my-2" style={{width: '18rem'}}>
            <div className="card-body">
                <h2 className="card-text">{head}</h2>
            </div>
            <img src={link} className="card-img-top" alt=""/>
            <div className="card-body">
                <p className="card-text">{description}</p>
            </div>
            <p>#{tag}</p>
            <button onClick={deleteHandler} type="button" className="btn btn-danger my-2">Удалить</button>
        </div>
    )
}

export default Picture