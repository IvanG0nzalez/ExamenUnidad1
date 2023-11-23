let URL = "https://computacion.unl.edu.ec/pdml/examen1/";
export function url_api() {
  return URL;
}

export async function enviar(recurso, data) {
  let headers = []
  headers = {
    "Accept": "application/json",
  };


  const response = await fetch(URL + recurso, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(data),
  });
  return await response.json();
}

export async function obtener(recurso) {
  const response = await fetch(URL + recurso);
  return await response.json();
}

export async function obtener_ninos(recurso, token){
  const headers = {
    "Accept": "application/json",
    "Content-type":"application/json",
    "TEST-KEY": token,
  }
  const response = await fetch(URL + recurso, {
    method: "GET",
    headers: headers,
    cache:'no-store'
  });
  const responseData = await response.json();
  return responseData;
}

export async function enviar_censo(recurso, data, token) {
  if(token==""){
    console.log("No hay token");
  } else {
    const headers = {
      "Accept": "application/json",
      "Content-type": "application/json",
      "TEST-KEY": token,
    };

    const response = await fetch(URL + recurso, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    return responseData;
  }
}