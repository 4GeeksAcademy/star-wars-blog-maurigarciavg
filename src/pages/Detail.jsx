import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import {
	buildFallbackImage,
	getDetailEntries,
	getPrimaryHighlights,
	getResourceImageUrl,
	getTypeNarrative,
	isSupportedType,
	loadDetail,
	normalizeResourceType,
	RESOURCE_CONFIG
} from "../services/swapi";
import "./detail.css";

export const Detail = () => {
	const { type, uid } = useParams();
	const canonicalType = normalizeResourceType(type);
	const { store, dispatch } = useGlobalReducer();
	const safeUid = String(uid);
	const cachedDetail = isSupportedType(canonicalType)
		? store.detailCache[canonicalType][safeUid]
		: null;
	const catalogItem = isSupportedType(canonicalType)
		? store.catalog[canonicalType].find((item) => item.uid === safeUid)
		: null;
	const item = cachedDetail || null;
	const previewName =
		cachedDetail?.name || catalogItem?.name || "this resource";
	const detailEntries = getDetailEntries(item?.properties);
	const primaryHighlights = getPrimaryHighlights(canonicalType, item?.properties);

	useEffect(() => {
		if (!isSupportedType(canonicalType)) {
			return;
		}

		if (cachedDetail) {
			return;
		}

		void loadDetail(dispatch, {
			type: canonicalType,
			uid: safeUid,
			cachedDetail
		});
	}, [cachedDetail, canonicalType, dispatch, safeUid]);

	if (!isSupportedType(canonicalType)) {
		return (
			<div className="container py-5">
				<div className="feedback-panel text-center">
					<h1 className="h4 mb-2">Unsupported route</h1>
					<p className="text-light-emphasis mb-4">
						Choose a character, planet or vehicle from the main catalog.
					</p>
					<Link to="/" className="btn btn-outline-warning">
						Back to home
					</Link>
				</div>
			</div>
		);
	}

	if (store.status.detail.isLoading && !item) {
		return (
			<div className="container py-5">
				<div className="feedback-panel text-center">
					<div className="spinner-border text-warning mb-3" role="status">
						<span className="visually-hidden">Loading...</span>
					</div>
					<h1 className="h4 mb-2">Loading detail page...</h1>
					<p className="text-light-emphasis mb-0">
						Recovering {previewName} from the galactic archive.
					</p>
				</div>
			</div>
		);
	}

	if (store.status.detail.error && !item) {
		return (
			<div className="container py-5">
				<div className="alert alert-danger d-flex justify-content-between align-items-center flex-wrap gap-3">
					<span>{store.status.detail.error}</span>
					<button
						type="button"
						className="btn btn-outline-danger btn-sm"
						onClick={() =>
							loadDetail(dispatch, {
								type: canonicalType,
								uid: safeUid,
								cachedDetail,
								forceReload: true
							})
						}
					>
						Retry
					</button>
				</div>
			</div>
		);
	}

	if (!item) {
		return (
			<div className="container py-5">
				<div className="feedback-panel text-center">
					<h1 className="h4 mb-2">Resource not available</h1>
					<p className="text-light-emphasis mb-4">
						The selected entry could not be found in SWAPI.
					</p>
					<Link to="/" className="btn btn-outline-warning">
						Back to home
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div className="container mt-4">
			<div className="d-flex gap-2 flex-wrap mb-4">
				<Link to="/" className="btn btn-outline-warning">
					<i className="bi bi-arrow-left me-2"></i>
					Back to the galaxy
				</Link>
			</div>

			<div className="detail-container shadow-lg">
				<p className="text-uppercase text-warning small mb-2">
					{RESOURCE_CONFIG[canonicalType].label}
				</p>
				<h1>{item.name.toLowerCase()}</h1>

				<div className="row align-items-center mb-4 g-4">
					<div className="col-lg-5 text-center">
						<img
							src={getResourceImageUrl(canonicalType, safeUid)}
							alt={item.name}
							className="detail-img img-fluid"
							onError={(event) => {
								event.currentTarget.src = buildFallbackImage(item.name);
							}}
						/>
					</div>

					<div className="col-lg-7">
						<div className="detail-description">
							{item.description || getTypeNarrative(canonicalType, item.properties)}
						</div>

						<div className="detail-highlight-grid mt-4">
							{primaryHighlights.map((highlight) => (
								<div key={highlight.label} className="detail-highlight">
									<div className="detail-label">{highlight.label}</div>
									<div className="detail-value">{highlight.value}</div>
								</div>
							))}
						</div>
					</div>
				</div>

				<hr className="custom-hr" />

				<div className="row text-center mt-4 g-3">
					{detailEntries.map((entry) => (
						<div key={entry.key} className="col-6 col-lg-3">
							<div className="detail-stat-card">
								<div className="detail-label">{entry.label}</div>
								<div className="detail-value">{entry.value}</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
