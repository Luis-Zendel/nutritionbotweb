"use client";

import {
  ChatBubbleOvalLeftEllipsisIcon,
  PlayCircleIcon,
} from "@heroicons/react/24/solid";
import { Button, Card, CardBody, Dialog, DialogBody, DialogHeader, Input, Option, Select, Typography } from "@material-tailwind/react";
import Image from "next/image";
import React, { useState } from "react";

import BlogCardWithImage from "@/components/blog-card-with-image";
import SimpleBlogCard from "@/components/simple-blog-card";
import { GiAges, GiClockwork, GiPencilRuler, GiWeight } from "react-icons/gi";
import { GrUser } from "react-icons/gr";
import { IoWarningOutline } from "react-icons/io5";
import { fetchDiet } from "../API/api";
import { DesayunoCard } from "./dietInform";

interface Menu {
  desayuno: string;
  media_manana: string;
  almuerzo: string;
  media_tarde: string;
  cena: string;
  antes_de_dormir: string;
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



const SIMPLE_CONTENT = [
  {
    title: "Podcasts",
    icon: ChatBubbleOvalLeftEllipsisIcon,
    subtitle: "An interview with Tesla founder.",
    name: "By Alexa Rossa",
  },
  {
    title: "Interviews",
    icon: PlayCircleIcon,
    subtitle: "Make $500k through small biz or raise it from family.",
    name: "By Jonathan Silvia",
  },
  {
    title: "Podcasts",
    icon: ChatBubbleOvalLeftEllipsisIcon,
    subtitle: "An interview with Tesla founder.",
    name: "By Alexa Rossa",
  },
];

const menu: Menu = {
  "almuerzo": "1. Opci\u00f3n 1: Pechuga de pollo a la plancha con ensalada de espinacas, tomates, pepinos y aderezo de vinagreta ligera.\n2. Opci\u00f3n 2: Salm\u00f3n a la parrilla con esp\u00e1rragos al vapor y quinoa.\n3. Opci\u00f3n 3: Ensalada de at\u00fan con lechuga, tomates, aguacate y aderezo bajo en grasa.",
  "antes_de_dormir": "1. Opci\u00f3n 1: Un pu\u00f1ado de almendras.\n2. Opci\u00f3n 2: Un yogur griego bajo en grasa.\n3. Opci\u00f3n 3: Una porci\u00f3n de queso cottage bajo en grasa.\n\nRecuerda que es importante mantenerse hidratado durante todo el d\u00eda, as\u00ed que no olvides beber suficiente agua. Adem\u00e1s, consulta con un profesional de la salud antes de comenzar cualquier dieta o programa de ejercicio para asegurarte de que sea adecuado para ti.",
  "cena": "1. Opci\u00f3n 1: Filete de ternera a la parrilla con esp\u00e1rragos y batatas al horno.\n2. Opci\u00f3n 2: Pechuga de pollo al horno con br\u00f3coli y arroz integral.\n3. Opci\u00f3n 3: Salm\u00f3n al horno con esp\u00e1rragos y quinoa.",
  "desayuno": "1. Opci\u00f3n 1: Omelette de claras de huevo con espinacas y tomates cherry.\n2. Opci\u00f3n 2: Yogur griego bajo en grasa con frutas frescas y granola sin az\u00facar.\n3. Opci\u00f3n 3: Batido de prote\u00ednas con leche baja en grasa, pl\u00e1tano y mantequilla de almendras.",
  "media_manana": "1. Opci\u00f3n 1: Una porci\u00f3n de frutas frescas (por ejemplo, una manzana o una naranja).\n2. Opci\u00f3n 2: Un pu\u00f1ado de frutos secos (como almendras o nueces).\n3. Opci\u00f3n 3: Un yogur griego bajo en grasa con una cucharada de miel.",
  "media_tarde": "1. Opci\u00f3n 1: Un pu\u00f1ado de zanahorias baby con hummus.\n2. Opci\u00f3n 2: Palitos de apio con mantequilla de man\u00ed.\n3. Opci\u00f3n 3: Batido de prote\u00ednas con leche baja en grasa y frutas congeladas."
}


const DataForm = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [activityHours, setActivityHours] = useState("");
  const [physicalActivity, setPhysicalActivity] = useState("");
  const [objective, setObjective] = useState("");
  const [diseases, setDiseases] = useState("");
  const [restrictions, setRestrictions] = useState("");

