type userData = {
    name: string,
    email: string,
    prompt: string,
    time: string,
}

const fetchDiet = async (url: string, data: userData) => {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // Puedes agregar otros encabezados según sea necesario
            },
            body: JSON.stringify(data),
        });


        if (!response.ok) {
            throw new Error("No se genero respuesta ");
        }

        const result = await response.json();

        return {
            success: response.status !== 200,
            data: result
        }

    } catch (error) {
        console.error("Error al realizar la solicitud:", error);
        throw error;
    }
};

const fetchListDiet = async () => {
    const URL = 'https://httpbin.org/status/200' //simula el comprtamiento de la API
    try {
        const response = await fetch(URL);

        if (!response) {
            throw new Error('No se generó respuesta');
        }

        //const result = await response.json();

        //return result; //debería retornar esto

        return [
            {
                id: 1,
                title: '24-02-2024 perder peso'
            },
            {
                id: 2,
                "title": "24-02-2024 controlar diabetes",
            },
        ]

    } catch (error) {
        console.error('Error en la solicitud');
    }
}

const fetchSavedDiet = async (id: string) => {
    const URL = 'https://httpbin.org/status/200' //simula el comprtamiento de la API
    try {
        const response = await fetch(URL);

        if (!response) {
            throw new Error('No se generó respuesta');
        }

        //const result = await response.json();

        //return result; //debería retornar esto

        return {
            id: id,
            title: "24-02-2024 controlar diabetes",
            content: {
                "almuerzo": "1. Opción 1: Ensalada de quinoa con vegetales asados y aderezo de limón.\n2. Opción 2: Tacos de pescado con salsa de mango y aguacate.\n3. Opción 3: Pollo al curry con verduras al vapor.",
                "antes_de_dormir": "1. Opción 1: Una manzana con mantequilla de almendras.\n2. Opción 2: Té de hierbas con una tostada de pan integral.\n3. Opción 3: Batido de proteínas con leche de almendras.",
                "cena": "1. Opción 1: Sopa de lentejas con espinacas y tomates frescos.\n2. Opción 2: Pescado al horno con espárragos y puré de coliflor.\n3. Opción 3: Tofu salteado con brócoli y arroz integral.",
                "desayuno": "1. Opción 1: Avena con plátano y nueces.\n2. Opción 2: Tostadas integrales con aguacate y huevo pochado.\n3. Opción 3: Smoothie verde con espinacas, piña y jengibre.",
                "media_manana": "1. Opción 1: Batido de frutas con proteína de suero de leche.\n2. Opción 2: Puñado de almendras y un yogur natural.\n3. Opción 3: Tostadas de pan integral con mantequilla de cacahuete.",
                "media_tarde": "1. Opción 1: Rollitos de pepino con salmón ahumado.\n2. Opción 2: Batido de proteínas con leche de coco y mango.\n3. Opción 3: Chips de manzana al horno con canela."
            }
        }

    } catch (error) {
        console.error('Error en la solicitud');
    }
}


export {
    fetchDiet, fetchListDiet, fetchSavedDiet
};


/* 

                "content": {
                    "almuerzo": "1. Opción 1: Ensalada de quinoa con vegetales asados y aderezo de limón.\n2. Opción 2: Tacos de pescado con salsa de mango y aguacate.\n3. Opción 3: Pollo al curry con verduras al vapor.",
                    "antes_de_dormir": "1. Opción 1: Una manzana con mantequilla de almendras.\n2. Opción 2: Té de hierbas con una tostada de pan integral.\n3. Opción 3: Batido de proteínas con leche de almendras.",
                    "cena": "1. Opción 1: Sopa de lentejas con espinacas y tomates frescos.\n2. Opción 2: Pescado al horno con espárragos y puré de coliflor.\n3. Opción 3: Tofu salteado con brócoli y arroz integral.",
                    "desayuno": "1. Opción 1: Avena con plátano y nueces.\n2. Opción 2: Tostadas integrales con aguacate y huevo pochado.\n3. Opción 3: Smoothie verde con espinacas, piña y jengibre.",
                    "media_manana": "1. Opción 1: Batido de frutas con proteína de suero de leche.\n2. Opción 2: Puñado de almendras y un yogur natural.\n3. Opción 3: Tostadas de pan integral con mantequilla de cacahuete.",
                    "media_tarde": "1. Opción 1: Rollitos de pepino con salmón ahumado.\n2. Opción 2: Batido de proteínas con leche de coco y mango.\n3. Opción 3: Chips de manzana al horno con canela."
                }
 */
