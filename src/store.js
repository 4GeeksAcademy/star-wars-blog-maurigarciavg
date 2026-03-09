export const ACTION_TYPES = {
	loadCatalogStart: "load_catalog_start",
	loadCatalogSuccess: "load_catalog_success",
	loadCatalogError: "load_catalog_error",
	loadDetailStart: "load_detail_start",
	loadDetailSuccess: "load_detail_success",
	loadDetailError: "load_detail_error",
	toggleFavorite: "toggle_favorite",
	removeFavorite: "remove_favorite"
};

export const initialStore = () => ({
	catalog: {
		people: [],
		planets: [],
		vehicles: []
	},
	detailCache: {
		people: {},
		planets: {},
		vehicles: {}
	},
	favorites: [],
	status: {
		catalog: {
			isLoading: false,
			error: null,
			hasLoaded: false
		},
		detail: {
			isLoading: false,
			error: null,
			activeKey: null
		}
	}
});

export default function storeReducer(store, action = {}) {
	switch (action.type) {
		case ACTION_TYPES.loadCatalogStart:
			return {
				...store,
				status: {
					...store.status,
					catalog: {
						...store.status.catalog,
						isLoading: true,
						error: null
					}
				}
			};

		case ACTION_TYPES.loadCatalogSuccess:
			return {
				...store,
				catalog: action.payload,
				status: {
					...store.status,
					catalog: {
						...store.status.catalog,
						isLoading: false,
						error: null,
						hasLoaded: true
					}
				}
			};

		case ACTION_TYPES.loadCatalogError:
			return {
				...store,
				status: {
					...store.status,
					catalog: {
						...store.status.catalog,
						isLoading: false,
						error: action.payload
					}
				}
			};

		case ACTION_TYPES.loadDetailStart:
			return {
				...store,
				status: {
					...store.status,
					detail: {
						...store.status.detail,
						isLoading: true,
						error: null,
						activeKey: action.payload
					}
				}
			};

		case ACTION_TYPES.loadDetailSuccess: {
			const detail = action.payload;

			return {
				...store,
				detailCache: {
					...store.detailCache,
					[detail.type]: {
						...store.detailCache[detail.type],
						[detail.uid]: detail
					}
				},
				status: {
					...store.status,
					detail: {
						...store.status.detail,
						isLoading: false,
						error: null,
						activeKey: `${detail.type}:${detail.uid}`
					}
				}
			};
		}

		case ACTION_TYPES.loadDetailError:
			return {
				...store,
				status: {
					...store.status,
					detail: {
						...store.status.detail,
						isLoading: false,
						error: action.payload
					}
				}
			};

		case ACTION_TYPES.toggleFavorite: {
			const favorite = {
				uid: String(action.payload.uid),
				type: action.payload.type,
				name: action.payload.name
			};
			const exists = store.favorites.some(
				(item) => item.uid === favorite.uid && item.type === favorite.type
			);

			return {
				...store,
				favorites: exists
					? store.favorites.filter(
							(item) => !(item.uid === favorite.uid && item.type === favorite.type)
						)
					: [...store.favorites, favorite]
			};
		}

		case ACTION_TYPES.removeFavorite:
			return {
				...store,
				favorites: store.favorites.filter(
					(item) =>
						!(
							item.uid === String(action.payload.uid) &&
							item.type === action.payload.type
						)
				)
			};

		default:
			throw new Error(`Unknown action type: ${action.type}`);
	}
}
