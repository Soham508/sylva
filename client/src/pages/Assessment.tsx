import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { IoMdSend } from "react-icons/io";
import { HiOutlineArrowSmRight, HiOutlineArrowSmLeft } from "react-icons/hi";
import { Slider } from "@/components/ui/slider";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { useState } from "react";


const Assessment = () => {

    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const [page, setPage] = useState(1);

    type RiskOption = {
        value: string;
        score: number;
    };

    type RiskState = {
        questions: RiskOption[];
        tickers: string[];
        Investment_ammount: number;
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



    const generate_A = async (riskState: RiskState) => {
        console.log("making req for a...")
        const body = {
            questions: [...riskState.questions]
        };

        try {
            const response = await axios.post('https://sylva-django.onrender.com/api/risk_aversion/', body);
            console.log('Response:', response.data);
            return response.data.risk_tolerance_score

        } catch (error) {
            console.error('Error making POST request:', error);
            return;
        }
    };

    const generate_portfolio = async (riskState: RiskState) => {
        const tickers = riskState.tickers

        // Extract wealth from riskState (assuming it exists)
        const wealth = (riskState.Investment_ammount == 0 ? 100 : riskState.Investment_ammount);
        const risk_tolerance_score = await generate_A(riskState);
        console.log(`A generated to be ${risk_tolerance_score}`);

        const body = {
            a: risk_tolerance_score,
            stocks: tickers,
            wealth: wealth
        };

        console.log('Sending request to /generate_portfolio API with body:', body);

        try {
            const response = await axios.post('https://sylva-django.onrender.com/api/generate_portfolio/', body);
            const initial_portfolio = response.data.initial_portfolio;
            const target_portfolio = response.data.target_portfolio;
            const actions = response.data.actions;

            console.log('Response from /process API:', response.data);
            const email = currentUser?.email
            const requestBody = {
                initial_portfolio,
                target_portfolio,
                actions,
                riskState,
                email,
                A: risk_tolerance_score
            };

            try {
                const response = await axios.patch(`https://sylva-django.onrender.com/api/users/`, requestBody);
                console.log('Portfolio updated:', response.data);
                if (response.data.success) {
                    navigate('/')
                }
            } catch (error) {
                console.log('Error updating portfolio:', error);
            }
            return response.data; // Return response from /process API

        } catch (error) {
            console.error('Error making POST request to /process:', error);
            return null;
        }
    };

    const [riskState, setRiskState] = useState<RiskState>({
        questions: [{ value: "''", score: -1 },
        { value: "''", score: -1 },
        { value: "''", score: -1 },
        { value: "''", score: -1 },
        { value: "''", score: -1 },
        { value: "''", score: 30 },
        { value: "''", score: -1 },
        { value: "''", score: -1 },
        { value: "''", score: -1 },
        { value: "''", score: -1 },],
        tickers: [
            "SUNPHARMA.NS",
            "DRREDDY.NS",
            "CIPLA.NS",
            "POLYMED.NS",
            "RELIANCE.NS",
            "NTPC.NS",
            "COALINDIA.NS",
            "ADANIPOWER.NS",
            "BPCL.NS",
            "GSPL.NS",
            "ITC.NS",
            "BRITANNIA.NS",
            "COLPAL.NS",
            "BALRAMCHIN.NS",
            "NAVNETEDUL.NS"
        ],
        Investment_ammount: 0
    });

    const tickers: { question: string; options: tickerOptions[] } = {
        "question": "Q.16 Which of the following stocks would you prefer not to include in your portfolio? (Select all that apply)",
        "options": [
            { label: "Sun Pharmaceutical Industries", ticker: "SUNPHARMA.NS" },
            { label: "Dr Reddy's Laboratories", ticker: "DRREDDY.NS" },
            { label: "Cipla", ticker: "CIPLA.NS" },
            { label: "Poly Medicure Ltd", ticker: "POLYMED.NS" },
            { label: "Reliance Industries Limited", ticker: "RELIANCE.NS" },
            { label: "National Thermal Power Corporation Ltd", ticker: "NTPC.NS" },
            { label: "Coal India Ltd", ticker: "COALINDIA.NS" },
            { label: "Adani Power", ticker: "ADANIPOWER.NS" },
            { label: "Bharat Petroleum Corporation Ltd", ticker: "BPCL.NS" },
            { label: "Gujarat State Petronet Ltd", ticker: "GSPL.NS" },
            { label: "ITC Limited", ticker: "ITC.NS" },
            { label: "Britannia Ltd", ticker: "BRITANNIA.NS" },
            { label: "Colgate-Palmolive (India) Ltd", ticker: "COLPAL.NS" },
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
        }, {
            "question": "Q.3 If your current source of income were to stop today, how long would your present savings support you? (optional/conditional)",
            "options": [
                { label: "Less than 3 months", score: 2 },
                { label: "3 - 6 months", score: 4 },
                { label: "6 months to a year", score: 6 },
                { label: "More than 1 year", score: 8 }
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
            "question": "Q.6 What percentage of your income you generally invest in equity markets?",
            "options": [
                { label: "Income %", score: 30 }
            ]
        }
        ,
        {
            "question": "Q.7 At the beginning of the year, you invest Rs.1,00,000 for the long term. At the end of year one, there are four possible outcomes (best and worst-case scenarios). Which option would you be prepared to accept?",
            "options": [
                { label: "Portfolio A: Rs. 1,00,000", score: 3 },
                { label: "Portfolio B: Rs. 90,000 - Rs. 1,10,000", score: 5 },
                { label: "Portfolio C: Rs. 80,000 - Rs. 1,20,000", score: 7 },
                { label: "Portfolio D: Rs. 70,000 - Rs. 1,30,000", score: 9 }
            ]
        },
        {
            "question": "Q.8 How comfortable are you taking financial risks to help ensure you achieve your longer-term needs and objectives?",
            "options": [
                { label: "Not at all comfortable", score: 3 },
                { label: "Slightly comfortable", score: 5 },
                { label: "Comfortable", score: 7 },
                { label: "Very comfortable", score: 9 }
            ]
        },
        {
            "question": "Q.9 How long are you looking at investing your capital before accessing it? (Assuming you already have a plan to meet short-term cash flow or emergencies.)",
            "options": [
                { label: "In 2 years or less", score: 5 },
                { label: "Within 3 - 5 years", score: 6 },
                { label: "Within 6 - 10 years", score: 7 },
                { label: "Not for 10+ years", score: 8 }
            ]
        },

        {
            "question": "Q.10 If your investments increased 12% (a to b) in year one, then 18% (b to c) in year two, what are you most likely to do in year three?",
            "options": [
                { label: "You would buy more with those capital gains.", score: 8 },
                { label: "You would hold your portfolio.", score: 6 },
                { label: "You would sell your stocks at a profit and take an exit position.", score: 4 }
            ]
        }
    ];



    // Effect to fetch user data


    return (
        <>


            <div className="w-full flex flex-col items-center gap-y-12">
                <h1 className="text-black text-[30px] font-serif "> Please fill the form for your risk assessment</h1>

                <div className={`w-2/3 h-[550px] flex flex-col ${page > 14 ? 'hidden' : ''} gap-y-12 p-8 rounded-lg bg-black}`}>
                    <div className="w-full flex flex-row overflow-x-auto">
                        {sheet.map((q, index1) => (
                            //Doing paging using page state, making camparison with question index
                            <div key={index1} className={`w-full flex flex-col ${(index1 == (page - 1)) ? '' : 'hidden'} justify-center items-start gap-y-4`}>
                                <h2 className="text-xl text-black mb-10">{q.question}</h2>
                                {q.options.map((option, optionIndex) =>
                                (<>
                                    {option.label == "Income %" ?
                                        <div className="flex flex-col justify-start h-52 w-full">
                                            <span className="ml-12 font-semibold text-black text-lg"> {riskState.questions[index1].score * 10} Percent</span>
                                            <Slider onValueChange={(value) => {
                                                setRiskState((prev) => ({
                                                    ...prev,
                                                    [index1]: { value: option.label, score: value[0] / 100 * 10 }
                                                }));
                                            }} defaultValue={[30]} max={100} step={10} className="w-1/3 m-10" />
                                        </div>
                                        :
                                        <div
                                            key={optionIndex}
                                            className={`w-3/4 flex flex-row cursor-pointer hover:bg-black font-bold items-center gap-x-4 ${riskState.questions[index1]?.value === option.label ? 'bg-black' : 'bg-transparent group'} pl-6 rounded-xl p-4`}
                                            onClick={() => {
                                                setRiskState((prev) => ({
                                                    ...prev,
                                                    questions: prev.questions.map((question, index) =>
                                                        index === index1
                                                            ? { value: option.label, score: option.score }
                                                            : question
                                                    )
                                                }));
                                            }}
                                        >

                                            <div className={`h-3 w-3 rounded-full ${riskState.questions[index1]?.value === option.label ? 'bg-slate-100 group-hover:bg-black' : 'bg-black group-hover:bg-white'}`} />
                                            <div className={`text-lg font-normal w-full ${riskState.questions[index1]?.value === option.label ? 'text-white group-hover:text-black' : 'text-black group-hover:text-white'}`}>
                                                {option.label}
                                            </div>
                                        </div>
                                    }

                                </>
                                ))}
                            </div>
                        ))}

                    </div>

                </div>

                {
                    page == 11 && (
                        <div className="w-full flex absolute top-56 flex-col items-center justify-center">
                            <h2 className="text-2xl text-black font-serif max-w-4xl "> Which of the following stocks would you prefer to <b> exclude</b>  from your portfolio? (Please select all that apply.)</h2>
                            <div className="grid grid-cols-3 items-center gap-4 w-full max-w-5xl mt-16">
                                {tickers.options.map((option, index) => {
                                    const isInTickers = riskState.tickers.includes(option.ticker);

                                    return (
                                        <div
                                            key={index}
                                            className={`text-md p-3 rounded-lg whitespace-nowrap cursor-pointer ${isInTickers ? 'bg-slate-200 hover:bg-slate-300' : 'bg-black text-white hover:bg-black/90'}`}
                                            onClick={() => {
                                                setRiskState((prevState) => ({
                                                    ...prevState,
                                                    tickers: prevState.tickers.filter(t => t !== option.ticker) // Remove ticker from array
                                                }));
                                            }}
                                        >
                                            {option.label}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )
                }
                {
                    page == 12 && (
                        <div className="w-2/3 absolute top-56 flex flex-col items-center justify-center">
                            <h2 className="text-2xl text-black font-serif max-w-4xl "> How much is your Corpus? (Optional.)</h2>
                            <div className="w-2/3 m-10 flex flex-row gap-x-10 items-center justify-center ">
                                <div className="flex w-1/3 items-center flex-row gap-x-2 p-1 border-black border-b-2">
                                    <MdOutlineCurrencyRupee size={28} />
                                    <input type="text"
                                        value={riskState.Investment_ammount}
                                        onChange={(e) => {
                                            const value = e.target.value;

                                            // If the input is empty, set it as an empty string (optional)
                                            if (value === "") {
                                                setRiskState((prev) => ({ ...prev, Investment_ammount: 0 }));
                                            } else {
                                                // Ensure that the input is a valid number, if not, do nothing or show an error
                                                const parsedValue = parseFloat(value);

                                                // If it's a valid number (parsed value is not NaN), update the state
                                                if (!isNaN(parsedValue)) {
                                                    setRiskState((prev) => ({ ...prev, Investment_ammount: parsedValue }));;
                                                }
                                            }
                                        }}
                                        placeholder="Enter ammount" className="w-full p-4 rounded-lg text-xl hover:bg-slate-200/90 border-0  bg-slate-100 text-black  border-black  focus:border-0  placeholder:text-black focus:outline-none focus:ring-0 placeholder-black " />
                                </div>

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
                    {page < 12 && (
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
                    {page === 12 && (
                        <div
                            onClick={async () => {
                                console.log(riskState);
                                try {
                                    const res = await generate_portfolio(riskState);
                                    console.log(res);
                                    navigate('/dashboard');
                                }
                                catch (err) {
                                    console.log(err);
                                }
                            }}
                            className="relative flex flex-row bg-black p-3 gap-x-2 items-center text-white rounded-lg shadow-md hover:bg-black/90 active:bg-black/80 shadow-black cursor-pointer">
                            <span className="z-10 top-3" >Submit</span>
                            <IoMdSend size={20} />
                        </div>
                    )}



                </div>
            </div>

        </>
    );
};

export default Assessment;
