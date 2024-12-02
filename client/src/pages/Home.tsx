import { Footer } from "flowbite-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Home = () => {

    const fadeIn = (direction: string, delay: number) => {
        return {
            hidden: {
                y: direction === "up" ? 60 : direction === "down" ? -60 : 0,
                x: direction === "left" ? 60 : direction === "right" ? -60 : 0,
            },
            show: {
                y: 0,
                x: 0,
                opacity: 1,
                transition: {
                    type: 'tween',
                    duration: 1.5,
                    delay: delay,
                    ease: [0.25, 0.25, 0.25, 0.75],
                },
            },
        };
    };

    return (
        <>

            <div className='m-6 w-full h-[45rem] rounded-lg '>
                <motion.div className="w-1/2 items-center h-full flex flex-col gap-y-10 pt-32"
                    variants={fadeIn("right", 0.05)}
                    initial='hidden'
                    whileInView={'show'}
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <h1 className="font-semibold font-serif bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-slate-900 to-slate-950 bg-clip-text text-transparent text-[60px] mr-16">Rooted in Strategy</h1>
                    <h1 className="font-semibold font-serif bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-slate-900 to-slate-950 bg-clip-text text-transparent text-[65px] ml-28">Growing with Vision</h1>
                </motion.div>
            </div>
            <div className="flex flex-col gap-y-28">
                <motion.div
                    className="m-6 h-[40rem] flex items-center justify-center rounded-lg  bg-black"
                    variants={fadeIn("up", 0.05)}
                    initial='hidden'
                    whileInView={'show'}
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <h2 className="text-[35px] w-2/3 text-white font-serif">
                        At Sylva, we specialize in crafting innovative equity solutions that empower our clients to achieve sustainable financial growth.
                        Through expertly curated portfolios and strategic market insights, we navigate complex markets with precision, helping investors maximize returns and build long-term wealth.
                        Our forward-thinking approach ensures that today's investments create a secure and prosperous future, tailored to the unique goals of each client.
                    </h2>
                </motion.div>




            </div>

            <footer title="useScroll" className='flex flex-row justify-between items-center p-6 h-20 mt-10 mr-6 ml-6 border-t-2 border-black'>
                <Footer.Copyright href="#" by="SYLVA™" year={2024} />
                <div className='flex flex-row gap-x-10'>
                    <Link to='/' className="relative hover:shadow-slate-100/30 flex w-16  cursor-pointer items-center justify-center  text-black rounded-lg overflow-hidden hover-effect">
                        <span className="z-10">About</span>
                    </Link>
                    <Link to="#" className='border-b-2 hover:border-black hover-effect'>Privacy Policy</Link>
                    <Link to="#" className='border-b-2 hover:border-black hover-effect'>Licensing</Link>
                    <Link to="#" className='border-b-2 hover:border-black hover-effect'>Contact</Link>
                </div>
            </footer>

        </>
    )
}

export default Home