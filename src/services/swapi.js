import { ACTION_TYPES } from "../store";

const API_BASE_URL = "https://www.swapi.tech/api";

const RESOURCE_ALIASES = {
	characters: "people",
	people: "people",
	planets: "planets",
	starships: "vehicles",
	vehicles: "vehicles"
};

export const RESOURCE_CONFIG = {
	people: {
		label: "Characters",
		imagePath: "characters",
		cardDescription:
			"A legendary figure whose choices shaped the balance between the light and the dark side of the Force.",
		sectionDescription:
			"Heroes, villains and wanderers whose names echo through the history of the galaxy.",
		highlightFields: ["birth_year", "gender", "height", "eye_color"]
	},
	planets: {
		label: "Planets",
		imagePath: "planets",
		cardDescription:
			"Worlds of sand, ice and jungle where the biggest conflicts in the saga left their mark.",
		sectionDescription:
			"From desert outposts to crowded core worlds, every planet carries its own mythology.",
		highlightFields: ["climate", "terrain", "population", "diameter"]
	},
	vehicles: {
		label: "Vehicles",
		imagePath: "vehicles",
		cardDescription:
			"Machines built for speed, survival and battle across deserts, forests and war zones.",
		sectionDescription:
			"Military transports, speeders and heavy machines that kept the galaxy moving.",
		highlightFields: ["model", "vehicle_class", "manufacturer", "cost_in_credits"]
	}
};

const DETAIL_FIELDS_TO_HIDE = new Set(["created", "edited", "url", "homeworld"]);

const requestJson = async (url) => {
	const response = await fetch(url);

	if (!response.ok) {
		throw new Error(`SWAPI responded with status ${response.status}`);
	}

	const payload = await response.json();

	if (!payload) {
		throw new Error("SWAPI returned an empty payload.");
	}

	return payload;
};

export const normalizeResourceType = (type) => RESOURCE_ALIASES[type] || type;

export const isSupportedType = (type) =>
	Object.prototype.hasOwnProperty.call(
		RESOURCE_CONFIG,
		normalizeResourceType(type)
	);

