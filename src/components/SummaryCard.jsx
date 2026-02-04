import React from 'react';

const SummaryCard = ({ total, receiptCount }) => {
    return (
        <div className="glass-panel" style={{
            padding: '1.5rem',
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)',
            marginBottom: '2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>
            <div>
                <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '0.25rem' }}>Totale Spesa</p>
                <h2 className="text-gradient" style={{ fontSize: '2.5rem', fontFamily: 'monospace' }}>
                    € {total.toFixed(2)}
                </h2>
            </div>
            <div style={{ textAlign: 'right' }}>
                <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '0.25rem' }}>Scontrini</p>
                <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(255,255,255,0.1)',
                    padding: '0.5rem 1rem',
                    borderRadius: '12px',
                    fontWeight: '600',
                    fontSize: '1.2rem'
                }}>
                    {receiptCount}
                </div>
            </div>
        </div>
    );
};

export default SummaryCard;
