// components
import { Footer, Navbar } from "@/components";

// sections
import { DataForm } from ".";
import Hero from "./hero";

export default function Campaign() {
  return (
    <>
      <Navbar />
      <Hero />
      <DataForm />
      <Footer />
    </>
  );
}
