/**
 * NewsPanel.jsx — Affiche les actualités financières avec score de sentiment.
 */
import { useState, useEffect } from 'react'
import { newsAPI } from '../services/apiService'

function SentimentBar({ score }) {
    if (score == null) return null
    const pct = ((score + 1) / 2) * 100
    const color = score > 0.2 ? 'bg-green-400' : score < -0.2 ? 'bg-red-400' : 'bg-yellow-400'
    const label = score > 0.2 ? '😊 Positif' : score < -0.2 ? '😟 Négatif' : '😐 Neutre'

    return (
        <div className="mt-2">
            <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] text-gray-500">{label}</span>
                <span className="text-[10px] font-mono text-gray-400">{score.toFixed(2)}</span>
            </div>
            <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
            </div>
        </div>
    )
}

export default function NewsPanel() {
    const [news, setNews] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [refreshing, setRefreshing] = useState(false)

    useEffect(() => {
        fetchNews()
        const interval = setInterval(fetchNews, 120000)
        return () => clearInterval(interval)
    }, [])

    async function fetchNews() {
        try {
            setError(null)
            const res = await newsAPI.getNews(15)
            setNews(res.data.news || [])
        } catch (e) {
            setError('Impossible de charger les actualités')
        } finally { setLoading(false) }
    }

    async function handleRefresh() {
        setRefreshing(true)
        try {
            await newsAPI.refreshNews()
            await fetchNews()
        } finally { setRefreshing(false) }
    }

    return (
        <div className="card h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-white">Actus financières</h2>
                <button
                    onClick={handleRefresh}
                    disabled={refreshing}
                    className="text-sky-400 hover:text-sky-300 text-sm transition-colors disabled:opacity-50"
                >
                    {refreshing ? '⏳' : '↻'} Rafraîchir
                </button>
            </div>

            {loading ? (
                <div className="flex-1 flex items-center justify-center"><div className="spinner" /></div>
            ) : error ? (
                <div className="text-red-400 text-sm py-8 text-center">{error}</div>
            ) : news.length === 0 ? (
                <div className="text-gray-500 text-sm py-8 text-center">
                    Aucune news — cliquez sur "Rafraîchir" pour charger les actualités
                </div>
            ) : (
                <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                    {news.map((item) => (
                        <div key={item.id} className="bg-gray-800/60 rounded-lg p-3 hover:bg-gray-800 transition-colors">
                            <div className="flex items-start gap-2 justify-between">
                                <div className="flex-1 min-w-0">
                                    <a
                                        href={item.url || '#'}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-gray-200 hover:text-sky-400 transition-colors line-clamp-2 font-medium"
                                    >
                                        {item.title}
                                    </a>
                                    <div className="flex items-center gap-2 mt-1">
                                        {item.source && (
                                            <span className="text-[10px] text-gray-500">{item.source}</span>
                                        )}
                                        {item.related_symbol && (
                                            <span className="text-[10px] bg-sky-900/50 text-sky-400 px-1.5 py-0.5 rounded">
                                                {item.related_symbol}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <SentimentBar score={item.sentiment_score} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
