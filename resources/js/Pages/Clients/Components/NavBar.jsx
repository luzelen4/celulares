import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";

export default function NavBar({ header, categories, setSelectedCategory }) {
    return (
        <>
            <nav className="bg-gray-600 text-black p-4 flex justify-between items-center">
                <div class="flex items-center space-x-4">
                    <img src="icons8-reloj.svg" alt="Logo" className="w-12 h-12" />
                    {/* <ApplicationLogo></ApplicationLogo> */}
                    <span class="font-bold text-xl">{header}</span>
                </div>
                <Link
                    href={route('logout')}
                    method="post"
                    as="button"
                    class="bg-red-600 py-2 px-4 rounded hover:bg-red-700"
                >
                        Cerrar sesión
                </Link>
            </nav>
            <div class="bg-gray-500 text-black p-4 flex overflow-x-auto space-x-4">
            <button
                class="bg-gray-400 py-2 px-6 rounded hover:bg-gray-600 focus:outline-none"
                onClick={() => setSelectedCategory(null)}
            >
                Todas
            </button>
            {categories.map((category) => (
                <button
                    key={category.category_id}
                    onClick={() => setSelectedCategory(category)}
                    class="bg-gray-400 py-2 px-6 rounded hover:bg-gray-600 focus:outline-none"
                >
                    {category.category_name}
                </button>
            ))}
            </div>
        </>
    );
}