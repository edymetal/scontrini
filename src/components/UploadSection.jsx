import React, { useRef } from 'react';

const UploadSection = ({ onImageUpload, isProcessing }) => {
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            onImageUpload(file);
        }
    };

    const handleClick = () => {
        fileInputRef.current.click();
    };

    return (
        <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center', marginBottom: '2rem' }}>
            <input
                type="file"
                accept="image/*"
                capture="environment"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />

            <div style={{ marginBottom: '1.5rem' }}>
                <div style={{
                    width: '80px',
                    height: '80px',
                    background: 'rgba(99, 102, 241, 0.2)',
                    borderRadius: '50%',
                    margin: '0 auto 1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 20px rgba(99, 102, 241, 0.3)'
                }}>
                    <i className="bi bi-camera-fill" style={{ fontSize: '32px', color: '#a5b4fc' }}></i>
                </div>
                <h3 style={{ marginBottom: '0.5rem' }}>Nuovo Scontrino</h3>
                <p style={{ color: '#94a3b8', fontSize: '0.9rem', maxWidth: '300px', margin: '0 auto' }}>
                    Scatta una foto chiara o carica un'immagine del tuo scontrino fiscale.
                </p>
            </div>

            <button
                onClick={handleClick}
                className="btn-primary"
                disabled={isProcessing}
                style={{ width: '100%', maxWidth: '300px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
            >
                {isProcessing ? (
                    <>
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        Elaborazione...
                    </>
                ) : (
                    <>
                        <i className="bi bi-upload"></i> Carica / Scatta
                    </>
                )}
            </button>
        </div>
    );
};

export default UploadSection;
