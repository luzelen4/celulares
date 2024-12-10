import GuestLayout from "@/Layouts/GuestLayout";
import NavBar from "./Components/NavBar";
import PhonesList from "./Components/PhonesList";
import Footer from "./Components/Footer";
import { useEffect, useState } from "react";

export default function ClientIndex() {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadingCategories, setLoadingCategories] = useState(true);
    const [loadingPhonees, setLoadingPhonees] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [phones, setPhones] = useState([]);


    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/phones');
                if (!response.ok) {
                    throw new Error('Error en la respuesta de la API');
                }
                const data = await response.json();
                setPhones(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoadingPhonees(false);
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

    if (loadingPhonees || loadingCategories) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            <NavBar categories={categories} setSelectedCategory={setSelectedCategory}></NavBar>

            <PhonesList phones={phones} loading={loading}></PhonesList>

            <Footer enterprise_name="Pro-Celulares" author="Luz Elena Vargas"></Footer>
        </>
    );
};