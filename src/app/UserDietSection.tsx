"use client"
import { useState } from "react";
// components
import DataForm from "./DataForm";
import SelectDiet from "./SelectDiet";
// sections
import { Button } from "@material-tailwind/react";
import { useSession } from 'next-auth/react';
import { motion } from "framer-motion";
import { signIn, signOut} from 'next-auth/react'

export default function UserDietSection() {
  const [GenerateOption, setOption] = useState(0);
  const {data: session}  = useSession()


  const handleClickGetDiet = () => {
    setOption(1);
  };

  const handleClickDataForm = () => {
    setOption(0);
  };

  return (
    <>
      {session?.user?.email ? (
        <>
          <div className="flex w-full mt-4 flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-4">
            <Button
              className={`gap-3 max-w-max ${
                GenerateOption === 0 ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
              }`}
              onClick={handleClickDataForm}
            >
              Crea tu propia dieta con IA
            </Button>
            <Button
              className={`gap-3 max-w-max  ${
                GenerateOption === 1 ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
              }`}
              onClick={handleClickGetDiet}
            >
              Consulta dietas generadas
            </Button>
          </div>
          <div className="mt-4">
            {GenerateOption === 1 ? <SelectDiet /> : <DataForm />}
          </div>
        </>
      ) : (
        <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-6 bg-yellow-100 text-yellow-800 rounded-md shadow-md text-center"
      >
        <h2 className="text-2xl font-bold mb-2">¡Inicia Sesión con Google!</h2>
        <p>El módulo que deseas consultar actualmente requiere de iniciar sesión para brindarte de los recursos!</p>
        <Button onClick={()=>{signIn()}}>
            Iniciar Sesión
            </Button>
      </motion.div>      )}
    </>
  );
}
