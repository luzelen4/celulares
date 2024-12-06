export default function WatchesList ({ watches }) {
    function handleShowDetailClick() {
        console.log('Ver detalle del producto');
    }

    function formatearNumero(numero) {
        const strNumero = numero.toString();
        const strFormateado = strNumero.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        
        return "$" + strFormateado;
    }

    return (
        <div className="flex-1 p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {watches.map((watch) => (
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <img src={watch.image} alt="Producto 1" className="w-full h-48 object-cover" />
                    <div className="p-4">
                        <h3 className="font-semibold text-lg">{watch.watch_name}</h3>
                        <p className="text-gray-500">{formatearNumero(watch.price)}</p>
                        <button
                            onClick={handleShowDetailClick} 
                            className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700" >Ver Producto</button>
                    </div>
                </div>  
            ))}            
        </div>
    );
}