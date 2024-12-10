import { useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React from "react";
import { Link, Head } from "@inertiajs/react";

const ProductForm = ({ categories, product, readonly }) => {
    const { data, setData, post, put, processing, errors } = useForm({
        nombre_celular: product.nombre_celular || "",
        slug: product.slug || "",
        descripcion: product.descripcion || "",
        precio: product.precio || "",
        marca: product.marca || "",
        cantidad_en_bodega: product.cantidad_en_bodega || 0,
        url_imagen: null,
        cod_categoria: product.cod_categoria || ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();

    const formData = new FormData();

    // Agregar cada campo al FormData
    Object.keys(data).forEach((key) => {
        if (key === "url_imagen" && data[key]) {
            formData.append(key, data[key]); // Archivo
        } else {
            formData.append(key, data[key]); // Otros datos
        }
    });

    // Determinar si es actualización o creación
    if (product.slug) {
        formData.append("_method", "PUT"); // Simular método PUT
        put(route("phones.update.", product.slug), formData);
    } else {
        post(route("phones.store."), formData);
    }
  };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard Pro-Celulares
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="m-3 max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">
                    {readonly
                        ? "Detalle del producto"
                        : product.celular_id
                        ? "Editar Producto"
                        : "Crear Producto"}
                </h1>

                <form
                    onSubmit={handleSubmit}
                    method="post"
                    className="space-y-4"
                    encType="multipart/form-data"
                >
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Nombre
                        </label>
                        <input
                            type="text"
                            value={data.nombre_celular}
                            onChange={(e) =>
                                setData("nombre_celular", e.target.value)
                            }
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            readOnly={readonly}
                        />
                        {errors.nombre_celular && (
                            <span className="text-sm text-red-500">
                                {errors.nombre_celular}
                            </span>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Slug
                        </label>
                        <input
                            type="text"
                            value={data.slug}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => setData("slug", e.target.value)}
                            readOnly={readonly}
                        />
                        {errors.slug && (
                            <span className="text-sm text-red-500">
                                {errors.slug}
                            </span>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Descripción
                        </label>
                        <textarea
                            value={data.descripcion}
                            onChange={(e) =>
                                setData("descripcion", e.target.value)
                            }
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            readOnly={readonly}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Precio
                        </label>
                        <input
                            type="number"
                            value={data.precio}
                            onChange={(e) => setData("precio", e.target.value)}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            readOnly={readonly}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Marca
                        </label>
                        <input
                            type="text"
                            value={data.marca}
                            onChange={(e) => setData("marca", e.target.value)}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            readOnly={readonly}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Cantidad en Bodega
                        </label>
                        <input
                            type="number"
                            value={data.cantidad_en_bodega}
                            onChange={(e) => setData("cantidad_en_bodega", e.target.value)}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            readOnly={readonly}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Categoría
                        </label>
                        <select
                            value={data.cod_categoria}
                            onChange={(e) =>
                                setData("cod_categoria", e.target.value)
                            }
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            readOnly={readonly}
                        >
                            <option value="">Seleccionar categoría</option>
                            {categories.map((category) => (
                                <option
                                    key={category.cod_categoria}
                                    value={category.cod_categoria}
                                >
                                    {category.nombre_categoria}
                                </option>
                            ))}
                        </select>
                        {errors.cod_categoria && (
                            <span className="text-sm text-red-500">
                                {errors.cod_categoria}
                            </span>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Imagen
                        </label>
                        <input
                            type="file"
                            onChange={(e) =>
                                setData("url_imagen", e.target.files[0])
                            }
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            readOnly={readonly}
                        />
                        {errors.url_imagen && (
                            <span className="text-sm text-red-500">
                                {errors.url_imagen}
                            </span>
                        )}
                    </div>

                    {readonly ? (
                        <Link
                            href={route("phones.update.show", product.slug)}
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
                            {product.celular_id
                                ? "Actualizar Producto"
                                : "Crear Producto"}
                        </button>
                    )}
                </form>
            </div>
        </AuthenticatedLayout>
    );
};

export default ProductForm;
