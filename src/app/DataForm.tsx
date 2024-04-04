"use client";

import {
  Button,
  Checkbox,
  Input,
  Menu,
  Option,
  Select,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { GiAges, GiClockwork, GiPencilRuler, GiWeight } from "react-icons/gi";
import { GrUser } from "react-icons/gr";

import { fetchDiet, fetchSaveDietPost } from "./api/api";
import { useDietContext } from "./context/usediet";
import DialogInfo from "./dialogInfo";
import { API_URL } from "../../apiurl";
import { UserData } from "next-auth/providers/42-school";
interface Menu {
  desayuno: string;
  media_manana: string;
  almuerzo: string;
  media_tarde: string;
  cena: string;
  antes_de_dormir: string;
}

const menu: Menu = {
  almuerzo:
    "1. Opci\u00f3n 1: Pechuga de pollo a la plancha con ensalada de espinacas, tomates, pepinos y aderezo de vinagreta ligera.\n2. Opci\u00f3n 2: Salm\u00f3n a la parrilla con esp\u00e1rragos al vapor y quinoa.\n3. Opci\u00f3n 3: Ensalada de at\u00fan con lechuga, tomates, aguacate y aderezo bajo en grasa.",
  antes_de_dormir:
    "1. Opci\u00f3n 1: Un pu\u00f1ado de almendras.\n2. Opci\u00f3n 2: Un yogur griego bajo en grasa.\n3. Opci\u00f3n 3: Una porci\u00f3n de queso cottage bajo en grasa.\n\nRecuerda que es importante mantenerse hidratado durante todo el d\u00eda, as\u00ed que no olvides beber suficiente agua. Adem\u00e1s, consulta con un profesional de la salud antes de comenzar cualquier dieta o programa de ejercicio para asegurarte de que sea adecuado para ti.",
  cena: "1. Opci\u00f3n 1: Filete de ternera a la parrilla con esp\u00e1rragos y batatas al horno.\n2. Opci\u00f3n 2: Pechuga de pollo al horno con br\u00f3coli y arroz integral.\n3. Opci\u00f3n 3: Salm\u00f3n al horno con esp\u00e1rragos y quinoa.",
  desayuno:
    "1. Opci\u00f3n 1: Omelette de claras de huevo con espinacas y tomates cherry.\n2. Opci\u00f3n 2: Yogur griego bajo en grasa con frutas frescas y granola sin az\u00facar.\n3. Opci\u00f3n 3: Batido de prote\u00ednas con leche baja en grasa, pl\u00e1tano y mantequilla de almendras.",
  media_manana:
    "1. Opci\u00f3n 1: Una porci\u00f3n de frutas frescas (por ejemplo, una manzana o una naranja).\n2. Opci\u00f3n 2: Un pu\u00f1ado de frutos secos (como almendras o nueces).\n3. Opci\u00f3n 3: Un yogur griego bajo en grasa con una cucharada de miel.",
  media_tarde:
    "1. Opci\u00f3n 1: Un pu\u00f1ado de zanahorias baby con hummus.\n2. Opci\u00f3n 2: Palitos de apio con mantequilla de man\u00ed.\n3. Opci\u00f3n 3: Batido de prote\u00ednas con leche baja en grasa y frutas congeladas.",
};

const DataForm = () => {
  const { data: session } = useSession();
  const [activityCheck, setActivityCheck] = useState(false);
  const [dietName, setDietName] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [activityHours, setActivityHours] = useState("");
  const [physicalActivity, setPhysicalActivity] = useState("");
  const [objective, setObjective] = useState("");
  const [objectiveOther, setObjectiveOther] = useState("");
  const [medicines, setMedicines] = useState(false);
  const [disiaseCount, setdisiaseCount] = useState(0);
  const [medicinesValue, setMedicinesValue] = useState("");
  const [diseases, setDiseases] = useState("");
  const [restrictions, setRestrictions] = useState("");
  const [loading, setLoading] = useState(false);
  const [promptData, setPrompt] = useState("");
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

  const { diet, setDiet } = useDietContext();

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
  };

  const validateInputsFilled = () => {
    let allFieldsFilled = true;

    Object.entries(userData).forEach(([key, value]) => {
      if (value === "") {
        setInputErrors((prevState) => ({ ...prevState, [key]: true }));
        allFieldsFilled = false;
      }
    });

    return allFieldsFilled;
  };

  const handleGenereteDietClick = async () => {
    const areNoErrors = Object.values(inputErrors).every(
      (value) => value === false
    );
    const areInputsFilled = validateInputsFilled();
    setLoading(true);

    if (!areInputsFilled) {
      setOpenDialog(true);
      setDialogInfo({
        title: "Información incompleta",
        message: "Verifica que hayas llenado todos los campos previamente",
      });
      return;
    }

    if (!areNoErrors) {
      setOpenDialog(true);
      setDialogInfo({
        title: "Información incorrecta",
        message: "Algunos campos no son válidos, verifica antes de continuar",
      });
      return;
    }

    try {
      console.log(`Se genero la peticion con:`);
      const url = "https://chatbotapi-n32d.onrender.com/api/generate/diet";

      /*       41const postData = {
              name: "Hola mi nombre es Luis, actualmente peso 87 kg y mido 172 cm y deseo hacer una dieta para perder peso sin necesidad sin perder masa muscular. Actualmente por mis actividades y compromisos solo puedo realizar 3 horas de actividad física por semana  el tipo de actividad fisica que realizo es Boxeo y suelo correr algunos días, mi objetivo es tener salud y energía durante el día, No tengo enfermedades actualmente, restricciones alimentarias no tengo. Puedes ayudarme a dar un ejemplo de una dieta que necesito para lograr mi objetivo, por favor utiliza el siguiente formato: Desayuno, media mañana, almuerzo, media tarde, cena y antes de dormir con 3 opciones en cada comida por favor.",
              time: "Wed, 21 Oct 2015 18:27:50 GMT",
            }; */
      const promptText = `Hola mi nombre es ${userData.name}, actualmente peso ${userData.weight} kg y mido ${userData.height} cm y deseo hacer una dieta para ${userData.objective}. Actualmente por mis actividades y compromisos solo puedo realizar ${userData.activityHours} horas de actividad física por semana, el nivel de actividad física que mantengo es ${userData.physicalActivity}, mi objetivo es tener salud y energía durante el día, ${userData.diseases}, ${userData.restrictions}. Puedes ayudarme a dar un ejemplo de una dieta que necesito para lograr mi objetivo, por favor utiliza el siguiente formato: Desayuno, media mañana, almuerzo, media tarde, cena y antes de dormir con 3 opciones en cada comida por favor. Toma el rol de un nutriologo con 20 años de experiencía para poder generar un plan.`;
      setPrompt(promptText);
      const postData = {
        name: "",
        email: session?.user?.email!,
        prompt: promptText,
        time: "Wed, 21 Oct 2015 18:27:50 GMT",
      };

      console.log(postData);

      //******************************************************
      //Valor quemado hasta que se tenga la API
      console.log(diet);

      const result = await fetchDiet(url, postData);

      if (result.success) {
        console.log("Se recibio resultado ");
        console.log(result.data.data);
        setDiet(result.data.data);
        setLoading(false);
      } else {
        setOpenDialog(true);
        setDialogInfo({
          title: "¡Has generado muchas dietas!",
          message:
            "Has alcanzado el límite de peticiones para la generación de dietas. Intenta de nuevo más tarde.",
        });
      }
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    dispatch: React.Dispatch<React.SetStateAction<string>>
  ) => {
    dispatch(event.target.value);
  };

  const isInputValid = (
    event: React.ChangeEvent<HTMLInputElement>, //InputEvent
    dispatch: React.Dispatch<React.SetStateAction<string>>, //React update function
    regex: RegExp, //Regular expression
    stateName: string //State Name
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
      dispatch("");
    } else {
      dispatch(value);
    }
  };

  const handleClickGuardar = async () => {
    try {
      const url =
        "https://chatbotapi-n32d.onrender.com/api/post/save/diet/user";
      const document = {
        name: dietName,
        prompt: promptData,
        email: session?.user?.email!,
        diet: diet,
      };

      const result = await fetchSaveDietPost(url, document);

      if (result.success) {
        setOpenDialog(true);
        setDialogInfo({
          title: "Dieta Guardad Exitosamente",
          message: "Ha logrado alamacenar una dieta más",
        });
      }
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
    }
  };

  return (
    <section className="w-full max-w-6xl mx-auto flex flex-col items-center px-4 pt-20 pb-5">
      {session?.user ? (
        <>
          <div className="my-5 w-full mx-10">
            <div className="flex items-center justify-center">
              <Typography
                variant="h1"
                className="leading-[45px] mb-4 !text-gray-900 "
              >
                Formulario
              </Typography>
            </div>
            <div className="flex items-center justify-center">
              <Typography
                variant="h6"
                className="leading-[45px] mb-4 !text-gray-900 "
              >
                Lllena el siguiente formulario con tu información personal para
                generar un dieta perzonalizada.
              </Typography>
            </div>

            <form className="w-full mx-auto max-w-3xl">
              <Typography
                variant="h4"
                className="leading-[45px] mb-4 !text-gray-900 "
              >
                Nombre:
              </Typography>
              <Input
                variant="static"
                label="Nombre"
                placeholder=""
                onChange={(e) =>
                  isInputValid(
                    e,
                    setName,
                    /^[a-zA-ZñÑÇçáéíóúÁÉÍÓÚüÜ ]{2,20}$/,
                    "name"
                  )
                }
                crossOrigin={undefined}
                icon={<GrUser />}
                error={inputErrors.name}
              />

              <div className="w-full grid mt-3 grid-cols-1">
                <div className="w-auto mx-1 grid grid-cols-1 sm:grid-cols-2">
                  <div className="w-full sm:max-w-60">
                    <Typography
                      variant="h6"
                      className="leading-[45px] mb-4 !text-gray-900"
                    >
                      Edad:
                    </Typography>
                    <Input
                      variant="outlined"
                      label="Edad"
                      placeholder=""
                      icon={<GiAges />}
                      onChange={(e) =>
                        isInputValid(e, setAge, /^(100|[1-9]?[0-9])$/, "age")
                      }
                      error={inputErrors.age}
                      crossOrigin={undefined}
                    />
                  </div>

                  <div className="w-full sm:max-w-60">
                    <Typography
                      variant="h6"
                      className="leading-[45px] mb-4 !text-gray-900 "
                    >
                      Estatura (cm):
                    </Typography>
                    <Input
                      variant="outlined"
                      label="Estatura"
                      placeholder=""
                      icon={<GiPencilRuler />}
                      onChange={(e) =>
                        isInputValid(
                          e,
                          setHeight,
                          /^([1-9]\d{0,2}|0)$/,
                          "height"
                        )
                      }
                      error={inputErrors.height}
                      crossOrigin={undefined}
                    />
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
                    <Input
                      variant="outlined"
                      label="Peso"
                      placeholder=""
                      icon={<GiWeight />}
                      onChange={(e) =>
                        isInputValid(
                          e,
                          setWeight,
                          /^([1-9]\d{0,2}|0)$/,
                          "weight"
                        )
                      }
                      error={inputErrors.weight}
                      crossOrigin={undefined}
                    />
                  </div>

                  <div className="w-full sm:max-w-60">
                    <Typography
                      variant="h6"
                      className="leading-[45px] mb-4 !text-gray-900 "
                    >
                      Horas actividad física:
                    </Typography>
                    <Input
                      variant="outlined"
                      label="Horas actividad por semana"
                      icon={<GiClockwork />}
                      placeholder=""
                      onChange={(e) =>
                        isInputValid(
                          e,
                          setActivityHours,
                          /^(0?|1?\d|2[0-4])$/,
                          "activityHours"
                        )
                      }
                      error={inputErrors.activityHours}
                      crossOrigin={undefined}
                    />
                  </div>
                </div>
              </div>
              <div>
                <Typography
                  variant="h6"
                  className="leading-[45px] mb-0 !text-gray-900 mt-3"
                >
                  El nivel de actividad física que realizas:
                </Typography>
                <Select
                  variant="static"
                  onChange={(e) =>
                    isValueValid(e, setPhysicalActivity, "physicalActivity")
                  }
                  name="nivel_actividad_fisica"
                  error={inputErrors.physicalActivity}
                >
                  <Option value="sedentario">
                    Sedentario (poco o ningún ejercicio)
                  </Option>
                  <Option value="ligero">
                    Ligero (actividad ligera o caminar ligero)
                  </Option>
                  <Option value="moderado">
                    Moderado (ejercicio moderado o deportes ligeros)
                  </Option>
                  <Option value="activo">
                    Activo (actividad física regular o deportes intensos)
                  </Option>
                  <Option value="muy activo">
                    Muy Activo (actividad física intensa o entrenamiento diario)
                  </Option>
                </Select>
              </div>

              <div className="w-full">
                <Typography
                  variant="h6"
                  className="leading-[45px] mb-0 !text-gray-900 mt-3"
                >
                  Añadir descripción de actividad fisica
                </Typography>
                <Checkbox
                  crossOrigin={undefined}
                  onChange={() => {
                    setActivityCheck(!activityCheck);
                  }}
                  label="Ingresa información "
                />
              </div>
              {activityCheck ? (
                <div>
                  <Typography
                    variant="h6"
                    className="leading-[45px] mb-0 !text-gray-900 mt-3"
                  >
                    Describe tu actividad fisica:
                  </Typography>
                  <Textarea
                    onChange={(e) =>
                      isValueValid(
                        e.target.value,
                        setObjectiveOther,
                        "objectiveOther"
                      )
                    }
                  />
                </div>
              ) : (
                <></>
              )}
              <div>
                <Typography
                  variant="h6"
                  className="leading-[45px] mb-0 !text-gray-900 mt-3"
                >
                  Describe tu objetivo de la dieta:
                </Typography>
                <Select
                  variant="static"
                  onChange={(e) => isValueValid(e, setObjective, "objective")}
                  name="objetivo"
                  error={inputErrors.objective}
                >
                  <Option value="perder peso">Perder peso</Option>
                  <Option value="mantener peso">Mantener mi peso</Option>
                  <Option value="ganar peso">Ganar peso</Option>
                  <Option value="tonificar musculos">Tonificar músculos</Option>
                  <Option value="mejorar salud general">
                    Mejorar mi salud general
                  </Option>
                  <Option value="aumentar masa muscular">
                    Aumentar masa muscular
                  </Option>
                  <Option value="controlar diabetes">
                    Controlar la diabetes
                  </Option>
                  <Option value="mejorar rendimiento deportivo">
                    Mejorar rendimiento deportivo
                  </Option>
                  <Option value="otra">Otra</Option>
                  {/* Agrega más opciones según sea necesario */}
                </Select>
              </div>
              {objective == "otra" ? (
                <div>
                  <Typography
                    variant="h6"
                    className="leading-[45px] mb-0 !text-gray-900 mt-3"
                  >
                    Describe tu objetivo de la dieta:
                  </Typography>
                  <Textarea
                    onChange={(e) =>
                      isValueValid(
                        e.target.value,
                        setObjectiveOther,
                        "objectiveOther"
                      )
                    }
                  />
                </div>
              ) : (
                <></>
              )}

              <div className="w-full grid grid-cols-1 md:grid-cols-2 md:gap-8">
                <div>
                  <Typography
                    variant="h6"
                    className="leading-[45px] mb-0 !text-gray-900 mt-3"
                  >
                    ¿Tienes alguna enfermedad o padecimiento?:
                  </Typography>
                  <Select
                    variant="static"
                    onChange={(e) => isValueValid(e, setDiseases, "diseases")}
                    name="enfermedad"
                    error={inputErrors.diseases}
                  >
                    <Option value="No tengo ninguna enfermedad o padecimiento">
                      Ninguna
                    </Option>
                    <Option value="Tengo diabetes">Diabetes</Option>
                    <Option value="Tengo hipertensión">Hipertensión</Option>
                    <Option value="Tengo colesterol alto">
                      Colesterol alto
                    </Option>
                    <Option value="Tengo enfermedad cardíaca">
                      Enfermedad cardíaca
                    </Option>
                    <Option value="Tengo alergias alimentarias">
                      Alergias alimentarias
                    </Option>
                    <Option value="Otra">Otra</Option>
                    {/* Agrega más opciones según sea necesario */}
                  </Select>
                </div>
                <div className="flex items-center content-center">
                  <Button
                    onClick={() => {
                      setdisiaseCount(disiaseCount + 1);
                    }}
                  >
                    +
                  </Button>
                  <Button
                    onClick={() => {
                      if (disiaseCount > 0) {
                        setdisiaseCount(disiaseCount - 1);
                      }
                    }}
                    className="mx-2"
                  >
                    -
                  </Button>
                </div>
                {Array.from({ length: disiaseCount }, (_, index) => (
                  <div key={index}>
                    <Typography
                      variant="h6"
                      className="leading-[45px] mb-0 !text-gray-900 mt-3"
                    >
                      Añade padecimiento:
                    </Typography>
                    <Select
                      variant="static"
                      onChange={(e) => isValueValid(e, setDiseases, "diseases")}
                      name="enfermedad"
                      error={inputErrors.diseases}
                    >
                      <Option value="No tengo ninguna enfermedad o padecimiento">
                        Ninguna
                      </Option>
                      <Option value="Tengo diabetes">Diabetes</Option>
                      <Option value="Tengo hipertensión">Hipertensión</Option>
                      <Option value="Tengo colesterol alto">
                        Colesterol alto
                      </Option>
                      <Option value="Tengo enfermedad cardíaca">
                        Enfermedad cardíaca
                      </Option>
                      
                      {/* Agrega más opciones según sea necesario */}
                    </Select>
                  </div>
                ))}
                {}
              </div>
              <div className="w-full">
                <Typography
                  variant="h6"
                  className="leading-[45px] mb-0 !text-gray-900 mt-3"
                >
                  Consumo de medicamentos
                </Typography>
                <Checkbox
                  crossOrigin={undefined}
                  onChange={() => {
                    setMedicines(!medicines);
                  }}
                  label="Ingresa información "
                />
              </div>
              {medicines ? (
                <div>
                  <Typography
                    variant="h6"
                    className="leading-[45px] mb-0 !text-gray-900 mt-3"
                  >
                    Describe tu objetivo de la dieta:
                  </Typography>
                  <Textarea
                    onChange={(e) =>
                      isValueValid(
                        e.target.value,
                        setMedicinesValue,
                        "medicinesValue"
                      )
                    }
                  />
                </div>
              ) : (
                <></>
              )}

              <div>
                <Typography
                  variant="h6"
                  className="leading-[45px] mb-0 !text-gray-900 mt-3"
                >
                  Restricciones alimenticias:
                </Typography>
                <Select
                  variant="static"
                  onChange={(e) =>
                    isValueValid(e, setRestrictions, "restrictions")
                  }
                  name="restricciones_alimentarias"
                  error={inputErrors.restrictions}
                >
                  <Option value="No tengo ninguna restricción alimentaria">
                    Ninguna
                  </Option>
                  <Option value="No puedo comer gluten">Gluten</Option>
                  <Option value="No puedo comer lácteos">Lácteos</Option>
                  <Option value="No puedo comer frutos secos">
                    Frutos secos
                  </Option>
                  <Option value="No puedo comer mariscos">Mariscos</Option>
                  <Option value="No puedo comer carne">Carne</Option>
                  {/* Agrega más opciones según sea necesario */}
                </Select>
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
          {loading ? (
            <>
              <Typography variant="h5" className="text-center" color="blue">
                Su plan alimenticio esta generandoce por favor espere, esto
                puede tardar unos minutos
              </Typography>
            </>
          ) : (
            <>
              {promptData ? (
                <>
                  <Typography
                    variant="h5"
                    className="text-center"
                    color="green"
                  >
                    Si desea almacenar su plan alimenticio generado para
                    consultarlo más tarde por favor
                  </Typography>
                  <div className="flex mt-10 p-10 w-full items-center content-center">
                    <Input
                      className=" mx-auto "
                      variant="static"
                      label="Nombre Plan Alimenticio"
                      placeholder=""
                      onChange={(e) =>
                        isInputValid(
                          e,
                          setDietName,
                          /^[a-zA-ZñÑÇçáéíóúÁÉÍÓÚüÜ ]{2,20}$/,
                          "name"
                        )
                      }
                      crossOrigin={undefined}
                      error={inputErrors.name}
                    />
                    <Button
                      color="gray"
                      className="mb-3"
                      size="sm"
                      onClick={() => {
                        handleClickGuardar();
                      }}
                    >
                      Guardar
                    </Button>
                  </div>
                </>
              ) : (
                <></>
              )}
            </>
          )}

          {diet.almuerzo != "" ? (
            <Typography variant="h3" className="text-center" color="blue-gray">
              Plan Alimenticio
            </Typography>
          ) : (
            <></>
          )}

          <DialogInfo
            dialogInfo={dialogInfo}
            openDialog={openDialog}
            setOpenDialog={setOpenDialog}
          />
        </>
      ) : (
        <></>
      )}
    </section>
  );
};

export default DataForm;
