"use client";

import { Button, Input, Typography } from "@material-tailwind/react";
import { GrFacebook, GrInstagram, GrTwitter } from "react-icons/gr";


export function Comments() {
  return (
    <section className="py-12 w-full max-w-6xl self-center mx-auto">
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
                label="Nombre:"
                placeholder=""
                crossOrigin={undefined}
              />
            </div>

            <div>
              <Input
                variant="static"
                label="Correo:"
                placeholder=""
                crossOrigin={undefined}
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
            ></textarea>
          </div>

          <div className="w-full flex items-center justify-center">
            <Button className="gap-3 max-w-max mt-3 mx-auto">
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
