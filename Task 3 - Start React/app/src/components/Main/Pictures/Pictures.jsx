import { useContext } from "react";
import { PostsContext } from "../../../contexts/PostsContext";
import Picture from "./Picture/Picture";

const Pictures = () => {

    const {posts, deletePost} = useContext(PostsContext)

    return (
        <section data-pictures className="row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-5 justify-content-center" style={{gap: '30px'}}>
            {
                posts.map((post) => {
                    return(
                        <Picture key={post.idPost} deletePost={deletePost} idPost={post.idPost} head={post.head} description={post.description} link={post.link} tag={post.tag}/>
                    )
                })
            }
        </section>
    )
}

export default Pictures