import StockCharts from '@/components/StockCharts';
import { useEffect, useState } from 'react';



const Energy = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/data/reliance_data.json');
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error("Error fetching local data:", error);
            }
        };

        fetchData();
    }, []);



    return (
        <div className="flex flex-col gap-y-12 w-full">
            <h1 className="text-3xl font-serif font-semibold m-4"> Energy Sector </h1>
            <div className='w-full flex flex-row'>
                <div className='w-1/2 flex items-center justify-center'>
                    <h2 className="text-xl w-full font-semibold text-black font-serif">
                        At Sylva, we specialize in crafting innovative equity solutions that empower our clients to achieve sustainable financial growth.
                        Through expertly curated portfolios and strategic market insights, we navigate complex markets with precision, helping investors maximize returns and build long-term wealth.
                        Our forward-thinking approach ensures that today's investments create a secure and prosperous future, tailored to the unique goals of each client.
                    </h2>
                </div>
                <div className='w-1/2 flex items-center justify-end'>

                </div>
            </div>
        </div>
    )
}

export default Energy