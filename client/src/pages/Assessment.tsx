import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useEffect, useState } from "react";
import { Spinner } from "flowbite-react";
import { IoMdSend } from "react-icons/io";
import { HiOutlineArrowSmRight, HiOutlineArrowSmLeft } from "react-icons/hi";


const Assessment = () => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);

    type RiskOption = {
        value: string;
        score: number;
    };

    type RiskState = {
        [key: number]: RiskOption;
        tickers: string[]
    };

    type Option = {
        label: string;
        score: number;
    };

    type Question = {
        question: string;
        options: Option[];
    };

    type Sheet = Question[];
    interface tickerOptions {
        label: string;
        ticker: string;
    }

    const [riskState, setRiskState] = useState<RiskState>({
        0: { value: "''", score: -1 },
        1: { value: "''", score: -1 },
        2: { value: "''", score: -1 },
        3: { value: "''", score: -1 },
        4: { value: "''", score: -1 },
        5: { value: "''", score: -1 },
        6: { value: "''", score: -1 },
        7: { value: "''", score: -1 },
        8: { value: "''", score: -1 },
        9: { value: "''", score: -1 },
        10: { value: "''", score: -1 },
        11: { value: "''", score: -1 },
        12: { value: "''", score: -1 },
        13: { value: "''", score: -1 },
        14: { value: "''", score: -1 },
        tickers: [
            "SUNPHARMA.NS",
            "DRREDDY.NS",
            "CIPLA.NS",
            "ABBOTINDIA.NS",
            "ZYDUSLIFE.NS",
            "JBCHEPHARM.NS",
            "POLYMED.NS",
            "RELIANCE.NS",
            "NTPC.NS",
            "COALINDIA.NS",
            "ADANIPOWER.NS",
            "BPCL.NS",
            "GSPL.NS",
            "UNOMINDA.NS",
            "ITC.NS",
            "MARICO.NS",
            "BRITANNIA.NS",
            "COLPAL.NS",
            "VBL.NS",
            "BALRAMCHIN.NS",
            "NAVNETEDUL.NS"
        ]
    });

    const tickers: { question: string; options: tickerOptions[] } = {
        "question": "Q.16 Which of the following stocks would you prefer not to include in your portfolio? (Select all that apply)",
        "options": [
            { label: "Sun Pharmaceutical Industries", ticker: "SUNPHARMA.NS" },
            { label: "Dr Reddy's Laboratories", ticker: "DRREDDY.NS" },
            { label: "Cipla", ticker: "CIPLA.NS" },
            { label: "Abbott India Ltd", ticker: "ABBOTINDIA.NS" },
            { label: "Zydus Lifesciences Ltd", ticker: "ZYDUSLIFE.NS" },
            { label: "JB Chemicals & Pharmaceuticals", ticker: "JBCHEPHARM.NS" },
            { label: "Poly Medicure Ltd", ticker: "POLYMED.NS" },
            { label: "Reliance Industries Limited", ticker: "RELIANCE.NS" },
            { label: "National Thermal Power Corporation Ltd", ticker: "NTPC.NS" },
            { label: "Coal India Ltd", ticker: "COALINDIA.NS" },
            { label: "Adani Power", ticker: "ADANIPOWER.NS" },
            { label: "Bharat Petroleum Corporation Ltd", ticker: "BPCL.NS" },
            { label: "Gujarat State Petronet Ltd", ticker: "GSPL.NS" },
            { label: "Uno Minda Ltd", ticker: "UNOMINDA.NS" },
            { label: "ITC Limited", ticker: "ITC.NS" },
            { label: "Marico Ltd", ticker: "MARICO.NS" },
            { label: "Britannia Ltd", ticker: "BRITANNIA.NS" },
            { label: "Colgate-Palmolive (India) Ltd", ticker: "COLPAL.NS" },
            { label: "Varun Beverages", ticker: "VBL.NS" },
            { label: "Balrampur Chini Mills Limited", ticker: "BALRAMCHIN.NS" },
            { label: "Navneet Education Ltd", ticker: "NAVNETEDUL.NS" }
        ]

    }

    const sheet: Sheet = [
        {
            "question": "Q.1 Which of the following best describes your current stage of life?",
            "options": [
                { label: "You have zero financial burden and are in your earliest stage of investing.", score: 5 },
                { label: "You have high financial responsibility and are building wealth.", score: 3 },
                { label: "You have accumulated wealth and stable income but are still investing for future goals.", score: 7 },
                { label: "You are retired/close to retirement with accumulated wealth and little/no financial burden.", score: 9 }
            ]
        },
        {
            "question": "Q.2 How would you describe your current income stability and career stage?",
            "options": [
                { label: "Just starting in my career, with fluctuating income.", score: 3 },
                { label: "Established in my career with a steady income.", score: 5 },
                { label: "I am approaching a peak in my career, with high income and stability.", score: 9 },
                { label: "Nearing retirement, focusing on maintaining my income.", score: 7 },
                { label: "No income stream, have some deposits.", score: 1 }
            ]
        },
        {
            "question": "Q.3 What percentage of your wealth & income is your invested portfolio value?",
            "options": [
                { label: "Slider - Wealth %", score: 0 },
                { label: "Slider - Income %", score: 0 }
            ]
        },
        {
            "question": "Q.4 You have to support financially:",
            "options": [
                { label: "Only myself", score: 9 },
                { label: "Two people including myself", score: 7 },
                { label: "2 - 4 people other than myself", score: 5 },
                { label: "More than four people other than myself", score: 3 }
            ]
        },
        {
            "question": "Q.5 Which of these objectives is the most important to you from an investment perspective?",
            "options": [
                { label: "Preserving wealth", score: 2 },
                { label: "Generating regular income to meet current requirements", score: 4 },
                { label: "Balance current income and long-term growth", score: 6 },
                { label: "Long-term growth", score: 8 }
            ]
        },
        {
            "question": "Q.6 If your current source of income were to stop today, how long would your present savings support you? (optional/conditional)",
            "options": [
                { label: "Less than 3 months", score: 2 },
                { label: "3 - 6 months", score: 4 },
                { label: "6 months to a year", score: 6 },
                { label: "More than 1 year", score: 8 }
            ]
        },
        {
            "question": "Q.7 How is your health and insurance status?",
            "options": [
                { label: "Healthy and have insurance", score: 9 },
                { label: "Healthy and do not have insurance", score: 6 },
                { label: "Not healthy and do not have insurance", score: 2 },
                { label: "Not healthy and have insurance", score: 7 }
            ]
        },
        {
            "question": "Q.9 At the beginning of the year, you invest Rs.1,00,000 for the long term. At the end of year one, there are four possible outcomes (best and worst-case scenarios). Which option would you be prepared to accept?",
            "options": [
                { label: "Portfolio A: Rs. 1,00,000", score: 3 },
                { label: "Portfolio B: Rs. 90,000 - Rs. 1,10,000", score: 5 },
                { label: "Portfolio C: Rs. 80,000 - Rs. 1,20,000", score: 7 },
                { label: "Portfolio D: Rs. 70,000 - Rs. 1,30,000", score: 9 }
            ]
        },
        {
            "question": "Q.10 How comfortable are you taking financial risks to help ensure you achieve your longer-term needs and objectives?",
            "options": [
                { label: "Not at all comfortable", score: 3 },
                { label: "Slightly comfortable", score: 5 },
                { label: "Comfortable", score: 7 },
                { label: "Very comfortable", score: 9 }
            ]
        },
        {
            "question": "Q.11 Which of the following best describes your understanding about the market?",
            "options": [
                { label: "An experienced investor, constantly keeps up to date with the stock market. Have exposure to various types of stocks and fully aware of the risks involved to gain high returns", score: 9 },
                { label: "Awareness of the stock market is limited to information passed on by brokers or financial planners. Rely on professionals to keep me updated", score: 6 },
                { label: "Little awareness of the stock market. However, want to build my knowledge and understanding", score: 2 }
            ]
        },
        {
            "question": "Q.12 Which of the following suits best to you as a risk taker?",
            "options": [
                { label: "Comfortable to take high risk for higher returns", score: 8 },
                { label: "Comfortable in taking calculated risk", score: 5 },
                { label: "Low risk taking capacity", score: 2 },
                { label: "Extremely averse to risk", score: 0 }
            ]
        },
        {
            "question": "Q.13 How long are you looking at investing your capital before accessing it? (Assuming you already have a plan to meet short-term cash flow or emergencies.)",
            "options": [
                { label: "In 2 years or less", score: 5 },
                { label: "Within 3 - 5 years", score: 6 },
                { label: "Within 6 - 10 years", score: 7 },
                { label: "Not for 10+ years", score: 8 }
            ]
        },
        {
            "question": "Q.14 If your investments increased 12% (a to b) in year one, then 18% (b to c) in year two, what are you most likely to do in year three?",
            "options": [
                { label: "You would buy more with those capital gains.", score: 8 },
                { label: "You would hold your portfolio.", score: 6 },
                { label: "You would sell your stocks at a profit and take an exit position.", score: 4 }
            ]
        },
        {
            "question": "Q.15 When you think of the word 'risk,' which of the following words comes to mind first?",
            "options": [
                { label: "Loss", score: 1 },
                { label: "Uncertainty", score: 3 },
                { label: "Opportunity", score: 7 },
                { label: "Thrill", score: 9 }
            ]
        }
    ];



    // Effect to fetch user data
    useEffect(() => {
        const getUser = async () => {
            try {
                const email = currentUser?.email;
                const registerResponse = await axios.post('http://localhost:3000/api/v1/user', { email });
                if (registerResponse.data.user.A) {
                    navigate('/risk-profile');
                }
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };

        getUser();
    }, [currentUser, navigate]);

    return (
        <>
            {loading && (
                <div className="w-full flex items-center justify-center">
                    <Spinner className="h-16 w-16 mt-36" />
                </div>)}
            {!loading && (
                <div className="w-full flex flex-col items-center gap-y-12">
                    <h1 className="text-black text-[30px] font-serif "> Please fill the form for your risk assessment</h1>

                    <div className={`w-2/3 h-[550px] flex flex-col ${page > 14 ? 'hidden' : ''} gap-y-12 p-8 rounded-lg bg-black}`}>
                        <div className="w-full flex flex-row overflow-x-auto">
                            {sheet.map((q, index1) => (
                                <div key={index1} className={`w-full flex flex-col ${(index1 == (page - 1)) ? '' : 'hidden'} justify-center items-start gap-y-4`}>
                                    <h2 className="text-xl text-white mb-10">{q.question}</h2>
                                    {q.options.map((option, optionIndex) => (
                                        <div
                                            key={optionIndex}
                                            className={`w-3/4 flex flex-row cursor-pointer hover:bg-slate-100 font-bold items-center gap-x-4 ${riskState[index1]?.value === option.label ? 'bg-white' : 'bg-black group'} pl-6 rounded-xl p-4`}
                                            onClick={() => {
                                                setRiskState((prev) => ({
                                                    ...prev,
                                                    [index1]: { value: option.label, score: option.score }
                                                }));
                                            }}
                                        >
                                            <div className={`h-6 w-6 flex rounded-full items-center justify-center ${riskState[index1]?.value === option.label ? 'bg-black group-hover:bg-slate-100' : 'bg-slate-100 group-hover:bg-black'}`}>
                                                <div className={`h-3 w-3 rounded-full ${riskState[index1]?.value === option.label ? 'bg-slate-100 group-hover:bg-black' : 'bg-black group-hover:bg-slate-100'}`} />
                                            </div>
                                            <div className={`text-lg font-normal w-full ${riskState[index1]?.value === option.label ? 'text-black group-hover:text-white' : 'text-white group-hover:text-black'}`}>
                                                {option.label}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ))}

                        </div>

                    </div>

                    {page == 15 && (
                        <div className="w-full flex flex-col items-center justify-center">
                            <h2 className="text-xl text-black "> {tickers.question}</h2>
                            <div className="grid grid-cols-3  items-center gap-4 w-full max-w-4xl mt-16">
                                {tickers.options.map((option, index) => (
                                    <div key={index} className="text-md p-3 hover-effect hover:bg-slate-300 cursor-pointer rounded-lg bg-slate-200 text-center text-black">
                                        {option.label}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )

                    }
                    <div className="w-full mb-10 absolute bottom-0 flex flex-row items-center justify-center gap-x-32">
                        {page > 1 && (
                            <div className="relative hover:bg-slate-200 gap-x-2 flex h-12 w-24 cursor-pointer items-center justify-center
                             text-black font-semibold rounded-lg overflow-hidden hover-effect"
                                onClick={() => { setPage((prev) => prev - 1) }}
                            >
                                <HiOutlineArrowSmLeft size={20} className="ml-1 top-1" />
                                <span>  Back </span>
                            </div>
                        )}
                        {page < 15 && (
                            <>
                                <div className="relative hover:bg-slate-200 flex flex-row h-12 w-24 cursor-pointer items-center justify-center text-black font-semibold rounded-lg overflow-hidden hover-effect"
                                    onClick={() => {
                                        //if (riskState[page - 1].score == -1) {
                                        //    window.alert("Please select one of the options")
                                        //    return
                                        //}
                                        setPage((prev) => prev + 1)
                                    }}
                                >
                                    <span>Next</span>
                                    <HiOutlineArrowSmRight size={20} className="ml-1 top-1" />
                                </div>
                            </>

                        )}
                        {page === 15 && (
                            <div className="relative flex flex-row bg-black p-3 gap-x-2 items-center text-white rounded-lg shadow-md hover:bg-black/90 active:bg-black/80 shadow-black cursor-pointer">
                                <span className="z-10 top-3">Submit</span>
                                <IoMdSend size={20} />
                            </div>
                        )}


                    </div>
                </div>
            )}
        </>
    );
};

export default Assessment;
