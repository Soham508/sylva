import { MdOutlineHealthAndSafety } from "react-icons/md";
import { GrCart } from "react-icons/gr";
import { SlEnergy } from "react-icons/sl";
import { IoArrowForwardCircle } from "react-icons/io5";
import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import healthcareImage from "./../../public/healthcare.jpeg"
import FMCGImage from "./../../public/FMCG.jpg"
import EnergyImage from "./../../public/Energy.png"

const Research = () => {
    return (
        <>
            <div className="flex flex-col justify-center min-h-screen">
                <h1 className=" mt-20 m-6 text-[35px] font-serif font-semibold">
                    Sector Analysis
                </h1>

                <div className="h-96 m-6 p-10 flex flex-row gap-x-10 justify-between">
                    <div className="h-full w-1/3  bg-black rounded-lg flex hover:opacity-80 flex-row">
                        <div className="h-full w-1/2  flex flex-col">
                            <div className="h-1/2 w-full bg-black flex gap-x-2 flex-row p-4">
                                <SlEnergy color="white" size={24} className='mt-1' />
                                <h2 className="text-3xl text-slate-100 hover:scale-105 cursor-pointer">Energy</h2>
                            </div>

                            <div className="h-1/2 flex items-center w-full bg-black">
                                <Link to='/dashboard/energy'>
                                    <div className="flex h-12 ml-6 justify-start gap-x-2 items-center group ">
                                        <span className="text-slate-100 text-xl p-1 border-b-2 border-black cursor-pointer group-hover:border-white">
                                            See more
                                        </span>
                                        <IoArrowForwardCircle color="white" size={36} className="mt-1 cursor-pointer group-hover:scale-110" />
                                    </div>
                                </Link>
                            </div>

                        </div>
                        <div className="h-full w-1/2">
                            <img
                                src={EnergyImage}
                                alt="Healthcare"
                                className="h-full w-full object-cover "
                            />
                        </div>
                    </div>
                    <div className="h-full w-1/3  bg-black rounded-lg flex flex-row hover:opacity-80">
                        <div className="h-full w-1/2  flex flex-col">
                            <div className="h-1/2 w-full bg-black flex gap-x-2 flex-row p-4">
                                <MdOutlineHealthAndSafety color="white" size={28} className='mt-1' />
                                <h2 className="text-3xl text-slate-100 hover:scale-105 cursor-pointer">Healthcare</h2>
                            </div>

                            <div className="h-1/2 flex items-center w-full bg-black">
                                <Link to='/dashboard/healthcare'>
                                    <div className="flex h-12 ml-6 justify-start gap-x-2 items-center group ">
                                        <span className="text-slate-100 text-xl p-1 border-b-2 border-black cursor-pointer group-hover:border-white">
                                            See more
                                        </span>
                                        <IoArrowForwardCircle
                                            color="white"
                                            size={36}
                                            className="mt-1 cursor-pointer transition-transform group-hover:scale-110"
                                        />
                                    </div>
                                </Link>
                            </div>

                        </div>
                        <div className="h-full w-1/2">
                            <img
                                src={healthcareImage}
                                alt="Healthcare"
                                className="h-full w-full object-cover "
                            />
                        </div>
                    </div>

                    <div className="h-full w-1/3  bg-black rounded-lg flex hover:opacity-80 flex-row">
                        <div className="h-full w-1/2  flex flex-col">
                            <div className="h-1/2 w-full bg-black flex gap-x-2 flex-row p-4">
                                <GrCart color="white" size={24} className='mt-1' />
                                <h2 className="text-3xl text-slate-100 hover:scale-105 cursor-pointer">FMCG</h2>
                            </div>

                            <div className="h-1/2 flex items-center w-full bg-black">
                                <Link to='/dashboard/fmcg'>
                                    <div className="flex h-12 ml-6 justify-start gap-x-2 items-center group ">
                                        <span className="text-slate-100 text-xl p-1 border-b-2 border-black cursor-pointer group-hover:border-white">
                                            See more
                                        </span>
                                        <IoArrowForwardCircle color="white" size={36} className="mt-1 cursor-pointer group-hover:scale-110" />
                                    </div>
                                </Link>
                            </div>

                        </div>
                        <div className="h-full w-1/2">
                            <img
                                src={FMCGImage}
                                alt="Healthcare"
                                className="h-full w-full "
                            />
                        </div>
                    </div>

                </div>

                <footer title="useScroll" className='flex flex-row justify-between items-center p-6 h-20 mt-10 mr-6 ml-6 border-t-2 border-black'>
                    <Footer.Copyright href="#" by="SYLVA™" year={2024} />
                    <div className='flex flex-row gap-x-10'>
                        <Link to="#" className='border-b-2 hover:border-black hover-effect'>About</Link>
                        <Link to="#" className='border-b-2 hover:border-black hover-effect'>Privacy Policy</Link>
                        <Link to="#" className='border-b-2 hover:border-black hover-effect'>Licensing</Link>
                        <Link to="#" className='border-b-2 hover:border-black hover-effect'>Contact</Link>
                    </div>
                </footer>
            </div >
        </>
    )
}

export default Research