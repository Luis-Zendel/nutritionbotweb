"use client"
import { Button, Typography } from '@material-tailwind/react'
import Image from 'next/image'
import { BiFoodMenu } from 'react-icons/bi'
import { BsCalendar2Heart } from 'react-icons/bs'
import { FaUserDoctor } from 'react-icons/fa6'
import { signIn, signOut} from 'next-auth/react'

const ComingSoon = () => {
    return (
        <section className='mt-5 max-w-6xl mb-5 w-full mx-auto'>
            <article className='px-3 flex flex-col md:flex-row items-center justify-center sm:px-5'>
                <div className='flex flex-col items-center justify-center md:w-4/5'>
                    <div className='grid grid-cols-1 gap-2'>
                        <Typography variant='h2' >
                            Dietas a tu medida con IA
                        </Typography>
                        <Typography variant='lead' className='text-gray-600' >
                            Olvídate de las dietas genéricas. Nuestra inteligencia artificial crea planes de alimentación únicos y precisos
                            para cada persona.
                        </Typography>
                        <Typography variant='lead' className='text-gray-600' >
                            Un sencillo formulario te permitirá obtener una dieta personalizada que se ajusta a tus necesidades y objetivos.
                        </Typography>
                    </div>

                    <Button className="gap-3 max-w-max mt-3" onClick={()=>{signIn()}}>
                        <Typography variant='small' className='max-w-max' >
                            ¡Comienza Ahora!
                        </Typography>
                    </Button>
                </div>

                <div className='h-72 mt-5'>
                    <Image src={"/image/food.png"} alt='image of a fruit' className='h-full w-auto object-cover' width={100} height={100} />
                </div>

            </article>

            <Typography variant='h3' className='pl-3 text-gray-900'>
                Proximamente...
            </Typography>

            <section className='grid grid-cols-1 mt-5 gap-2 md:grid-cols-3 place-items-center w-full'>

                <article className='flex flex-col items-center justify-center gap-3 border-b border-gray-200 pb-2 max-w-md'>
                    <div className='rounded-full p-3 max-w-max bg-gray-100 flex items-center justify-center'>
                        <BsCalendar2Heart className='w-14 h-14 text-green-400 p-1' />
                    </div>
                    <div className='px-3 flex-col sm:text-center sm:flex sm:items-center'>
                        <Typography variant='h4' className='ml-2 h-16 flex items-baseline md:ml-0'>
                            Organización sin esfuerzo
                        </Typography>
                        <Typography variant='paragraph' className='text-gray-600'>
                            La aplicación te ayuda a organizar tus comidas y preferencias alimenticias, y te recuerda cuándo comer.
                            ¡Despídete de las confusiones y disfruta de una alimentación sin estrés!
                        </Typography>
                    </div>
                </article>

                <article className='flex flex-col items-center justify-center gap-3 border-b border-gray-200 pb-2 max-w-md'>
                    <div className='rounded-full p-3 max-w-max bg-gray-100 flex items-center justify-center'>
                        <BiFoodMenu className='w-14 h-14 text-green-400 p-1' />
                    </div>
                    <div className='px-3 flex-col sm:text-center sm:flex sm:items-center'>
                        <Typography variant='h4' className='ml-2 h-16 flex items-baseline sm:ml-0'>
                            Recetas con lo que tienes
                        </Typography>
                        <Typography variant='paragraph' className='text-gray-600'>
                            No tires comida a la basura.
                            La IA te ofrece ideas deliciosas para aprovechar al máximo los ingredientes que tienes en casa.
                            ¡Cocina de forma creativa y sostenible!
                        </Typography>
                    </div>
                </article>

                <article className='flex flex-col items-center justify-center gap-3 border-b border-gray-200 pb-2 max-w-md'>
                    <div className='rounded-full p-3 max-w-max bg-gray-100 flex items-center justify-center'>
                        <FaUserDoctor className='w-14 h-14 text-green-400 p-1' />
                    </div>
                    <div className='px-3 flex-col sm:text-center sm:flex sm:items-center'>
                        <Typography variant='h4' className='ml-2 h-16 flex items-center sm:ml-0'>
                            Asesoría profesional a tu alcance
                        </Typography>
                        <Typography variant='paragraph' className='text-gray-600'>
                            Accede a citas y consultas con expertos en nutrición para resolver dudas,
                            recibir consejos personalizados y obtener apoyo en tu camino hacia una vida más saludable.
                        </Typography>
                    </div>
                </article>
            </section>
        </section>
    )
}

export { ComingSoon }

