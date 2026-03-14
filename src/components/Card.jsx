import tatooineImg from "../assets/img/Tatooine.webp"; // 📝 Importa la imagen de Tatooine
import cr90Img from "../assets/img/cr90_corvette.jpg"; // 📝 Importa la imagen de CR90
import starDestroyerImg from "../assets/img/star_destroyer.jpg"; // 📝 Importa la imagen de Star Destroyer
import { Link } from "react-router-dom"; // ✅ Bien hecho al usar Link para la navegación
import useGlobalReducer from "../hooks/useGlobalReducer"; // 📝 Importa el hook para el manejo del estado

export const Card = (props) => { // 📝 Componente funcional que recibe props
    const { store, actions } = useGlobalReducer(); // ✅ Bien hecho al usar el hook para obtener el estado y acciones

    const getImageUrl = () => { // 📝 Función para obtener la URL de la imagen
        const name = props.name.toLowerCase(); // 📝 Convierte el nombre a minúsculas

        if (name === "tatooine") return tatooineImg; // 📝 Retorna la imagen de Tatooine
        if (name === "cr90 corvette") return cr90Img; // 📝 Retorna la imagen de CR90
        if (name === "star destroyer") return starDestroyerImg; // 📝 Retorna la imagen de Star Destroyer

        return `https://raw.githubusercontent.com/tbone849/star-wars-guide/master/build/assets/img/${props.category}/${props.uid}.jpg`; // 📝 Retorna la URL por defecto
    };
    const isFavorite = store.favorites.some(fav => fav.uid === props.uid && fav.category === props.category); // ✅ Bien hecho al verificar si es favorito

    const handleFavoriteClick = () => { // 📝 Función para manejar el click en el botón de favorito
        if (isFavorite) { // 📝 Verifica si es favorito
            actions.deleteFavorite(props.uid); // 📝 Elimina de favoritos
        } else { // 📝 Si no es favorito
            actions.addFavorite({ // 📝 Agrega a favoritos
                name: props.name,
                uid: props.uid,
                category: props.category
            }); // 📝 Se pasa la información del item
        }
    };

    return (
        <div className="carousel-card"> // 📝 Contenedor principal
            <div className="card h-100 bg-dark border-secondary"> // 📝 Tarjeta con estilo
                <div className="img-container"> // 📝 Contenedor de la imagen
                    <img
                        src={getImageUrl()} // 📝 Llama a la función para obtener la imagen
                        onError={(e) => { // 📝 Manejo de error de imagen
                            e.target.onerror = null; // 📝 Evita bucles infinitos
                            e.target.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg"; // 📝 Imagen por defecto
                        }}
                        alt={props.name} // 📝 Texto alternativo para la imagen
                    />
                </div>
                <div className="card-body d-flex flex-column text-center"> // 📝 Cuerpo de la tarjeta
                    <h5 className="card-title sw-title text-warning">{props.name.toLowerCase()}</h5> // 📝 Título de la tarjeta
                    <p className="card-text sw-text text-limit">{props.description}</p> // 📝 Descripción del item
                    <div className="card-footer-custom"> // 📝 Contenedor para el pie de la tarjeta
                        <Link to={`/${props.category}/${props.uid}`} className="btn btn-outline-warning"> // ✅ Bien hecho al usar Link
                            Ver detalles // 📝 Texto del botón
                        </Link>
                        <button
                            className={`btn-heart ${isFavorite ? "active" : ""}`} // 📝 Clase condicional para el botón
                            onClick={handleFavoriteClick} // 📝 Maneja el click
                        >
                            <i className={`bi ${isFavorite ? "bi-heart-fill" : "bi-heart"}`}></i> // 📝 Icono del botón
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
