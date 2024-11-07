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
        <div className="flex flex-col gap-y-12 h-56 w-full">
            <h1 className="text-3xl font-serif font-semibold m-4"> Energy Sector </h1>
            <pre>{data ? data['Meta Data']['1. Information'] : ''}</pre>
        </div>
    )
}

export default Energy