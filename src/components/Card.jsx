import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { ACTION_TYPES } from "../store";
import {
	buildFallbackImage,
	getResourceImageUrl,
	RESOURCE_CONFIG
} from "../services/swapi";

export const Card = ({ item }) => {
	const { store, dispatch } = useGlobalReducer();
	const isFavorite = store.favorites.some(
		(favorite) => favorite.uid === item.uid && favorite.type === item.type
	);

	const handleFavoriteClick = () => {
		dispatch({
			type: ACTION_TYPES.toggleFavorite,
			payload: {
				name: item.name,
				uid: item.uid,
				type: item.type
			}
		});
	};

	return (
		<div className="carousel-card">
			<div className="card h-100 bg-dark border-secondary">
				<div className="img-container">
					<img
						src={getResourceImageUrl(item.type, item.uid)}
						onError={(event) => {
							event.currentTarget.src = buildFallbackImage(item.name);
						}}
						alt={item.name}
					/>
				</div>
				<div className="card-body d-flex flex-column text-center">
					<p className="text-uppercase text-warning small mb-2">
						{RESOURCE_CONFIG[item.type].label}
					</p>
					<h5 className="card-title sw-title text-warning">
						{item.name.toLowerCase()}
					</h5>
					<p className="card-text sw-text text-limit">
						{RESOURCE_CONFIG[item.type].cardDescription}
					</p>
					<div className="card-footer-custom">
						<Link to={`/${item.type}/${item.uid}`} className="btn btn-outline-warning">
							View detail
						</Link>
						<button
							type="button"
							className={`btn-heart ${isFavorite ? "active" : ""}`}
							onClick={handleFavoriteClick}
							aria-pressed={isFavorite}
							aria-label={
								isFavorite
									? `Remove ${item.name} from favorites`
									: `Add ${item.name} to favorites`
							}
						>
							<i className={`bi ${isFavorite ? "bi-heart-fill" : "bi-heart"}`}></i>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

Card.propTypes = {
	item: PropTypes.shape({
		uid: PropTypes.string.isRequired,
		type: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired
	}).isRequired
};
