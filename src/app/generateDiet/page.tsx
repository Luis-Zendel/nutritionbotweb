// components

// sections
import { Footer, Navbar } from "@/components";
import { Comments } from "..";
import { ComingSoon } from "../ComingSoon";
import SelectDiet from "../SelectDiet";
import { DietProvider } from "../context/usediet";
import DietList from "../dietList";
import UserDietSection from "../UserDietSection";
import DataForm from "../DataForm";
import Hero from "../hero";
export default function Campaign() {
  return (
    <>
      <Navbar notHomePage={true}/>
      <div className="mt-20"></div>
      <DietProvider>
        <UserDietSection />
        <DietList />
      </DietProvider>
      <Comments />
      <Footer />
    </>
  );
}
