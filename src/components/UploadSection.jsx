import React, { useRef, useState, useEffect } from 'react';

const UploadSection = ({ onImageUpload, isProcessing }) => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    const [isWebcamOpen, setIsWebcamOpen] = useState(false);
    const [stream, setStream] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            onImageUpload(file);
            // Reset input value to allow selecting the same file again
            e.target.value = '';
        }
    };

    const handleCameraClick = async () => {
        try {
            const constraints = {
                video: { 
                    facingMode: 'environment', 
                    width: { ideal: 1920 }, 
                    height: { ideal: 1080 } 
                }
            };
            const newStream = await navigator.mediaDevices.getUserMedia(constraints);
            setStream(newStream);
            setIsWebcamOpen(true);
        } catch (err) {
            console.error("Errore nell'accesso alla webcam:", err);
            // Fallback for older browsers or specific mobile restrictions
            try {
                const fallbackStream = await navigator.mediaDevices.getUserMedia({ video: true });
                setStream(fallbackStream);
                setIsWebcamOpen(true);
            } catch (fallbackErr) {
                alert("Non è stato possibile accedere alla webcam. Assicurati di aver dato i permessi e di usare HTTPS.");
            }
        }
    };

    const stopWebcam = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
        }
        setIsWebcamOpen(false);
    };

    const capturePhoto = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        if (video && canvas) {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

            canvas.toBlob((blob) => {
                const file = new File([blob], "webcam-capture.jpg", { type: "image/jpeg" });
                onImageUpload(file);
                stopWebcam();
            }, 'image/jpeg', 0.95);
        }
    };

    useEffect(() => {
        if (isWebcamOpen && videoRef.current && stream) {
            videoRef.current.srcObject = stream;
        }
    }, [isWebcamOpen, stream]);

    return (
        <>
            {/* Webcam Modal */}
            {isWebcamOpen && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    height: '100dvh', // Support for dynamic viewport height on mobile
                    background: '#000',
                    zIndex: 9999, // Ensure it stays above everything
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <div style={{
                        flex: 1,
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden'
                    }}>
                        <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover' // Fills the screen
                            }}
                        />
                        
                        {/* Close Button Top Right */}
                        <button
                            onClick={stopWebcam}
                            style={{
                                position: 'absolute',
                                top: '1.5rem',
                                right: '1.5rem',
                                background: 'rgba(0,0,0,0.5)',
                                border: 'none',
                                color: 'white',
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                zIndex: 10000
                            }}
                        >
                            <i className="bi bi-x-lg" style={{ fontSize: '1.2rem' }}></i>
                        </button>
                    </div>

                    <div style={{
                        padding: '2rem 1rem 3rem', // Extra bottom padding for mobile browsers
                        background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '1rem',
                        position: 'absolute',
                        bottom: 0,
                        width: '100%'
                    }}>
                        <button
                            onClick={capturePhoto}
                            style={{
                                width: '72px',
                                height: '72px',
                                borderRadius: '50%',
                                border: '4px solid white',
                                background: 'rgba(255,255,255,0.2)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: 0,
                                cursor: 'pointer',
                                boxShadow: '0 0 15px rgba(0,0,0,0.3)'
                            }}
                        >
                            <div style={{
                                width: '56px',
                                height: '56px',
                                borderRadius: '50%',
                                background: 'white'
                            }}></div>
                        </button>
                        <p style={{ color: 'white', margin: 0, fontSize: '0.8rem', opacity: 0.8, textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>
                            Inquadra lo scontrino e scatta
                        </p>
                    </div>
                </div>
            )}

            <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center', marginBottom: '2rem' }}>
                <canvas ref={canvasRef} style={{ display: 'none' }} />

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
                <label
                    className="btn-primary"
                    style={{ 
                        flex: '1 1 auto', 
                        minWidth: '140px', 
                        maxWidth: '200px', 
                        display: 'inline-flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        gap: '0.5rem',
                        cursor: isProcessing ? 'default' : 'pointer'
                    }}
                >
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />
                    {isProcessing ? (
                        <>
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            Attendere...
                        </>
                    ) : (
                        <>
                            <i className="bi bi-upload"></i>
                            Carica
                        </>
                    )}
                </label>

                <button
                    onClick={handleCameraClick}
                    className="btn-primary"
                    disabled={isProcessing}
                    style={{ 
                        flex: '1 1 auto', 
                        minWidth: '140px', 
                        maxWidth: '200px', 
                        display: 'inline-flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        gap: '0.5rem', 
                        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' 
                    }}
                >
                    {isProcessing ? (
                        <>
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            Attendere...
                        </>
                    ) : (
                        <>
                            <i className="bi bi-camera"></i>
                            Scatta
                        </>
                    )}
                </button>
            </div>
        </div>
    </>
);
};

export default UploadSection;
