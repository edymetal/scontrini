import React from 'react';

const DataManagementCard = ({ onExport, onImport }) => {
    return (
        <div className="glass-panel" style={{ padding: '2rem', marginTop: '3rem', textAlign: 'center' }}>
            <h4 style={{ marginBottom: '1rem', color: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                <i className="bi bi-hdd-network" style={{ color: '#a5b4fc' }}></i>
                Gestione Dati
            </h4>

            <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.5rem', maxWidth: '400px', margin: '0 auto 1.5rem' }}>
                Salva una copia di sicurezza dei tuoi scontrini o ripristina un backup precedente per non perdere i tuoi dati.
            </p>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button
                    onClick={onExport}
                    className="btn-primary"
                    style={{
                        background: 'rgba(99, 102, 241, 0.1)',
                        border: '1px solid rgba(99, 102, 241, 0.5)',
                        boxShadow: 'none',
                        flex: '1 1 150px'
                    }}
                >
                    <i className="bi bi-download" style={{ marginRight: '0.5rem' }}></i>
                    Backup Dati
                </button>

                <label
                    className="btn-primary"
                    style={{
                        background: 'rgba(236, 72, 153, 0.1)',
                        border: '1px solid rgba(236, 72, 153, 0.5)',
                        boxShadow: 'none',
                        flex: '1 1 150px',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <input
                        type="file"
                        accept="application/json"
                        onChange={onImport}
                        style={{ display: 'none' }}
                    />
                    <i className="bi bi-upload" style={{ marginRight: '0.5rem' }}></i>
                    Ripristina
                </label>
            </div>
        </div>
    );
};

export default DataManagementCard;
