import CTA from "../components/CTA"
import Features from "../components/features"
import Footer from "../components/footer"
import Hero from "../components/Hero"
import Navbar from "../components/Navbar"
import Testimonials from "../components/Testimonials"

export default function Home(){
    return(
        <>
            <Navbar/>
            <Hero/>
            <Features/>
            <Testimonials/>
            <CTA/>
            <Footer/>
        </>
    )
}