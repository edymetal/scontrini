import React from 'react';

const HistoryTable = ({ receipts }) => {
    if (!receipts || receipts.length === 0) return null;

    const totalSum = receipts.reduce((acc, r) => acc + r.total, 0);

    return (
        <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
            <h4 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <i className="bi bi-clock-history" style={{ color: '#6366f1' }}></i>
                Cronologia Scontrini
            </h4>
            <div style={{ maxHeight: '250px', overflowY: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', color: '#e2e8f0' }}>
                    <thead style={{ position: 'sticky', top: 0, background: 'rgba(15, 23, 42, 0.9)', backdropFilter: 'blur(4px)' }}>
                        <tr>
                            <th style={{ textAlign: 'left', padding: '0.75rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>#</th>
                            <th style={{ textAlign: 'left', padding: '0.75rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>Data</th>
                            <th style={{ textAlign: 'left', padding: '0.75rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>Scontrino</th>
                            <th style={{ textAlign: 'right', padding: '0.75rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>Totale (€)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {receipts.map((receipt, index) => (
                            <tr key={receipt.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                <td style={{ padding: '0.75rem', fontSize: '0.85rem', color: '#94a3b8' }}>{index + 1}</td>
                                <td style={{ padding: '0.75rem', fontSize: '0.85rem', color: '#94a3b8' }}>{new Date(receipt.timestamp).toLocaleDateString('it-IT', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}</td>
                                <td style={{ padding: '0.75rem', fontSize: '0.95rem' }}>Nota Fiscale {receipt.id.slice(0, 4)}</td>
                                <td style={{ padding: '0.75rem', textAlign: 'right', fontFamily: 'monospace', fontSize: '1rem', color: '#ec4899' }}>
                                    {receipt.total.toFixed(2)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr style={{ background: 'rgba(99, 102, 241, 0.1)' }}>
                            <td colSpan="3" style={{ padding: '0.75rem', fontWeight: '700' }}>SOMMA TOTALE</td>
                            <td style={{ padding: '0.75rem', textAlign: 'right', fontFamily: 'monospace', fontSize: '1.1rem', fontWeight: '700', color: '#6366f1' }}>
                                € {totalSum.toFixed(2)}
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
};

export default HistoryTable;
