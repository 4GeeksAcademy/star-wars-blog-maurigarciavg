import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { StoreProvider } from "./hooks/useGlobalReducer";
import "./index.css";
import { router } from "./routes";

const Main = () => {
	return (
		<StrictMode>
			<StoreProvider>
				<RouterProvider router={router} />
			</StoreProvider>
		</StrictMode>
	);
};

ReactDOM.createRoot(document.getElementById("root")).render(<Main />);
