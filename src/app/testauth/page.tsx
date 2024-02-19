"use client"
import { Footer, Navbar } from "@/components";
import { DataForm } from ".";
import Hero from "./hero";
import { useSession } from "next-auth/react";
export default function Campaign() {
  const {data: session}  = useSession()
  console.log(session)
  return (
    <>
      <Navbar />
      <Hero />
      <DataForm />
      <Footer />
    </>
  );
}
