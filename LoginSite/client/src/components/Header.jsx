import { useContext } from "react";
import { AppContent } from "../context/appContext";

export default function Header() {

    const { userData } = useContext(AppContent)


    return (
        <header className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <h1 className="text-4xl sm:text-6xl font-bold text-white mb-4">Hey {userData?userData.name:"Developer"}!</h1>
            <p className="text-lg sm:text-xl text-gray-300">Let's start with a quick product tour and we will have you up and running in no time</p>
            <div className="mt-8">
                <button className="px-6 py-3 bg-violet-900 text-white rounded-full hover:bg-indigo-950 transition-all"
                >
                    Get Started
                </button>
            </div>
        </header>
    );
}