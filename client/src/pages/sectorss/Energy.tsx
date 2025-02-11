//import { useEffect, useState } from "react";
import energyGraph from "./../../../public/energy_graph.jpg"
import { MdPictureAsPdf } from "react-icons/md";

const Energy = () => {
    //const [data, setData] = useState(null);
    //
    //useEffect(() => {
    //    const fetchData = async () => {
    //        try {
    //            const response = await fetch("/data/reliance_data.json");
    //            const result = await response.json();
    //            setData(result);
    //        } catch (error) {
    //            console.error("Error fetching local data:", error);
    //        }
    //    };
    //
    //    fetchData();
    //}, []);

    return (
        <div className="flex flex-col gap-y-12 w-full">
            <h1 className="text-3xl font-serif font-semibold m-4"> Energy Sector </h1>
            <div className="w-full flex flex-row">
                <div className="w-1/2 flex flex-col gap-10 items-center justify-center m-4">
                    <h2 className="text-xl w-full text-black font-serif">
                        The Indian energy sector is a critical component of the global
                        energy landscape, being the third-largest consumer of energy
                        globally. With the country's demand for energy projected to nearly
                        double by 2040, India’s energy market is undergoing rapid expansion,
                        supported by significant infrastructure development and investments.
                        In 2020, the country’s total energy market was valued at
                        approximately USD 160 billion, and it is expected to grow at a 5-6%
                        CAGR, driven by strong industrial demand, urbanization, and the
                        government’s focus on energy security.
                        <br />
                        <br />
                        The renewable energy capacity is expected to exceed 500 GW by 2030,
                        as the government pushes for decarbonization and aims to meet 50% of
                        its energy needs from renewable sources. Regulatory risks and
                        environmental concerns regarding carbon emissions and the global
                        shift towards clean energy also put pressure on traditional energy
                        sources.
                    </h2>
                    <div className="w-full flex flex-col gap-0 items-start">
                        <span className="text-xl font-semibold">Equity Report -</span>
                        <a href="/reports/Equity_Report_Energy.pdf" download="Equity_Report_Energy" className="ml-6">

                            <div className="flex flex-row items-center justify-start">
                                <span className="relative hover:shadow-slate-100/30 flex w-20 cursor-pointer justify-start h-8 items-center  text-black  font-semibold rounded-lg overflow-hidden hover-effect">Download</span>
                                <MdPictureAsPdf size={20} color="red" />
                            </div>
                        </a>
                        <span className="text-xl font-semibold mt-4">Sector Report -</span>
                        <a href="/reports/Sector_Report_Energy" download="Sector_Report_Energy" className="ml-6">

                            <div className="flex flex-row items-center justify-start">
                                <span className="relative hover:shadow-slate-100/30 flex w-20 cursor-pointer justify-start h-8 items-center  text-black  font-semibold rounded-lg overflow-hidden hover-effect">Download</span>
                                <MdPictureAsPdf size={20} color="red" />
                            </div>
                        </a>
                    </div>
                </div>
                <div className="w-1/2 flex items-center justify-end p-4 rounded-xl">
                    <img
                        src={energyGraph}
                        alt="Healthcare"
                        className="h-full w-full "
                    />
                </div>
            </div>
        </div>
    );
};

export default Energy;
