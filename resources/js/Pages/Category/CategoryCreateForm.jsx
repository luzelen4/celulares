import React, { useState } from 'react';

export default function CategoryCreateForm({ closeForm, fetchCategories }) {
    const [formData, setFormData] = useState({
        category_name: ''
    });

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
            const response = await fetch('http://127.0.0.1:8000/api/categories', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Error al crear la categoría');
            }
            closeForm();
        } catch (error) {
            console.error('Error:', error);
        } finally {
            fetchCategories();
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold text-gray-700 mb-6">Crear Nueva Categoría</h3>

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
                    Crear
                </button>
            </form>

            <button onClick={closeForm} className="mt-4 w-full bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500">
                Cancelar
            </button>
        </div>
    );
}
