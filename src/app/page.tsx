// components

// sections
import { Footer, Navbar } from "@/components";
import { Comments, DataForm } from ".";
import { ComingSoon } from "./ComingSoon";
import SelectDiet from "./SelectDiet";
import { DietProvider } from "./context/usediet";
import DietList from "./dietList";
import Hero from "./hero";

export default function Campaign() {
  return (
    <>
      <Navbar />
      <Hero />
      <ComingSoon />
      <DietProvider>
        <DataForm />
        <SelectDiet />
        <DietList />
      </DietProvider>
      <Comments />
      <Footer />
    </>
  );
}
