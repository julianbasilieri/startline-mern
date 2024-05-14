import { useDispatch, useSelector } from 'react-redux'
import { addPostAsync, deletePostAsync, getPostAsync, updatePostAsync } from '../store/postSlice'

const Prueba = () => {
    const dispatch = useDispatch()
    const posts = useSelector((state) => state.post)

    console.log(posts)

    async function getPosts() {
        const res = await dispatch(getPostAsync())
        console.log(res)
    }

    async function addPosts() {
        const res = await dispatch(addPostAsync())
        console.log(res)
    }

    async function updatePosts() {
        const res = await dispatch(updatePostAsync())
        console.log(res)
    }

    async function deletePosts() {
        const res = await dispatch(deletePostAsync())
        console.log(res)
    }

    return (
        <>
            <button onClick={getPosts}>get</button>
            <button onClick={addPosts}>add</button>
            <button onClick={updatePosts}>update</button>
            <button onClick={deletePosts}>delete</button>
        </>
    )
}

export default Prueba