export const buildFallbackImage = (label = "Star Wars") => {
	const safeLabel = String(label).slice(0, 28);
	const svg = `
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 340">
			<rect width="600" height="340" fill="#040712" />
			<circle cx="80" cy="64" r="3" fill="#f8f9fa" />
			<circle cx="220" cy="44" r="2" fill="#f8f9fa" />
			<circle cx="500" cy="92" r="2.5" fill="#f8f9fa" />
			<circle cx="430" cy="46" r="1.8" fill="#f8f9fa" />
			<text x="50%" y="47%" text-anchor="middle" font-size="42" fill="#ffe81f" font-family="Arial, sans-serif">STAR WARS</text>
			<text x="50%" y="62%" text-anchor="middle" font-size="24" fill="#d9e2f2" font-family="Arial, sans-serif">${safeLabel}</text>
		</svg>
	`;

	return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

export const getResourceImageUrl = (type, uid) => {
	const canonicalType = normalizeResourceType(type);

	if (!isSupportedType(canonicalType)) {
		return buildFallbackImage("Unknown resource");
	}

	return `https://starwars-visualguide.com/assets/img/${RESOURCE_CONFIG[canonicalType].imagePath}/${uid}.jpg`;
};

export const fetchCollection = async (type, limit = 10) => {
	const canonicalType = normalizeResourceType(type);

	if (!isSupportedType(canonicalType)) {
		throw new Error(`Unsupported resource type: ${type}`);
	}

	const payload = await requestJson(
		`${API_BASE_URL}/${canonicalType}?page=1&limit=${limit}`
	);

	return (payload.results || []).map((resource) => ({
		uid: String(resource.uid),
		type: canonicalType,
		name: resource.name || "Unknown resource"
	}));
};

export const fetchCatalog = async () => {
	const [people, planets, vehicles] = await Promise.all([
		fetchCollection("people"),
		fetchCollection("planets"),
		fetchCollection("vehicles")
	]);

	return { people, planets, vehicles };
};

export const fetchResourceDetail = async (type, uid) => {
	const canonicalType = normalizeResourceType(type);

	if (!isSupportedType(canonicalType)) {
		throw new Error(`Unsupported resource type: ${type}`);
	}

	const payload = await requestJson(`${API_BASE_URL}/${canonicalType}/${uid}`);
	const result = payload.result;

	return {
		uid: String(result?.uid ?? uid),
		type: canonicalType,
		name: result?.properties?.name ?? "Unknown resource",
		description: result?.description ?? "",
		properties: result?.properties ?? {}
	};
};

export const loadCatalog = async (
	dispatch,
	{ hasLoaded = false, forceReload = false } = {}
) => {
	if (hasLoaded && !forceReload) {
		return;
	}

	dispatch({
		type: ACTION_TYPES.loadCatalogStart
	});

	try {
		const catalog = await fetchCatalog();

		dispatch({
			type: ACTION_TYPES.loadCatalogSuccess,
			payload: catalog
		});
	} catch (error) {
		dispatch({
			type: ACTION_TYPES.loadCatalogError,
			payload: error.message || "Unable to load the Star Wars catalog."
		});
	}
};

export const loadDetail = async (
	dispatch,
	{ type, uid, cachedDetail = null, forceReload = false }
) => {
	const canonicalType = normalizeResourceType(type);

	if (!isSupportedType(canonicalType)) {
		dispatch({
			type: ACTION_TYPES.loadDetailError,
			payload: `Unsupported resource type: ${type}`
		});
		return;
	}

	dispatch({
		type: ACTION_TYPES.loadDetailStart,
		payload: `${canonicalType}:${uid}`
	});

	if (cachedDetail && !forceReload) {
		dispatch({
			type: ACTION_TYPES.loadDetailSuccess,
			payload: cachedDetail
		});
		return;
	}

	try {
		const detail = await fetchResourceDetail(canonicalType, uid);

		dispatch({
			type: ACTION_TYPES.loadDetailSuccess,
			payload: detail
		});
	} catch (error) {
		dispatch({
			type: ACTION_TYPES.loadDetailError,
			payload: error.message || "Unable to load this resource."
		});
	}
};

export const formatPropertyLabel = (propertyName) =>
	propertyName
		.replace(/_/g, " ")
		.replace(/\b\w/g, (character) => character.toUpperCase());

export const getPrimaryHighlights = (type, properties = {}) => {
	const canonicalType = normalizeResourceType(type);
	const config = RESOURCE_CONFIG[canonicalType];

	if (!config) {
		return [];
	}

	return config.highlightFields
		.filter((fieldName) => properties[fieldName])
		.map((fieldName) => ({
			label: formatPropertyLabel(fieldName),
			value: properties[fieldName]
		}));
};

export const getDetailEntries = (properties = {}) =>
	Object.entries(properties)
		.filter(
			([key, value]) =>
				key !== "name" &&
				!DETAIL_FIELDS_TO_HIDE.has(key) &&
				value !== null &&
				value !== undefined &&
				value !== ""
		)
		.map(([key, value]) => ({
			key,
			label: formatPropertyLabel(key),
			value
		}));

export const getTypeNarrative = (type, properties = {}) => {
	const canonicalType = normalizeResourceType(type);
	const name = properties.name || "This resource";

	if (canonicalType === "people") {
		return `${name} is one of the many figures who shaped the balance of power in the galaxy, leaving behind a legacy tied to destiny, conflict and the Force.`;
	}

	if (canonicalType === "planets") {
		return `${name} is one of the worlds that gave texture to the saga, with environmental conditions and populations that changed the course of galactic history.`;
	}

	return `${name} is one of the machines that kept armies, explorers and rebels moving across the galaxy, combining engineering, strategy and survival.`;
};
