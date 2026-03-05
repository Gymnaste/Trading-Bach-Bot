/**
 * SignalPanel.jsx — Affiche les signaux de trading IA (BUY/SELL/HOLD).
 */
import { useState, useEffect } from 'react'
import { signalsAPI } from '../services/apiService'

function SignalCard({ signal, onClick }) {
    const badgeClass = signal.recommendation === 'BUY' ? 'badge-buy'
        : signal.recommendation === 'SELL' ? 'badge-sell' : 'badge-hold'

    const barColor = signal.recommendation === 'BUY' ? 'bg-green-400'
        : signal.recommendation === 'SELL' ? 'bg-red-400' : 'bg-yellow-400'

    return (
        <div
            onClick={onClick}
            className="card animate-fade-in p-4 flex flex-col gap-3 cursor-pointer hover:border-sky-500/50 transition-all hover:bg-gray-800/40"
        >
            <div className="flex justify-between items-start">
                <div>
                    <p className="font-bold text-white text-lg">{signal.symbol}</p>
                    {signal.current_price && (
                        <p className="text-gray-400 text-sm font-mono">${signal.current_price.toFixed(2)}</p>
                    )}
                </div>
                <span className={badgeClass}>{signal.recommendation}</span>
            </div>

            {/* Barre de probabilité */}
            <div>
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Probabilité hausse</span>
                    <span className="font-mono">{(signal.probability_up * 100).toFixed(0)}%</span>
                </div>
                <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                    <div
                        className={`h-full rounded-full transition-all duration-700 ${barColor}`}
                        style={{ width: `${signal.probability_up * 100}%` }}
                    />
                </div>
            </div>

            {/* Indicateurs clés */}
            <div className="grid grid-cols-3 gap-2 text-center">
                {signal.rsi != null && (
                    <div className="bg-gray-800 rounded p-2">
                        <p className="text-[10px] text-gray-500">RSI</p>
                        <p className={`font-mono font-bold text-sm ${signal.rsi > 70 ? 'text-red-400' : signal.rsi < 30 ? 'text-green-400' : 'text-white'}`}>
                            {signal.rsi.toFixed(1)}
                        </p>
                    </div>
                )}
                {signal.sma20 != null && signal.sma50 != null && (
                    <div className="bg-gray-800 rounded p-2">
                        <p className="text-[10px] text-gray-500">SMA20/50</p>
                        <p className={`font-mono font-bold text-sm ${signal.sma20 > signal.sma50 ? 'text-green-400' : 'text-red-400'}`}>
                            {signal.sma20 > signal.sma50 ? '↑' : '↓'}
                        </p>
                    </div>
                )}
                <div className="bg-gray-800 rounded p-2">
                    <p className="text-[10px] text-gray-500">Score</p>
                    <p className="font-mono font-bold text-sm text-sky-400">
                        {(signal.confidence_score * 100).toFixed(0)}%
                    </p>
                </div>
            </div>

            {/* Justification */}
            <p className="text-[11px] text-gray-500 leading-relaxed line-clamp-2" title={signal.justification}>
                {signal.justification}
            </p>
        </div>
    )
}

export default function SignalPanel({ onSelectStock }) {
    const [signals, setSignals] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [updated, setUpdated] = useState(null)

    useEffect(() => {
        fetchSignals()
        const interval = setInterval(fetchSignals, 10000)

        // Écouter le rafraîchissement forcé
        window.addEventListener('refresh-signals', fetchSignals)

        return () => {
            clearInterval(interval)
            window.removeEventListener('refresh-signals', fetchSignals)
        }
    }, [])

    async function fetchSignals() {
        try {
            setError(null)
            const res = await signalsAPI.getSignals()
            setSignals(res.data.signals || [])
            setUpdated(new Date().toLocaleTimeString('fr-FR'))
        } catch (e) {
            setError('Erreur connexion backend')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="card h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h2 className="font-semibold text-white">Conseils IA</h2>
                    {updated && <p className="text-[11px] text-gray-500">Maj {updated}</p>}
                </div>
                <button onClick={fetchSignals} className="text-sky-400 hover:text-sky-300 text-sm transition-colors">↻ Actualiser</button>
            </div>
            {loading ? (
                <div className="flex-1 flex items-center justify-center">
                    <div className="spinner" />
                </div>
            ) : error ? (
                <div className="flex-1 flex items-center justify-center text-red-400 text-sm">{error}</div>
            ) : signals.length === 0 ? (
                <div className="flex-1 flex items-center justify-center text-gray-500 text-sm">
                    Aucun signal disponible — lancez un cycle
                </div>
            ) : (
                <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                    {signals.map((s, i) => (
                        <SignalCard
                            key={i}
                            signal={s}
                            onClick={() => onSelectStock && onSelectStock(s.symbol)}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}
