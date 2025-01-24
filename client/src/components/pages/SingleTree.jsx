import {useParams} from "react-router-dom"
import NavBar from "../modules/NavBar";

const SingleTreeDetail = (tree) => {
    const { treeName } = useParams();

    return (
        <div>
        <NavBar />
            <h1>Tree: {treeName} </h1>
        
        </div>
    )
}

export default SingleTreeDetail