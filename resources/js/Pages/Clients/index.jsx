import GuestLayout from "@/Layouts/GuestLayout";
import NavBar from "./Components/NavBar";
import WatchesList from "./Components/WatchesList";
import Footer from "./Components/Footer";

export default function ClientIndex({ categories, watches }) {
    return (
        <>
            <NavBar categories={categories}></NavBar>

            <WatchesList watches={watches}></WatchesList>

            <Footer enterprise_name="Relojes Gama" author="Jhon Estiven Gutierrez"></Footer>
        </>
    );
};