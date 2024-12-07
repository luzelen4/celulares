import React, { useState, useEffect } from 'react';

export default function WatchesList ({ watches, liading }) {
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [productToShow, setProductToShow] = useState(null);


    const openDetailModal = (watch) => {
        setProductToShow(watch);
        setShowDetailModal(true);
    };

    const closeDetailModal = () => {
        setProductToShow(null);
        setShowDetailModal(false);
    };

    function formatearNumero(numero) {
        const strNumero = numero.toString();
        const strFormateado = strNumero.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

        return "$" + strFormateado;
    }

    return (
        <div className="flex-1 p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {watches.map((watch) => (
                <div
                  key={watch.watch_id}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                    <img src={watch.image} alt="Producto 1" className="w-full h-48 object-cover" />
                    <div className="p-4">
                        <h3 className="font-semibold text-lg">{watch.watch_name}</h3>
                        <p className="text-gray-500">{formatearNumero(watch.price)}</p>
                        <button
                            onClick={() => openDetailModal(watch)}
                            className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                        >
                            Ver Producto
                        </button>
                    </div>
                </div>
            ))}

            {showDetailModal && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white rounded-lg shadow-lg w-96 p-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Detalles del Producto</h2>
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
                      <span className="text-gray-600">{productToShow.watch_name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700">Slug:</span>
                      <span className="text-gray-600">{productToShow.slug}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700">Marca:</span>
                      <span className="text-gray-600">{productToShow.brand}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700">Precio:</span>
                      <span className="text-gray-600">${productToShow.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700">Stock:</span>
                      <span className="text-gray-600">{productToShow.stock}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700">Categoría:</span>
                      <span className="text-gray-600">{productToShow.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700">Descripción:</span>
                      <p className="text-gray-600">{productToShow.description}</p>
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
        </div>
    );
}