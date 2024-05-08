import { useSelector } from "react-redux"

const Home = () => {
    const auth = useSelector((state) => state.auth)

    const mensaje = !auth.user ? 'Hola desconocido' : `Hola ${auth.user.userData.firstname}`

    console.log(auth)

    return (
        <div>
            {mensaje}
        </div>
    )
}

export default Home