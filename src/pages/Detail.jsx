import tatooineImg from "../assets/img/Tatooine.webp";
import cr90Img from "../assets/img/cr90_corvette.jpg";
import starDestroyerImg from "../assets/img/star_destroyer.jpg";
import { useParams, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import './detail.css';

export const Detail = () => {
    const { categoryId, theId } = useParams();
    const [Details, setDetails] = useState(null);
    const navigate = useNavigate();

    const getDetailImg = () => {
        const name = Details.properties.name.toLowerCase();
        if (name === "tatooine") return tatooineImg;
        if (name === "cr90 corvette") return cr90Img;
        if (name === "star destroyer") return starDestroyerImg;

        return `https://raw.githubusercontent.com/tbone849/star-wars-guide/refs/heads/master/build/assets/img/${categoryId}/${theId}.jpg`;
    };

    const getDetails = async () => {
        const apiCategory = categoryId === "characters" ? "people" : categoryId;
        const data = await fetch(`https://www.swapi.tech/api/${apiCategory}/${theId}`);
        const result = await data.json();
        setDetails(result.result);
    };

    const getDescription = () => {
        if (categoryId === "characters") {
            return `A legendary figure whose name echoes through the Force, representing the vast diversity of life across the stars. Throughout history, individuals like this have shaped the destiny of the galaxy, navigating the delicate balance between the Light and Dark sides while forging their own path in an era of constant turmoil.`;
        }
        if (categoryId === "planets") {
            return `From the desolate, twin-sunned sands of the Outer Rim to the lush, sprawling jungles of the Core Worlds, every planet tells a unique story that spans millennia. These celestial bodies serve as the stage for epic conflicts and the cradle of diverse civilizations.`;
        }
        return `Engineering marvels designed to conquer the infinite void of space, these vessels represent the absolute pinnacle of galactic technology and ambition. Equipped with advanced hyperdrive systems, starships are the indispensable lifelines of interstellar society.`;
    };

    useEffect(() => {
        getDetails();
    }, [theId]);

    if (!Details) {
        return <div className="text-center mt-5 text-warning">Cargando datos de la galaxia...</div>;
    }

    return (
        <div className="container mt-4">
            <button
                className="btn btn-outline-warning mb-4"
                onClick={() => navigate("/")}
            >
                <i className="bi bi-arrow-left"></i> Volver a la Galaxia
            </button>

            <div className="detail-container shadow-lg">
                <h1>{Details.properties.name.toLowerCase()}</h1>

                <div className="row align-items-center mb-4">
                    <div className="col-md-6 text-center">
                        <img
                            src={getDetailImg()}
                            alt={Details.properties.name}
                            className="detail-img img-fluid"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg";
                            }}
                        />
                    </div>

                    <div className="col-md-6">
                        <div className="detail-description">
                            {getDescription()}
                        </div>
                    </div>
                </div>

                <hr className="custom-hr" />

                <div className="row text-center mt-4">
                    <div className="col">
                        <div className="detail-label">
                            {categoryId === "characters" ? "birth year" : categoryId === "planets" ? "climate" : "model"}
                        </div>
                        <div className="detail-value">
                            {categoryId === "characters" ? Details.properties.birth_year : categoryId === "planets" ? Details.properties.climate : Details.properties.model}
                        </div>
                    </div>

                    <div className="col">
                        <div className="detail-label">
                            {categoryId === "characters" ? "gender" : categoryId === "planets" ? "terrain" : "class"}
                        </div>
                        <div className="detail-value">
                            {categoryId === "characters" ? Details.properties.gender : categoryId === "planets" ? Details.properties.terrain : Details.properties.starship_class}
                        </div>
                    </div>

                    <div className="col">
                        <div className="detail-label">
                            {categoryId === "characters" ? "height" : categoryId === "planets" ? "population" : "manufacturer"}
                        </div>
                        <div className="detail-value">
                            {categoryId === "characters" ? Details.properties.height : categoryId === "planets" ? Details.properties.population : Details.properties.manufacturer}
                        </div>
                    </div>

                    <div className="col">
                        <div className="detail-label">
                            {categoryId === "characters" ? "eye color" : categoryId === "planets" ? "diameter" : "cost"}
                        </div>
                        <div className="detail-value">
                            {categoryId === "characters" ? Details.properties.eye_color : categoryId === "planets" ? Details.properties.diameter : Details.properties.cost_in_credits}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

Detail.propTypes = {
    match: PropTypes.object
};
