"use client";

import {
  ChatBubbleOvalLeftEllipsisIcon,
  PlayCircleIcon,
} from "@heroicons/react/24/solid";
import { Button, Card, CardBody, Input, Typography } from "@material-tailwind/react";
import Image from "next/image";
import { useState } from "react";

import BlogCardWithImage from "@/components/blog-card-with-image";
import SimpleBlogCard from "@/components/simple-blog-card";
import { FiTarget } from "react-icons/fi";
import { GiAges, GiHealthNormal, GiPencilRuler, GiSprint, GiWeight } from "react-icons/gi";
import { GrUser } from "react-icons/gr";
import { MdNoFood } from "react-icons/md";
import { TiTime } from "react-icons/ti";

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
const fetchDiet = async (url: string, data: any): Promise<any> => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Puedes agregar otros encabezados según sea necesario
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("No se genero respuesta ");
    }
    return await response.json();
  } catch (error) {
    console.error("Error al realizar la solicitud:", error);
    throw error;
  }
};

const DataForm = () => {
  const [name, setName] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [activityHours, setActivityHours] = useState("");
  const [pishycalActivity, setPhysicalActivity] = useState("");
  const [objective, setObjective] = useState("");
  const [diseases, setDiseases] = useState("");
  const [restrictions, setRestrictions] = useState("");

  const userData = {
    name,
    weight,
    height,
    activityHours,
    pishycalActivity,
    objective,
    diseases,
    restrictions,
  }


  const [diet, setDiet] = useState({
    almuerzo: "",
    antes_de_dormir: "",
    cena: "",
    desayuno: "",
    media_manana: "",
    media_tarde: "",
  });

  const handleGenereteDietClick = async () => {
    try {
      console.log('Se genero la peticion')
      const url = "http://127.0.0.1:5000/api/nutrition/chatbot";
      const postData = {
        name: "Hola mi nombre es Luis, actualmente peso 87 kg y mido 172 cm y deseo hacer una dieta para perder peso sin necesidad sin perder masa muscular. Actualmente por mis actividades y compromisos solo puedo realizar 3 horas de actividad física por semana  el tipo de actividad fisica que realizo es Boxeo y suelo correr algunos días, mi objetivo es tener salud y energía durante el día, No tengo enfermedades actualmente, restricciones alimentarias no tengo. Puedes ayudarme a dar un ejemplo de una dieta que necesito para lograr mi objetivo, por favor utiliza el siguiente formato: Desayuno, media mañana, almuerzo, media tarde, cena y antes de dormir con 3 opciones en cada comida por favor.  ",
        time: "Wed, 21 Oct 2015 18:27:50 GMT",
      };
      const result = await fetchDiet(url, postData);
      console.log("Se recibio resultado ");
      setDiet(result);
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
    }
  };

  const handleChangeName = (name: string) => {
    setName(name)
  }

  const handleChangeweight = (weight: string) => {
    setWeight(weight)
  }

  const handleChangeHeight = (height: string) => {
    setHeight(height);
  }

  const handleChangeActivityHours = (hours: string) => {
    setActivityHours(hours);
  }

  const handleChangePhysicalActivity = (activity: string) => {
    setPhysicalActivity(activity);
  }

  const handleChangeObjective = (objective: string) => {
    setObjective(objective);
  }

  const handleChangeDiseases = (diseases: string) => {
    setDiseases(diseases);
  }

  const handleChangeRestrictions = (restrictions: string) => {
    setRestrictions(restrictions);
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
          <Input variant="static" label="Static" placeholder="Nombre" onChange={(e) => { handleChangeName(e.target.value); }} crossOrigin={undefined} icon={<GrUser />} />

          <div className="w-full grid mt-3 grid-cols-1">
            <div className="w-auto mx-1 grid grid-cols-1 sm:grid-cols-2">
              <div className="w-full sm:max-w-60">
                <Typography
                  variant="h6"
                  className="leading-[45px] mb-4 !text-gray-900"
                >
                  Edad:
                </Typography>
                <Input variant="outlined" label="Edad" placeholder="" icon={<GiAges />} />
              </div>

              <div className="w-full sm:max-w-60">
                <Typography
                  variant="h6"
                  className="leading-[45px] mb-4 !text-gray-900 "
                >
                  Estatura:
                </Typography>
                <Input variant="outlined" label="Estatura" placeholder="" icon={<GiPencilRuler />} />
              </div>
            </div>

            <div className="w-auto mx-1 grid grid-cols-1 sm:grid-cols-2">
              <div className="w-full sm:max-w-60">
                <Typography
                  variant="h6"
                  className="leading-[45px] mb-4 !text-gray-900 "
                >
                  Peso:
                </Typography>
                <Input variant="outlined" label="Peso" placeholder="" className="" icon={<GiWeight />} />
              </div>

              <div className="w-full sm:max-w-60">
                <Typography
                  variant="h6"
                  className="leading-[45px] mb-4 !text-gray-900 "
                >
                  Horas actividad física:
                </Typography>
                <Input variant="outlined" label="Horas actividad por semana" placeholder="" icon={<TiTime />} />
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
            <Input variant="static" label="" placeholder="Objetivo de la dieta" icon={<FiTarget />} />
          </div>

          <div>
            <Typography
              variant="h6"
              className="leading-[45px] mb-0 !text-gray-900 mt-3"
            >
              Anota la actividad física que realizas:
            </Typography>
            <Input variant="static" label="" placeholder="Actividad física realizada" icon={<GiSprint />} />
          </div>

          <div className="w-full grid grid-cols-1 md:grid-cols-2 md:gap-8">

            <div>
              <Typography
                variant="h6"
                className="leading-[45px] mb-0 !text-gray-900 mt-3"
              >
                ¿Tienes alguna enfermedad o padecimiento?:
              </Typography>
              <Input variant="static" label="" placeholder="Describe tu condición" icon={<GiHealthNormal />} />
            </div>

            <div>
              <Typography
                variant="h6"
                className="leading-[45px] mb-0 !text-gray-900 mt-3"
              >
                Restricciones alimenticias:
              </Typography>
              <Input variant="static" label="" placeholder="Describe brevemente" icon={<MdNoFood />} />
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
      <Typography variant="h3" className="text-center" color="blue-gray">
        Plan Alimenticio
      </Typography>
      <Typography
        variant="lead"
        className="mt-2 mb-8 w-full text-center font-normal !text-gray-500 max-w-4xl"
      >
        Stay at the forefront of the latest developments in the world of
        biology, as our team of expert writers and researchers bring you fresh
        insights, groundbreaking discoveries, and captivating stories from the
        ever-evolving realm of biological sciences.
      </Typography>
      <div>
        <Card shadow={false} className="p-0">
          <CardBody className="p-0 pb-5">
            <Typography
              variant="h3"
              className="leading-[45px] mb-4 !text-gray-900 "
            >
              Desayuno
            </Typography>
            <Typography className="text-normal mb-4 !text-base text-blue-gray-500 ">
              {diet.desayuno}
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
        <Card shadow={false} className="p-0">
          <CardBody className="p-0 pb-5">
            <Typography
              variant="h3"
              className="leading-[45px] mb-4 !text-gray-900 "
            >
              Desayuno
            </Typography>
            <Typography className="text-normal mb-4 !text-base text-blue-gray-500 ">
              Investigate the emerging field of epigenetics and its impact on
              understanding how environmental factors can influence gene
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
        <Card shadow={false} className="p-0">
          <CardBody className="p-0 pb-5">
            <Typography
              variant="h3"
              className="leading-[45px] mb-4 !text-gray-900 "
            >
              Desayuno
            </Typography>
            <Typography className="text-normal mb-4 !text-base text-blue-gray-500 ">
              Investigate the emerging field of epigenetics and its impact on
              understanding how environmental factors can influence gene
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
        <Card shadow={false} className="p-0">
          <CardBody className="p-0 pb-5">
            <Typography
              variant="h3"
              className="leading-[45px] mb-4 !text-gray-900 "
            >
              Desayuno
            </Typography>
            <Typography className="text-normal mb-4 !text-base text-blue-gray-500 ">
              Investigate the emerging field of epigenetics and its impact on
              understanding how environmental factors can influence gene
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
        <Card shadow={false} className="p-0">
          <CardBody className="p-0 pb-5">
            <Typography
              variant="h3"
              className="leading-[45px] mb-4 !text-gray-900 "
            >
              Desayuno
            </Typography>
            <Typography className="text-normal mb-4 !text-base text-blue-gray-500 ">
              Investigate the emerging field of epigenetics and its impact on
              understanding how environmental factors can influence gene
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

