import tatooineImg from "../assets/img/Tatooine.webp";
import cr90Img from "../assets/img/cr90_corvette.jpg";
import starDestroyerImg from "../assets/img/star_destroyer.jpg";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Card = (props) => {
    const { store, actions } = useGlobalReducer();

    const getImageUrl = () => {
        const name = props.name.toLowerCase();

        if (name === "tatooine") return tatooineImg; // ✅ Buen uso de imágenes locales
        if (name === "cr90 corvette") return cr90Img; // ✅ Buen uso de imágenes locales
        if (name === "star destroyer") return starDestroyerImg; // ✅ Buen uso de imágenes locales

        return `https://raw.githubusercontent.com/tbone849/star-wars-guide/master/build/assets/img/${props.category}/${props.uid}.jpg`;
    };
    const isFavorite = store.favorites.some(fav => fav.uid === props.uid && fav.category === props.category); // ✅ Buena lógica para verificar favoritos

    const handleFavoriteClick = () => {
        if (isFavorite) {
            actions.deleteFavorite(props.uid);
        } else {
            actions.addFavorite({
                name: props.name,
                uid: props.uid,
                category: props.category
            });
        }
    };

    return (
        <div className="carousel-card">
            <div className="card h-100 bg-dark border-secondary">
                <div className="img-container">
                    <img
                        src={getImageUrl()}
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg";
                        }}
                        alt={props.name}
                    />
                </div>
                <div className="card-body d-flex flex-column text-center">
                    <h5 className="card-title sw-title text-warning">{props.name.toLowerCase()}</h5>
                    <p className="card-text sw-text text-limit">{props.description}</p>
                    <div className="card-footer-custom">
                        <Link to={`/${props.category}/${props.uid}`} className="btn btn-outline-warning">
                            Ver detalles
                        </Link>
                        <button
                            className={`btn-heart ${isFavorite ? "active" : ""}`}
                            onClick={handleFavoriteClick}
                        >
                            <i className={`bi ${isFavorite ? "bi-heart-fill" : "bi-heart"}`}></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
