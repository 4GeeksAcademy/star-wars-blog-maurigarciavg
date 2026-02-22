import { Link } from "react-router-dom";
import starWarsLogo from "/src/assets/img/star-wars-logo.png";

export const Navbar = () => {

	return (
		<nav className="navbar ">
			<div className="container">
				<Link to="/">
					<img src={starWarsLogo} alt="Star Wars Logo" className="main-logo" />
				</Link>
				<div className="ml-auto">
					<Link to="/demo">
						<span className="btn btn-secondary">home</span>
						<span className="btn btn-secondary">characters</span>
						<span className="btn btn-secondary">planets</span>
						<span className="btn btn-secondary">starships</span>
						<button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
								Favorites
							</button>
						<div class="dropdown">
							
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