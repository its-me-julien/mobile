import React, { useMemo } from 'react';

interface HeaderProps {
  title: string;
  gradientWords: string[]; // Now accepts full phrases
  gradientColors?: string[];
  gradientDirection?: string; // Allow custom gradient direction
  showArrow?: boolean;
  subtitle?: string;
  titleColor?: string;
  textColor?: string;
}

const Header: React.FC<HeaderProps> = ({
  title,
  gradientWords = [],
  gradientColors = ['#F6642D', '#D42E58', '#5A2FBA'],
  gradientDirection = 'to-r', // Default to rightward gradient
  showArrow = false,
  subtitle = "Your one-stop resource for all World Mobile support.",
  titleColor = 'white',
  textColor = 'text-gray-900',
}) => {
  const [startColor, middleColor, endColor] = gradientColors;

  // Memoized function to apply gradient to specific phrases
  const applyGradient = useMemo(() => {
    let processedTitle = title;
  
    // Loop through each gradient word/phrase and apply gradient
    gradientWords.forEach((phrase) => {
      const regex = new RegExp(`(${phrase})`, 'gi'); // Create a case-insensitive regex to match the phrase
      processedTitle = processedTitle.replace(regex, (match) => {
        return (
          `<span class="bg-gradient-${gradientDirection} from-[${startColor}] via-[${middleColor}] to-[${endColor}] bg-clip-text text-transparent whitespace-nowrap">
            ${match}
          </span>`
        );
      });
    });
  
    return processedTitle;
  }, [title, gradientWords, gradientDirection, startColor, middleColor, endColor]);
  
  return (
    <header className="grid grid-cols-1 gap-6 max-w-3xl mx-auto text-center py-20 px-4" role="banner">
      <div>
        <h1 className={`mb-6 ${titleColor === 'black' ? 'text-black' : titleColor}`} dangerouslySetInnerHTML={{ __html: applyGradient }} />
        <p className={`mb-8 leading-relaxed text-lg ${textColor}`}>
          {subtitle}
        </p>
      </div>
      {showArrow && (
        <div className="flex justify-center">
          <span className="text-2xl text-gray-900 animate-bounce" aria-label="Scroll down arrow">
            ↓
          </span>
        </div>
      )}
    </header>
  );
};

export default Header;
