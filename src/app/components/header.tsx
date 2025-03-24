import React from 'react';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <header className={`navbar px-6 py-4 z-10 ${className || ''}`}>
      <div className="navbar-start">
        <span className="text-xl font-semibold text-primary">
          Quicktools
        </span>
      </div>
      
      <div className="navbar-end">
        <div className="flex gap-4">
         
        </div>
      </div>
    </header>
  );
};

export default Header;