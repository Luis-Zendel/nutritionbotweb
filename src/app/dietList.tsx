"use client"
import { useDietContext } from './context/usediet';
import { DesayunoCard } from './dietInform';

interface Menu {
    desayuno: {};
    media_manana: {};
    almuerzo: {};
    media_tarde: {};
    cena: {};
    antes_de_dormir: {};
}

const coloresBase = [
    "teal-400",
    "pink-400",
    "purple-400",
    "indigo-400",
    "blue-400",
    "cyan-400",
    "light-blue-400",
    "teal-300",
    "green-400",
    "lime-400",
];

const coloresSecundarios = [
    "amber-400",
    "orange-400",
    "deep-orange-400",
    "red-400",
    "purple-400",
    "indigo-400",
    "blue-400",
    "cyan-400",
    "light-blue-400",
    "teal-300",
];

const DietList = () => {

    const { diet, setDiet } = useDietContext();

    return (
        <section className={`max-w-6xl mx-auto w-full`}>
            {diet.desayuno.opcion1 != '' ?
                <div className="flex flex-col items-center justify-center gap-4">
                    {Object.entries(diet).map(([title, content], index) => (
                        <DesayunoCard
                            key={title}
                            title={title}
                            content={content}
                            colorBase={coloresBase[index]}
                            colorSecundario={coloresSecundarios[index]}
                        />
                    ))}
                </div>
                : <></>
            }

        </section>
    )
}

export default DietList
