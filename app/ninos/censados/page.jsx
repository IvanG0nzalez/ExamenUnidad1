"use client";
import Menu_admin from "@/componentes/menu_admin";
import ListaNinosCensados from "@/componentes/ninos/listaNinosCensados";
import Link from "next/link";
export default function Page() {
    return (
        <div className="row">
            <Menu_admin></Menu_admin>
            <div className="mb-2 mt-4">
                <div className="d-flex gap-4">
                    <h2>Listado de Niños Censados</h2>
                    <Link href="/ninos">
                        <button className="btn btn-dark px-2">Volver a listado general</button>
                    </Link>
                </div>
            </div>
            <ListaNinosCensados></ListaNinosCensados>
        </div>
    );
}