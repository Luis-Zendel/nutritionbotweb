"use client"
import { Option, Select, Button, Typography} from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { fetchListDiet, fetchSavedDiet } from './api/api';
import { useDietContext } from './context/usediet';
import { useSession } from 'next-auth/react';
import { motion } from "framer-motion";

interface Menu {
    desayuno: string;
    media_manana: string;
    almuerzo: string;
    media_tarde: string;
    cena: string;
    antes_de_dormir: string;
}

interface SavedDiet {
    id: number,
    email: string,
    date: string,
    diet: any,
    name?: string,
    _id: any
}
interface  diet {
    almuerzo: string;
    antes_de_dormir: string;
    cena: string;
    desayuno: string;
    media_manana: string;
    media_tarde: string;
  };
const SelectDiet = () => {
    const { data: session } = useSession();
    const { diet, setDiet } = useDietContext();
    const [savedDiets, setSavedDiets] = useState([] as Array<SavedDiet>);
    const [consulta, setConsulta] = useState(false)
    useEffect(() => {
        async function getListDiet() {
            const list = await fetchListDiet(session?.user?.email );
            if (list == undefined) {
                return
            }
            setSavedDiets(list);
        }

        getListDiet();
    }, [session]);

    const handleSelectDiet = async (value: string | undefined) => {

        if (value == undefined) return
        
        const savedDiet = await fetchSavedDiet(value);
        if (savedDiet == undefined) return
        console.log(value)
       var dietaSeleccionada  = savedDiets.find((e)=>{if (e._id.$oid == value) {
        console.log(e)
        console.log("Se encontro")
        return e}})
        const dieta = dietaSeleccionada?.diet
        console.log(dieta)
        console.log("Esa fue la dieta seleccionada")
        setDiet(dieta)
    }
    const handleClickConsulta = () => {
        console.log("Ejucar consulta")
        async function getListDiet() {
            const list = await fetchListDiet(session?.user?.email );
            if (list == undefined) {
                return
            }
            setSavedDiets(list);
        }

        getListDiet();
        setConsulta(true)
    }
    return (
        <>
        <section className="flex flex-col items-center justify-center gap-4 w-full max-w-xl mx-auto mb-10 mt-10 hidden">
            {   savedDiets.length > 0  ? 

                <Select name='select_diet' variant='outlined' label='Dieta consultada' className='' onChange={value => handleSelectDiet(value)}>
                {savedDiets.map(savedDiet =>
                    <Option value={`${savedDiet._id.$oid}`} key={`${savedDiet._id}`}>
                        {savedDiet.name ? savedDiet.name : savedDiet.date}
                    </Option>
                )}
            </Select>
            :
            <>
            <Typography variant='h5' color='red' className=''>No se encontraron dietas almacenas</Typography>
            <Button onClick={()=>{handleClickConsulta()}}>Precione para volver a consultar</Button>
            </>
            }
        </section>
        <section>
            <DevelopmentMessage/>
        </section>

        </>
    )
}

function DevelopmentMessage() {
    return (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-6 bg-yellow-100 text-yellow-800 rounded-md shadow-md text-center"
      >
        <h2 className="text-2xl font-bold mb-2">¡En Desarrollo!</h2>
        <p>El módulo que deseas consultar actualmente se encuentra en desarrollo. ¡Pronto tendrás la opción de acceder!</p>
      </motion.div>
    );
  }

export default SelectDiet
