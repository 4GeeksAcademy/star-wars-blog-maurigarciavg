import PropTypes from "prop-types";
import { useContext, useReducer, createContext } from "react";
import storeReducer, { initialStore } from "../store";

const StoreContext = createContext();

export function StoreProvider({ children }) {
	const [store, dispatch] = useReducer(storeReducer, initialStore());

	return (
		<StoreContext.Provider value={{ store, dispatch }}>
			{children}
		</StoreContext.Provider>
	);
}

StoreProvider.propTypes = {
	children: PropTypes.node.isRequired
};

export default function useGlobalReducer() {
	const context = useContext(StoreContext);

	if (!context) {
		throw new Error("useGlobalReducer must be used inside StoreProvider");
	}

	return context;
}
