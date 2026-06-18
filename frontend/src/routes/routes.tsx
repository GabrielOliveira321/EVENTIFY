import { HashRouter, Route, Routes } from "react-router-dom"
import Home from "../Pages/Home"
import AuthPage from "../Pages/Login"
import AllEventes from "../Pages/AllEventes"
import EventPage from "../Pages/Event"
import ProfilePage from "../Pages/ProfilePage"
import BuyTickets from "../Pages/BuyTickets"
import Communities from "../Pages/Communities"
import Prices from "../Pages/Prices"
import About from "../Pages/About"
import Terms from "../Pages/Terms"
import Privacy from "../Pages/Privacy"
import Support from "../Pages/Support"
import Guide from "../Pages/Guide"
import NotFound from "../Pages/NotFound"
import ProtectedRoute from "../Components/ProtectedRoute"

export const RoutesApp = () => {

    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/all-events" element={
                    <ProtectedRoute><AllEventes /></ProtectedRoute>
                } />
                <Route path="/event/:id" element={
                    <ProtectedRoute><EventPage /></ProtectedRoute>
                } />
                <Route path="/login" element={<AuthPage />} />
                <Route path="/profile" element={
                    <ProtectedRoute><ProfilePage /></ProtectedRoute>
                } />
                <Route path="/buy-tickets/:id" element={
                    <ProtectedRoute><BuyTickets /></ProtectedRoute>
                } />
                <Route path="/comunidades" element={
                    <ProtectedRoute><Communities /></ProtectedRoute>
                } />
                <Route path="/precos" element={
                    <ProtectedRoute><Prices /></ProtectedRoute>
                } />
                <Route path="/sobre" element={<About />} />
                <Route path="/termos" element={<Terms />} />
                <Route path="/privacidade" element={<Privacy />} />
                <Route path="/suporte" element={<Support />} />
                <Route path="/guia" element={<Guide />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </HashRouter>
    )

}
