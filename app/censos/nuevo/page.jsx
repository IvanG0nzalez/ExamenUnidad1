"use client";
import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import Menu_admin from "@/componentes/menu_admin";
import { registrar_censo } from "@/hooks/Autenticacion";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from 'next/navigation';
import { getExternalUser, getToken } from '@/hooks/SessionUtil';
import { obtener_ninos, obtener } from '@/hooks/Conexion';
import mensajes from '@/componentes/Mensajes';
import Link from 'next/link';


export default function Nuevo() {
    const external_user = getExternalUser();
    const token = getToken();
    const router = useRouter();

    const validationShema = Yup.object().shape({
        peso: Yup.number().required("Ingrese un peso"),
        estatura: Yup.number().required("Ingrese una estatura"),
        representativo: Yup.string().required("Ingrese un representativo"),
        actividades: Yup.string().required("Ingrese una actividad"),
    });

    const formOptions = { resolver: yupResolver(validationShema) };
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

    const sendData = (data) => {
        console.log("data", data);
        var dato = {
            "resource":"saveCensus",
            "weight":data.peso,
            "height":data.estatura,
            "representative":data.representativo,
            "activities":data.actividades,
            "external_child":data.external_child,
            "external_school":data.external_school,
            "external_course":data.external_course,
            "external_session":external_user,
        };
        console.log("dato", dato);

        registrar_censo(dato).then((info) => {
            console.log("info", info);
            mensajes("Censo registrado correctamente", "OK", "sucess");
            router.push("/censos");
        });
    };

    const [ninos, setNinos] = useState([]);
    const [escuelas, setEscuelas] = useState([]);
    const [cursos, setCursos] = useState([]);

    useEffect(() => {
        const fetchResultados = async () => {
            try {
                const response_ninos = await obtener_ninos('examen.php?resource=unregistered_children', token);
                const response_escuelas = await obtener_ninos('examen.php?resource=school', token);
                const response_cursos = await obtener('examen.php?resource=course');
                setNinos(response_ninos.info);
                setEscuelas(response_escuelas.info);
                setCursos(response_cursos.info);
            } catch (error) {
                console.error("Error obteniendo información de los select", error);
            }
        };

        fetchResultados();
    }, []);

    return (
        <div className="row">
            <Menu_admin></Menu_admin>
            <h1>Registrar Censo</h1>
            <div className='col-4 container-fluid'>
                <form onSubmit={handleSubmit(sendData)}>

                    <div className="form-outline form-white mb-4">
                        <label className="form-label">Niño</label>
                        <select {...register('external_child')} className={`form-select ${errors.external_child ? 'is-invalid' : ''}`}>
                            <option value="">Seleccionar Niño</option>
                            {ninos.map((nino, i) => (
                                <option key={i} value={nino.external_id}>{nino.nombres || "Niño sin nombre"}</option>
                            ))}
                        </select>
                        <div className='alert alert-danger invalid-feedback'>
                            {errors.external_child?.message}
                        </div>
                    </div>

                    <div className="form-outline form-white mb-4">
                        <label className="form-label">Escuela</label>
                        <select {...register('external_school')} className={`form-select ${errors.external_school ? 'is-invalid' : ''}`}>
                            <option value="">Seleccionar Escuela</option>
                            {escuelas.map((escuela, i) => (
                                <option key={i} value={escuela.external_id}>{escuela.nombre}</option>
                            ))}
                        </select>
                        <div className='alert alert-danger invalid-feedback'>
                            {errors.external_school?.message}
                        </div>
                    </div>

                    <div className="form-outline form-white mb-4">
                        <label className="form-label">Curso</label>
                        <select {...register('external_course')} className={`form-select ${errors.external_course ? 'is-invalid' : ''}`}>
                            <option value="">Seleccionar Curso</option>
                            {cursos.map((curso, i) => (
                                <option key={i} value={curso.external_id}>{curso.denominacion}</option>
                            ))}
                        </select>
                        <div className='alert alert-danger invalid-feedback'>
                            {errors.external_course?.message}
                        </div>
                    </div>

                    <div className="form-outline form-white mb-4">
                        <label className="form-label">Peso</label>
                        <input {...register('peso')} name="peso" id="peso" className={`form-control ${errors.peso ? 'is-invalid' : ''}`} />
                        <div className='alert alert-danger invalid-feedback'>
                            {errors.peso?.message}
                        </div>
                    </div>

                    <div className="form-outline form-white mb-4">
                        <label className="form-label">Estatura</label>
                        <input {...register('estatura')} name="estatura" id="estatura" className={`form-control ${errors.estatura ? 'is-invalid' : ''}`} />
                        <div className='alert alert-danger invalid-feedback'>
                            {errors.estatura?.message}
                        </div>
                    </div>

                    <div className="form-outline form-white mb-4">
                        <label className="form-label">Representante</label>
                        <input {...register('representativo')} name="representativo" id="representativo" className={`form-control ${errors.representativo ? 'is-invalid' : ''}`} />
                        <div className='alert alert-danger invalid-feedback'>
                            {errors.representativo?.message}
                        </div>
                    </div>

                    <div className="form-outline form-white mb-4">
                        <label className="form-label">Actividades</label>
                        <input {...register('actividades')} name="actividades" id="actividades" className={`form-control ${errors.actividades ? 'is-invalid' : ''}`} />
                        <div className='alert alert-danger invalid-feedback'>
                            {errors.actividades?.message}
                        </div>
                    </div>

                    <div className="d-flex gap-4">
                        <button type="submit" className="btn btn-outline-dark btn-lg px-5" id='boton-nuevo-auto'>Agregar</button>
                        <Link href="/censos">
                        <button className="btn btn-outline-dark btn-lg px-5">Volver</button>
                    </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}