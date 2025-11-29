import Intro from "@/components/contact/Intro";
import Cards from "@/components/contact/Cards";
import Form from "@/components/contact/Form";

export default function Contact() {
  return (
    <main className="relative">
      {/* Fixed hero intro */}
      <Intro />

      {/* Content starts below hero */}
      <div className="relative z-0 pt-[100vh]">
        <Cards />
        <Form />
      </div>
    </main>
  );
}
