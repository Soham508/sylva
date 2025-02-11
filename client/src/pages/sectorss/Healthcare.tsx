import EnergyGraph from "./../../../public/energy_graph.jpg";
import { MdPictureAsPdf } from "react-icons/md";

const Healthcare = () => {
    return (
        <div className="flex flex-col gap-y-12 w-full">
            <h1 className="text-3xl font-serif font-semibold m-4"> Healthcare Sector </h1>
            <div className="w-full flex flex-row">
                <div className="w-1/2 flex flex-col gap-10 items-center justify-center m-4">
                    <h2 className="text-xl w-full text-black font-serif">
                        The Indian healthcare & pharmaceutical sector is a global
                        powerhouse, ranking 3rd in volume and 14th in value, with the market
                        expected to grow from USD 42 billion in 2020 to USD 120-130 billion
                        by 2030. Dominated by generics, which account for 20% of global
                        supply, India's pharma industry is driven by strong domestic demand,
                        rising from increasing income levels and a growing burden of chronic
                        diseases. The country is also a major supplier of Active
                        Pharmaceutical Ingredients (APIs), contributing over 50% of the
                        global demand for various vaccines.
                        <br />
                        <br />
                        However, challenges such as dependency on API imports from China,
                        pricing pressures, and stringent regulatory hurdles in key markets
                        like the U.S. remain significant. Despite these challenges, ongoing
                        government initiatives and the growth of the biopharmaceutical and
                        OTC segments position India for sustained long-term growth in the
                        global pharmaceutical landscape.
                    </h2>
                    <div className="w-full flex flex-col gap-0 items-start">
                        <span className="text-xl font-semibold">Equity Report -</span>
                        <a
                            href="/reports/Equity_Report_Healthcare"
                            download="Equity_Report_Healthcare"
                            className="ml-6"
                        >
                            <div className="flex flex-row items-center justify-start">
                                <span className="relative hover:shadow-slate-100/30 flex w-20 cursor-pointer justify-start h-8 items-center  text-black  font-semibold rounded-lg overflow-hidden hover-effect">
                                    Download
                                </span>
                                <MdPictureAsPdf size={20} color="red" />
                            </div>
                        </a>
                        <span className="text-xl font-semibold mt-4">Sector Report -</span>
                        <a
                            href="/reports/Sector_Report_ FMCG"
                            download="Sector_Report_Healthcare"
                            className="ml-6"
                        >
                            <div className="flex flex-row items-center justify-start">
                                <span className="relative hover:shadow-slate-100/30 flex w-20 cursor-pointer justify-start h-8 items-center  text-black  font-semibold rounded-lg overflow-hidden hover-effect">
                                    Download
                                </span>
                                <MdPictureAsPdf size={20} color="red" />
                            </div>
                        </a>
                    </div>
                </div>
                <div className="w-1/2 flex items-center justify-end p-4 rounded-xl">
                    <img src={EnergyGraph} alt="Healthcare" className="h-full w-full " />
                </div>
            </div>
        </div>
    );
};

export default Healthcare;
