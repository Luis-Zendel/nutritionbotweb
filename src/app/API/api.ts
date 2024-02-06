type userData = {
    name: string,
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
        return await response.json();
    } catch (error) {
        console.error("Error al realizar la solicitud:", error);
        throw error;
    }
};


export {
    fetchDiet
};
