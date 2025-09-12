"use client";
import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import useWebSocket from '../hooks/useWebSocket';

const RealTimeChart = () => {
    const [chartData, setChartData] = useState([]);
    const { data, error } = useWebSocket('wss://stream.coingecko.com/stream?apikey=YOUR_API_KEY'); // Replace with your WebSocket URL

    useEffect(() => {
        console.log(data)
        if (data) {
            const newDataPoint = {
                time: new Date().toLocaleTimeString(),
                value: data.bitcoin,
            };

            setChartData((prevData) => [...prevData, newDataPoint].slice(-30)); // Keep the last 30 data points
        }
    }, [data]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div style={{ width: '100%', height: 400 }}>
            <h3>Real-Time Data Chart</h3>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default RealTimeChart;
