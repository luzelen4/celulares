import GuestLayout from "@/Layouts/GuestLayout";
import NavBar from "./Components/NavBar";
import WatchesList from "./Components/WatchesList";
import Footer from "./Components/Footer";
import { useEffect, useState } from "react";

export default function ClientIndex() {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadingCategories, setLoadingCategories] = useState(true);
    const [loadingWatches, setLoadingWatches] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [watches, setWatches] = useState([]);


    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/watches');
                if (!response.ok) {
                    throw new Error('Error en la respuesta de la API');
                }
                const data = await response.json();
                setWatches(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoadingWatches(false);
            }
        };

        const fetchCategories = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/categories');
                if (!response.ok) {
                    throw new Error('Error en la respuesta de la API');
                }
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoadingCategories(false);
            }
        }

        fetchProducts();
        fetchCategories();
    }, []);

    if (loadingWatches || loadingCategories) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            <NavBar categories={categories} setSelectedCategory={setSelectedCategory}></NavBar>

            <WatchesList watches={watches} liading={loading}></WatchesList>

            <Footer enterprise_name="Relojes Gama" author="Jhon Estiven Gutierrez"></Footer>
        </>
    );
};