import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import starWarsLogo from "/src/assets/img/star-wars-logo.png";

export const Navbar = () => {
	const { store, actions } = useGlobalReducer();


	return (
		<nav className="navbar navbar-dark">
			<div className="container">
				<Link to="/">
					<img src={starWarsLogo} alt="Logo" className="main-logo" />
				</Link>

				<div className="d-flex align-items-center gap-3">


					<div className="dropdown">
						<button
							className="btn btn-fav-custom dropdown-toggle sw-title"
							type="button"
							data-bs-toggle="dropdown"
							aria-expanded="false"
						>
							favorites
							<span className="badge bg-secondary ms-2">{store.favorites.length}</span>
						</button>

						<ul className="dropdown-menu dropdown-menu-end bg-dark border-warning">
							{store.favorites.length === 0 ? (
								<li><span className="dropdown-item text-secondary">No favorites yet</span></li>
							) : (
								store.favorites.map((fav, index) => (
									<li key={index} className="d-flex justify-content-between align-items-center pe-2">
										<Link
											to={`/${fav.category}/${fav.uid}`}
											className="dropdown-item text-warning sw-text"
										>
											{fav.name}
										</Link>
										<i
											className="bi bi-trash3 text-danger cursor-pointer"
											onClick={() => actions.deleteFavorite(fav.uid)}
										></i>
									</li>
								))
							)}
						</ul>
					</div>
				</div>
			</div>
		</nav>
	);
};