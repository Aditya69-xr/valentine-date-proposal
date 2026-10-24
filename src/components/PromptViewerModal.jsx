import React, { useState } from 'react';
import { Code2, X, Check, Copy, FileJson, Sparkles } from 'lucide-react';

/**
 * PromptViewerModal
 * Displays the complete Prompt Engineering JSON specification
 * allowing judges to inspect real-time mapping between prompt and UI.
 */
export default function PromptViewerModal({ promptData }) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const jsonString = JSON.stringify(promptData, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* Floating Prompt Spec Trigger */}
      <button
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed',
          top: '20px',
          left: '20px',
          zIndex: 40,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '10px 16px',
          backgroundColor: 'rgba(255, 255, 255, 0.92)',
          backdropFilter: 'blur(10px)',
          border: '1.5px solid var(--rose-gold)',
          borderRadius: '999px',
          color: 'var(--deep-red)',
          fontWeight: 600,
          fontSize: '13px',
          boxShadow: '0 8px 20px rgba(103, 13, 30, 0.12)',
          cursor: 'pointer',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 12px 25px rgba(158, 20, 50, 0.2)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 8px 20px rgba(103, 13, 30, 0.12)';
        }}
      >
        <FileJson size={16} color="#9e1432" />
        <span>Inspect Prompt JSON</span>
      </button>

      {/* Modal */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(30, 5, 12, 0.6)',
            backdropFilter: 'blur(6px)',
            zIndex: 110,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
          onClick={() => setIsOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#1e1a1c',
              color: '#f8f9fa',
              borderRadius: '24px',
              border: '1.5px solid rgba(229, 169, 158, 0.3)',
              maxWidth: '680px',
              width: '100%',
              maxHeight: '85vh',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.5)',
              overflow: 'hidden'
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: '18px 24px',
                borderBottom: '1px solid #332b2e',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: '#262024'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Code2 size={20} color="#ff758f" />
                <div>
                  <h3 style={{ margin: 0, fontSize: '16px', color: '#ffb3c1', fontFamily: 'monospace' }}>
                    prompt_specification.json
                  </h3>
                  <span style={{ fontSize: '11px', color: '#a89da1' }}>
                    Active Prompt Engineering Blueprint
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <button
                  onClick={handleCopy}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 12px',
                    borderRadius: '8px',
                    backgroundColor: '#382f34',
                    border: '1px solid #4a3e45',
                    color: '#fff',
                    fontSize: '12px',
                    cursor: 'pointer'
                  }}
                >
                  {copied ? <Check size={14} color="#4ade80" /> : <Copy size={14} />}
                  <span>{copied ? 'Copied' : 'Copy JSON'}</span>
                </button>

                <button
                  onClick={() => setIsOpen(false)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#a89da1',
                    cursor: 'pointer',
                    padding: '4px'
                  }}
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Code Block */}
            <div
              style={{
                padding: '20px',
                overflowY: 'auto',
                fontFamily: 'Consolas, Monaco, monospace',
                fontSize: '13px',
                lineHeight: 1.5,
                backgroundColor: '#171415',
                color: '#f3c6cf'
              }}
            >
              <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                {jsonString}
              </pre>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
