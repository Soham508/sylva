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

                </div>
                <div className='w-1/2 flex items-center justify-end'>
                    <StockCharts />
                </div>
            </div>
            <pre>{data ? data['Meta Data']['1. Information'] : ''}</pre>
        </div>
    )
}

export default Energy