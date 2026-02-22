import useGlobalReducer from "../hooks/useGlobalReducer.jsx";


export const Home = () => {

	const { store, dispatch } = useGlobalReducer()

	return (
		<div className="container mt-5">
			<div className="container text-center mt-5">
				<h1 className="text-center sw-title mb-5">Characters</h1>
				<div className="row g-4">
					<div className="col-12 col-md-4">
						<div className="card h-100 bg-dark border-secondary">
							<div className="img-container">
								<img src="https://raw.githubusercontent.com/tbone849/star-wars-guide/master/build/assets/img/characters/1.jpg" alt="Luke" />
							</div>
							<div className="card-body d-flex flex-column text-center">
								<h5 className="card-title sw-title text-warning">Luke skywalker</h5>
								<p className="card-text sw-text text-limit">Un gran caballero Jedi de Tatooine capacitado en las artes de la Fuerza.</p>
								<div className="card-footer-custom">
									<button className="btn btn-outline-warning">Ver detalles</button>
									<button className="btn-heart">
										<i className="bi bi-heart"></i>
									</button>
								</div>
							</div>
						</div>
					</div>
					<div className="col-12 col-md-4"border-secondary>
						<div className="card h-100 bg-dark ">
							<div className="img-container">
								<img src="https://raw.githubusercontent.com/tbone849/star-wars-guide/master/build/assets/img/characters/1.jpg" alt="Luke" />
							</div>
							<div className="card-body d-flex flex-column text-center">
								<h5 className="card-title sw-title text-warning">Luke skywalker</h5>
								<p className="card-text sw-text text-limit">Un gran caballero Jedi de Tatooine capacitado en las artes de la Fuerza.</p>
								<div className="card-footer-custom">
									<button className="btn btn-outline-warning">Ver detalles</button>
									<button className="btn-heart">
										<i className="bi bi-heart"></i>
									</button>
								</div>
							</div>
						</div>
					</div>
					<div className="col-12 col-md-4">
						<div className="card h-100 bg-dark border-secondary">
							<div className="img-container">
								<img src="https://raw.githubusercontent.com/tbone849/star-wars-guide/master/build/assets/img/characters/1.jpg" alt="Luke" />
							</div>
							<div className="card-body d-flex flex-column text-center">
								<h5 className="card-title sw-title text-warning">Luke skywalker</h5>
								<p className="card-text sw-text text-limit">Un gran caballero Jedi de Tatooine capacitado en las artes de la Fuerza.</p>
								<div className="card-footer-custom">
									<button className="btn btn-outline-warning">Ver detalles</button>
									<button className="btn-heart">
										<i className="bi bi-heart"></i>
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div>
				<div className="container text-center mt-5">
					<h1 className="text-center sw-title mb-5">planets</h1>
					<div className="row g-4">
						<div className="col-12 col-md-4">
							<div className="card h-100 bg-dark border-secondary">
								<div className="img-container">
									<img src="https://raw.githubusercontent.com/tbone849/star-wars-guide/refs/heads/master/build/assets/img/planets/2.jpg" alt="Alderaan" />
								</div>
								<div className="card-body d-flex flex-column text-center">
									<h5 className="card-title sw-title text-warning">alderaan</h5>
									<p className="card-text sw-text text-limit">Conocido como la "Joya de los Mundos del Núcleo", Alderaan era un planeta de belleza inigualable, famoso por su cultura pacífica.</p>
									<div className="card-footer-custom">
										<button className="btn btn-outline-warning">Ver detalles</button>
										<button className="btn-heart">
											<i className="bi bi-heart"></i>
										</button>
									</div>
								</div>
							</div>
						</div>
						<div className="col-12 col-md-4">
							<div className="card h-100 bg-dark border-secondary">
								<div className="img-container">
									<img src="https://raw.githubusercontent.com/tbone849/star-wars-guide/refs/heads/master/build/assets/img/planets/2.jpg" alt="Alderaan" />
								</div>
								<div className="card-body d-flex flex-column text-center">
									<h5 className="card-title sw-title text-warning">alderaan</h5>
									<p className="card-text sw-text text-limit">Conocido como la "Joya de los Mundos del Núcleo", Alderaan era un planeta de belleza inigualable, famoso por su cultura pacífica.</p>
									<div className="card-footer-custom">
										<button className="btn btn-outline-warning">Ver detalles</button>
										<button className="btn-heart">
											<i className="bi bi-heart"></i>
										</button>
									</div>
								</div>
							</div>
						</div>
						<div className="col-12 col-md-4">
							<div className="card h-100 bg-dark border-secondary">
								<div className="img-container">
									<img src="https://raw.githubusercontent.com/tbone849/star-wars-guide/refs/heads/master/build/assets/img/planets/2.jpg" alt="Alderaan" />
								</div>
								<div className="card-body d-flex flex-column text-center">
									<h5 className="card-title sw-title text-warning">alderaan</h5>
									<p className="card-text sw-text text-limit">Conocido como la "Joya de los Mundos del Núcleo", Alderaan era un planeta de belleza inigualable, famoso por su cultura pacífica.</p>
									<div className="card-footer-custom">
										<button className="btn btn-outline-warning">Ver detalles</button>
										<button className="btn-heart">
											<i className="bi bi-heart"></i>
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div>
				<div className="container text-center mt-5">
					<h1 className="text-center sw-title mb-5">STarsHiPs</h1>
					<div className="row g-4">
						<div className="col-12 col-md-4">
							<div className="card h-100 bg-dark border-secondary">
								<div className="img-container">
									<img src="https://raw.githubusercontent.com/tbone849/star-wars-guide/refs/heads/master/build/assets/img/starships/10.jpg" alt="Falcon" />
								</div>
								<div className="card-body d-flex flex-column text-center">
									<h5 className="card-title sw-title text-warning">Halcon Milenario</h5>
									<p className="card-text sw-text text-limit">La nave más rápida de la galaxia, capaz de hacer la Carrera Kessel en menos de 12 pársecs.</p>
									<div className="card-footer-custom">
										<button className="btn btn-outline-warning">Ver detalles</button>
										<button className="btn-heart">
											<i className="bi bi-heart"></i>
										</button>
									</div>
								</div>
							</div>
						</div>
						<div className="col-12 col-md-4">
							<div className="card h-100 bg-dark border-secondary">
								<div className="img-container">
									<img src="https://raw.githubusercontent.com/tbone849/star-wars-guide/refs/heads/master/build/assets/img/starships/10.jpg" alt="Falcon" />
								</div>
								<div className="card-body d-flex flex-column text-center">
									<h5 className="card-title sw-title text-warning">Halcon Milenario</h5>
									<p className="card-text sw-text text-limit">La nave más rápida de la galaxia, capaz de hacer la Carrera Kessel en menos de 12 pársecs.</p>
									<div className="card-footer-custom">
										<button className="btn btn-outline-warning">Ver detalles</button>
										<button className="btn-heart">
											<i className="bi bi-heart"></i>
										</button>
									</div>
								</div>
							</div>
						</div>
						<div className="col-12 col-md-4">
							<div className="card h-100 bg-dark border-secondary">
								<div className="img-container">
									<img src="https://raw.githubusercontent.com/tbone849/star-wars-guide/refs/heads/master/build/assets/img/starships/10.jpg" alt="Falcon" />
								</div>
								<div className="card-body d-flex flex-column text-center">
									<h5 className="card-title sw-title text-warning">Halcon Milenario</h5>
									<p className="card-text sw-text text-limit">La nave más rápida de la galaxia, capaz de hacer la Carrera Kessel en menos de 12 pársecs.</p>
									<div className="card-footer-custom">
										<button className="btn btn-outline-warning">Ver detalles</button>
										<button className="btn-heart">
											<i className="bi bi-heart"></i>
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

		</div>
	);
}; 