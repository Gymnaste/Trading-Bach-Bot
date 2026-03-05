export default function Footer() {
    return (
        <footer className="border-t border-white/10 py-8">
            <div className="container mx-auto max-w-6xl px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
                <span>© 2026 Trading Bach Bot. Tous droits réservés.</span>
                <div className="flex gap-6">
                    <a href="#" className="hover:text-white transition-colors">Mentions légales</a>
                    <a href="#" className="hover:text-white transition-colors">Contact</a>
                    <a href="#" className="hover:text-white transition-colors">Simulation V1</a>
                </div>
            </div>
        </footer>
    )
}
