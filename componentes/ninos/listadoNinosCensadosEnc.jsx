"use client";
import { obtener_ninos } from "@/hooks/Conexion";
import { useState, useEffect } from "react";
import { getToken, getExternalUser } from "@/hooks/SessionUtil";
import Link from "next/link";
const ListaNinosCensadosEnc = () => {
  const [censos, setCensos] = useState([]);

  useEffect(() => {
      const fetchCensos = async () => {
          try {

              const token = getToken();
              const userExternal = getExternalUser()
              const response = await obtener_ninos('examen.php?resource=census_children_login&external=' + userExternal, token);

              console.log("en listaNinosCensadosEnc",response);
              setCensos(response.info);
          } catch (error) {
              console.error("Error obteniendo los censos", error);
          }
      };

      fetchCensos();
  }, []);
  console.log(censos);
  return (
      <div className="container-fluid">
            <table className="table">
                <thead>
                    <tr>
                    <th scope="col">Nro</th>
                        <th scope="col">Nombres</th>
                        <th scope="col">Edad</th>
                        <th scope="col">Escuela</th>
                        <th scope="col">Curso</th>
                        <th scope="col">Peso</th>
                        <th scope="col">Estatura</th>
                        <th scope="col">Representante</th>
                        <th scope="col">Actividades</th>
                        <th scope="col">Editar</th>
                    </tr>
                </thead>
                <tbody>
                    {censos.map((censo, i) => (
                        <tr key={censo.external_id}>
                            <td>{i + 1}</td>
                            <td>{censo.nombres ?? "NIÑO SIN NOMBRES"}</td>
                            <td>{censo.edad}</td>
                            <td>{censo.escuela}</td>  
                            <td>{censo.curso}</td>                            
                            <td>{censo.peso}</td>                            
                            <td>{censo.talla}</td>                            
                            <td>{censo.representante}</td>                            
                            <td>{censo.actividades}</td>                            
                            <td>
                                <Link href={`/censos/editar/${censo.extrenal_censo}`} passHref className="btn btn-primary">Modificar</Link>
                            </td>                            

                        </tr>
                    ))}
                </tbody>
            </table>
      </div>
  );
};

export default ListaNinosCensadosEnc;