  const [inputErrors, setInputErrors] = useState({
    name: false,
    age: false,
    weight: false,
    height: false,
    activityHours: false,
    physicalActivity: false,
    objective: false,
    diseases: false,
    restrictions: false,
  });

  const [openDialog, setOpenDialog] = useState(false);
  const [dialogInfo, setDialogInfo] = useState({ title: "", message: "" });

  const [diet, setDiet] = useState({
    almuerzo: "",
    antes_de_dormir: "",
    cena: "",
    desayuno: "",
    media_manana: "",
    media_tarde: "",
  });

  const userData = {
    name,
    age,
    weight,
    height,
    activityHours,
    physicalActivity,
    objective,
    diseases,
    restrictions,
  }


  // Convertir el JSON en un objeto con arrays de opciones
  function dividirOpciones(comida: keyof Menu): string[] {
    // Dividir la cadena de opciones usando el salto de línea como separador
    const opciones = menu[comida].split('\n');
    while (opciones.length >= 4) opciones.pop();
    // Filtrar las opciones válidas y eliminar los números de las opciones
    const opcionesFiltradas = opciones.filter(opcion => opcion.trim() !== '').map(opcion => opcion.replace(/^\d+\. /, ''));
    return opcionesFiltradas;
  }

  const validateInputsFilled = () => {
    let allFieldsFilled = true;

    Object.entries(userData).forEach(([key, value]) => {
      if (value === "") {
        setInputErrors(prevState => ({ ...prevState, [key]: true }));
        allFieldsFilled = false;
      }
    });

    return allFieldsFilled;
  };


