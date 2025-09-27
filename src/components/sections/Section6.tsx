import Image from "next/image"
import logo from "../../assets/Logo_Typo.svg";

export default function Section6() {
  return (
    <section className="h-screen relative flex flex-col gap-4 items-center justify-center bg-gradient-to-b from-black to-gray-900">
      <Image src={logo} alt="BOTI Monogram"/>
      <h6 className="text-xl font-bold">It’s pronounced BODHI</h6>
    </section>
  );
}
