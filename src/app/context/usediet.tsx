"use client"
import React, { createContext, useContext, useState } from 'react';

interface DietContextType {
  diet: {
    desayuno: {
      opcion1: string,
      opcion2: string,
      opcion3: string
    };
    almuerzo:{
      opcion1: string,
      opcion2: string,
      opcion3: string
    };
    comida:{
      opcion1: string,
      opcion2: string,
      opcion3: string
    };
    merienda:{
      opcion1: string,
      opcion2: string,
      opcion3: string
    };
    cena:{
      opcion1: string,
      opcion2: string,
      opcion3: string
    };
  };
  setDiet: React.Dispatch<React.SetStateAction<{
    desayuno: {
      opcion1: string,
      opcion2: string,
      opcion3: string
    };
    almuerzo:{
      opcion1: string,
      opcion2: string,
      opcion3: string
    };
    comida:{
      opcion1: string,
      opcion2: string,
      opcion3: string
    };
    merienda:{
      opcion1: string,
      opcion2: string,
      opcion3: string
    };
    cena:{
      opcion1: string,
      opcion2: string,
      opcion3: string
    };
  }>>;
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
  desayuno: {
    opcion1: "",
    opcion2: "",
    opcion3: ""
  },
  almuerzo:{
    opcion1: "",
    opcion2: "",
    opcion3: ""
  },
  comida:{
    opcion1: "",
    opcion2: "",
    opcion3: ""
  },
  merienda:{
    opcion1: "",
    opcion2: "",
    opcion3: ""
  },
  cena:{
    opcion1: "",
    opcion2: "",
    opcion3: ""
  }
};

const DietContext = createContext<DietContextType>({
  diet: initialDietState,
  setDiet: () => { },
});

export const useDietContext = () => useContext(DietContext);

export const DietProvider = ({ children }: React.PropsWithChildren) => {
  const [diet, setDiet] = useState(initialDietState);
  

  // Convertir el JSON en un objeto con arrays de opciones


  return (
    <DietContext.Provider value={{ diet, setDiet }}>
      {children}
    </DietContext.Provider>
  );
};

