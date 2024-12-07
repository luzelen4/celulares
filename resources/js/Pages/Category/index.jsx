import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React, { useState, useEffect } from 'react';
import { Link, Head } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import CategoryCreateForm from './CategoryCreateForm';
import CategoryList from './CategoryList';


export default function ProductIndex() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    const [showCreateForm, setShowCreateForm] = useState(false);

    const showCreateFormHandler = () => {
        setShowCreateForm(true);
    };

    
    const showCategoryListHandler = () => {
        setShowCreateForm(false);
    };

    const openDeleteModal = (id) => {
        setProductToDelete(id);
        setShowDeleteModal(true);
    };

    const closeDeleteModal = () => {
        setProductToDelete(null);
        setShowDeleteModal(false);
    };

    const fetchData = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/categories');

            if (!response.ok) {
                throw new Error('Error en la respuesta de la API');
            }
            const data = await response.json();
            setData(data);
            setLoading(false);
        } catch (error) {
            console.error('Error al obtener los datos:', error);
            setLoading(false);
        }
    };

    const handleConfirmDelete = () => {
        if (productToDelete) {
            const deleteCategory = async () => {
                try {
                    const response = await fetch(`http://127.0.0.1:8000/api/categories/${productToDelete}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    });

                    if (!response.ok) {
                        throw new Error('Error en la respuesta de la API');
                    }
                    setLoading(false);
                } catch (error) {
                    console.error('Error al eliminar el producto:', error);
                } finally {
                    fetchData();
                    setLoading(false);
                }
            }

            deleteCategory();
        }

        closeDeleteModal();
    };

    useEffect(() => {
        fetchData();  
    }, []);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Relojes Gama
                </h2>
            }
        >
            <Head title="Dashboard | Principal" />

            <div className="flex items-center justify-center p-6">
                <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">Relojes</h1>

                    <button
                        onClick={showCreateFormHandler}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 mb-4 inline-block"
                    >
                        Crear Categoria
                    </button>

                    <button
                        onClick={showCategoryListHandler}
                        className="bg-blue-500 text-white ml-3 px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 mb-4 inline-block"
                    >
                        Ver Categorías
                    </button>

                    {showCreateForm ? (
                        <CategoryCreateForm closeForm={showCategoryListHandler} fetchCategories={fetchData} />
                    ) : (
                        <CategoryList categories={data} fetchCategories={fetchData} loading={loading} openDeleteModal={openDeleteModal} />
                    )}
                </div>
            </div>

            {showDeleteModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                    <div className="bg-white p-6 rounded-lg shadow-lg relative z-10">
                        <h2 className="text-xl font-bold mb-4">Confirmar eliminación</h2>
                        <p className="mb-4">¿Estás seguro de que deseas eliminar esta categoria?</p>
                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={closeDeleteModal}
                                className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleConfirmDelete}
                                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}