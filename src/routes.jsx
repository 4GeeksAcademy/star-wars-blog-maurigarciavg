import {
	createBrowserRouter,
	createRoutesFromElements,
	Route
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Detail } from "./pages/Detail";

export const router = createBrowserRouter(
	createRoutesFromElements(
		<Route
			path="/"
			element={<Layout />}
			errorElement={
				<div className="container py-5">
					<div className="feedback-panel text-center">
						<h1 className="h4 mb-2">Page not found</h1>
						<p className="text-light-emphasis mb-0">
							This route does not exist in the Jedi archives.
						</p>
					</div>
				</div>
			}
		>
			<Route index element={<Home />} />
			<Route path=":type/:uid" element={<Detail />} />
		</Route>
	)
);
