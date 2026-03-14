import { useEffect, useRef } from "react"; // 📝 Importamos hooks de React
import PropTypes from "prop-types"; // 📝 Importamos PropTypes para validación de props

const ScrollToTop = ({ location, children }) => { // ✅ Buen uso de destructuración
    const prevLocation = useRef(location); // 📝 Guardamos la ubicación anterior

    useEffect(() => { // ✅ Correcto uso de useEffect para efectos secundarios
        if (location !== prevLocation.current) { // 📝 Comprobamos si la ubicación ha cambiado
            window.scrollTo(0, 0); // 📝 Desplazamos la ventana al inicio
        }
        prevLocation.current = location; // 📝 Actualizamos la ubicación anterior
    }, [location]); // ✅ Dependencia correcta en el useEffect

    return children; // ✅ Retornamos los hijos correctamente
};

export default ScrollToTop; // ✅ Exportamos el componente

ScrollToTop.propTypes = { // 📝 Definimos tipos de props
    location: PropTypes.object, // 📝 location debe ser un objeto
    children: PropTypes.any // 📝 children puede ser cualquier tipo
};