  const handleGenereteDietClick = async () => {

    const areNoErrors = Object.values(inputErrors).every(value => value === false);
    const areInputsFilled = validateInputsFilled();

    if (!areInputsFilled) {
      setOpenDialog(true);
      setDialogInfo({ title: "Información incompleta", message: "Verifica que hayas llenado todos los campos previamente" });
      return
    }

    if (!areNoErrors) {
      setOpenDialog(true);
      setDialogInfo({ title: "Información incorrecta", message: "Algunos campos no son válidos, verifica antes de continuar" });
      return
    }

    try {
      console.log(`Se genero la peticion con:`);
      const url = "http://127.0.0.1:5000/api/nutrition/chatbot";
      /*       const postData = {
              name: "Hola mi nombre es Luis, actualmente peso 87 kg y mido 172 cm y deseo hacer una dieta para perder peso sin necesidad sin perder masa muscular. Actualmente por mis actividades y compromisos solo puedo realizar 3 horas de actividad física por semana  el tipo de actividad fisica que realizo es Boxeo y suelo correr algunos días, mi objetivo es tener salud y energía durante el día, No tengo enfermedades actualmente, restricciones alimentarias no tengo. Puedes ayudarme a dar un ejemplo de una dieta que necesito para lograr mi objetivo, por favor utiliza el siguiente formato: Desayuno, media mañana, almuerzo, media tarde, cena y antes de dormir con 3 opciones en cada comida por favor.",
              time: "Wed, 21 Oct 2015 18:27:50 GMT",
            }; */
      const postData = {
        name: `Hola mi nombre es ${userData.name}, actualmente peso ${userData.weight} kg y mido ${userData.height} cm y deseo hacer una dieta para ${userData.objective}. Actualmente por mis actividades y compromisos solo puedo realizar ${userData.activityHours} horas de actividad física por semana, el nivel de actividad física que mantengo es ${userData.physicalActivity}, mi objetivo es tener salud y energía durante el día, ${userData.diseases}, ${userData.restrictions}. Puedes ayudarme a dar un ejemplo de una dieta que necesito para lograr mi objetivo, por favor utiliza el siguiente formato: Desayuno, media mañana, almuerzo, media tarde, cena y antes de dormir con 3 opciones en cada comida por favor.`,
        time: "Wed, 21 Oct 2015 18:27:50 GMT",
      }
      console.log(postData.name);
      const result = await fetchDiet(url, postData);
      console.log("Se recibio resultado ");
      setDiet(result);
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
    }
  };


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, dispatch: React.Dispatch<React.SetStateAction<string>>) => {
    dispatch(event.target.value);
  };

  const isInputValid = (
    event: React.ChangeEvent<HTMLInputElement>, //InputEvent
    dispatch: React.Dispatch<React.SetStateAction<string>>, //React update function
    regex: RegExp, //Regular expression
    stateName: string  //State Name 
  ) => {
    if (!regex.test(event.target.value)) {
      setInputErrors((prevErrors) => ({ ...prevErrors, [stateName]: true }));
    } else {
      handleChange(event, dispatch);
      setInputErrors((prevErrors) => ({ ...prevErrors, [stateName]: false }));
    }
  };

  const isValueValid = (
    value: string | undefined, //Select value
    dispatch: React.Dispatch<React.SetStateAction<string>>, //React update function
    stateName: string //State Name
  ) => {
    setInputErrors((prevErrors) => ({ ...prevErrors, [stateName]: false }));
    if (value == undefined) {
      dispatch("")
    } else {
      dispatch(value);
    }
  }




  return (
    <section className="w-full max-w-6xl mx-auto flex flex-col items-center px-4 py-20">
      <div className="my-5 w-full mx-10">

        <div className="flex items-center justify-center">
          <Typography
            variant="h1"
            className="leading-[45px] mb-4 !text-gray-900 "
          >
            Formulario
          </Typography>
        </div>

        <form className="w-full mx-auto max-w-3xl">

          <Typography
            variant="h4"
            className="leading-[45px] mb-4 !text-gray-900 "
          >
            Nombre:
          </Typography>
          <Input variant="static" label="Nombre" placeholder="" onChange={e => isInputValid(e, setName, /^[a-zA-ZñÑÇçáéíóúÁÉÍÓÚüÜ ]{2,20}$/, "name")} crossOrigin={undefined} icon={<GrUser />} error={inputErrors.name} />

          <div className="w-full grid mt-3 grid-cols-1">
            <div className="w-auto mx-1 grid grid-cols-1 sm:grid-cols-2">
              <div className="w-full sm:max-w-60">
                <Typography
                  variant="h6"
                  className="leading-[45px] mb-4 !text-gray-900"
                >
                  Edad:
                </Typography>
                <Input variant="outlined" label="Edad" placeholder="" icon={<GiAges />} onChange={e => isInputValid(e, setAge, /^(100|[1-9]?[0-9])$/, "age")} error={inputErrors.age} crossOrigin={undefined} />
              </div>

              <div className="w-full sm:max-w-60">
                <Typography
                  variant="h6"
                  className="leading-[45px] mb-4 !text-gray-900 "
                >
                  Estatura (cm):
                </Typography>
                <Input variant="outlined" label="Estatura" placeholder="" icon={<GiPencilRuler />} onChange={e => isInputValid(e, setHeight, /^([1-9]\d{0,2}|0)$/, "height")} error={inputErrors.height} crossOrigin={undefined} />
              </div>
            </div>

            <div className="w-auto mx-1 grid grid-cols-1 sm:grid-cols-2">
              <div className="w-full sm:max-w-60">
                <Typography
                  variant="h6"
                  className="leading-[45px] mb-4 !text-gray-900 "
                >
                  Peso (kg):
                </Typography>
                <Input variant="outlined" label="Peso" placeholder="" icon={<GiWeight />} onChange={e => isInputValid(e, setWeight, /^([1-9]\d{0,2}|0)$/, "weight")} error={inputErrors.weight} crossOrigin={undefined} />
              </div>

              <div className="w-full sm:max-w-60">
                <Typography
                  variant="h6"
                  className="leading-[45px] mb-4 !text-gray-900 "
                >
                  Horas actividad física:
                </Typography>
                <Input variant="outlined" label="Horas actividad por semana" icon={<GiClockwork />} placeholder="" onChange={e => isInputValid(e, setActivityHours, /^(0?|1?\d|2[0-4])$/, "activityHours")} error={inputErrors.activityHours} crossOrigin={undefined} />
              </div>

            </div>
          </div>

          <div>
            <Typography
              variant="h6"
              className="leading-[45px] mb-0 !text-gray-900 mt-3"
            >
              Describe tu objetivo de la dieta:
            </Typography>
            <Select variant="static" onChange={e => isValueValid(e, setObjective, "objective")} name="objetivo" error={inputErrors.objective}>
              <Option value="perder peso">Perder peso</Option>
              <Option value="mantener peso">Mantener mi peso</Option>
              <Option value="ganar peso">Ganar peso</Option>
              <Option value="tonificar musculos">Tonificar músculos</Option>
              <Option value="mejorar salud general">Mejorar mi salud general</Option>
              <Option value="aumentar masa muscular">Aumentar masa muscular</Option>
              <Option value="controlar diabetes">Controlar la diabetes</Option>
              <Option value="mejorar rendimiento deportivo">Mejorar rendimiento deportivo</Option>
              {/* Agrega más opciones según sea necesario */}
            </Select>

          </div>

          <div>
            <Typography
              variant="h6"
              className="leading-[45px] mb-0 !text-gray-900 mt-3"
            >
              El nivel de actividad física que realizas:
            </Typography>
            <Select variant="static" onChange={e => isValueValid(e, setPhysicalActivity, "physicalActivity")} name="nivel_actividad_fisica" error={inputErrors.physicalActivity}>
              <Option value="sedentario">Sedentario (poco o ningún ejercicio)</Option>
              <Option value="ligero">Ligero (actividad ligera o caminar ligero)</Option>
              <Option value="moderado">Moderado (ejercicio moderado o deportes ligeros)</Option>
              <Option value="activo">Activo (actividad física regular o deportes intensos)</Option>
              <Option value="muy activo">Muy Activo (actividad física intensa o entrenamiento diario)</Option>
            </Select>
          </div>

          <div className="w-full grid grid-cols-1 md:grid-cols-2 md:gap-8">

            <div>
              <Typography
                variant="h6"
                className="leading-[45px] mb-0 !text-gray-900 mt-3"
              >
                ¿Tienes alguna enfermedad o padecimiento?:
              </Typography>
              <Select variant="static" onChange={e => isValueValid(e, setDiseases, "diseases")} name="enfermedad" error={inputErrors.diseases}>
                <Option value="No tengo ninguna enfermedad o padecimiento">Ninguna</Option>
                <Option value="Tengo diabetes">Diabetes</Option>
                <Option value="Tengo hipertensión">Hipertensión</Option>
                <Option value="Tengo colesterol alto">Colesterol alto</Option>
                <Option value="Tengo enfermedad cardíaca">Enfermedad cardíaca</Option>
                <Option value="Tengo alergias alimentarias">Alergias alimentarias</Option>
                {/* Agrega más opciones según sea necesario */}
              </Select>

            </div>

            <div>
              <Typography
                variant="h6"
                className="leading-[45px] mb-0 !text-gray-900 mt-3"
              >
                Restricciones alimenticias:
              </Typography>
              <Select variant="static" onChange={e => isValueValid(e, setRestrictions, "restrictions")} name="restricciones_alimentarias" error={inputErrors.restrictions}>
                <Option value="No tengo ninguna restricción alimentaria">Ninguna</Option>
                <Option value="No puedo comer gluten">Gluten</Option>
                <Option value="No puedo comer lácteos">Lácteos</Option>
                <Option value="No puedo comer frutos secos">Frutos secos</Option>
                <Option value="No puedo comer mariscos">Mariscos</Option>
                <Option value="No puedo comer carne">Carne</Option>
                {/* Agrega más opciones según sea necesario */}
              </Select>

            </div>
          </div>

        </form>
      </div>


      <Button
        color="gray"
        className="mb-3"
        size="sm"
        onClick={() => {
          handleGenereteDietClick();
        }}
      >
        <Typography variant="h5" className="text-center" color="white">
          Generar
        </Typography>
      </Button>

      <Dialog open={openDialog} handler={() => setOpenDialog(!openDialog)}>
        <DialogHeader>
          <Typography variant="h3" className="flex items-center justify-start gap-2 text-black">
            {dialogInfo.title}
          </Typography>
        </DialogHeader>
        <DialogBody>
          <Typography variant="h5" className="flex items-center justify-start gap-2 text-blue-gray-900">
            <IoWarningOutline className="w-10 h-10 text-amber-400" />
            {dialogInfo.message}
          </Typography>
        </DialogBody>
      </Dialog>



      <Typography variant="h3" className="text-center" color="blue-gray">
        Plan Alimenticio
      </Typography>
      <Typography
        variant="lead"
        className="mt-2 mb-8 w-full text-center font-normal !text-gray-500 max-w-4xl"
      >
        ¡Prepárate para descubrir las dietas recomendadas! Recuerda, la asesoría de un profesional de la salud es esencial antes de
        realizar cualquier cambio significativo en tu dieta.
      </Typography>

      <div>
        <div className="flex flex-col items-center justify-center gap-4">
          {Object.entries(diet).map(([title, content], index) => (
            <DesayunoCard
              key={title}
              title={title}
              content={dividirOpciones(title as keyof Menu)}
              colorBase={coloresBase[index]}
              colorSecundario={coloresSecundarios[index]}
            />
          ))}
        </div>
      </div>

      <div className="mt-10 gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <div className=" md:border-r px-3 border-blue-gray-100">
          <div className="!border-b  border-blue-gray-100 mb-5">
            <Card shadow={false} className="p-0">
              <CardBody className="p-0 pb-5">
                <Typography
                  variant="h3"
                  className="leading-[45px] mb-4 !text-gray-900 "
                >
                  Exploring the Role of Epigenetics in Inherited Traits
                </Typography>
                <Typography className="text-normal mb-4 !text-base text-blue-gray-500 ">
                  Investigate the emerging field of epigenetics and its impact
                  on understanding how environmental factors can influence gene
                  expression and inheritance.
                </Typography>
                <div className="flex items-center gap-3">
                  <div className="">
                    <Image
                      width={256}
                      height={256}
                      src="/image/avatar2.jpg"
                      className="w-12 object-cover h-12 rounded-lg"
                      alt="photo"
                    />
                  </div>
                  <div>
                    <Typography className="!font-bold !text-sm text-gray-900">
                      Mathew Glock
                    </Typography>
                    <Typography className="!font-normal !text-xs text-gray-500">
                      Author
                    </Typography>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
          <div className="!border-b md:border-none border-blue-gray-100 mb-5">
            <Card shadow={false} className="p-0">
              <CardBody className="p-0 pb-5">
                <Typography
                  variant="h3"
                  className="leading-[45px] mb-4 !text-gray-900 "
                >
                  How Gut Bacteria Affect Our Health and Well-being
                </Typography>
                <Typography className="text-normal mb-4 !text-base text-blue-gray-500 ">
                  Dive into the latest research on the human microbiome.
                </Typography>
                <div className="flex items-center gap-3">
                  <div className="">
                    <Image
                      width={256}
                      height={256}
                      src="/image/avatar1.jpg"
                      className="w-12 object-cover h-12 rounded-lg"
                      alt="photo"
                    />
                  </div>
                  <div>
                    <Typography className="!font-bold !text-sm text-gray-900">
                      Mathew Glock
                    </Typography>
                    <Typography className="!font-normal !text-xs text-gray-500">
                      Author
                    </Typography>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
        <div>
          <BlogCardWithImage />
        </div>
        <div className="md:border-l px-3 border-blue-gray-100">
          <div className="!border-b  border-blue-gray-100 mb-6">
            <Card shadow={false} className="p-0">
              <CardBody className="p-0 pb-5">
                <div className="w-full mb-4 h-[149px] ">
                  <Image
                    width={768}
                    height={768}
                    src="/image/blogs/blog-2.png"
                    className="w-10/12 md:w-full object-cover h-full rounded-lg"
                    alt=""
                  />
                </div>
                <Typography
                  variant="h3"
                  className="leading-[45px] mb-6 !text-gray-900"
                >
                  Biomimicry: Nature-Inspired Innovations
                </Typography>
                <Typography className="!font-bold !text-sm text-gray-700">
                  by Mathew Glock
                </Typography>
              </CardBody>
            </Card>
          </div>
          <div className="!border-b md:border-none border-blue-gray-100 mb-6">
            <Card shadow={false} className="p-0">
              <CardBody className="p-0 pb-5">
                <div className="w-full mb-4 h-[149px]">
                  <Image
                    width={768}
                    height={768}
                    src="/image/blogs/blog-3.png"
                    className="w-10/12 md:w-full object-cover h-full rounded-lg"
                    alt=""
                  />
                </div>
                <Typography
                  variant="h3"
                  className="leading-[45px] mb-6 !text-gray-900"
                >
                  Bringing Back Extinct Species
                </Typography>
                <Typography className="!font-bold !text-sm text-gray-700">
                  by Emma Roberts
                </Typography>
              </CardBody>
            </Card>
          </div>
        </div>
        <div className="col-span-1 grid grid-cols-2 md:grid-cols-1 md:border-l px-3 md:pr-36 border-blue-gray-100">
          {SIMPLE_CONTENT.map((props, idx) => (
            <div
              key={idx}
              className={`${SIMPLE_CONTENT.length - 1 !== idx
                ? "md:border-b"
                : "md:border-none"
                } border-blue-gray-100 mb-6 `}
            >
              <SimpleBlogCard key={idx} {...props} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export { DataForm };

