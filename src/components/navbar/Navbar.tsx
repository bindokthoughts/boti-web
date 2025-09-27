import Link from "next/link";

export default function Navbar() {
    return (

        <nav className="sticky top-0 z-50 bg-white bg-opacity-80 backdrop-blur-md shadow-md">
            <div className="container mx-auto px-6 py-3">
                <div className="flex justify-between items-center">
                    <Link href="/" className="text-xl text-gray-800">
                        Apple
                    </Link>
                    <div className="hidden md:flex space-x-4">
                        <Link href="#" className="text-gray-600 hover:text-gray-900">
                            Shop
                        </Link>
                        <Link href="#" className="text-gray-600 hover:text-gray-900">
                            Support
                        </Link>
                        <Link href="#" className="text-gray-600 hover:text-gray-900">
                            About
                        </Link>
                        <Link href="#" className="text-gray-600 hover:text-gray-900">
                            Contact
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}