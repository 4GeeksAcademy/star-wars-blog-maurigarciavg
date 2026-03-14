import tatooineImg from "../assets/img/Tatooine.webp"; // 📝 Importa la imagen de Tatooine
import cr90Img from "../assets/img/cr90_corvette.jpg"; // 📝 Importa la imagen de CR90 Corvette
import starDestroyerImg from "../assets/img/star_destroyer.jpg"; // 📝 Importa la imagen de Star Destroyer
import { useParams, useNavigate } from "react-router-dom"; // 📝 Importa hooks de React Router
import PropTypes from "prop-types"; // 📝 Importa PropTypes para validación de props
import { useEffect, useState } from "react"; // 📝 Importa hooks de React
import './detail.css'; // 📝 Importa estilos CSS

export const Detail = () => {
    const { categoryId, theId } = useParams(); // 📝 Obtiene parámetros de la URL
    const [Details, setDetails] = useState(null); // ✅ Inicializa el estado para detalles
    const navigate = useNavigate(); // ✅ Inicializa el hook de navegación

    const getDetailImg = () => { // 📝 Función para obtener la imagen de detalle
        const name = Details.properties.name.toLowerCase(); // 📝 Convierte el nombre a minúsculas
        if (name === "tatooine") return tatooineImg; // 📝 Retorna imagen de Tatooine
        if (name === "cr90 corvette") return cr90Img; // 📝 Retorna imagen de CR90 Corvette
        if (name === "star destroyer") return starDestroyerImg; // 📝 Retorna imagen de Star Destroyer

        return `https://raw.githubusercontent.com/tbone849/star-wars-guide/refs/heads/master/build/assets/img/${categoryId}/${theId}.jpg`; // 📝 Retorna URL por defecto
    };

    const getDetails = async () => { // 📝 Función asíncrona para obtener detalles
        const apiCategory = categoryId === "characters" ? "people" : categoryId; // 📝 Determina la categoría de la API
        const data = await fetch(`https://www.swapi.tech/api/${apiCategory}/${theId}`); // 📝 Realiza la solicitud a la API
        const result = await data.json(); // 📝 Convierte la respuesta a JSON
        setDetails(result.result); // ✅ Actualiza el estado con los detalles obtenidos
    };

    const getDescription = () => { // 📝 Función para obtener la descripción
        if (categoryId === "characters") { // 📝 Verifica si es un personaje
            return `A legendary figure whose name echoes through the Force, representing the vast diversity of life across the stars. Throughout history, individuals like this have shaped the destiny of the galaxy, navigating the delicate balance between the Light and Dark sides while forging their own path in an era of constant turmoil.`; // 📝 Descripción de personajes
        }
        if (categoryId === "planets") { // 📝 Verifica si es un planeta
            return `From the desolate, twin-sunned sands of the Outer Rim to the lush, sprawling jungles of the Core Worlds, every planet tells a unique story that spans millennia. These celestial bodies serve as the stage for epic conflicts and the cradle of diverse civilizations.`; // 📝 Descripción de planetas
        }
        return `Engineering marvels designed to conquer the infinite void of space, these vessels represent the absolute pinnacle of galactic technology and ambition. Equipped with advanced hyperdrive systems, starships are the indispensable lifelines of interstellar society.`; // 📝 Descripción de naves
    };

    useEffect(() => { // 📝 Hook para ejecutar la función al cargar el componente
        getDetails(); // ✅ Llama a la función para obtener detalles
    }, [theId]); // 📝 Dependencia para ejecutar cuando cambia theId

    if (!Details) { // 📝 Verifica si no hay detalles
        return <div className="text-center mt-5 text-warning">Cargando datos de la galaxia...</div>; // ✅ Mensaje de carga
    }

    return (
        <div className="container mt-4"> // 📝 Contenedor principal
            <button
                className="btn btn-outline-warning mb-4"
                onClick={() => navigate("/")}
            > // ✅ Botón para volver
                <i className="bi bi-arrow-left"></i> Volver a la Galaxia
            </button>

            <div className="detail-container shadow-lg"> // 📝 Contenedor de detalles
                <h1>{Details.properties.name.toLowerCase()}</h1> // 📝 Muestra el nombre en minúsculas

                <div className="row align-items-center mb-4"> // 📝 Fila para imagen y descripción
                    <div className="col-md-6 text-center"> // 📝 Columna para imagen
                        <img
                            src={getDetailImg()}
                            alt={Details.properties.name}
                            className="detail-img img-fluid"
                            onError={(e) => { // 📝 Manejo de error de imagen
                                e.target.onerror = null; // 📝 Evita bucles de error
                                e.target.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg"; // 📝 Imagen de placeholder
                            }}
                        />
                    </div>

                    <div className="col-md-6"> // 📝 Columna para descripción
                        <div className="detail-description">
                            {getDescription()} // ✅ Muestra la descripción
                        </div>
                    </div>
                </div>

                <hr className="custom-hr" /> // 📝 Línea horizontal

                <div className="row text-center mt-4"> // 📝 Fila para detalles adicionales
                    <div className="col"> // 📝 Columna para detalle
                        <div className="detail-label">
                            {categoryId === "characters" ? "birth year" : categoryId === "planets" ? "climate" : "model"} // 📝 Muestra la etiqueta correcta
                        </div>
                        <div className="detail-value">
                            {categoryId === "characters" ? Details.properties.birth_year : categoryId === "planets" ? Details.properties.climate : Details.properties.model} // 📝 Muestra el valor correcto
                        </div>
                    </div>

                    <div className="col"> // 📝 Columna para detalle
                        <div className="detail-label">
                            {categoryId === "characters" ? "gender" : categoryId === "planets" ? "terrain" : "class"} // 📝 Muestra la etiqueta correcta
                        </div>
                        <div className="detail-value">
                            {categoryId === "characters" ? Details.properties.gender : categoryId === "planets" ? Details.properties.terrain : Details.properties.starship_class} // 📝 Muestra el valor correcto
                        </div>
                    </div>

                    <div className="col"> // 📝 Columna para detalle
                        <div className="detail-label">
                            {categoryId === "characters" ? "height" : categoryId === "planets" ? "population" : "manufacturer"} // 📝 Muestra la etiqueta correcta
                        </div>
                        <div className="detail-value">
                            {categoryId === "characters" ? Details.properties.height : categoryId === "planets" ? Details.properties.population : Details.properties.manufacturer} // 📝 Muestra el valor correcto
                        </div>
                    </div>

                    <div className="col"> // 📝 Columna para detalle
                        <div className="detail-label">
                            {categoryId === "characters" ? "eye color" : categoryId === "planets" ? "diameter" : "cost"} // 📝 Muestra la etiqueta correcta
                        </div>
                        <div className="detail-value">
                            {categoryId === "characters" ? Details.properties.eye_color : categoryId === "planets" ? Details.properties.diameter : Details.properties.cost_in_credits} // 📝 Muestra el valor correcto
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

Detail.propTypes = { // 📝 Validación de props
    match: PropTypes.object // 📝 PropTypes para match
};

