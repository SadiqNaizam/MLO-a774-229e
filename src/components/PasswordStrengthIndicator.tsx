import React, { useEffect, useState } from 'react';

interface PasswordStrengthIndicatorProps {
  password?: string;
}

type StrengthLevel = 'Too weak' | 'Weak' | 'Medium' | 'Strong';

interface Strength {
  level: StrengthLevel;
  color: string; // Tailwind color class
  score: number; // 0-3
}

const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({ password = '' }) => {
  const [strength, setStrength] = useState<Strength>({ level: 'Too weak', color: 'bg-red-500', score: 0 });

  useEffect(() => {
    console.log("PasswordStrengthIndicator: password changed, evaluating strength.");
    let score = 0;
    const newStrength: Strength = { level: 'Too weak', color: 'bg-gray-200', score: 0 };

    if (!password || password.length === 0) {
        newStrength.level = 'Too weak';
        newStrength.color = 'bg-gray-200'; // Neutral when empty
        newStrength.score = 0;
    } else {
        if (password.length >= 8) score++;
        if (password.match(/[a-z]/)) score++;
        if (password.match(/[A-Z]/)) score++;
        if (password.match(/[0-9]/)) score++;
        if (password.match(/[^a-zA-Z0-9\s]/)) score++; // Special characters

        // Adjust score interpretation based on typical levels
        if (score <= 1 && password.length > 0) {
            newStrength.level = 'Too weak';
            newStrength.color = 'bg-red-500';
            newStrength.score = 0; // Display one bar for "Too weak" if not empty
        } else if (score === 2) {
            newStrength.level = 'Weak';
            newStrength.color = 'bg-orange-500';
            newStrength.score = 1;
        } else if (score === 3 || score === 4) {
            newStrength.level = 'Medium';
            newStrength.color = 'bg-yellow-500';
            newStrength.score = 2;
        } else if (score >= 5) {
            newStrength.level = 'Strong';
            newStrength.color = 'bg-green-500';
            newStrength.score = 3;
        }
    }
    
    setStrength(newStrength);
  }, [password]);

  console.log(`Rendering PasswordStrengthIndicator, current strength: ${strength.level}`);

  return (
    <div className="mt-2">
      <div className="flex space-x-1 h-2 rounded-full overflow-hidden">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className={`flex-1 transition-colors duration-300 rounded
                        ${password.length === 0 ? 'bg-gray-200' : 
                        (index <= strength.score ? strength.color : 'bg-gray-200')}`}
          />
        ))}
      </div>
      {password.length > 0 && (
        <p className={`text-xs mt-1 ${
            strength.score === 0 ? 'text-red-500' :
            strength.score === 1 ? 'text-orange-500' :
            strength.score === 2 ? 'text-yellow-600' : // Darker yellow for better readability
            'text-green-500'
        }`}>
          Strength: {strength.level}
        </p>
      )}
    </div>
  );
};

export default PasswordStrengthIndicator;