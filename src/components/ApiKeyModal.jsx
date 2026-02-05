import React, { useState } from 'react';
import { validateApiKey } from '../services/geminiService';

const ApiKeyModal = ({ currentApiKey, onSave, onClose }) => {
    const [key, setKey] = useState('');
    const [isValidating, setIsValidating] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!key.trim()) return;

        setIsValidating(true);
        setError(null);

        const isValid = await validateApiKey(key);

        if (isValid) {
            onSave(key);
            setKey(''); // Clear input after save
            if (onClose) onClose();
        } else {
            setError("Chiave non valida o permessi insufficienti. Controlla la tua quota.");
        }
        setIsValidating(false);
    };

    const handleDeactivate = () => {
        if (window.confirm("Sei sicuro di voler disattivare la chiave API? Potrai inserirne una nuova in seguito.")) {
            onSave('');
            setKey('');
        }
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(15, 23, 42, 0.8)',
            backdropFilter: 'blur(8px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem'
        }}>
            <div className="glass-panel" style={{ width: '100%', maxWidth: '400px', padding: '2rem', position: 'relative' }}>
                {onClose && (
                    <button
                        onClick={onClose}
                        style={{
                            position: 'absolute',
                            top: '1rem',
                            right: '1rem',
                            background: 'none',
                            border: 'none',
                            color: '#94a3b8',
                            cursor: 'pointer',
                            fontSize: '1.2rem',
                            transition: 'color 0.2s'
                        }}
                        onMouseOver={(e) => e.target.style.color = 'white'}
                        onMouseOut={(e) => e.target.style.color = '#94a3b8'}
                    >
                        <i className="bi bi-x-lg"></i>
                    </button>
                )}
                <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                    <i className="bi bi-key-fill" style={{ fontSize: '2.5rem', color: '#a5b4fc' }}></i>
                    <h2 className="text-gradient" style={{ marginTop: '1rem', fontSize: '1.5rem' }}>Configurazione</h2>
                    <p style={{ color: '#94a3b8' }}>Gestisci la tua Google Gemini API Key</p>
                </div>

                {currentApiKey ? (
                    <div style={{
                        marginBottom: '1.5rem',
                        padding: '1rem',
                        background: 'rgba(34, 197, 94, 0.1)',
                        border: '1px solid rgba(34, 197, 94, 0.2)',
                        borderRadius: '0.75rem',
                        textAlign: 'center'
                    }}>
                        <div style={{ color: '#4ade80', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                            <i className="bi bi-check-circle-fill"></i>
                            <span style={{ fontWeight: 500 }}>API Key Attiva</span>
                        </div>
                        <button
                            onClick={handleDeactivate}
                            style={{
                                background: 'transparent',
                                border: '1px solid rgba(248, 113, 113, 0.3)',
                                color: '#f87171',
                                padding: '0.4rem 0.8rem',
                                borderRadius: '0.5rem',
                                fontSize: '0.85rem',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                            onMouseOver={(e) => e.target.style.background = 'rgba(248, 113, 113, 0.1)'}
                            onMouseOut={(e) => e.target.style.background = 'transparent'}
                        >
                            Disattiva Chiave
                        </button>
                    </div>
                ) : (
                    <div style={{ marginBottom: '1.5rem', textAlign: 'center', color: '#94a3b8', fontSize: '0.9rem' }}>
                        Nessuna chiave API configurata.
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', color: '#e2e8f0', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                            {currentApiKey ? 'Sostituisci Chiave API' : 'Inserisci Chiave API'}
                        </label>
                        <input
                            type="password"
                            value={key}
                            onChange={(e) => setKey(e.target.value)}
                            placeholder={currentApiKey ? "Inserisci nuova chiave per sostituire..." : "AIzaSY..."}
                            style={{
                                width: '100%',
                                padding: '12px',
                                borderRadius: '12px',
                                background: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                color: 'white',
                                fontSize: '1rem',
                                outline: 'none'
                            }}
                        />
                        {error && (
                            <p style={{ color: '#f87171', fontSize: '0.85rem', marginTop: '0.5rem' }}>
                                <i className="bi bi-x-circle"></i> {error}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="btn-primary"
                        style={{ width: '100%' }}
                        disabled={isValidating || !key.trim()}
                    >
                        {isValidating ? 'Verifica in corso...' : (currentApiKey ? 'Aggiorna Chiave' : 'Salva e Inizia')}
                    </button>
                </form>

                <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.85rem' }}>
                    <a
                        href="https://aistudio.google.com/app/apikey"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: '#6366f1', textDecoration: 'none' }}
                    >
                        Ottieni una chiave gratuita <i className="bi bi-box-arrow-up-right" style={{ fontSize: '0.7em' }}></i>
                    </a>
                </div>
            </div>
        </div>
    );
};
export default ApiKeyModal;
