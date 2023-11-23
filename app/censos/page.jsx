"use client";
import Menu_admin from "@/componentes/menu_admin";
import ListaNinosCensadosEnc from "@/componentes/ninos/listadoNinosCensadosEnc";
import Link from "next/link";
export default function Page() {
    return (
        <div className="row">
            <Menu_admin></Menu_admin>
            <div className="mb-2 mt-4">
                <div className="d-flex gap-4">
                    <h2>Registro de Censos del Encuestador</h2>
                    <Link href="/censos/nuevo">
                        <button className="btn btn-dark px-2">Nuevo Registro</button>

                    </Link>
                </div>
            </div>
            <ListaNinosCensadosEnc></ListaNinosCensadosEnc>
        </div>
    );
}