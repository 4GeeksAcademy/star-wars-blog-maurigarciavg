import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useEffect, useRef } from "react";
import { Card } from "../components/Card.jsx";

export const Home = () => {
	const { store, dispatch } = useGlobalReducer()
	const scrollCharactersRef = useRef(null);
	const scrollPlanetsRef = useRef(null);
	const scrollStarshipsRef = useRef(null);

	const getCharacters = async () => {
		const data = await fetch("https://www.swapi.tech/api/people")
		const result = await data.json();
		dispatch({ type: "set_characters", payload: result.results });
	};

	const getPlanets = async () => {
		const data = await fetch("https://www.swapi.tech/api/planets")
		const result = await data.json();
		dispatch({ type: "set_planets", payload: result.results });
	};

	const getStarships = async () => {
		const data = await fetch("https://www.swapi.tech/api/starships")
		const result = await data.json();
		dispatch({ type: "set_starships", payload: result.results });
	};

	useEffect(() => {
		getCharacters();
		getPlanets();
		getStarships();
	}, []);


	return (
		<div className="container mt-5">
			<div className="container text-center mt-5">
				<h1 className="text-center sw-title mb-5">Characters</h1>
				<div className="carousel-container">
					<button className="carousel-btn btn-left" onClick={() => scrollCharactersRef.current.scrollBy({ left: -300, behavior: 'smooth' })}>
						<i className="bi bi-chevron-left"></i>
					</button>
					<div className="carousel-scroll" ref={scrollCharactersRef}>
						{store.characters.map((item) => (
							<Card
								key={item.uid}
								name={item.name}
								uid={item.uid}
								category="characters"
								description="Un gran caballero jedi capacitado en las artes de la fuerza."
							/>
						))}
					</div>
					<button className="carousel-btn btn-right" onClick={() => scrollCharactersRef.current.scrollBy({ left: 300, behavior: 'smooth' })}>
						<i className="bi bi-chevron-right"></i>
					</button>
				</div>
			</div>

			<div className="container text-center mt-5">
				<h1 className="text-center sw-title mb-5">Planets</h1>
				<div className="carousel-container">
					<button className="carousel-btn btn-left" onClick={() => scrollPlanetsRef.current.scrollBy({ left: -300, behavior: 'smooth' })}>
						<i className="bi bi-chevron-left"></i>
					</button>
					<div className="carousel-scroll" ref={scrollPlanetsRef}>
						{store.planets.map((item) => (
							<Card
								key={item.uid}
								name={item.name}
								uid={item.uid}
								category="planets"
								description="Un gran caballero jedi capacitado en las artes de la fuerza."
							/>
						))}
					</div>
					<button className="carousel-btn btn-right" onClick={() => scrollPlanetsRef.current.scrollBy({ left: 300, behavior: 'smooth' })}>
						<i className="bi bi-chevron-right"></i>
					</button>
				</div>
			</div>

			<div className="container text-center mt-5">
				<h1 className="text-center sw-title mb-5">Starships</h1>
				<div className="carousel-container">
					<button className="carousel-btn btn-left" onClick={() => scrollStarshipsRef.current.scrollBy({ left: -300, behavior: 'smooth' })}>
						<i className="bi bi-chevron-left"></i>
					</button>
					<div className="carousel-scroll" ref={scrollStarshipsRef}>
						{store.starships.map((item) => (
							<Card
								key={item.uid}
								name={item.name}
								uid={item.uid}
								category="starships"
								description="Un gran caballero jedi capacitado en las artes de la fuerza."
							/>
						))}
					</div>
					<button className="carousel-btn btn-right" onClick={() => scrollStarshipsRef.current.scrollBy({ left: 300, behavior: 'smooth' })}>
						<i className="bi bi-chevron-right"></i>
					</button>
				</div>
			</div>
		</div>
	);
};