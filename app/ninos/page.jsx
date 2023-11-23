"use client";
import Menu_admin from "@/componentes/menu_admin";
import ListaNinos from "@/componentes/ninos/listaNinos";
import Link from "next/link";
export default function Page() {
    return (
        <div className="row">
            <Menu_admin></Menu_admin>
            <div className="mb-2 mt-4">
                <div className="d-flex gap-4">
                    <h2>Listado de Todos los Niños</h2>
                    <Link href="/ninos/censados">
                        <button className="btn btn-dark px-2">Niños censados</button>
                    </Link>
                </div>
            </div>
            <ListaNinos></ListaNinos>
        </div>
    );
}