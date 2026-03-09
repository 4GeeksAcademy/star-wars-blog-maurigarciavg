import { useEffect } from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";

const ScrollToTop = ({ children }) => {
	const { pathname } = useLocation();

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	}, [pathname]);

	return <>{children}</>;
};

export default ScrollToTop;

ScrollToTop.propTypes = {
	children: PropTypes.node.isRequired
};
