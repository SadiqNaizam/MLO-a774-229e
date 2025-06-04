import React from 'react';
import { Button, ButtonProps } from '@/components/ui/button'; // Assuming Button is a shadcn/ui component
import { LucideProps } from 'lucide-react'; // For icon type

interface SocialLoginButtonProps extends ButtonProps {
  providerName: string;
  icon?: React.ReactElement<LucideProps>; // Allow passing a Lucide icon component
  onClick: () => void;
}

const SocialLoginButton: React.FC<SocialLoginButtonProps> = ({
  providerName,
  icon,
  onClick,
  className,
  children,
  ...props
}) => {
  console.log(`Rendering SocialLoginButton for provider: ${providerName}`);

  return (
    <Button
      variant="outline"
      className={`w-full flex items-center justify-center gap-2 ${className || ''}`}
      onClick={onClick}
      {...props}
    >
      {icon && React.cloneElement(icon, { className: "h-5 w-5" })}
      <span>{children || `Sign in with ${providerName}`}</span>
    </Button>
  );
};

export default SocialLoginButton;