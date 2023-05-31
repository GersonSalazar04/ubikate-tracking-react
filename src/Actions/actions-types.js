// const username = 'user'; // Usuario
// const password = 'e5856abd-3032-4fd4-ad97-34bcff5b17cf'; // Contraseña

export function get(url){
    return fetch(url)
        .then(response => {
            if (!response.ok) {
            throw new Error('Error en la respuesta de la API');
            }
            return response.json();
        })
        .then(data => {
            return data;
        })
        .catch(error => {
            console.error(error);
        });
}


export function post(url, data){
    return fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Error en la respuesta de la API');
          }
          return response.json();
        })
        .catch(error => {
          console.error(error);
        });
}