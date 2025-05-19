import React from 'react';

const ProgressBar = ({ completedStep, totalSteps }) => {
  if (!totalSteps || totalSteps <= 0) return null;

  const percentage = ((completedStep / totalSteps) * 100);


   let barColor = 'red'; 
  if (percentage >= 75) {
    barColor = 'green'; 
  } else if (percentage >= 50) {
    barColor = 'orange'; 
  }

  return (
    <div style={{ width: '100%', backgroundColor: '#eee', borderRadius: '8px', height: '10px' }}>
      <div
        style={{
          width: `${percentage}%`,
          backgroundColor: barColor,
          height: '100%',
          borderRadius: '8px',
          transition: 'width 0.3s ease-in-out',
        }}
      ></div>
    
    </div>
  );
};

export default ProgressBar;
