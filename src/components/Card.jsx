import { Link } from "react-router-dom";

export const Card = (props) => {
    const handleImgError = (e) => {
        e.target.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg";
    };

    return (
        <div className="carousel-card">
            <div className="card h-100 bg-dark border-secondary">
                <div className="img-container">
                    <img
                        src={`https://raw.githubusercontent.com/tbone849/star-wars-guide/master/build/assets/img/${props.category}/${props.uid}.jpg`}
                        onError={(e) => { e.target.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg"; }}
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
                        <button className="btn-heart"><i className="bi bi-heart"></i></button>
                    </div>
                </div>
            </div>
        </div>
    );
};