import React, { useState, useEffect } from 'react';

const ReceiptTable = ({ receipts }) => {
    if (!receipts || receipts.length === 0) return null;

    // State to track which receipt is being viewed
    const [currentIndex, setCurrentIndex] = useState(receipts.length - 1);

    // When a new receipt is added, automatically switch to it
    useEffect(() => {
        setCurrentIndex(receipts.length - 1);
    }, [receipts.length]);

    const currentReceipt = receipts[currentIndex];

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev < receipts.length - 1 ? prev + 1 : prev));
    };

    return (
        <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h4 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <i className="bi bi-list-nested" style={{ color: '#ec4899' }}></i>
                    Dettaglio Prodotti
                </h4>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <button
                        onClick={handlePrev}
                        disabled={currentIndex === 0}
                        style={{
                            background: 'rgba(255,255,255,0.1)',
                            border: 'none',
                            color: currentIndex === 0 ? '#475569' : '#f8fafc',
                            width: '32px',
                            height: '32px',
                            borderRadius: '8px',
                            cursor: currentIndex === 0 ? 'default' : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <i className="bi bi-arrow-left"></i>
                    </button>

                    <span style={{ fontSize: '0.85rem', fontWeight: '600', color: '#94a3b8' }}>
                        {currentIndex + 1} / {receipts.length}
                    </span>

                    <button
                        onClick={handleNext}
                        disabled={currentIndex === receipts.length - 1}
                        style={{
                            background: 'rgba(255,255,255,0.1)',
                            border: 'none',
                            color: currentIndex === receipts.length - 1 ? '#475569' : '#f8fafc',
                            width: '32px',
                            height: '32px',
                            borderRadius: '8px',
                            cursor: currentIndex === receipts.length - 1 ? 'default' : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <i className="bi bi-arrow-right"></i>
                    </button>
                </div>
            </div>

            <div style={{ minHeight: '100px' }}>
                <div key={currentReceipt.id}>
                    <div style={{
                        background: 'rgba(255,255,255,0.05)',
                        padding: '0.5rem 0.75rem',
                        borderRadius: '8px',
                        marginBottom: '0.5rem',
                        fontSize: '0.85rem',
                        fontWeight: '600',
                        color: '#a5b4fc',
                        textAlign: 'center'
                    }}>
                        SCONTRINO #{currentIndex + 1}
                    </div>
                    <table style={{ width: '100%', borderCollapse: 'collapse', color: '#e2e8f0' }}>
                        <tbody>
                            {currentReceipt.items.map((item, index) => (
                                <tr key={index} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                                    <td style={{ padding: '0.5rem 0.75rem', fontSize: '0.9rem' }}>{item.descrizione}</td>
                                    <td style={{ padding: '0.5rem 0.75rem', textAlign: 'right', fontFamily: 'monospace', fontSize: '0.95rem', color: '#94a3b8' }}>
                                        {item.prezzo.toFixed(2)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td style={{ padding: '1rem 0.75rem 0.5rem', fontSize: '1rem', fontWeight: '700', color: '#f8fafc' }}>TOTALE SCONTRINO</td>
                                <td style={{ padding: '1rem 0.75rem 0.5rem', textAlign: 'right', fontFamily: 'monospace', fontSize: '1.2rem', fontWeight: '700', color: '#ec4899' }}>
                                    € {currentReceipt.total.toFixed(2)}
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ReceiptTable;
