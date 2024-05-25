import Navbar from "@/components/navbar/navbar";
import Hero from "@/components/home/hero/hero";
import Solution from "@/components/home/quickSolution/solution";
import { HealthArea } from "@/components/home/healthArea";

export default function Home() {
  return (
    <>
        <Hero/>
        <Solution/>
        <HealthArea/>
    </>
  );
}
