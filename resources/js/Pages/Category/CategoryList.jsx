import React, { useState } from 'react';

export default function CategoryList({ categories, fetchCategories, openDeleteModal, loading }) {
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const [showEditModal, setShowEditModal] = useState(false);

    const [formData, setFormData] = useState({
        category_name: ''
    });

    if (loading) {
        return <p>Cargando...</p>;
    }

    const openDetailModal = (category) => {
        setSelectedProduct(category);
        setShowDetailModal(true);
    }

    const closeDetailModal = () => {
        setSelectedProduct(null);
        setShowDetailModal(false);
    }

    const openEditModal = (category) => {
        setSelectedProduct(category);
        setFormData({ category_name: category.category_name })
        setShowEditModal(true);
    }

    const closeEditModal = () => {
        setSelectedProduct(null);
        setShowEditModal(false);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/categories/${selectedProduct.cod_categoria}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Error al crear la categoría');
            }
            closeEditModal();
        } catch (error) {
            console.error('Error:', error);
        } finally {
            fetchCategories();
        }
    };

    return (
        <div>
            <h3>Lista de Categorías</h3>
            <table className="min-w-full mt-6 table-auto border-separate border-spacing-0">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">id</th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Nombre</th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category) => (
                        <tr key={category.cod_categoria} className="border-t border-gray-200">
                            <td className="px-4 py-2 text-sm text-gray-800">{category.cod_categoria}</td>
                            <td className="px-4 py-2 text-sm text-gray-800">{category.nombre_categoria}</td>
                            <td className="px-4 py-2 text-sm">
                                <button onClick={() => openDetailModal(category)} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-2">Ver</button>
                                <button onClick={() => openEditModal(category)} className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 mr-2">Editar</button>
                                <button
                                    onClick={() => openDeleteModal(category.cod_categoria)}
                                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showDetailModal && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg shadow-lg w-96 p-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-semibold">Detalles de la Categoría</h2>
                            <button
                                onClick={closeDetailModal}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                        <div className="mt-4 space-y-4">
                            <div className="flex justify-between">
                                <span className="font-medium text-gray-700">Nombre:</span>
                                <span className="text-gray-600">{selectedProduct.nombre_categoria}</span>
                            </div>
                        </div>
                        <div className="mt-6 flex justify-between">
                            <button
                                onClick={closeDetailModal}
                                className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showEditModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                    <div className="bg-white p-6 rounded-lg shadow-lg relative z-10">
                        <h3 className="text-2xl font-semibold text-gray-700 mb-6">Editar Categoría</h3>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="category_name" className="block text-gray-600 mb-2">Nombre de la categoría</label>
                                <input
                                    type="text"
                                    id="category_name"
                                    name="category_name"
                                    value={formData.category_name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>

                            <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                Editar
                            </button>
                        </form>
                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={closeEditModal}
                                className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}