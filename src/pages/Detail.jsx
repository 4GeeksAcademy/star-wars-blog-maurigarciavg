import tatooineImg from "../assets/img/Tatooine.webp"; // ✅ Importas imágenes correctamente
import cr90Img from "../assets/img/cr90_corvette.jpg"; // ✅ Importas imágenes correctamente
import starDestroyerImg from "../assets/img/star_destroyer.jpg"; // ✅ Importas imágenes correctamente
import { useParams, useNavigate } from "react-router-dom"; // ✅ Usas hooks de React Router
import PropTypes from "prop-types"; // ✅ Usas PropTypes para validación
import { useEffect, useState } from "react"; // ✅ Usas hooks de estado y efecto
import './detail.css'; // ✅ Importas el CSS correctamente

export const Detail = () => {
    const { categoryId, theId } = useParams(); // ✅ Extraes parámetros de la URL
    const [Details, setDetails] = useState(null); // ✅ Inicializas el estado
    const navigate = useNavigate(); // ✅ Usas el hook para navegar

    const getDetailImg = () => {
        if (!Details) return ""; // 💡 Asegúrate de que Details esté definido
        const name = Details.properties.name.toLowerCase(); // ✅ Convierte el nombre a minúsculas
        if (name === "tatooine") return tatooineImg; // ✅ Retorna la imagen correcta
        if (name === "cr90 corvette") return cr90Img; // ✅ Retorna la imagen correcta
        if (name === "star destroyer") return starDestroyerImg; // ✅ Retorna la imagen correcta

        return `https://raw.githubusercontent.com/tbone849/star-wars-guide/refs/heads/master/build/assets/img/${categoryId}/${theId}.jpg`; // ✅ Retorna la URL de la imagen
    };

    const getDetails = async () => {
        const apiCategory = categoryId === "characters" ? "people" : categoryId; // ✅ Asigna la categoría correcta
        const data = await fetch(`https://www.swapi.tech/api/${apiCategory}/${theId}`); // ✅ Llama a la API correctamente
        const result = await data.json(); // ✅ Convierte la respuesta a JSON
        setDetails(result.result); // ✅ Actualiza el estado con los detalles
    };

    const getDescription = () => {
        if (categoryId === "characters") {
            return `A legendary figure whose name echoes through the Force...`; // ✅ Descripción clara para personajes
        }
        if (categoryId === "planets") {
            return `From the desolate, twin-sunned sands...`; // ✅ Descripción clara para planetas
        }
        return `Engineering marvels designed to conquer the infinite void...`; // ✅ Descripción clara para naves
    };

    useEffect(() => {
        getDetails(); // ✅ Llama a la función para obtener detalles
    }, [theId]); // ✅ Dependencia correcta para el efecto

    if (!Details) {
        return <div className="text-center mt-5 text-warning">Cargando datos de la galaxia...</div>; // ✅ Mensaje de carga adecuado
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
                <h1>{Details.properties.name.toLowerCase()}</h1> // ✅ Muestra el nombre correctamente

                <div className="row align-items-center mb-4">
                    <div className="col-md-6 text-center">
                        <img
                            src={getDetailImg()}
                            alt={Details.properties.name}
                            className="detail-img img-fluid"
                            onError={(e) => {
                                e.target.onerror = null; // 💡 Evita bucles infinitos
                                e.target.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg"; // ✅ Imagen de reemplazo
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
    match: PropTypes.object // ✅ PropTypes para validación
};

