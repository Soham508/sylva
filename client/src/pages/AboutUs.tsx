import { motion } from "framer-motion";
import { Footer } from "flowbite-react";
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
                    type: "tween",
                    duration: 1.5,
                    delay: delay,
                    ease: [0.25, 0.25, 0.25, 0.75],
                },
            },
        };
    };

    return (
        <div className=" flex flex-col items-center w-full">
            <motion.div
                className="m-6 h-1/2 w-full mt-12 p-10 flex items-center justify-center rounded-lg  bg-black"
                variants={fadeIn("up", 0.05)}
                initial="hidden"
                whileInView={"show"}
                viewport={{ once: true, amount: 0.2 }}
            >
                <h2 className="text-[28px] w-4/5 text-white font-serif">
                    I’m Soham Ghige, a Bachelor’s student at IIT Roorkee, passionate about
                    finance, technology, and data-driven investing. With a strong
                    foundation in economics, mathematics, and programming, I have
                    developed a portfolio advisory model designed to optimize investments
                    based on risk assessment, asset allocation, and market trends. My work
                    bridges the gap between financial expertise and technology, leveraging
                    quantitative analysis, AI-driven insights, and automation to simplify
                    investing for individuals and businesses. I am committed to building
                    innovative solutions that make wealth management smarter, more
                    accessible, and more efficient.
                </h2>
            </motion.div>



            <footer
                title="useScroll"
                className="flex absolute bottom-0 w-full flex-row justify-between items-center p-6 h-20 mr-6 ml-6 border-t-2 border-black"
            >
                <Footer.Copyright href="#" by="SYLVA™" year={2024} />
                <div className="flex flex-row gap-x-10">
                    <Link to="#" className="border-b-2 hover:border-black ">
                        About
                    </Link>
                    <Link to="#" className="border-b-2 hover:border-black ">
                        Privacy Policy
                    </Link>
                    <Link to="#" className="border-b-2 hover:border-black ">
                        Licensing
                    </Link>
                    <Link to="#" className="border-b-2 hover:border-black ">
                        Contact
                    </Link>
                </div>
            </footer>
        </div>
    );
};

export default AboutUs;
