"use client"
import { Option, Select } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { fetchListDiet, fetchSavedDiet } from './api/api';
import { useDietContext } from './context/usediet';
import { useSession } from 'next-auth/react';
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
    title: string,
}

const SelectDiet = () => {
    const { data: session } = useSession();
    const { diet, setDiet } = useDietContext();
    const [savedDiets, setSavedDiets] = useState([] as Array<SavedDiet>);

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
        
        setDiet(savedDiet.content);
    }

    return (
        <section className="flex flex-col items-center justify-center gap-4 w-full max-w-xl mx-auto mb-10">
            <Select name='select_diet' variant='outlined' label='Dieta consultada' className='' onChange={value => handleSelectDiet(value)}>
                {savedDiets.map(savedDiet =>
                    <Option value={`${savedDiet.id}`} key={`${savedDiet.id}`}>
                        {savedDiet.title}
                    </Option>
                )}
            </Select>
        </section>
    )
}

export default SelectDiet
