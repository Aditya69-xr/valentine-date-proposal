import React, { useState, useEffect } from 'react';
import { BookOpen, Sparkles, X, ExternalLink, Globe } from 'lucide-react';

/**
 * WikipediaLoveFacts
 * Real-time Wikipedia integration fetching verified historical data,
 * origin stories of Valentine's Day, Saint Valentine, and romance lore.
 */
export default function WikipediaLoveFacts() {
  const [isOpen, setIsOpen] = useState(false);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('Valentine\'s_Day');

  const topics = [
    { key: "Valentine's_Day", label: "Valentine's Day", icon: "💖" },
    { key: "Saint_Valentine", label: "Saint Valentine", icon: "🕊️" },
    { key: "Lupercalia", label: "Ancient Origins", icon: "🏛️" },
    { key: "Cupid", label: "Cupid & Love", icon: "🏹" }
  ];

  useEffect(() => {
    async function fetchWikiData() {
      setLoading(true);
      try {
        const results = await Promise.all(
          topics.map(async (topic) => {
            try {
              const res = await fetch(
                `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(topic.key)}`
              );
              if (!res.ok) throw new Error('Network error');
              const data = await res.json();
              return {
                key: topic.key,
                label: topic.label,
                icon: topic.icon,
                title: data.title || topic.label,
                extract: data.extract,
                thumbnail: data.thumbnail?.source,
                pageUrl: data.content_urls?.desktop?.page || `https://en.wikipedia.org/wiki/${topic.key}`
              };
            } catch {
              return null;
            }
          })
        );
        const valid = results.filter(Boolean);
        if (valid.length > 0) {
          setArticles(valid);
        }
      } catch (err) {
        console.warn('Wikipedia fetch fallback:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchWikiData();
  }, []);

  const currentArticle = articles.find((a) => a.key === activeTab) || articles[0];

  return (
    <>
      {/* Floating Pill Trigger */}
      <div
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 40
        }}
      >
        <button
          onClick={() => setIsOpen(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 18px',
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
          <Globe size={16} color="#9e1432" />
          <span>Real-time Wikipedia Lore</span>
          <span
            style={{
              fontSize: '10px',
              backgroundColor: '#ffe3e8',
              color: '#9e1432',
              padding: '2px 7px',
              borderRadius: '12px',
              fontWeight: 700
            }}
          >
            LIVE
          </span>
        </button>
      </div>

      {/* Modal / Slide-out Drawer */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(50, 10, 20, 0.45)',
            backdropFilter: 'blur(5px)',
            zIndex: 100,
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
              backgroundColor: '#fffdfc',
              borderRadius: '24px',
              border: '1.5px solid var(--rose-gold-light)',
              maxWidth: '560px',
              width: '100%',
              boxShadow: '0 25px 50px rgba(89, 2, 25, 0.3)',
              overflow: 'hidden',
              animation: 'float 0.4s ease-out'
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                background: 'linear-gradient(135deg, #670d1e 0%, #9e1432 100%)',
                color: '#fff',
                padding: '20px 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <BookOpen size={22} color="#f7d08a" />
                <div>
                  <h3 style={{ margin: 0, fontSize: '18px', fontFamily: 'var(--font-serif)', color: '#fff' }}>
                    Valentine's History & Lore
                  </h3>
                  <p style={{ margin: 0, fontSize: '12px', opacity: 0.85 }}>
                    Real-time internet data from Wikipedia API
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  cursor: 'pointer'
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Navigation Tabs */}
            <div
              style={{
                display: 'flex',
                gap: '8px',
                padding: '12px 20px',
                borderBottom: '1px solid #f1dede',
                backgroundColor: '#fff7f8',
                overflowX: 'auto'
              }}
            >
              {topics.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setActiveTab(t.key)}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '20px',
                    border: 'none',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    backgroundColor: activeTab === t.key ? '#9e1432' : '#ffffff',
                    color: activeTab === t.key ? '#ffffff' : '#6e4b52',
                    boxShadow: activeTab === t.key ? '0 4px 10px rgba(158, 20, 50, 0.25)' : 'none',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {t.icon} {t.label}
                </button>
              ))}
            </div>

            {/* Modal Content */}
            <div style={{ padding: '24px', maxHeight: '420px', overflowY: 'auto' }}>
              {loading ? (
                <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
                  <Sparkles className="animate-spin" size={28} color="#9e1432" style={{ margin: '0 auto 10px auto' }} />
                  <p>Fetching real-time Wikipedia data...</p>
                </div>
              ) : currentArticle ? (
                <div>
                  {currentArticle.thumbnail && (
                    <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                      <img
                        src={currentArticle.thumbnail}
                        alt={currentArticle.title}
                        style={{
                          maxHeight: '140px',
                          borderRadius: '12px',
                          boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                          border: '2px solid #f9d8dd'
                        }}
                      />
                    </div>
                  )}

                  <h4
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '20px',
                      color: 'var(--deep-red)',
                      marginBottom: '10px'
                    }}
                  >
                    {currentArticle.title}
                  </h4>

                  <p
                    style={{
                      fontSize: '14px',
                      lineHeight: '1.7',
                      color: '#42242b',
                      marginBottom: '20px'
                    }}
                  >
                    {currentArticle.extract}
                  </p>

                  <div
                    style={{
                      padding: '12px 16px',
                      borderRadius: '12px',
                      backgroundColor: '#fff0f3',
                      borderLeft: '4px solid #c9184a',
                      marginBottom: '16px'
                    }}
                  >
                    <p style={{ fontSize: '12px', color: '#800f2f', fontWeight: 600 }}>
                      💡 Historical Trivia:
                    </p>
                    <p style={{ fontSize: '13px', color: '#590d22', marginTop: '4px' }}>
                      {activeTab === "Valentine's_Day"
                        ? "Did you know? The association of Saint Valentine with romantic love began in the high Middle Ages with the circle of poet Geoffrey Chaucer!"
                        : activeTab === "Saint_Valentine"
                        ? "Saint Valentine of Rome is legendary for performing clandestine weddings for soldiers forbidden to marry by Emperor Claudius II."
                        : activeTab === "Cupid"
                        ? "In Roman mythology, Cupid (Amor) is the god of desire, affection, and erotic love, often depicted with his golden arrows of love."
                        : "Lupercalia was an ancient pastoral festival celebrated annually in Rome from February 13 to 15 to purify and avert evil spirits."}
                    </p>
                  </div>

                  <a
                    href={currentArticle.pageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      color: 'var(--crimson)',
                      fontSize: '13px',
                      fontWeight: 600,
                      textDecoration: 'none'
                    }}
                  >
                    <span>Read complete article on Wikipedia</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              ) : (
                <p style={{ color: 'var(--text-muted)' }}>Could not load data at the moment.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
