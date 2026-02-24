
import { Link, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useEffect, useState } from "react";
import './detail.css'
import { useNavigate } from "react-router-dom";


export const Detail = props => {
    const { store } = useGlobalReducer();
    const { categoryId, theId } = useParams();
    const [Details, setDetails] = useState(null);
    const navigate = useNavigate();

    const getDetails = async () => {
        const apiCategory = categoryId === "characters" ? "people" : categoryId;

        const data = await fetch(`https://www.swapi.tech/api/${apiCategory}/${theId}`);
        const result = await data.json();

        setDetails(result.result);
    };

    useEffect(() => {
        getDetails()
    }, []);
    if (!Details) {
        return <div className="text-center mt-5 text-warning">Cargando datos de la galaxia...</div>;
    }

    return (
        <div>

            <div className="container mt-5 p-4 detail-container">

                <h1> {Details.properties.name.toLowerCase()}</h1>
                <div className="row mb-4">
                    <div className="col-md-6">
                        <img src={`https://raw.githubusercontent.com/tbone849/star-wars-guide/refs/heads/master/build/assets/img/${categoryId}/${theId}.jpg`} />
                    </div>
                    <div className="col-md-6 text-center">
                        {Details.description}
                    </div>
                </div>


                <hr className="border-danger border-2 opacity-75" />


                <div className="row text-danger text-center mt-3">
                    <div className="col">

                        <div className="fw-bold">
                            {categoryId === "characters" ? "Birth Year" :
                                categoryId === "planets" ? "Climate" :
                                    "Model"}
                        </div>


                        <div className="text-muted">
                            {categoryId === "characters" ? Details.properties.birth_year :
                                categoryId === "planets" ? Details.properties.climate :
                                    Details.properties.model}
                        </div>
                    </div>

                    <div className="col">
                        <div className="fw-bold">
                            {categoryId === "characters" ? "Gender" :
                                categoryId === "planets" ? "Terrain" :
                                    "Starship Class"}
                        </div>
                        <div className="text-muted">
                            {categoryId === "characters" ? Details.properties.gender :
                                categoryId === "planets" ? Details.properties.terrain :
                                    Details.properties.starship_class}
                        </div>
                    </div>


                    <div className="col">
                        <div className="fw-bold">
                            {categoryId === "characters" ? "Height" :
                                categoryId === "planets" ? "Population" :
                                    "Manufacturer"}
                        </div>
                        <div className="text-muted">
                            {categoryId === "characters" ? Details.properties.height :
                                categoryId === "planets" ? Details.properties.population :
                                    Details.properties.manufacturer}
                        </div>
                    </div>


                    <div className="col">
                        <div className="fw-bold">
                            {categoryId === "characters" ? "Skin Color" :
                                categoryId === "planets" ? "Diameter" :
                                    "Cost"}
                        </div>
                        <div className="text-muted">
                            {categoryId === "characters" ? Details.properties.skin_color :
                                categoryId === "planets" ? Details.properties.diameter :
                                    Details.properties.cost_in_credits}
                        </div>
                    </div>


                    <div className="col">
                        <div className="fw-bold">
                            {categoryId === "characters" ? "Eye Color" :
                                categoryId === "planets" ? "Gravity" :
                                    "Length"}
                        </div>
                        <div className="text-muted">
                            {categoryId === "characters" ? Details.properties.eye_color :
                                categoryId === "planets" ? Details.properties.gravity :
                                    Details.properties.length}
                        </div>
                    </div>

                </div>

            </div>
            <button
                className="btn btn-outline-warning mb-4"
                onClick={() => navigate("/")}
            >
                <i className="bi bi-arrow-left"></i> Volver a la Galaxia
            </button>
        </div>

    );

};

// Use PropTypes to validate the props passed to this component, ensuring reliable behavior.
Detail.propTypes = {
    // Although 'match' prop is defined here, it is not used in the component.
    // Consider removing or using it as needed.
    match: PropTypes.object
};
