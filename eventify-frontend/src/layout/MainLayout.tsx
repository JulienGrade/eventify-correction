import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function MainLayout() {

    return (

        <div className="min-h-screen bg-slate-100 text-slate-800">

            <Navbar />

            <main className="max-w-7xl mx-auto px-6 py-8">

                <Outlet />

            </main>

        </div>

    );

}