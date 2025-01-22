import {useParams} from "react-router-dom"
import {ProgressBar} from "../modules/ProgressBar.jsx";

const SingleTreeDetail = (tree) => {
    const { treeName } = useParams();

    return (
        <div>
            <h1>Tree: {treeName} </h1>

        </div>
    )
}

export default SingleTreeDetail
