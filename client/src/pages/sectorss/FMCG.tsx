/* eslint-disable react-refresh/only-export-components */
import fmcgGraph from "./../../../public/fmcg_graph.jpg";
import { MdPictureAsPdf } from "react-icons/md";

const FMCG = () => {
    return (
        <div className="flex flex-col gap-y-12 w-full">
            <h1 className="text-3xl font-serif font-semibold m-4"> FMCG Sector </h1>
            <div className="w-full flex flex-row">
                <div className="w-1/2 flex flex-col gap-10 items-center justify-center m-4">
                    <h2 className="text-xl w-full text-black font-serif">
                        FMCG sector is the 4th largest sector in the economy and is expected
                        to reach USD 220 billion by 2025, growing from around USD 110
                        billion in 2020. This sector is driven by rapid urbanization, rising
                        disposable incomes, and increasing rural consumption, with rural
                        areas accounting for over 36% of FMCG consumption. Key segments
                        include food and beverages, personal care, household products, and
                        health and hygiene. The growth of e-commerce and digital penetration
                        has further expanded market reach, enabling brands to connect with a
                        diverse and expanding consumer base.
                        <br />
                        <br />
                        The sector is largely divided into food & beverages, household &
                        personal care, and healthcare products. However, challenges include
                        rising input costs, increasing competition, and regulatory changes
                        like the implementation of GST and sustainability mandates. Despite
                        these, the sector is poised for steady growth, driven by innovations
                        in product lines, digital penetration in rural areas, and a rising
                        focus on sustainability and eco- friendly products.
                    </h2>
                    <div className="w-full flex flex-col gap-0 items-start">
                        <span className="text-xl font-semibold">Equity Report -</span>
                        <a
                            href="/reports/Equity_Report _FMCG"
                            download="Equity_Report_FMCG"
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
                            download="Sector_Report_FMCG"
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
                    <img src={fmcgGraph} alt="Healthcare" className="h-full w-full " />
                </div>
            </div>
        </div>
    );
};

export default FMCG;
