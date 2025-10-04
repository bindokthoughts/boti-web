import Image from "next/image"
import monogram from "../../assets/Logo_Monogram.svg";

export default function Section5() {
  return (
    <section id="section_5" className="h-screen relative flex items-center justify-center bg-gradient-to-b from-black to-gray-900 text-gray-200">
      {/* <h1 className="text-6xl font-bold">Section 5</h1>? */}
      <Image src={monogram} alt="BOTI Monogram"/>
    </section>
  );
}
