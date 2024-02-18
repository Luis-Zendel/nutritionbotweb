// components

// sections
import { Footer, Navbar } from "@/components";
import { DataForm } from ".";
import { ComingSoon } from "./ComingSoon";
import Hero from "./hero";

export default function Campaign() {
  return (
    <>
      <Navbar />
      <Hero />
      <DataForm />
      <ComingSoon />
      <Footer />
    </>
  );
}
