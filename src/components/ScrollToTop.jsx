import { useEffect, useRef } from "react"; // ✅ Importas correctamente las dependencias
import PropTypes from "prop-types"; // ✅ Buen uso de PropTypes para validación

const ScrollToTop = ({ location, children }) => { // 📝 Componente que se encarga de hacer scroll al inicio
    const prevLocation = useRef(location); // 📝 Ref para almacenar la ubicación anterior

    useEffect(() => { // 📝 Efecto que se ejecuta cuando cambia la ubicación
        if (location !== prevLocation.current) { // 📝 Comprobación de cambio de ubicación
            window.scrollTo(0, 0); // 📝 Desplaza la ventana al inicio
        }
        prevLocation.current = location; // 📝 Actualiza la ubicación anterior
    }, [location]); // 📝 Dependencia del efecto

    return children; // ✅ Retorna los hijos correctamente
};

export default ScrollToTop; // ✅ Exportas el componente correctamente

ScrollToTop.propTypes = { // 📝 Definición de tipos de propiedades
    location: PropTypes.object, // 📝 Propiedad location como objeto
    children: PropTypes.any // 📝 Propiedad children de cualquier tipo
};