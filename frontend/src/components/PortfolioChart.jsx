/**
 * PortfolioChart.jsx — Graphique d'évolution de la valeur du portefeuille.
 */
import { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js'
import { portfolioAPI } from '../services/apiService'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
)

export default function PortfolioChart() {
    const [history, setHistory] = useState([])

    useEffect(() => {
        fetchHistory()
        const interval = setInterval(fetchHistory, 15000)
        return () => clearInterval(interval)
    }, [])

    async function fetchHistory() {
        try {
            const res = await portfolioAPI.getHistory()
            const sorted = (res.data.historique || []).sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
            setHistory(sorted)
        } catch (e) { }
    }

    const chartData = {
        labels: history.map(h => new Date(h.timestamp).toLocaleTimeString()),
        datasets: [
            {
                label: 'Valeur Portefeuille ($)',
                data: history.map(h => h.total_value),
                fill: true,
                borderColor: '#38bdf8',
                backgroundColor: 'rgba(56, 189, 248, 0.1)',
                tension: 0.4,
            }
        ]
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: { mode: 'index', intersect: false },
        },
        scales: {
            y: { grid: { color: '#1f2937' }, ticks: { color: '#9ca3af' } },
            x: { grid: { display: false }, ticks: { color: '#9ca3af' } }
        }
    }

    return (
        <div className="card h-full flex flex-col">
            <h2 className="font-semibold text-white mb-4">Evolution Portefeuille</h2>
            <div className="flex-1 min-h-[250px]">
                {history.length > 0 ? (
                    <Line data={chartData} options={options} />
                ) : (
                    <div className="h-full flex items-center justify-center text-gray-500">
                        En attente de données...
                    </div>
                )}
            </div>
        </div>
    )
}
