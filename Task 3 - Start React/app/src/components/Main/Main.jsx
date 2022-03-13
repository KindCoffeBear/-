import PostsProvider from "../../contexts/PostsContext";
import Form from "./Form/Form";
import Pictures from "./Pictures/Pictures";

const Main = () => {

    return (
        <PostsProvider>
            <section className="container">
                <Form />
                <Pictures />
            </section> 
        </PostsProvider>
    )
}

export default Main