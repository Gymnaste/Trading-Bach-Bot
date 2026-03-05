/**
 * PositionsTable.jsx — Liste des positions ouvertes avec P&L en temps réel.
 */
import { useState, useEffect } from 'react'
import { portfolioAPI } from '../services/apiService'

export default function PositionsTable({ onSelectStock }) {
    const [positions, setPositions] = useState([])

    useEffect(() => {
        fetchPositions()
        const interval = setInterval(fetchPositions, 5000)

        // Écouter le rafraîchissement global (déclenché par le cycle)
        window.addEventListener('refresh-signals', fetchPositions)

        return () => {
            clearInterval(interval)
            window.removeEventListener('refresh-signals', fetchPositions)
        }
    }, [])

    async function fetchPositions() {
        try {
            const res = await portfolioAPI.getPositions()
            setPositions(res.data.positions || [])
        } catch (e) { }
    }

    return (
        <div className="card h-full flex flex-col">
            <h2 className="font-semibold text-white mb-4">Positions en cours</h2>
            <div className="overflow-x-auto flex-1">
                <table className="w-full text-left text-sm">
                    <thead className="text-[11px] text-gray-500 uppercase border-b border-gray-800">
                        <tr>
                            <th className="pb-2">Symbole</th>
                            <th className="pb-2">Qté</th>
                            <th className="pb-2">Entrée</th>
                            <th className="pb-2">Actuel</th>
                            <th className="pb-2 text-right">P&L</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800/50">
                        {positions.length > 0 ? positions.map((p) => {
                            const pnl = p.pnl || (p.current_price ? (p.current_price - p.entry_price) * p.quantity : 0)
                            const pnlColor = pnl >= 0 ? 'text-green-400' : 'text-red-400'
                            return (
                                <tr
                                    key={p.id}
                                    onClick={() => onSelectStock && onSelectStock(p.symbol)}
                                    className="hover:bg-gray-800/60 transition-colors cursor-pointer"
                                >
                                    <td className="py-3 font-bold text-white">{p.symbol}</td>
                                    <td className="py-3 text-gray-400">{p.quantity}</td>
                                    <td className="py-3 text-gray-400 font-mono">${p.entry_price.toFixed(2)}</td>
                                    <td className="py-3 text-white font-mono">
                                        {p.current_price ? `$${p.current_price.toFixed(2)}` : '—'}
                                    </td>
                                    <td className={`py-3 text-right font-mono font-bold ${pnlColor}`}>
                                        {pnl >= 0 ? '+' : ''}${pnl.toFixed(2)}
                                    </td>
                                </tr>
                            )
                        }) : (
                            <tr>
                                <td colSpan="5" className="py-8 text-center text-gray-500 italic">
                                    Aucune position ouverte
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
