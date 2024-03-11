"use client";

import { Button, Input, Typography } from "@material-tailwind/react";
import { GrFacebook, GrInstagram, GrTwitter } from "react-icons/gr";
import { useSession } from "next-auth/react";
import { useState } from "react";


const fetchComment= async (dataPost: any) => {
  const URL = 'https://chatbotapi-n32d.onrender.com/api/save/comment' //simula el comprtamiento de la API
  
  try {
      
      const response = await fetch(URL, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              // Puedes agregar otros encabezados según sea necesario
          },
          body: JSON.stringify(dataPost),
      });
      const result = await response.json()
      if (response.ok) {
        alert("Se almaceno correctamente ");
    }else{
      alert("Hubo problemas para almacenar su comentario intente más tarde ")
    }
      console.log("Consulta lista de dietas")
      console.log(result?.data)
      console.log("new")
      return result?.data


      //const result = await response.json();

      //return result; //debería retornar esto

      

  } catch (error) {
      console.error('Error en la solicitud');
  }
}

export function Comments() {
  const { data: session } = useSession();
  const [title, setTitle] = useState("")
  const [comment, setComment] = useState("")

  const handleClickEnviar = () => {
    if(session?.user?.email){
      const data = {
        email: session?.user?.email,
        title: title, 
        comment: comment
      }
      fetchComment(data)
      
    }else{
      alert("Es necesario iniciar sesión")
    }

  }
  const handleChangeTitle = (value: string) => {
    setTitle(value)
  }
  const handleChangeComment = (value: string) => {
    setComment(value)
  } 

  return (
    <section className="w-full max-w-6xl self-center mx-auto mt-14">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex flex-col w-full mb-10">
          <Typography variant="lead" className="text-gray-600 font-medium mb-2">
            Contáctanos
          </Typography>
          <Typography variant="h3" className="mb-5">
            ¿Tienes dudas o aclaraciones?
          </Typography>
          <Typography variant="paragraph" >
            Ponte en contácto con nosotros, envía tu comentario por este medio.
          </Typography>
          <div className="gap-8 flex mx-auto mt-5">
            <div className="rounded hover:bg-gray-200 transition-all">
              <GrFacebook className="text-black w-8 h-8 fill-black transition-all m-1" />
            </div>

            <div className="rounded hover:bg-gray-200 transition-all">
              <GrInstagram className="text-black w-8 h-8 fill-black transition-all m-1" />

            </div>

            <div className="rounded hover:bg-gray-200 transition-all">
              <GrTwitter className="text-black w-8 h-8 fill-black transition-all m-1" />
            </div>

          </div>

        </div>

        <form action="" method="">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <Input
                variant="static"
                label="Titulo:"
                placeholder=""
                crossOrigin={undefined}
                onChange={(e)=>{handleChangeTitle(e.target.value)}}
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block mb-2 text-blue-gray-600">
              Mensaje:
            </label>
            <textarea
              id="mensaje"
              name="mensaje"
              className="w-full border border-blue-gray-200 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-black h-36 transition-all"
              placeholder="Ingresa tu comentario o sugerencía aqui. "
              style={{
                resize: 'none',
              }}
              onChange={(e)=>{handleChangeComment(e.target.value)}}
            ></textarea>
          </div>

          <div className="w-full flex items-center justify-center">
            <Button onClick={()=>{handleClickEnviar()}} className="gap-3 max-w-max mt-3 mx-auto">
              <Typography variant='small' className='max-w-max' >
                Enviar comentario
              </Typography>
            </Button>
          </div>

        </form>

      </div>
    </section>
  );
}
export default Comments;
