/**
 * ManualTradeModal.jsx — Formulaire d'achat manuel d'une action.
 * S'affiche depuis la barre de recherche pour un symbole sans position.
 */
import { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import { portfolioAPI, marketAPI } from '../services/apiService'

export default function ManualTradeModal({ symbol, onClose, onSuccess }) {
    const [info, setInfo] = useState(null)
    const [history, setHistory] = useState([])
    const [currentPrice, setCurrentPrice] = useState(null)
    const [quantity, setQuantity] = useState('')
    const [stopLoss, setStopLoss] = useState('')
    const [takeProfit, setTakeProfit] = useState('')
    const [loading, setLoading] = useState(true)
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)

    useEffect(() => {
        if (!symbol) return
        const fetchData = async () => {
            setLoading(true)
            try {
                const [infoRes, histRes] = await Promise.allSettled([
                    marketAPI.getInfo(symbol),
                    marketAPI.getHistory(symbol, '1mo'),
                ])
                if (infoRes.status === 'fulfilled') setInfo(infoRes.value.data)
                if (histRes.status === 'fulfilled') {
                    const hist = histRes.value.data.history || []
                    setHistory(hist.sort((a, b) => new Date(a.date) - new Date(b.date)))
                    if (hist.length > 0) {
                        const sorted = hist.sort((a, b) => new Date(a.date) - new Date(b.date))
                        const last = sorted[sorted.length - 1].close
                        setCurrentPrice(last)
                        setStopLoss((last * 0.95).toFixed(2))
                        setTakeProfit((last * 1.10).toFixed(2))
                    }
                }
            } catch (e) { console.error(e) }
            setLoading(false)
        }
        fetchData()
    }, [symbol])

    const handleBuy = async () => {
        setSubmitting(true)
        setError(null)
        try {
            const res = await portfolioAPI.buy(
                symbol,
                quantity ? parseFloat(quantity) : null,
                stopLoss ? parseFloat(stopLoss) : null,
                takeProfit ? parseFloat(takeProfit) : null
            )
            if (res.data.success) {
                setSuccess(`✅ Achat réussi — ${res.data.quantity} unités @ $${currentPrice?.toFixed(2)}`)
                setTimeout(() => { onSuccess && onSuccess(); onClose(); }, 2000)
            } else {
                setError(res.data.error || 'Erreur lors de l\'achat')
            }
        } catch (e) {
            setError(e.response?.data?.detail || 'Erreur réseau')
        }
        setSubmitting(false)
    }

    const sortedHist = [...history].sort((a, b) => new Date(a.date) - new Date(b.date))
    const chartData = {
        labels: sortedHist.map(d => d.date),
        datasets: [{
            label: `${symbol} ($)`,
            data: sortedHist.map(d => d.close),
            borderColor: '#22c55e',
            backgroundColor: 'rgba(34, 197, 94, 0.1)',
            tension: 0.2,
            fill: true,
            pointRadius: 0,
        }]
    }
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
            x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#9ca3af', maxTicksLimit: 6 } },
            y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#9ca3af' } }
        }
    }

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[200] p-4">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-gray-800">
                    <div>
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <span className="text-green-400">▲</span> Acheter {symbol}
                        </h2>
                        {info && <p className="text-xs text-gray-400 mt-0.5">{info.name} — {info.sector}</p>}
                    </div>
                    <button onClick={onClose} className="w-9 h-9 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center text-gray-400 hover:text-white">✕</button>
                </div>

                <div className="p-6 flex-1 overflow-y-auto space-y-5">
                    {loading ? (
                        <div className="flex justify-center py-10">
                            <div className="w-10 h-10 border-4 border-green-500/30 border-t-green-500 rounded-full animate-spin" />
                        </div>
                    ) : (
                        <>
                            {/* Prix actuel */}
                            <div className="flex items-center justify-between bg-gray-800 rounded-xl p-4">
                                <span className="text-gray-400 text-sm">Prix Actuel</span>
                                <span className="text-2xl font-bold text-white">${currentPrice?.toFixed(2) || '—'}</span>
                            </div>

                            {/* Mini graphique */}
                            {sortedHist.length > 0 && (
                                <div className="bg-gray-800 rounded-xl p-3 h-[160px]">
                                    <Line data={chartData} options={chartOptions} />
                                </div>
                            )}

                            {/* Paramètres d'achat */}
                            <div className="grid grid-cols-1 gap-4">
                                <div>
                                    <label className="text-[10px] text-gray-500 uppercase tracking-wider block mb-1">Quantité (laisser vide pour calcul auto)</label>
                                    <input
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={quantity}
                                        onChange={e => setQuantity(e.target.value)}
                                        placeholder="Auto (basé sur le capital)"
                                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:ring-1 focus:ring-green-500 focus:outline-none"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="text-[10px] text-red-400 uppercase tracking-wider block mb-1">🔴 Stop Loss ($)</label>
                                        <input
                                            type="number"
                                            min="0"
                                            step="0.01"
                                            value={stopLoss}
                                            onChange={e => setStopLoss(e.target.value)}
                                            className="w-full bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2 text-white text-sm focus:ring-1 focus:ring-red-500 focus:outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[10px] text-green-400 uppercase tracking-wider block mb-1">🟢 Take Profit ($)</label>
                                        <input
                                            type="number"
                                            min="0"
                                            step="0.01"
                                            value={takeProfit}
                                            onChange={e => setTakeProfit(e.target.value)}
                                            className="w-full bg-green-500/10 border border-green-500/30 rounded-lg px-3 py-2 text-white text-sm focus:ring-1 focus:ring-green-500 focus:outline-none"
                                        />
                                    </div>
                                </div>
                            </div>

                            {error && (
                                <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg p-3 text-sm">{error}</div>
                            )}
                            {success && (
                                <div className="bg-green-500/10 border border-green-500/30 text-green-400 rounded-lg p-3 text-sm">{success}</div>
                            )}

                            <button
                                onClick={handleBuy}
                                disabled={submitting}
                                className="w-full py-3 bg-green-500 hover:bg-green-400 text-black font-bold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {submitting ? (
                                    <><div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" /> Achat en cours...</>
                                ) : (
                                    <><span>▲</span> Confirmer l'Achat</>
                                )}
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
