import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React, { useState, useEffect } from 'react';
import { Link, Head } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';

export default function ProductIndex() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const openDetailModal = (product) => {
        setSelectedProduct(product); // Almacena el producto completo
        setShowDetailModal(true);
    };

    const closeDetailModal = () => {
        setShowDetailModal(false);
    };

    const openDeleteModal = (product) => {
        setSelectedProduct(product); // Almacena el producto completo
        setShowDeleteModal(true);
    };

    const closeDeleteModal = () => {
        setShowDeleteModal(false);
    };

    const handleConfirmDelete = () => {
        if (selectedProduct) {
            Inertia.delete(route('phones.delete', selectedProduct.slug));
        }
        closeDeleteModal();
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/phones');
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

        fetchData();
    }, []);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Pro-Celulares
                </h2>
            }
        >
            <Head title="Dashboard | Principal" />
            <div className="flex items-center justify-center p-6">
                <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md">
                    <Link
                        href={route('phones.store.show')}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 mb-4 inline-block"
                    >
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
                                <tr key={product.celular_id} className="border-t border-gray-200">
                                    <td className="px-4 py-2 text-sm text-gray-800">{product.nombre_celular}</td>
                                    <td className="px-4 py-2 text-sm text-gray-800">{product.marca}</td>
                                    <td className="px-4 py-2 text-sm text-gray-800">${product.precio}</td>
                                    <td className="px-4 py-2 text-sm">
                                        <button
                                            onClick={() => openDetailModal(product)}
                                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-2"
                                        >
                                            Ver
                                        </button>
                                        <Link
                                            href={route('phones.update.show', product.slug)}
                                            className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 mr-2"
                                        >
                                            Editar
                                        </Link>
                                        <button
                                            onClick={() => openDeleteModal(product)}
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

            {showDeleteModal && selectedProduct && (
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

            {showDetailModal && selectedProduct && (
                <div
                    className="modal fade show d-block"
                    tabIndex="-1"
                    role="dialog"
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                >
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Detalles del Producto</h5>
                                <button
                                    onClick={closeDetailModal}
                                    type="button"
                                    className="btn-close"
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className="modal-body">
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">
                                        <strong>Nombre:</strong> {selectedProduct.nombre_celular}
                                    </li>
                                    <li className="list-group-item">
                                        <strong>Slug:</strong> {selectedProduct.slug}
                                    </li>
                                    <li className="list-group-item">
                                        <strong>Marca:</strong> {selectedProduct.marca}
                                    </li>
                                    <li className="list-group-item">
                                        <strong>Precio:</strong> ${selectedProduct.precio}
                                    </li>
                                    <li className="list-group-item">
                                        <strong>Cantidad en Bodega:</strong> {selectedProduct.cantidad_en_bodega}
                                    </li>
                                    <li className="list-group-item">
                                        <strong>Categoría:</strong> <br />
                                        {selectedProduct?.categories?.length > 0 ? (
                                            selectedProduct.categories.map((category) => (
                                                <span key={category.cod_categoria}>{category.nombre_categoria}</span>
                                            ))
                                        ) : (
                                            <span>Sin categorías</span>
                                        )}
                                    </li>
                                    <li className="list-group-item">
                                        <strong>Descripción:</strong><br /> {selectedProduct.descripcion}
                                    </li>
                                </ul>
                            </div>
                            <div className="modal-footer">
                                <button
                                    onClick={closeDetailModal}
                                    type="button"
                                    className="btn btn-secondary"
                                >
                                    Cerrar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
