//import { useAuth } from "@/context/AuthContext";
import { Pie_Chart } from "@/components/Pie_Chart";
import PortfolioChangeTable from "@/components/PortfolioChangeTable";
import PortfolioTable from "@/components/PortfolioTable";
import { useState } from "react";
import { IoMdSend } from "react-icons/io";




interface Portfolio {
    initial_portfolio: Record<string, StockEntry>;
    target_portfolio: Record<string, StockEntry>;
    actions: Record<string, { action: string; quantity: number }>;
}

type StockEntry = {
    "%_of_portfolio": number;
    investment_amount: number;
    quantity?: number; // Optional since "Risk_Free" may not have it
    price_per_share?: number; // Optional since "Risk_Free" may not have it
};

type PortfolioData = {
    [ticker: string]: StockEntry;
};

const portfolioData: Portfolio = {
    "initial_portfolio": {
        "SUNPHARMA.NS": {
            "%_of_portfolio": 24.524453389999106,
            "investment_amount": 2452445.3389999107,
            "quantity": 0.013597501509186826,
            "price_per_share": 1803.5999755859373
        },
        "DRREDDY.NS": {
            "%_of_portfolio": 13.031010503824147,
            "investment_amount": 1303101.0503824146,
            "quantity": 0.010242894988182285,
            "price_per_share": 1272.199951171875
        },
        "CIPLA.NS": {
            "%_of_portfolio": 0.0,
            "investment_amount": 0.0,
            "quantity": 0.0,
            "price_per_share": 1601.199951171875
        },
        "RELIANCE.NS": {
            "%_of_portfolio": 12.149211285552166,
            "investment_amount": 1214921.1285552166,
            "quantity": 0.009307600422186079,
            "price_per_share": 1305.300048828125
        },
        "BPCL.NS": {
            "%_of_portfolio": 10.249851531752196,
            "investment_amount": 1024985.1531752195,
            "quantity": 0.03328414068989008,
            "price_per_share": 307.95001220703125
        },
        "ITC.NS": {
            "%_of_portfolio": 6.131613416017748,
            "investment_amount": 613161.3416017748,
            "quantity": 0.012768873927837784,
            "price_per_share": 480.2000122070313
        },
        "MARICO.NS": {
            "%_of_portfolio": 0.0,
            "investment_amount": 0.0,
            "quantity": 0.0,
            "price_per_share": 634.0
        },
        "COLPAL.NS": {
            "%_of_portfolio": 33.91385987285464,
            "investment_amount": 3391385.9872854636,
            "quantity": 0.011463929203609221,
            "price_per_share": 2958.310302734375
        },
        "Risk_Free": {
            "%_of_portfolio": 0,
            "investment_amount": 0.0
        }
    },
    "target_portfolio": {
        "SUNPHARMA.NS": {
            "%_of_portfolio": 23.602268516714457,
            "investment_amount": 2360226.8516714456,
            "quantity": 0.01308619917731301,
            "price_per_share": 1803.5999755859373
        },
        "DRREDDY.NS": {
            "%_of_portfolio": 14.804101773313395,
            "investment_amount": 1480410.1773313396,
            "quantity": 0.011636615580496395,
            "price_per_share": 1272.199951171875
        },
        "CIPLA.NS": {
            "%_of_portfolio": 0.2171211807762334,
            "investment_amount": 21712.11807762334,
            "quantity": 0.0001355990428411694,
            "price_per_share": 1601.199951171875
        },
        "RELIANCE.NS": {
            "%_of_portfolio": 11.607321724230351,
            "investment_amount": 1160732.1724230351,
            "quantity": 0.008892454830329008,
            "price_per_share": 1305.300048828125
        },
        "BPCL.NS": {
            "%_of_portfolio": 10.811131531309732,
            "investment_amount": 1081113.1531309732,
            "quantity": 0.035106774160611275,
            "price_per_share": 307.95001220703125
        },
        "ITC.NS": {
            "%_of_portfolio": 5.921467776242219,
            "investment_amount": 592146.7776242219,
            "quantity": 0.012331252864877611,
            "price_per_share": 480.2000122070313
        },
        "MARICO.NS": {
            "%_of_portfolio": 0.0,
            "investment_amount": 0.0,
            "quantity": 0.0,
            "price_per_share": 634.0
        },
        "COLPAL.NS": {
            "%_of_portfolio": 33.03658749741361,
            "investment_amount": 3303658.7497413615,
            "quantity": 0.011167384120211392,
            "price_per_share": 2958.310302734375
        },
        "Risk_Free": {
            "%_of_portfolio": 0,
            "investment_amount": 0.0
        }
    },
    "actions": {
        "CIPLA.NS": {
            "action": "buy",
            "quantity": 0.0001355990428411694
        },
        "RELIANCE.NS": {
            "action": "sell",
            "quantity": 0.00041514559185707074
        },
        "DRREDDY.NS": {
            "action": "buy",
            "quantity": 0.0013937205923141103
        },
        "BPCL.NS": {
            "action": "buy",
            "quantity": 0.0018226334707211952
        },
        "ITC.NS": {
            "action": "sell",
            "quantity": 0.0004376210629601727
        },
        "COLPAL.NS": {
            "action": "sell",
            "quantity": 0.00029654508339782906
        },
        "SUNPHARMA.NS": {
            "action": "sell",
            "quantity": 0.0005113023318738166
        },
        "MARICO.NS": {
            "action": "hold",
            "quantity": 0.0
        },
        "Risk_Free": {
            "action": "hold",
            "quantity": 0
        }
    }
};



const portfolioDataReference: PortfolioData = portfolioData.initial_portfolio



const Dashboard = () => {

    const [rebalance, setRebalance] = useState(false);

    // const { currentUser } = useAuth();

    return (
        <div className="flex flex-col items-center gap-y-10">

            <div className="w-full  backdrop: flex flex-row gap-4">
                <div className="w-1/2  flex items-center justify-center">
                    <PortfolioTable data={portfolioDataReference} />
                </div>
                <div className="h-full w-1/2 flex items-center justify-center">
                    <Pie_Chart />
                </div>
            </div>

            {rebalance ? (
                <div className="w-full h-full mt-16 mb-20 flex items-center justify-between">
                    <PortfolioChangeTable portfolio={portfolioData} />
                </div>
            ) : (
                <div className="relative bottom-0 flex flex-row bg-black p-3 gap-x-2 items-center text-white rounded-lg shadow-md hover:bg-black/90 active:bg-black/80 shadow-black cursor-pointer"
                    onClick={() => {
                        setRebalance(true);
                    }}
                >
                    <span className="z-10 top-3" >Rebalance</span>
                    <IoMdSend size={20} />
                </div>
            )}



        </div>
    )
}

export default Dashboard