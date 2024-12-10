import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const handleurl_imagenError = () => {
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

            <div className="container text-center mt-5">
                <p>¡Hola! Bienvenido a <strong><em>Pro-Celulares</em></strong>.</p>
                <div className="d-flex justify-content-between align-items-center mx-auto p-4" style={{ maxWidth: "400px" }}>
                    <a href={route('login')} className="btn btn-primary px-4 py-2">
                        Iniciar Sesión
                    </a>
                    <a href={route('register')} className="btn btn-success px-4 py-2">
                        Registrarme
                    </a>
                </div>
            </div>
        </GuestLayout>
    );
}
