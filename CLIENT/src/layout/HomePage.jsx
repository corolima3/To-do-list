import { Link } from "react-router-dom";

export default function HomePage() {

    return(
        <>
        <h1>HomePage</h1>
        <Link to="/register">register</Link>
        <Link to="/login">login</Link>
        <Link to="/tasks">Task</Link>
        </>
    )
}
