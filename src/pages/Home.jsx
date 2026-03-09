import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useEffect, useRef } from "react";
import { Card } from "../components/Card.jsx";
import { RESOURCE_CONFIG, loadCatalog } from "../services/swapi.js";

export const Home = () => {
	const { store, dispatch } = useGlobalReducer();
	const scrollRefs = {
		people: useRef(null),
		planets: useRef(null),
		vehicles: useRef(null)
	};
	const sections = ["people", "planets", "vehicles"];
	const hasCatalogContent = sections.some(
		(type) => store.catalog[type].length > 0
	);

	useEffect(() => {
		void loadCatalog(dispatch, {
			hasLoaded: store.status.catalog.hasLoaded
		});
	}, [dispatch, store.status.catalog.hasLoaded]);

	const scrollSection = (type, direction) => {
		scrollRefs[type].current?.scrollBy({
			left: direction * 320,
			behavior: "smooth"
		});
	};

	if (store.status.catalog.isLoading && !hasCatalogContent) {
		return (
			<div className="container py-5">
				<div className="feedback-panel text-center">
					<div className="spinner-border text-warning mb-3" role="status">
						<span className="visually-hidden">Loading...</span>
					</div>
					<h2 className="h4 mb-2">Loading galactic archives...</h2>
					<p className="text-light-emphasis mb-0">
						Syncing characters, planets and vehicles from SWAPI.
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="container mt-5">
			<section className="section-wrapper hero-panel">
				<div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
					<div>
						<p className="text-uppercase text-warning small mb-2">
							Mauricio Garcia-Valdecasas Gámez
						</p>
						<h1 className="sw-title mb-2">Star Wars reading list</h1>
						<p className="sw-text mb-0">
							Global favorites, cached detail pages and a cleaner SWAPI flow on
							top of the original student design.
						</p>
					</div>
					<div className="catalog-status text-end">
						<p className="mb-1">
							Favorites: <strong>{store.favorites.length}</strong>
						</p>
						<p className="mb-0 text-light-emphasis">
							Catalog cached: {store.status.catalog.hasLoaded ? "Yes" : "No"}
						</p>
					</div>
				</div>
			</section>

			{store.status.catalog.error ? (
				<div className="alert alert-danger d-flex justify-content-between align-items-center flex-wrap gap-3">
					<span>{store.status.catalog.error}</span>
					<button
						type="button"
						className="btn btn-outline-danger btn-sm"
						onClick={() =>
							loadCatalog(dispatch, {
								hasLoaded: store.status.catalog.hasLoaded,
								forceReload: true
							})
						}
					>
						Try again
					</button>
				</div>
			) : null}

			{sections.map((type) => (
				<div key={type} className="section-wrapper text-center">
					<div className="d-flex justify-content-between align-items-end flex-wrap gap-3 mb-3">
						<div className="text-start">
							<h2 className="sw-title mb-2">{RESOURCE_CONFIG[type].label}</h2>
							<p className="sw-text mb-0">
								{RESOURCE_CONFIG[type].sectionDescription}
							</p>
						</div>
						<span className="badge text-bg-dark px-3 py-2">
							{store.catalog[type].length} loaded
						</span>
					</div>

					<div className="carousel-container">
						<button
							type="button"
							className="carousel-btn btn-left"
							onClick={() => scrollSection(type, -1)}
							aria-label={`Scroll ${RESOURCE_CONFIG[type].label} left`}
						>
							<i className="bi bi-chevron-left"></i>
						</button>

						<div className="carousel-scroll" ref={scrollRefs[type]}>
							{store.catalog[type].length > 0 ? (
								store.catalog[type].map((item) => (
									<Card key={`${item.type}-${item.uid}`} item={item} />
								))
							) : (
								<div className="empty-strip">
									No {RESOURCE_CONFIG[type].label.toLowerCase()} available
									right now.
								</div>
							)}
						</div>

						<button
							type="button"
							className="carousel-btn btn-right"
							onClick={() => scrollSection(type, 1)}
							aria-label={`Scroll ${RESOURCE_CONFIG[type].label} right`}
						>
							<i className="bi bi-chevron-right"></i>
						</button>
					</div>
				</div>
			))}
		</div>
	);
};
