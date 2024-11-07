import { motion } from "framer-motion";
import { Card, Footer } from "flowbite-react";
import { Link } from "react-router-dom";

const AboutUs = () => {

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
        <div className="min-h-screen flex flex-col items-center w-full">
            <motion.div
                className="m-6 h-1/2 w-full mt-12 p-10 flex items-center justify-center rounded-lg  bg-black"
                variants={fadeIn("up", 0.05)}
                initial='hidden'
                whileInView={'show'}
                viewport={{ once: true, amount: 0.2 }}
            >
                <h2 className="text-[28px] w-4/5 text-white font-serif">
                    We are a team of Economics students from IIT Roorkee, managing portfolios for clients who share our vision of building
                    and preserving wealth. Using advanced quantitative models and the Markowitz Theorem, we deliver near-optimal results by
                    balancing risk and return. Our team of seven BS-MS Economics students combines expertise in financial modeling, statistical analysis,
                    and market forecasting to provide data-driven investment solutions. We are dedicated to achieving sustainable financial success through a blend of academic rigor and a client-focused approach.


                </h2>
            </motion.div>

            <motion.div className="text-3xl mt-10 font-serif text-black "
                variants={fadeIn("right", 0.05)}
                initial='hidden'
                whileInView={'show'}
                viewport={{ once: true, amount: 0.2 }}
            >
                Our Team
            </motion.div>

            <div className="w-full p-6 mt-10 flex flex-col gap-y-10"
            >
                <div className="w-full flex flex-row justify-center gap-x-32">
                    <Card href="#" className="max-w-sm bg-slate-50">
                        <h5 className="text-2xl font-semibold  font-serif tracking-tight text-gray-900 dark:text-white">
                            Anish Kumar
                        </h5>

                    </Card>
                    <Card href="#" className="max-w-sm bg-slate-50">
                        <h5 className="text-2xl font-semibold  font-serif tracking-tight text-gray-900 dark:text-white">
                            Harshit Singh
                        </h5>

                    </Card>
                    <Card href="#" className="max-w-sm bg-slate-50">
                        <h5 className="text-2xl font-semibold  font-serif tracking-tight text-gray-900 dark:text-white">
                            Karan Maniyar
                        </h5>

                    </Card>
                    <Card href="#" className="max-w-sm bg-slate-50">
                        <h5 className="text-2xl font-semibold  font-serif tracking-tight text-gray-900 dark:text-white">
                            Shreya Bakshi
                        </h5>

                    </Card>
                </div>
                <div className="w-full flex flex-row justify-center gap-x-32">
                    <Card href="#" className="max-w-sm bg-slate-50">
                        <h5 className="text-2xl font-semibold  font-serif tracking-tight text-gray-900 dark:text-white">
                            Soham Ghige
                        </h5>

                    </Card>
                    <Card href="#" className="max-w-sm bg-slate-50">
                        <h5 className="text-2xl font-semibold  font-serif tracking-tight text-gray-900 dark:text-white">
                            Vinayak Rai
                        </h5>

                    </Card>
                    <Card href="#" className="max-w-sm bg-slate-50">
                        <h5 className="text-2xl font-semibold  font-serif tracking-tight text-gray-900 dark:text-white">
                            Yuvraj Singh
                        </h5>

                    </Card>
                </div>
            </div>

            <footer title="useScroll" className='flex w-full flex-row justify-between items-center p-6 h-20 mt-10 mr-6 ml-6 border-t-2 border-black'>
                <Footer.Copyright href="#" by="SYLVA™" year={2024} />
                <div className='flex flex-row gap-x-10'>
                    <Link to="#" className='border-b-2 hover:border-black '>About</Link>
                    <Link to="#" className='border-b-2 hover:border-black '>Privacy Policy</Link>
                    <Link to="#" className='border-b-2 hover:border-black '>Licensing</Link>
                    <Link to="#" className='border-b-2 hover:border-black '>Contact</Link>
                </div>
            </footer>
        </div>

    )
}

export default AboutUs