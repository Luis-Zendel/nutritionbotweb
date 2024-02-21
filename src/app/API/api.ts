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


export {
    fetchDiet
};

