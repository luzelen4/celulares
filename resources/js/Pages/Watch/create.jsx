import  { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React from 'react';
import { Link, Head } from '@inertiajs/react';


const ProductForm = ({categories, product, readonly}) => {
  const { data, setData, post, put, processing, errors } = useForm({
    watch_name: product.watch_name || '',
    slug: product.slug || '',
    description: product.description || '',
    price: product.price || '',
    brand: product.brand || '',
    stock: product.stock || 0,
    image: product.image || '',
    category_id: product.category_id || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (product.watch_id) {
      put(route('watches.update.', product.watch_id)); // Para editar
    } else {
      post(route('watches.store.')); // Para crear
    }
  };

  return (
    <AuthenticatedLayout
            header={
              <h2 className="text-xl font-semibold leading-tight text-gray-800">
                  Dashboard tecnología y más
              </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="m-3 max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
              <h1 className="text-3xl font-bold text-gray-800 mb-6">
                {readonly? 'Detalle del producto' : product.watch_id ? 'Editar Producto' : 'Crear Producto'}
              </h1>

              <form onSubmit={handleSubmit} method="put" className="space-y-4">

                <div>
                  <label className="block text-sm font-medium text-gray-700">Nombre</label>
                  <input
                    type="text"
                    value={data.watch_name}
                    onChange={(e) => setData('watch_name', e.target.value)}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    readOnly={readonly}
                  />
                  {errors.watch_name && <span className="text-sm text-red-500">{errors.watch_name}</span>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Slug</label>
                  <input
                    type="text"
                    value={data.slug}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={(e) => setData('slug', e.target.value)}
                    readOnly={readonly}
                  />
                  {errors.slug && <span className="text-sm text-red-500">{errors.slug}</span>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Descripción</label>
                  <textarea
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    readOnly={readonly}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Precio</label>
                  <input
                    type="number"
                    value={data.price}
                    onChange={(e) => setData('price', e.target.value)}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    readOnly={readonly}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Marca</label>
                  <input
                    type="text"
                    value={data.brand}
                    onChange={(e) => setData('brand', e.target.value)}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    readOnly={readonly}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Stock</label>
                  <input
                    type="number"
                    value={data.stock}
                    onChange={(e) => setData('stock', e.target.value)}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    readOnly={readonly}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Categoría</label>
                  <select
                    value={data.category_id}
                    onChange={(e) => setData('category_id', e.target.value)}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    readOnly={readonly}
                  >
                    <option value="">Seleccionar categoría</option>
                    {categories.map((category) => (
                      <option key={category.category_id} value={category.category_id}>
                        {category.category_name}
                      </option>
                    ))}
                  </select>
                  {errors.category_id && <span className="text-sm text-red-500">{errors.category_id}</span>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Imagen</label>
                  <input
                    type="text"
                    value={data.image}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={(e) => setData('image', e.target.value)}
                    readOnly={readonly}
                  />
                  {errors.slug && <span className="text-sm text-red-500">{errors.slug}</span>}
                </div>

                {readonly? (
                    <Link
                      href={route('watches.update.show', product.watch_id)}
                      className="mt-4 w-full bg-blue-500 block text-white text-center px-6 py-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      Editar
                    </Link>
                ) : (
                  <button
                    type="submit"
                    disabled={processing}
                    className="mt-4 w-full bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {product.watch_id ? 'Actualizar Producto' : 'Crear Producto'}
                  </button>
                )}
              </form>
            </div>
      </AuthenticatedLayout>
  );
};

export default ProductForm;
