import { Link } from "react-router-dom"; // 📝 Importamos Link para la navegación
import useGlobalReducer from "../hooks/useGlobalReducer"; // 📝 Importamos el hook para el estado global
import starWarsLogo from "/src/assets/img/star-wars-logo.png"; // 📝 Importamos el logo de Star Wars

export const Navbar = () => { // ✅ Buen uso de funciones de componentes
	const { store, actions } = useGlobalReducer(); // 📝 Obtenemos el estado y acciones del reducer

	return (
		<nav className="navbar navbar-dark"> // ✅ Buen uso de clases de Bootstrap
			<div className="container"> // 📝 Contenedor para alinear elementos
				<Link to="/"> // 📝 Enlace a la página principal
					<img src={starWarsLogo} alt="Logo" className="main-logo" /> // 📝 Logo de Star Wars
				</Link>

				<div className="d-flex align-items-center gap-3"> // 📝 Flexbox para alinear elementos

					<div className="dropdown"> // ✅ Buen uso de dropdown
						<button
							className="btn btn-fav-custom dropdown-toggle sw-title" // 📝 Clases personalizadas para el botón
							type="button"
							data-bs-toggle="dropdown" // 📝 Bootstrap para manejar el dropdown
							aria-expanded="false"
						>
							favorites // 📝 Texto del botón
							<span className="badge bg-secondary ms-2">{store.favorites.length}</span> // 📝 Muestra la cantidad de favoritos
						</button>

						<ul className="dropdown-menu dropdown-menu-end bg-dark border-warning"> // 📝 Estilo del menú desplegable
							{store.favorites.length === 0 ? (
								<li><span className="dropdown-item text-secondary">No favorites yet</span></li> // 📝 Mensaje cuando no hay favoritos
							) : (
								store.favorites.map((fav, index) => (
									<li key={index} className="d-flex justify-content-between align-items-center pe-2"> // 📝 Usar index como key puede causar problemas, mejor usar un id único
										<Link
											to={`/${fav.category}/${fav.uid}`}
											className="dropdown-item text-warning sw-text"
										>
											{fav.name} // 📝 Nombre del favorito
										</Link>
											<i
											className="bi bi-trash3 text-danger cursor-pointer" // 📝 Icono de eliminar
											onClick={() => actions.deleteFavorite(fav.uid)} // 📝 Acción para eliminar favorito
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
