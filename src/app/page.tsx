// components

// sections
import { Footer, Navbar } from "@/components";
import { Comments } from ".";
import { ComingSoon } from "./ComingSoon";
import SelectDiet from "./SelectDiet";
import { DietProvider } from "./context/usediet";
import DietList from "./dietList";
import Hero from "./hero";
import UserDietSection from "./UserDietSection";
import DataForm from "./DataForm";
export default function Campaign() {
  return (
    <>
      <Navbar />
      <Hero />
      <ComingSoon />
      <DietProvider>
        <UserDietSection />
        <DietList />
      </DietProvider>
      <Comments />
      <Footer />
    </>
  );
}
