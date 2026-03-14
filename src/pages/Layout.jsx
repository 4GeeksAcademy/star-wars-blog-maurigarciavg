import { Outlet } from "react-router-dom"; // 📝 Importa Outlet desde react-router-dom correctamente
import ScrollToTop from "../components/ScrollToTop"; // ✅ Buen uso de ScrollToTop
import { Navbar } from "../components/Navbar"; // ✅ Correcto uso de Navbar
import { Footer } from "../components/Footer"; // ✅ Correcto uso de Footer

export const Layout = () => {
    return (
        <div className="d-flex flex-column min-vh-100"> // ✅ Buena estructura de layout
            <ScrollToTop>
                <Navbar />
                <main className="flex-grow-1">
                    <Outlet /> // ✅ Outlet permite renderizar rutas anidadas
                </main>
                <Footer />
            </ScrollToTop>
        </div>
    )
};