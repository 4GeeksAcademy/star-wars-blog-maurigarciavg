import { useEffect, useRef } from "react"; // ✅ Importas hooks de React correctamente
import PropTypes from "prop-types"; // ✅ Importas PropTypes para validación

const ScrollToTop = ({ location, children }) => { // 📝 Componente que se encarga de hacer scroll al inicio
    const prevLocation = useRef(location); // 📝 Guardamos la ubicación anterior

    useEffect(() => { // 📝 Efecto que se ejecuta cuando cambia la ubicación
        if (location !== prevLocation.current) { // 📝 Comparamos la ubicación actual con la anterior
            window.scrollTo(0, 0); // 📝 Hacemos scroll al inicio de la página
        }
        prevLocation.current = location; // 📝 Actualizamos la ubicación anterior
    }, [location]); // 📝 Dependencia del efecto

    return children; // ✅ Retornas los hijos correctamente
};

export default ScrollToTop; // ✅ Exportas el componente correctamente

ScrollToTop.propTypes = { // 📝 Definimos los tipos de las props
    location: PropTypes.object, // 📝 location debe ser un objeto
    children: PropTypes.any // 📝 children puede ser cualquier tipo
};