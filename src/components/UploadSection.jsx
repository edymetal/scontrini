import React, { useRef, useState, useEffect } from 'react';

const UploadSection = ({ onImageUpload, isProcessing }) => {
    const uploadInputRef = useRef(null);
    const cameraInputRef = useRef(null);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    const [isWebcamOpen, setIsWebcamOpen] = useState(false);
    const [stream, setStream] = useState(null);

    const isMobile = () => {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            onImageUpload(file);
        }
    };

    const handleUploadClick = () => {
        uploadInputRef.current.click();
    };

    const handleCameraClick = async () => {
        if (isMobile()) {
            cameraInputRef.current.click();
        } else {
            try {
                const newStream = await navigator.mediaDevices.getUserMedia({
                    video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }
                });
                setStream(newStream);
                setIsWebcamOpen(true);
            } catch (err) {
                console.error("Errore nell'accesso alla webcam:", err);
                alert("Non è stato possibile accedere alla webcam. Assicurati di aver dato i permessi.");
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
        <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center', marginBottom: '2rem' }}>
            {/* Standard Upload Input */}
            <input
                type="file"
                accept="image/*"
                ref={uploadInputRef}
                style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', border: 0 }}
                onChange={handleFileChange}
            />

            {/* Camera Input (for Mobile) */}
            <input
                type="file"
                accept="image/*"
                capture="environment"
                ref={cameraInputRef}
                style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', border: 0 }}
                onChange={handleFileChange}
            />

            <canvas ref={canvasRef} style={{ display: 'none' }} />

            {/* Desktop Webcam Modal */}
            {isWebcamOpen && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'rgba(15, 23, 42, 0.9)',
                    backdropFilter: 'blur(10px)',
                    zIndex: 2000,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '1rem'
                }}>
                    <div className="glass-panel" style={{
                        width: '100%',
                        maxWidth: '800px',
                        overflow: 'hidden',
                        position: 'relative',
                        padding: '10px'
                    }}>
                        <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            style={{
                                width: '100%',
                                borderRadius: '15px',
                                background: '#000',
                                display: 'block'
                            }}
                        />

                        <div style={{
                            marginTop: '1.5rem',
                            display: 'flex',
                            gap: '1rem',
                            justifyContent: 'center',
                            padding: '1rem'
                        }}>
                            <button
                                onClick={stopWebcam}
                                className="btn-primary"
                                style={{
                                    background: 'rgba(255,255,255,0.1)',
                                    color: 'white',
                                    boxShadow: 'none',
                                    flex: '1',
                                    maxWidth: '150px'
                                }}
                            >
                                Annulla
                            </button>
                            <button
                                onClick={capturePhoto}
                                className="btn-primary"
                                style={{
                                    flex: '1',
                                    maxWidth: '150px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.5rem'
                                }}
                            >
                                <i className="bi bi-camera-fill"></i> Scatta
                            </button>
                        </div>
                    </div>
                </div>
            )}

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
