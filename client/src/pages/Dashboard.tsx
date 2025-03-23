/* eslint-disable @typescript-eslint/no-unused-vars */
//import { useAuth } from "@/context/AuthContext";
import PortfolioChangeTable from "@/components/PortfolioChangeTable";
import PortfolioTable from "@/components/PortfolioTable";
import { useEffect, useState } from "react";
import { IoMdSend } from "react-icons/io";
import { Mosaic } from "react-loading-indicators"
import Portfolio from './profile/Portfolio';
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { MdError } from "react-icons/md";
import Pie_Chart from "@/components/Pie_Chart";
import { useNavigate } from "react-router-dom";

interface Portfolio {
    initial_portfolio: StockPortfolio;
    target_portfolio: StockPortfolio;
    actions: Record<string, { action: string; quantity: number }>;
}

export interface StockPortfolio {
    [key: string]: StockEntry
}

interface Err {
    message: string,
    error: boolean
}

export type StockEntry = {
    "%_of_portfolio": number;
    investment_amount: number;
    quantity?: number; // Optional since "Risk_Free" may not have it
    price_per_share?: number; // Optional since "Risk_Free" may not have it
};

const emptyPortfolio: Portfolio = {
    initial_portfolio: {},
    target_portfolio: {},
    actions: {}
}

function calculateTotalChangeValue(portfolioData: Portfolio): number {
    const actions = portfolioData.actions;
    const initialPortfolio = portfolioData.initial_portfolio;

    let totalValue = 0;

    // Iterate over the actions to compute the total value for each stock
    for (const stockSymbol in actions) {
        // Use Object.prototype.hasOwnProperty.call() to check for property existence
        if (Object.prototype.hasOwnProperty.call(actions, stockSymbol)) {
            const stockAction = actions[stockSymbol];
            const stockDetails = initialPortfolio[stockSymbol];

            // Check if stock exists in initial portfolio and action has quantity
            if (stockDetails && stockAction.quantity) {
                const price = stockDetails.price_per_share;
                const quantityChange = stockAction.quantity;

                // Calculate the value based on the given formula
                const calculatedValue = price * quantityChange * 0.003;

                // Add the result to the total sum
                totalValue += calculatedValue;
            }
        }
    }

    return totalValue;
}


const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Err>({ message: '', error: false });
    const [rebalance, setRebalance] = useState(false);
    const [portfolioData, setPortfolioData] = useState<Portfolio | undefined>(undefined);
    const { currentUser } = useAuth();
    const totalValue = 0
    const navigate = useNavigate();

    const getUserPortfolio = async () => {
        try {
            const username = currentUser?.displayName;
            const idToken = await currentUser?.getIdToken();
            const res = await axios.get(
                `https://sylva-django.onrender.com/api/users/${username}/`,
                {
                    headers: {
                        Authorization: `Bearer ${idToken}`,
                    },
                }
            );
            if (res.data.success) {
                if (res.data.user.A == -1) {
                    setError({
                        message: "Create you risk profile first",
                        error: true,
                    });
                }
                const portfolio: Portfolio = { initial_portfolio: res.data.user.initial_portfolio, target_portfolio: res.data.user.target_portfolio, actions: res.data.user.actions }
                setPortfolioData(portfolio);
                setLoading(false);
                return;
            }
        } catch (err) {
            console.log(err);
            setError({ message: "Error fetching user portfolio", error: true });
        }
    }

    useEffect(() => {
        if (currentUser && currentUser.email) {
            const fetchToken = async () => {
                const tokenId = await currentUser.getIdToken();
                console.log("ID Token:", tokenId);
            };

            fetchToken();

            getUserPortfolio();
        }
    }, [currentUser]);

    return (
        <div className="flex flex-col items-center gap-y-10">
            <div
                className={`flex flex-col gap-4 w-full text-red-700 font-semibold items-center text-3xl justify-center mt-32 ${error ? "" : "hidden"
                    }`}
            >
                <div className="flex flex-row items-center">
                    {error.message}{" "}
                    <MdError className="mt-1 ml-2" color="red" size={32} />
                </div>
                <div className="">
                    <button
                        className={`relative bottom-0 h-12 text-lg flex flex-row bg-black p-3 items-center text-white rounded-lg shadow-md hover:bg-black/90 active:bg-black/80 shadow-black cursor-pointer`}
                        onClick={() => { navigate("/assessment") }}
                    > Generate portfolio </button>
                </div>
            </div>

            <div
                className={`w-full flex gap-y-32 flex-row gap-4 ${error ? "hidden" : ""
                    }`}
            >
                {loading ? (
                    <div className="w-full flex flex-col gap-6 items-center justify-center h-96">
                        <Mosaic
                            color={["#030712", "#4b5563", "#9ca3af"]}
                            speedPlus={-1}
                            easing="ease-in-out"
                        />
                        <h2 className="text-2xl font-sans">
                            Your Portfolio is being generated.
                        </h2>
                    </div>
                ) : (
                    <div className="w-full  flex flex-row  mt-12">
                        <div className="w-1/2 flex flex-col ">
                            <h2 className="text-3xl mb-10 font-semibold text-black">
                                Portfolio Suggestion
                            </h2>
                            <PortfolioTable data={portfolioData?.initial_portfolio || {}} />
                        </div>

                        <div className="w-1/2 flex flex-col items-end justify-center">
                            <Pie_Chart
                                StockPortfolio={
                                    portfolioData?.initial_portfolio ||
                                    emptyPortfolio.initial_portfolio
                                }
                            />
                        </div>
                    </div>
                )}
            </div>

            {rebalance ? (
                <div className="w-full h-full flex-col mt-16 mb-20 flex items-center justify-between">
                    <span className="text-bold text-xl p-4 m-4 bg-black rounded-lg text-white">
                        Transaction cost : Rs{" "}
                        {calculateTotalChangeValue(
                            portfolioData ? portfolioData : emptyPortfolio
                        ).toFixed(2)}
                    </span>
                    <PortfolioChangeTable portfolio={portfolioData || emptyPortfolio} />
                </div>
            ) : (
                <div
                    className={`relative bottom-0 flex flex-row bg-black p-3 gap-x-2 ${loading || error ? "hidden" : ""
                        } items-center text-white rounded-lg shadow-md hover:bg-black/90 active:bg-black/80 shadow-black cursor-pointer`}
                    onClick={() => {
                        setRebalance(true);
                    }}
                >
                    <span className={`z-10 top-3 `}>Rebalance</span>
                    <IoMdSend size={20} />
                </div>
            )}
        </div>
    );
}

export default Dashboard