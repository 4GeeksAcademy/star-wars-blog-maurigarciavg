
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

    const getDescription = () => {
    if (categoryId === "characters") {
        return `A legendary figure whose name echoes through the Force, representing the vast diversity of life across the stars. Throughout history, individuals like this have shaped the destiny of the galaxy, navigating the delicate balance between the Light and Dark sides while forging their own path in an era of constant turmoil. From the humble beginnings on backwater worlds to the grand stages of the Galactic Senate, their actions resonate across generations. These beings are the architects of war and peace, wielders of arcane powers or masters of technological prowess, serving as catalysts for change that can inspire hope in the oppressed or strike fear into the hearts of their enemies. Their journey is a testament to the enduring spirit of life in a vast and often unforgiving universe where every choice can tip the scales of galactic fate.`;
    }
    if (categoryId === "planets") {
        return `From the desolate, twin-sunned sands of the Outer Rim to the lush, sprawling jungles of the Core Worlds, every planet tells a unique story that spans millennia. These celestial bodies serve as the stage for epic conflicts and the cradle of diverse civilizations that have evolved in isolation or thrived through interstellar commerce and diplomacy. Each world possesses its own unique ecosystem, varying gravity, and atmospheric conditions that challenge any traveler who dares to land upon its surface. Some are urban marvels, covered entirely by cityscapes that touch the clouds, while others remain wild, untamed frontiers where ancient secrets lie buried beneath layers of ice, dense foliage, or deep oceans. They are the tactical strongholds in galactic wars and the peaceful sanctuaries for those seeking refuge from the chaos of the stars, forming the literal bedrock of the galactic community.`;
    }
   
    return `Engineering marvels designed to conquer the infinite void of space, these vessels represent the absolute pinnacle of galactic technology and ambition. Equipped with advanced hyperdrive systems and reinforced hull plating, starships are the indispensable lifelines of interstellar society, connecting distant systems across light-years of vacuum. From the agile starfighters that dance through treacherous asteroid fields to the massive, kilometer-long cruisers that serve as mobile command centers for entire fleets, each ship is built with a specific purpose in mind. They navigate the complex hyperlanes that connect the galaxy's sectors, turning the impossible reaches of the stars into a reachable frontier for explorers, traders, and soldiers alike. For many, a ship is more than just a machine; it is a home, a shield, and a weapon, where the hum of the sublight engines and the sudden jolt into lightspeed define the heartbeat of galactic travel.`;
};

    useEffect(() => {
        getDetails()
    }, []);
    if (!Details) {
        return <div className="text-center mt-5 text-warning">Cargando datos de la galaxia...</div>;
    }

    return (

        <div className="container mt-4">
            <button
                className="btn btn-outline-warning mb"
                onClick={() => navigate("/")}
            >
                <i className="bi bi-arrow-left"></i> Volver a la Galaxia
            </button>
            <div className="container mt-5 p-4 detail-container">

                <h1> {Details.properties.name.toLowerCase()}</h1>
                <div className="row mb-4">
                    <div className="col-md-6">
                        <img src={`https://raw.githubusercontent.com/tbone849/star-wars-guide/refs/heads/master/build/assets/img/${categoryId}/${theId}.jpg`} />
                    </div>
                    <div className="col-md-6 text-center">
                        {getDescription()}
                    </div>
                </div>


                <hr className="border-danger border-2 opacity-75" />


                <div className="row text-danger text-center mt-3">
                    <div className="col">

                        <div className="fw-bold">
                            {categoryId === "characters" ? "birth year" :
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

        </div>


    );

};

// Use PropTypes to validate the props passed to this component, ensuring reliable behavior.
Detail.propTypes = {
    // Although 'match' prop is defined here, it is not used in the component.
    // Consider removing or using it as needed.
    match: PropTypes.object
};
