import { Chart } from "react-google-charts";
import { StockPortfolio } from "@/pages/Dashboard";
import React from "react";


const Pie_Chart: React.FC<StockPortfolio> = ({ StockPortfolio }) => {

    const portfolioArray = Object.keys(StockPortfolio).map(ticker => {
        const percentage = StockPortfolio[ticker]["%_of_portfolio"];
        return [ticker, percentage];
    });

    const data = [["Stocks", "Percentage"], ...portfolioArray];

    const options = {
        title: "Portfolio holdings",
        backgroundColor: "transparent"
    };

    return (
        <Chart
            className="cursor-pointer"
            chartType="PieChart"
            data={data}
            options={options}
            width={"90%"}
            height={"500px"}
        />
    );
}

export default Pie_Chart