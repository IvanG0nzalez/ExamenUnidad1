"use client"
import { borrarSesion } from "@/hooks/SessionUtil";
import Link from "next/link";
import mensajes from "./Mensajes";
import { redirect, useRouter } from "next/navigation";
export default function Menu_admin() {
    const router = useRouter();
    const salir = async () => {
        await borrarSesion();
        mensajes("Adiós!", "Hasta la próxima");
        router.push('/');
        router.refresh();
    }
    return (
        <nav className="navbar bg-dark navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
            <div className="container-fluid">
                {/* <Link href="/" className="navbar-brand">Noticias Quinto A</Link> */}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                            <Link href="#" onClick={salir} className="nav-link active" aria-current="page">Cerrar Sesión</Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/ninos" className="nav-link active" aria-current="page">Niños</Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/censos" className="nav-link active" aria-current="page">Registros de Censos</Link>
                        </li>
                        
                    </ul>
                </div>
            </div>
        </nav>
    );
}