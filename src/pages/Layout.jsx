import { Outlet } from "react-router-dom"; // 📝 Importando Outlet de react-router-dom
import ScrollToTop from "../components/ScrollToTop"; // ✅ Buen uso de ScrollToTop
import { Navbar } from "../components/Navbar"; // ✅ Buen uso de Navbar
import { Footer } from "../components/Footer"; // ✅ Buen uso de Footer

export const Layout = () => {
    return (
        <div className="d-flex flex-column min-vh-100"> // 📝 Estructura básica del layout
            <ScrollToTop>
                <Navbar />
                <main className="flex-grow-1"> // 📝 Área principal del contenido
                    <Outlet /> // 📝 Aquí se renderizan las rutas hijas
                </main>
                <Footer />
            </ScrollToTop>
        </div>
    ); // ✅ Buen cierre del componente
};
