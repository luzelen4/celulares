export default function Footer({ enterprise_name, author }) {
    return (
        <footer class="bg-gray-800 text-white text-center py-4 w-full fixed bottom-0 left-0 z-10">
            <p>&copy; 2024 {enterprise_name}.</p>
            <p>{author}</p>
        </footer>
    );
}
