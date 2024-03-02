
"use client"
import { useState } from "react";
// components
import DataForm from "./DataForm";
// sections
import SelectDiet from "./SelectDiet";

import { Button, Typography } from "@material-tailwind/react";
export default function UserDietSection() {
    const [GenerateOption, setOption] = useState(0)
    const handleClickGetDiet = () => {
        setOption(1)
    }
    const handleClickDataForm = () =>{
        setOption(0)
    }
  return (
    <>  
    <div className='flex w-full mt-4'>
        <Button className={GenerateOption == 0 ? "gap-3 max-w-max mt-3 mx-auto bg-blue-200" :"gap-3 max-w-max mt-3 mx-auto 0"} onClick={()=>{handleClickDataForm()}}>
                Crea tu propia dieta con IA
        </Button>
        <Button className={GenerateOption == 1 ? "gap-3 max-w-max mt-3 mx-auto bg-blue-200" :"gap-3 max-w-max mt-3 mx-auto 0"} onClick={()=>{handleClickGetDiet()}}>
                Consulta dietas generadas
        </Button>
    </div>
    {GenerateOption == 1 ? <>
        <SelectDiet/>
    </> : <>
    <DataForm/>
    </>}

 
    </>
  );
}
