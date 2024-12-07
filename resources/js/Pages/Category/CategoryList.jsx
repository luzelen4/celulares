import React from 'react';

export default function CategoryList({ categories, loading }) {
    if (loading) {
        return <p>Cargando...</p>;
    }

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
                        <tr key={category.category_id} className="border-t border-gray-200">
                            <td className="px-4 py-2 text-sm text-gray-800">{category.category_id}</td>
                            <td className="px-4 py-2 text-sm text-gray-800">{category.category_name}</td>
                            <td className="px-4 py-2 text-sm">
                                <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-2">Ver</button>
                                <button className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 mr-2">Editar</button>
                                <button
                                    onClick={() => openDeleteModal(category.category_id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div >
    );
}