import { Link } from "react-router-dom";

export const Navbar = () => {

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<h1 className="navbar-brand mb-0 h1">STAR WARS</h1>
				</Link>
				<div className="ml-auto">
					<Link to="/demo">
						<span className="btn btn-primary">HOME</span>
						<span className="btn btn-primary">CHARACTERS</span>
						<span className="btn btn-primary">PLANETS</span>
						<span className="btn btn-primary">STARSHIPS</span>
						<div class="dropdown">
							<button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
								FAUVORITES
							</button>
							<ul class="dropdown-menu">
								<li><a class="dropdown-item" href="#">Action</a></li>
								<li><a class="dropdown-item" href="#">Another action</a></li>
								<li><a class="dropdown-item" href="#">Something else here</a></li>
							</ul>
						</div>
					</Link>
				</div>
			</div>
		</nav>
	);
};