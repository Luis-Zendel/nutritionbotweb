"use client"
import React, { createContext, useContext, useState } from 'react';

interface DietContextType {
  diet: {
    almuerzo: string;
    antes_de_dormir: string;
    cena: string;
    desayuno: string;
    media_manana: string;
    media_tarde: string;
  };
  setDiet: React.Dispatch<React.SetStateAction<{
    almuerzo: string;
    antes_de_dormir: string;
    cena: string;
    desayuno: string;
    media_manana: string;
    media_tarde: string;
  }>>;
  dividirOpciones: Function
}


interface Menu {
  desayuno: string;
  media_manana: string;
  almuerzo: string;
  media_tarde: string;
  cena: string;
  antes_de_dormir: string;
}


const initialDietState = {
  almuerzo: "",
  antes_de_dormir: "",
  cena: "",
  desayuno: "",
  media_manana: "",
  media_tarde: "",
};

const DietContext = createContext<DietContextType>({
  diet: initialDietState,
  setDiet: () => { },
  dividirOpciones: () => { }
});

export const useDietContext = () => useContext(DietContext);

export const DietProvider = ({ children }: React.PropsWithChildren) => {
  const [diet, setDiet] = useState(initialDietState);
  

  // Convertir el JSON en un objeto con arrays de opciones
  function dividirOpciones(comida: keyof Menu): string[] {
    // Dividir la cadena de opciones usando el salto de línea como separador
    console.log("Resultado:  ")
    console.log(diet)
    const opciones = diet[comida].split('\n');
    while (opciones.length >= 4) opciones.pop();
    // Filtrar las opciones válidas y eliminar los números de las opciones
    const opcionesFiltradas = opciones.filter(opcion => opcion.trim() !== '').map(opcion => opcion.replace(/^\d+\. /, ''));
    return opcionesFiltradas;
  }

  return (
    <DietContext.Provider value={{ diet, setDiet, dividirOpciones }}>
      {children}
    </DietContext.Provider>
  );
};

