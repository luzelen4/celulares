import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React, { useState, useEffect } from 'react';
import { Link, Head } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';

export default function ProductIndex() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);


    const openDeleteModal = (id) => {
        setProductToDelete(id);
        setShowDeleteModal(true);
    };

    const closeDeleteModal = () => {
        setProductToDelete(null);
        setShowDeleteModal(false);
    };

    const handleConfirmDelete  = () => {
        if (productToDelete) {
            Inertia.delete(route('watches.delete', productToDelete));
        }

        closeDeleteModal();
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
            const response = await fetch('http://127.0.0.1:8000/api/watches');

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

        fetchData();  // Llamar a la función async
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

                    <Link href={route('watches.store.show')} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 mb-4 inline-block">
                        Crear Producto
                    </Link>

                    <table className="min-w-full mt-6 table-auto border-separate border-spacing-0">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Nombre</th>
                                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Marca</th>
                                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Precio</th>
                                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((product) => (
                                <tr key={product.watch_id} className="border-t border-gray-200">
                                    <td className="px-4 py-2 text-sm text-gray-800">{product.watch_name}</td>
                                    <td className="px-4 py-2 text-sm text-gray-800">{product.brand}</td>
                                    <td className="px-4 py-2 text-sm text-gray-800">${product.price}</td>
                                    <td className="px-4 py-2 text-sm">
                                        <Link href={route('watches.show', product.slug)} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-2">Ver</Link>
                                        <Link href={route('watches.update.show', product.slug)} className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 mr-2">Editar</Link>
                                        <button
                                            onClick={() => openDeleteModal(product.slug)}
                                            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {showDeleteModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                    <div className="bg-white p-6 rounded-lg shadow-lg relative z-10">
                        <h2 className="text-xl font-bold mb-4">Confirmar eliminación</h2>
                        <p className="mb-4">¿Estás seguro de que deseas eliminar este producto?</p>
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