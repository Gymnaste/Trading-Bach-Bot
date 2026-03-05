import { Link } from 'react-router-dom';

export function AxiomLogo() {
    return (
        <Link to="/" className="flex items-center gap-2 group cursor-pointer">
            <img
                src="/logo-axiom.png"
                alt="AXIOM"
                className="h-10 md:h-12 w-auto object-contain transition-transform duration-500 group-hover:scale-105 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]"
            />
        </Link>
    );

}
