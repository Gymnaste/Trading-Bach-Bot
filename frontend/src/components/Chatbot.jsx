import { useState, useEffect, useRef } from 'react'
import { chatAPI } from '../services/apiService'

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState([
        { role: 'assistant', content: 'Bonjour ! Je suis votre assistant de trading. Comment puis-je vous aider ?' }
    ])
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)
    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])
    const handleSend = async () => {
        if (!input.trim()) return

        const userMessage = { role: 'user', content: input }
        const updatedMessages = [...messages, userMessage]
        setMessages(updatedMessages)
        setInput('')
        setLoading(true)

        try {
            const res = await chatAPI.send(updatedMessages)
            const botMessage = { role: 'assistant', content: res.data.response }
            setMessages(prev => [...prev, botMessage])
        } catch (error) {
            console.error("Chatbot error:", error)
            setMessages(prev => [...prev, { role: 'assistant', content: 'Erreur: Impossible de contacter le serveur.' }])
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="fixed bottom-6 right-6 z-[100]">
            {/* Bouton pour ouvrir */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="w-16 h-16 bg-gray-950/20 backdrop-blur-md relative flex items-center justify-center transition-all hover:scale-110 group animate-pulse-glow"
                    style={{
                        clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                        boxShadow: '0 0 20px hsl(187,100%,50%,0.3)',
                    }}
                >
                    {/* Border effect using an inner div */}
                    <div
                        className="absolute inset-[2px] bg-gray-900 flex items-center justify-center overflow-hidden"
                        style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
                    >
                        <img src="/logo-axiom-symbol.png" alt="Axiom Chat" className="w-full h-full object-cover scale-125" />
                    </div>
                    {/* Outer glow overlay */}
                    <div className="absolute inset-0 border-2 border-[hsl(187,100%,50%)]/50 opacity-40 group-hover:opacity-100 transition-opacity" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
                </button>
            )}

            {/* Fenêtre de chat */}
            {isOpen && (
                <div className="w-80 h-96 bg-gray-900 border border-gray-800 rounded-xl shadow-2xl flex flex-col animate-fade-in overflow-hidden">
                    <div className="bg-gray-800 p-3 flex justify-between items-center border-b border-gray-700">
                        <span className="font-bold text-white text-sm">Axiom Assistant</span>
                        <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">✕</button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-3 space-y-3">
                        {messages.map((m, i) => (
                            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] rounded-lg px-3 py-2 text-xs ${m.role === 'user' ? 'bg-sky-600 text-white' : 'bg-gray-800 text-gray-200'}`}>
                                    {m.content}
                                </div>
                            </div>
                        ))}
                        {loading && (
                            <div className="flex justify-start">
                                <div className="bg-gray-800 text-gray-200 rounded-lg px-3 py-2 text-xs italic">En train de réfléchir...</div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="p-3 border-t border-gray-800 flex gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Posez une question..."
                            className="flex-1 bg-gray-800 border-none rounded-lg px-3 py-2 text-xs text-white focus:ring-1 focus:ring-sky-500"
                        />
                        <button
                            onClick={handleSend}
                            className="bg-sky-500 text-white px-3 py-2 rounded-lg text-xs"
                        >
                            ➤
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
