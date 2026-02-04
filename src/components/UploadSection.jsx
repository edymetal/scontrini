import React, { useRef } from 'react';

const UploadSection = ({ onImageUpload, isProcessing }) => {
    const uploadInputRef = useRef(null);
    const cameraInputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            onImageUpload(file);
        }
    };

    const handleUploadClick = () => {
        uploadInputRef.current.click();
    };

    const handleCameraClick = () => {
        cameraInputRef.current.click();
    };

    return (
        <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center', marginBottom: '2rem' }}>
            {/* Standard Upload Input */}
            <input
                type="file"
                accept="image/*"
                ref={uploadInputRef}
                style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', border: 0 }}
                onChange={handleFileChange}
            />

            {/* Camera Input */}
            <input
                type="file"
                accept="image/*"
                capture="environment"
                ref={cameraInputRef}
                style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', border: 0 }}
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

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button
                    onClick={handleUploadClick}
                    className="btn-primary"
                    disabled={isProcessing}
                    style={{ flex: '1 1 auto', minWidth: '140px', maxWidth: '200px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                >
                    {isProcessing ? (
                        <>
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            Attendere...
                        </>
                    ) : (
                        <>
                            <i className="bi bi-upload"></i> Carica
                        </>
                    )}
                </button>

                <button
                    onClick={handleCameraClick}
                    className="btn-primary"
                    disabled={isProcessing}
                    style={{ flex: '1 1 auto', minWidth: '140px', maxWidth: '200px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}
                >
                    {isProcessing ? (
                        <>
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            Attendere...
                        </>
                    ) : (
                        <>
                            <i className="bi bi-camera"></i> Scatta
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};

export default UploadSection;
