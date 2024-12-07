import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const handleImageError = () => {
        document
            .getElementById('screenshot-container')
            ?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document
            .getElementById('docs-card-content')
            ?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

    return (
        <GuestLayout>
            <Head title="Welcome" />

            <div>
                <p>¡Hola! Bienvenido a <strong>Relojes Gama</strong>.</p>
                <p>¿Qué deseas hacer a continuación?</p>
                <div className='flex justify-between items-center w-full max-w-md mx-auto p-4 '>
                    <a href={route('login')} className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'>Iniciar Sesión</a>
                    <a href={route('register')} className='px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600'>Registrarme</a>
                </div>
            </div>
        </GuestLayout>
    );
}
