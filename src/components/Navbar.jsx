import { Link } from "react-router-dom"; // ✅ Importas Link correctamente
import useGlobalReducer from "../hooks/useGlobalReducer"; // ✅ Importas el hook de manera correcta
import starWarsLogo from "/src/assets/img/star-wars-logo.png"; // ✅ Buen uso de la imagen del logo

export const Navbar = () => {
	const { store, actions } = useGlobalReducer(); // ✅ Usas el hook para acceder al estado

	return (
		<nav className="navbar navbar-dark"> // ✅ Estructura básica de la navbar
			<div className="container"> // ✅ Contenedor para la navbar
				<Link to="/"> // ✅ Enlace a la página principal
					<img src={starWarsLogo} alt="Logo" className="main-logo" /> // ✅ Imagen del logo
				</Link>

				<div className="d-flex align-items-center gap-3"> // ✅ Flexbox para alinear elementos

					<div className="dropdown"> // ✅ Dropdown para favoritos
						<button
							className="btn btn-fav-custom dropdown-toggle sw-title" // 💡 Considera usar un nombre más descriptivo para la clase
							type="button"
							data-bs-toggle="dropdown"
							aria-expanded="false"
						>
							favorites
							<span className="badge bg-secondary ms-2">{store.favorites.length}</span> // ✅ Muestra la cantidad de favoritos
						</button>

						<ul className="dropdown-menu dropdown-menu-end bg-dark border-warning"> // ✅ Estilo del menú desplegable
							{store.favorites.length === 0 ? (
								<li><span className="dropdown-item text-secondary">No favorites yet</span></li> // ✅ Mensaje claro si no hay favoritos
							) : (
								store.favorites.map((fav, index) => (
									<li key={index} className="d-flex justify-content-between align-items-center pe-2"> // ✅ Uso de key para cada elemento
										<Link
										to={`/${fav.category}/${fav.uid}`}
										className="dropdown-item text-warning sw-text"
									>
										{fav.name}
									</Link>
										<i
										className="bi bi-trash3 text-danger cursor-pointer" // 💡 Considera usar un botón en lugar de un icono para accesibilidad
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

// ✅ Buen trabajo en la estructura del componente y en el uso de hooks.