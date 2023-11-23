"use client";
import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { getExternalUser, getToken } from "@/hooks/SessionUtil";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { obtener_ninos, obtener } from "@/hooks/Conexion";
import { registrar_censo } from "@/hooks/Autenticacion";
import Menu_admin from '@/componentes/menu_admin';
import Link from 'next/link';
import mensajes from '@/componentes/Mensajes';

export default function Page({ params }) {
    const token = getToken();
    const router = useRouter();
    const [respuesta, setRespuesta] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const external = params.external;
            const userExternal = getExternalUser();
            const response = await obtener_ninos('examen.php?resource=census_children_login&external=' + userExternal, token);
            const censoEncontrado = response.info.find(censo => censo.extrenal_censo === external);
            console.log("censofound", censoEncontrado);

            if (censoEncontrado) {
                setRespuesta(censoEncontrado);

                setValue('peso', censoEncontrado['peso']);
                setValue('estatura', censoEncontrado['talla']);
                setValue('representativo', censoEncontrado['representante']);
                setValue('actividades', censoEncontrado['actividades']);
                setValue('external_school', censoEncontrado['external_escuela']);
                setValue('external_course', censoEncontrado['external_curso']);
            }
        };

        fetchData();
    }, []);

    const validationSchema = Yup.object().shape({
        peso: Yup.number().required("Ingrese un peso"),
        estatura: Yup.number().required("Ingrese una estatura"),
        representativo: Yup.string().required("Ingrese un representativo"),
        actividades: Yup.string().required("Ingrese una actividad"),
    });

    //const formOptions = { resolver: yupResolver(validationShema) };
    const { register, handleSubmit, formState, setValue, reset } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: respuesta,
    });
    //console.log("respuesta", respuesta);
    const { errors } = formState;

    const sendData = (data) => {
        console.log("data", data);
        var dato = {
            "resource": "updateCensus",
            "weight": data.peso,
            "height": data.estatura,
            "representative": data.representativo,
            "activities": data.actividades,
            "external_school": data.external_school,
            "external_course": data.external_course,
            "external": respuesta.extrenal_censo,
        };

        registrar_censo(dato).then((info) => {
            console.log("info", info);
            mensajes("Censo modificado correctamente", "OK");
            router.push("/censos");
        });
    };

    const [escuelas, setEscuelas] = useState([]);
    const [cursos, setCursos] = useState([]);

    useEffect(() => {
        const fetchResultados = async () => {
            try {
                const response_escuelas = await obtener_ninos('examen.php?resource=school', token);
                const response_cursos = await obtener('examen.php?resource=course');
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
            <h1>Modificar Censo - {respuesta.nombres}</h1>
            <div className='col-4 container-fluid'>
                <form onSubmit={handleSubmit(sendData)}>

                    <div className="form-outline form-white mb-4">
                        <label className="form-label">Escuela</label>
                        <select {...register('external_school')} className={`form-select ${errors.external_school ? 'is-invalid' : ''}`}>
                            <option value="">Seleccionar Escuela</option>
                            {escuelas.map((escuela, i) => (
                                <option key={i} value={escuela.external_id} selected={escuela.external_id === respuesta.external_escuela}>{escuela.nombre}</option>
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
                                <option key={i} value={curso.external_id} selected={curso.external_id === respuesta.external_curso}>{curso.denominacion}</option>
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
                        <button type="submit" className="btn btn-outline-dark btn-lg px-5" id='boton-nuevo-auto'>Modificar</button>
                        <Link href="/censos">
                            <button className="btn btn-outline-dark btn-lg px-5">Cancelar</button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )


}