import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-[70vh] flex items-center justify-center px-6">
            <div className="text-center">
                <p className="text-sm text-white/50">Erreur 404</p>
                <h1 className="mt-2 text-3xl font-bold text-white">Page introuvable</h1>
                <p className="mt-2 text-white/70">La page que vous cherchez n’existe pas.</p>
                <div className="mt-6 flex gap-3 justify-center">
                    <Link href="/" className="px-4 py-2 rounded-lg bg-[#1A1A1A] border border-[#333] hover:bg-[#1b1b1b]">
                        Accueil
                    </Link>
                    <Link href="/projects" className="px-4 py-2 rounded-lg bg-[#1A1A1A] border border-[#333] hover:bg-[#1b1b1b]">
                        Voir mes projets
                    </Link>
                </div>
            </div>
        </div>
    );
}
