import React, { useState } from 'react';
import FloatingHeartsCanvas from './components/FloatingHeartsCanvas';
import WatercolorFlowers from './components/WatercolorFlowers';
import DelicateBirds from './components/DelicateBirds';
import WikipediaLoveFacts from './components/WikipediaLoveFacts';
import MusicPlayerToggle from './components/MusicPlayerToggle';
import ProposalScreen from './components/ProposalScreen';
import AvailabilityScreen from './components/AvailabilityScreen';
import FinalConfirmation from './components/FinalConfirmation';

export default function App() {
  // Screen state: 'I1_Proposal' | 'I2_Availability' | 'Final_Confirmation_Send'
  const [currentStep, setCurrentStep] = useState('I1_Proposal');
  const [planData, setPlanData] = useState(null);

  const handleProceedToI2 = () => {
    setCurrentStep('I2_Availability');
  };

  const handleAvailabilitySubmit = (data) => {
    setPlanData(data);
    setCurrentStep('Final_Confirmation_Send');
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
      {/* 3D Floating Hearts & Glitter/Bokeh Canvas */}
      <FloatingHeartsCanvas />

      {/* Watercolor Floral Frames */}
      <WatercolorFlowers />

      {/* Delicate Birds */}
      <DelicateBirds />

      {/* Top Bar: Music Player (Left of Wikipedia Lore) */}
      <MusicPlayerToggle />

      {/* Top Bar: Real-time Wikipedia Lore */}
      <WikipediaLoveFacts />

      {/* Main Flow */}
      <main style={{ position: 'relative', zIndex: 10, width: '100%' }}>
        {currentStep === 'I1_Proposal' && (
          <ProposalScreen onYes={handleProceedToI2} />
        )}

        {currentStep === 'I2_Availability' && (
          <AvailabilityScreen
            onSubmit={handleAvailabilitySubmit}
            onBack={() => setCurrentStep('I1_Proposal')}
          />
        )}

        {currentStep === 'Final_Confirmation_Send' && (
          <FinalConfirmation planData={planData} />
        )}
      </main>
    </div>
  );
}
