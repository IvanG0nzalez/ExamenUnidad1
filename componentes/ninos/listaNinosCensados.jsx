"use client";
import { obtener_ninos } from "@/hooks/Conexion";
import { useState, useEffect } from "react";
import { getToken } from "@/hooks/SessionUtil";
const ListaNinosCensados = () => {
  const [ninos, setNinos] = useState([]);

  useEffect(() => {
      const fetchNinos = async () => {
          try {

              const token = getToken();
              const response = await obtener_ninos('examen.php?resource=census_children', token);

              console.log("en listaNinosCensados",response);
              setNinos(response.info);
          } catch (error) {
              console.error("Error obteniendo los ninos", error);
          }
      };

      fetchNinos();
  }, []);

  return (
      <div className="container-fluid">
            <table className="table">
                <thead>
                    <tr>
                    <th scope="col">Nro</th>
                        <th scope="col">Nombres</th>
                        <th scope="col">Edad</th>
                    </tr>
                </thead>
                <tbody>
                    {ninos.map((nino, i) => (
                        <tr key={nino.external_id}>
                            <td>{i + 1}</td>
                            <td>{nino.nombres ?? "NIÑO SIN NOMBRES"}</td>
                            <td>{nino.edad}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
      </div>
  );
};

export default ListaNinosCensados;