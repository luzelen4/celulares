import React, { useState, useEffect } from 'react';

export default function PhoneesList({ phones, loading }) {
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [productToShow, setProductToShow] = useState(null);
  console.log(productToShow);

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
    <div className="container py-4">
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        {phones.map((phone) => (
          <div key={phone.celular_id} className="col">
            <div className="card shadow-sm h-100">
              <img
                src={phone.url_imagen}
                alt="Producto"
                className="card-img-top"
                style={{ height: '12rem', objectFit: 'cover' }}
              />
              <div className="card-body">
                <h5 className="card-title">{phone.nombre_celular}</h5>
                <p className="card-text text-muted">{formatearNumero(phone.precio)}</p>
                <button
                  onClick={() => openDetailModal(phone)}
                  className="btn btn-primary mt-3"
                >
                  Ver Producto
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showDetailModal && (
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
                    <strong>Nombre:</strong> {productToShow.nombre_celular}
                  </li>
                  <li className="list-group-item">
                    <strong>Slug:</strong> {productToShow.slug}
                  </li>
                  <li className="list-group-item">
                    <strong>Marca:</strong> {productToShow.marca}
                  </li>
                  <li className="list-group-item">
                    <strong>Precio:</strong> ${productToShow.precio}
                  </li>
                  <li className="list-group-item">
                    <strong>Cantidad en Bodega:</strong> {productToShow.cantidad_en_bodega}
                  </li>
                  <li className="list-group-item">
                    <strong>Categoría:</strong> <br />
                    {productToShow.categories.map((category) => (
                      category.nombre_categoria
                    ))}
                  </li>
                  <li className="list-group-item">
                    <strong>Descripción:</strong><br/> {productToShow.descripcion}
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
    </div>
  );
}