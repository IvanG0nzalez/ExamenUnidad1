"use client";
import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { inicio_sesion } from '@/hooks/Autenticacion';
import { estaSesion, saveToken, save } from '@/hooks/SessionUtil';
import mensajes from '@/componentes/Mensajes';
import { useRouter } from 'next/navigation';
export default function Home() {
  //router
  const router = useRouter();
  //validaciones
  const validationSchema = Yup.object().shape({
    correo: Yup.string().required("Ingrese su correo").email("Se requiere correo válido"),
    clave: Yup.string().required("Ingrese su clave")
  });

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  let { errors } = formState;

  const sendData = (data) => {
    var data = {
       "resource": "login", 
       "email": data.correo, 
       "password": data.clave,
      };

    inicio_sesion(data).then((info) => {
      console.log("en el page", info);
      if (!estaSesion()) {
        //JOption 
        mensajes("Error al iniciar sesión!", info.msg, "error");
      } else {
        //JOption 
        mensajes("Has ingresado al sistema!", "Bienvenido");
        router.push("/ninos");
        router.refresh();
      }

    });
  };

  return (
    <div className="">
      <section className="vh-100 gradient-custom">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div
                className="card bg-dark text-white"
                style={{ WebkitBorderRadius: "1rem" }}
              >
                <div className="card-body p-5 text-center">
                  <form onSubmit={handleSubmit(sendData)}>
                    <div className="mb-md-5 mt-md-4 pb-5">
                      <h2 className="fw-bold mb-2 text-uppercase">
                        Inicio de Sesión
                      </h2>
                      <p className="text-white-50 mb-5">
                        Ingrese su correo y contraseña
                      </p>

                      <div className="form-outline form-white mb-4">
                        <input
                          {...register('correo')} name="correo" id="correo"
                          className={`form-control ${errors.correo ? 'is-invalid' : ''}`} />
                        <label className="form-label">Correo</label>
                        <div className='alert alert-danger invalid-feedback'>
                          {errors.identificador?.message}
                        </div>
                      </div>

                      <div className="form-outline form-white mb-4">
                        <input
                          {...register("clave")}
                          name="clave"
                          type="password"
                          id="clave"
                          className={`form-control ${errors.clave ? "is-invalid" : ""
                            }`}
                        />
                        <label className="form-label">
                          Contraseña
                        </label>
                        <div className="alert alert-danger invalid-feedback">
                          {errors.clave?.message}
                        </div>
                      </div>

                      <button
                        className="btn btn-outline-light btn-lg px-5"
                        type="submit"
                      >
                        Acceder
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
