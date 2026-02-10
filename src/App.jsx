import { useState, useEffect } from 'react';
import UploadSection from './components/UploadSection';
import ReceiptTable from './components/ReceiptTable';
import SummaryCard from './components/SummaryCard';
import HistoryTable from './components/HistoryTable';
import ApiKeyModal from './components/ApiKeyModal';
import DataManagementCard from './components/DataManagementCard';
import { processReceiptImage } from './services/geminiService';
import pkg from '../package.json';
import './App.css';

function App() {
  const version = pkg.version;
  const [receipts, setReceipts] = useState([]);
  const [globalTotal, setGlobalTotal] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [apiKey, setApiKey] = useState(localStorage.getItem('gemini_api_key') || import.meta.env.VITE_GEMINI_API_KEY || '');
  const [showModal, setShowModal] = useState(!apiKey);

  useEffect(() => {
    if (apiKey) {
      localStorage.setItem('gemini_api_key', apiKey);
      setShowModal(false);
    } else {
      setShowModal(true);
    }
  }, [apiKey]);

  const handleImageUpload = async (file) => {
    setIsProcessing(true);
    setError(null);
    try {
      const result = await processReceiptImage(file, apiKey);

      if (result && Array.isArray(result.prodotti)) {
        const resultItems = result.prodotti;
        const receiptTotal = resultItems.reduce((acc, item) => acc + (item.prezzo || 0), 0);

        const newReceipt = {
          id: crypto.randomUUID(),
          items: resultItems,
          total: receiptTotal,
          timestamp: result.data || new Date().toISOString()
        };

        setReceipts(prev => [...prev, newReceipt]);
        setGlobalTotal(prev => prev + receiptTotal);
      } else {
        throw new Error("Formato dati non valido dal server.");
      }
    } catch (err) {
      setError(err.message || "Errore durante l'elaborazione.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(receipts, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

    const exportFileDefaultName = `scontrini_backup_${new Date().toISOString().slice(0, 10)}.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleImport = (e) => {
    const fileReader = new FileReader();
    const file = e.target.files[0];

    if (!file) return;

    fileReader.readAsText(file, "UTF-8");
    fileReader.onload = (event) => {
      try {
        const importedData = JSON.parse(event.target.result);
        if (Array.isArray(importedData)) {
          // Validate structure roughly
          const isValid = importedData.every(r => r.id && r.items && typeof r.total === 'number');
          if (isValid) {
            setReceipts(importedData);
            const newGlobalTotal = importedData.reduce((acc, r) => acc + r.total, 0);
            setGlobalTotal(newGlobalTotal);
            setError(null);
          } else {
            throw new Error("Struttura file non valida.");
          }
        } else {
          throw new Error("Il file deve contenere una lista di scontrini.");
        }
      } catch (err) {
        setError("Errore durante l'importazione: " + err.message);
      }
    };
    // Reset input
    e.target.value = '';
  };

  return (
    <div className="app-container" style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem 1rem' }}>
      {showModal && <ApiKeyModal currentApiKey={apiKey} onSave={setApiKey} onClose={() => setShowModal(false)} />}

      <header style={{ marginBottom: '2rem', textAlign: 'center', position: 'relative' }}>
        <button
          onClick={() => setShowModal(true)}
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            background: 'rgba(255,255,255,0.1)',
            border: 'none',
            color: '#94a3b8',
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s'
          }}
          title="Configura Chiave API"
        >
          <i className="bi bi-gear-fill"></i>
        </button>

        <div style={{
          width: '64px',
          height: '64px',
          background: 'var(--glass-bg)',
          borderRadius: '16px',
          margin: '0 auto 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid var(--glass-border)'
        }}>
          <i className="bi bi-receipt-cutoff" style={{ fontSize: '32px', color: '#ec4899' }}></i>
        </div>
        <h1 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
          Scontrini
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>
          Riconoscimento Intelligente
        </p>
      </header>

      <UploadSection onImageUpload={handleImageUpload} isProcessing={isProcessing} />

      <SummaryCard total={globalTotal} receiptCount={receipts.length} />

      {error && (
        <div className="alert alert-danger glass-panel" style={{
          padding: '1rem',
          color: '#f87171',
          background: 'rgba(239, 68, 68, 0.1)',
          textAlign: 'center',
          marginBottom: '1.5rem',
          border: '1px solid rgba(239, 68, 68, 0.2)'
        }}>
          <i className="bi bi-exclamation-triangle-fill" style={{ marginRight: '0.5rem' }}></i>
          {error}
        </div>
      )}

      <HistoryTable receipts={receipts} />

      <ReceiptTable receipts={receipts} />

      <DataManagementCard onExport={handleExport} onImport={handleImport} />

      <footer style={{
        marginTop: '3rem',
        textAlign: 'center',
        fontSize: '0.85rem',
        color: '#64748b',
        borderTop: '1px solid var(--glass-border)',
        paddingTop: '1.5rem'
      }}>
        <p>Scontrini v{version} &bull; Sviluppato da <strong>Edney Pugliese</strong></p>
        <div style={{ marginTop: '0.5rem', display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
          <a href="mailto:contatto@edneypugliese.it" style={{ color: 'inherit', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            <i className="bi bi-envelope-fill" style={{ marginRight: '0.5rem' }}></i>
            contatto@edneypugliese.it
          </a>
          <a href="mailto:contatto@edney.it" style={{ color: 'inherit', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            <i className="bi bi-envelope-fill" style={{ marginRight: '0.5rem' }}></i>
            contatto@edney.it
          </a>
          <a href="https://www.edneypugliese.it" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            <i className="bi bi-globe" style={{ marginRight: '0.5rem' }}></i>
            edneypugliese.it
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
