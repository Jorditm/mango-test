import Link from "next/link";

export default function Navbar() {
    return (
        <div className="flex flex-col gap-4 py-4 px-8">
            <Link href="/"><h1 className="w-fit text-4xl font-bold hover:text-blue-500 transition-colors duration-300">MANGO</h1></Link>
            <nav className="flex flex-row gap-4 ">
                <Link className="text-lg underline hover:text-blue-500 transition-colors duration-300" href="/exercise1">Exercise 1</Link>
                <Link className="text-lg underline hover:text-blue-500 transition-colors duration-300" href="/exercise2">Exercise 2</Link>
            </nav>
        </div >
    )
}