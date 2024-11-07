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

    interface RiskState {
        [key: number]: {
            value: string;
        };
    }

    const [riskState, setRiskState] = useState<RiskState>({
        0: { value: "a) 0%" }, // Example for question 1
        1: { value: "a) Not likely at all" }, // Example for question 2
        2: { value: "b) Sell some and hold some" }, // Example for question 3
        3: { value: "d) Achieve significant growth" }, // Example for question 4
        4: { value: "b) 1-3 years" }, // Example for question 5
        5: { value: "a) Guaranteed 4% return" }, // Example for question 6
        6: { value: "c) Hold it and see what happens" }, // Example for question 7
        7: { value: "d) Individual stocks" }, // Example for question 8
        8: { value: "b) Low (1-5%)" }, // Example for question 9
        9: { value: "a) Never" } // Example for question 10
    });


    const sheet = [
        {
            "question": "1. What percentage of your portfolio would you allocate to high-risk investments (e.g., stocks, crypto)?",
            "options": [
                "a) 0%",
                "b) 10%",
                "c) 30%",
                "d) 50%",
                "e) 70%+"
            ]
        },
        {
            "question": "2. Imagine you invested $10,000 and in one year the value of your investment could either grow to $15,000 or drop to $7,000. How likely are you to make the investment?",
            "options": [
                "a) Not likely at all",
                "b) Somewhat unlikely",
                "c) Neutral",
                "d) Somewhat likely",
                "e) Very likely"
            ]
        },
        {
            "question": "3. How would you react to a 20% decline in the value of your investment portfolio in one month?",
            "options": [
                "a) Sell everything",
                "b) Sell some and hold some",
                "c) Hold without action",
                "d) Buy more of the declining asset",
                "e) Buy more aggressively"
            ]
        },
        {
            "question": "4. What is your primary investment goal?",
            "options": [
                "a) Preserve capital",
                "b) Generate moderate income",
                "c) Generate moderate growth",
                "d) Achieve significant growth",
                "e) Maximize potential returns, regardless of risk"
            ]
        },
        {
            "question": "5. How long are you willing to wait for a return on your investment?",
            "options": [
                "a) Less than 1 year",
                "b) 1-3 years",
                "c) 3-5 years",
                "d) 5-10 years",
                "e) 10+ years"
            ]
        },
        {
            "question": "6. You are presented with two investment opportunities: one with a guaranteed 4% return and another with a potential 20% return (but with a risk of losing 10%). Which one would you choose?",
            "options": [
                "a) Guaranteed 4% return",
                "b) 90% in the guaranteed, 10% in the risky investment",
                "c) 70% in the guaranteed, 30% in the risky investment",
                "d) 50% in both",
                "e) 100% in the risky investment"
            ]
        },
        {
            "question": "7. If your investment doubles in value, how would you react?",
            "options": [
                "a) Sell immediately to lock in the gain",
                "b) Sell a portion and hold the rest",
                "c) Hold it and see what happens",
                "d) Reinvest more into the same investment",
                "e) Look for even riskier opportunities"
            ]
        },
        {
            "question": "8. If you had $1,000 to invest, where would you put it?",
            "options": [
                "a) Savings account",
                "b) Government bonds",
                "c) Diversified mutual fund",
                "d) Individual stocks",
                "e) Cryptocurrencies or high-growth startups"
            ]
        },
        {
            "question": "9. What kind of volatility are you comfortable with in your investments?",
            "options": [
                "a) None (0%)",
                "b) Low (1-5%)",
                "c) Moderate (5-10%)",
                "d) High (10-20%)",
                "e) Very high (20%+)"
            ]
        },
        {
            "question": "10. How do you feel about leveraging (borrowing money to invest)?",
            "options": [
                "a) Never",
                "b) Rarely",
                "c) Occasionally",
                "d) Often",
                "e) Always"
            ]
        }
    ];


    useEffect(() => {
        if (!currentUser) {
            navigate('/login');
        }

        const getUser = async () => {
            try {
                const email = currentUser?.email
                const registerResponse = await axios.post('http://localhost:3000/api/v1/user', { email });
                console.log(registerResponse.data)
                if (registerResponse.data.user.A) {
                    navigate('/risk-profile');
                }
                setLoading(false);
            } catch (error) {
                console.log(error)
            }
        }

        getUser();

    })

    return (
        <>
            {loading && (
                <div className="w-full flex items-center justify-center">
                    <Spinner className="h-16 w-16 mt-36" />
                </div>)}
            {!loading && (

                <div className="w-full flex flex-col items-center gap-y-12">
                    <h1 className="text-black text-[30px] font-serif "> Please fill the form for your risk assessment</h1>

                    <div className="w-full flex flex-row gap-y-12 p-8 rounded-lg bg-black">

                        {sheet.map((q, index1) =>
                        (
                            <div className={`w-full ${(page == 1 && index1 + 1 <= 2) ? '' : 'hidden'} flex flex-col justify-center items-start gap-y-4`}>
                                <h2 className="text-xl text-white mb-10">{q.question}</h2>
                                {q.options.map((option) => (
                                    <div className={`w-3/4 flex flex-row cursor-pointer hover:bg-slate-100 font-bold items-center gap-x-4 ${riskState[index1].value == option ? 'bg-white' : 'bg-black group'} pl-6 rounded-xl p-4`}
                                        onClick={() => {
                                            setRiskState((prev) => ({
                                                ...prev,
                                                [index1]: { value: option }
                                            }));
                                        }}
                                    >
                                        <div className={`h-6 w-6 flex rounded-full items-center justify-center ${riskState[index1].value == option ? 'bg-black group-hover:bg-slate-100' : 'bg-slate-100 group-hover:bg-black'}`}>
                                            <div className={`h-3 w-3 rounded-full ${riskState[index1].value == option ? 'bg-slate-100 group-hover:bg-black' : 'bg-black group-hover:bg-slate-100'} `} />
                                        </div>
                                        <div className={`text-lg w-full ${riskState[index1].value == option ? 'text-black group-hover:text-white' : 'text-white group-hover:text-black'}`}> {option}</div>
                                    </div>
                                ))}
                            </div>
                        ))}

                        {sheet.map((q, index1) =>
                        (
                            <div className={`w-full ${(page == 2 && index1 + 1 <= 4 && index1 + 1 > 2) ? '' : 'hidden'} flex flex-col justify-center items-start gap-y-4`}>
                                <h2 className="text-xl text-white">{q.question}</h2>
                                {q.options.map((option) => (
                                    <div className={`w-3/4 flex flex-row cursor-pointer hover:bg-slate-100 font-bold items-center gap-x-4 ${riskState[index1].value == option ? 'bg-white' : 'bg-black group'} pl-6 rounded-xl p-4`}
                                        onClick={() => {
                                            setRiskState((prev) => ({
                                                ...prev,
                                                [index1]: { value: option }
                                            }));
                                        }}
                                    >
                                        <div className={`h-6 w-6 flex rounded-full items-center justify-center ${riskState[index1].value == option ? 'bg-black group-hover:bg-white' : 'bg-white group-hover:bg-black'}`}>
                                            <div className={`h-3 w-3 rounded-full ${riskState[index1].value == option ? 'bg-white group-hover:bg-black' : 'bg-black group-hover:bg-white'} `} />
                                        </div>
                                        <div className={`text-lg w-full ${riskState[index1].value == option ? 'text-black group-hover:text-white' : 'text-white group-hover:text-black'}`}> {option}</div>
                                    </div>
                                ))}
                            </div>
                        ))}

                        {sheet.map((q, index1) =>
                        (
                            <div className={`w-full ${(page == 3 && index1 + 1 <= 6 && index1 + 1 > 4) ? '' : 'hidden'} flex flex-col justify-center items-start gap-y-4`}>
                                <h2 className="text-xl text-white">{q.question}</h2>
                                {q.options.map((option) => (
                                    <div className={`w-3/4 flex flex-row cursor-pointer hover:bg-slate-100 font-bold items-center gap-x-4 ${riskState[index1].value == option ? 'bg-white' : 'bg-black group'} pl-6 rounded-xl p-4`}
                                        onClick={() => {
                                            setRiskState((prev) => ({
                                                ...prev,
                                                [index1]: { value: option }
                                            }));
                                        }}
                                    >
                                        <div className={`h-6 w-6 flex rounded-full items-center justify-center ${riskState[index1].value == option ? 'bg-black group-hover:bg-white' : 'bg-white group-hover:bg-black'}`}>
                                            <div className={`h-3 w-3 rounded-full ${riskState[index1].value == option ? 'bg-white group-hover:bg-black' : 'bg-black group-hover:bg-white'} `} />
                                        </div>
                                        <div className={`text-lg w-full ${riskState[index1].value == option ? 'text-black group-hover:text-white' : 'text-white group-hover:text-black'}`}> {option}</div>
                                    </div>
                                ))}
                            </div>
                        ))}

                        {sheet.map((q, index1) =>
                        (
                            <div className={`w-full ${(page == 4 && index1 + 1 <= 8 && index1 + 1 > 6) ? '' : 'hidden'} flex flex-col justify-center items-start gap-y-4`}>
                                <h2 className="text-xl text-white">{q.question}</h2>
                                {q.options.map((option) => (
                                    <div className={`w-3/4 flex flex-row cursor-pointer hover:bg-slate-100 font-bold items-center gap-x-4 ${riskState[index1].value == option ? 'bg-white' : 'bg-black group'} pl-6 rounded-xl p-4`}
                                        onClick={() => {
                                            setRiskState((prev) => ({
                                                ...prev,
                                                [index1]: { value: option }
                                            }));
                                        }}
                                    >
                                        <div className={`h-6 w-6 flex rounded-full items-center justify-center ${riskState[index1].value == option ? 'bg-black group-hover:bg-white' : 'bg-white group-hover:bg-black'}`}>
                                            <div className={`h-3 w-3 rounded-full ${riskState[index1].value == option ? 'bg-white group-hover:bg-black' : 'bg-black group-hover:bg-white'} `} />
                                        </div>
                                        <div className={`text-lg w-full ${riskState[index1].value == option ? 'text-black group-hover:text-white' : 'text-white group-hover:text-black'}`}> {option}</div>
                                    </div>
                                ))}
                            </div>
                        ))}

                        {sheet.map((q, index1) =>
                        (
                            <div className={`w-full ${(page == 5 && index1 + 1 <= 10 && index1 + 1 > 8) ? '' : 'hidden'} flex flex-col justify-center items-start gap-y-4`}>
                                <h2 className="text-xl text-white">{q.question}</h2>
                                {q.options.map((option) => (
                                    <div className={`w-3/4 flex flex-row cursor-pointer hover:bg-slate-100 font-bold items-center gap-x-4 ${riskState[index1].value == option ? 'bg-white' : 'bg-black group'} pl-6 rounded-xl p-4`}
                                        onClick={() => {
                                            setRiskState((prev) => ({
                                                ...prev,
                                                [index1]: { value: option }
                                            }));
                                        }}
                                    >
                                        <div className={`h-6 w-6 flex rounded-full items-center justify-center ${riskState[index1].value == option ? 'bg-black group-hover:bg-white' : 'bg-white group-hover:bg-black'}`}>
                                            <div className={`h-3 w-3 rounded-full ${riskState[index1].value == option ? 'bg-white group-hover:bg-black' : 'bg-black group-hover:bg-white'} `} />
                                        </div>
                                        <div className={`text-lg w-full ${riskState[index1].value == option ? 'text-black group-hover:text-white' : 'text-white group-hover:text-black'}`}> {option}</div>
                                    </div>
                                ))}
                            </div>
                        ))}

                    </div>
                    <div className="w-full absolute bottom-10 flex flex-row items-center justify-center gap-x-32">
                        {
                            (page > 1) &&
                            <div className="relative hover:bg-slate-200 gap-x-2 flex h-12 w-24 cursor-pointer items-center justify-center  text-black  font-semibold rounded-lg overflow-hidden hover-effect"
                                onClick={() => { setPage((prev) => (prev - 1)) }}
                            >
                                <HiOutlineArrowSmLeft size={28} />
                                <span className="z-10">Back</span>
                            </div>
                        }
                        {
                            (page < 5) &&
                            <div className="relative hover:bg-slate-200 flex gap-x-2 h-12 w-24 cursor-pointer items-center justify-center  text-black  font-semibold rounded-lg overflow-hidden hover-effect"
                                onClick={() => { setPage((prev) => (prev + 1)) }}
                            >
                                <span className="z-10">Next</span>
                                <HiOutlineArrowSmRight size={28} />
                            </div>
                        }

                        {(page == 5) &&
                            <div className="relative flex flex-row bg-black p-3 gap-x-2 items-center text-white rounded-lg shadow-md hover:bg-black/90 active:bg-black/80 shadow-black cursor-pointer"

                            >
                                <span className="z-10 top-3">Submit</span>
                                <IoMdSend size={20} />
                            </div>
                        }

                    </div>
                </div >

            )
            }
        </>
    )
}

export default Assessment