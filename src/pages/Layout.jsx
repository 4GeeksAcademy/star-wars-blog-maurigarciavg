import { Outlet } from "react-router-dom"; // 📝 Importa Outlet correctamente sin la ruta completa
import ScrollToTop from "../components/ScrollToTop"; // ✅ Buen uso de ScrollToTop
import { Navbar } from "../components/Navbar"; // ✅ Buen uso de Navbar
import { Footer } from "../components/Footer"; // ✅ Buen uso de Footer

export const Layout = () => {
    return (
        <div className="d-flex flex-column min-vh-100">
            <ScrollToTop>
                <Navbar />
                <main className="flex-grow-1">
                    <Outlet /> // ✅ Outlet permite renderizar rutas hijas
                </main>
                <Footer />
            </ScrollToTop>
        </div>
    );
};