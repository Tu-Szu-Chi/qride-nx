import Link from "next/link";
import Button from "../components/Button";

export default async function Index() {
  return (
    <div className="w-full flex flex-col min-h-full flex-1">
      <h1 className="font-bold text-3xl text-left">QRide</h1>
      <BannerImage />
      <div className="text-center mt-auto">
        <Button className="mb-4"><Link href="/sign-up">Sign Up</Link></Button>
        <Button className="mb-4" theme="light">Sign In</Button>
        <Contact />
      </div>
    </div>
  );
}

const BannerImage = () => {
  return <div className='relative mt-28'>
    <div className="w-full h-40 border-spacing-4 bg-red-300"></div>
    <div className="absolute -top-4 -right-4 w-10 h-10 bg-black rounded-full"></div>
  </div>
}

const Contact = () => {
  return <a className="text-xl font-bold text-blue underline underline-offset-4 decoration-indigo-300">
  Contact Us
</a>
}