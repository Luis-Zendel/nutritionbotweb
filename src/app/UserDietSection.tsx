
"use client"
import { useState } from "react";
// components
import DataForm from "./DataForm";
// sections
import { Button } from "@material-tailwind/react";
import { useSession } from 'next-auth/react';
import SelectDiet from "./SelectDiet";
export default function UserDietSection() {
    const { data: session } = useSession();
    const [GenerateOption, setOption] = useState(0)
    const handleClickGetDiet = () => {
        setOption(1)
    }
    const handleClickDataForm = () =>{
        setOption(0)
    }
  return (
    <> 
    { session?.user?.email ?
    <>
    <div className='flex w-full mt-4 flex-col md:flex-row'>
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
    : <></>
}

 
    </>
  );
}
