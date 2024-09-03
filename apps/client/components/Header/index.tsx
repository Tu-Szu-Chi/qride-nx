import React, { BaseHTMLAttributes, useState } from 'react';
import Menu from './Menu';

type Props = BaseHTMLAttributes<HTMLDivElement> & {
  title?: string;
};
const Header: React.FC<Props> = ({ title }) => {
  const [isOpen, toggleOpen] = useState<boolean>(false)
  return (
    <header className="bg-primary pt-14 pb-2 text-white px-4 w-full" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 999
    }}>
      <div className="container mx-auto flex justify-between items-center">
        <button className="text-2xl" onClick={() => toggleOpen(pre => !pre)}>☰</button>
        {title && <h1 className="text-white text-xl font-bold">{title}</h1>}
        <div>
          <img src="/assets/logo.png" />
        </div>
        {!title && <div className="w-6"></div>}
      </div>
      <Menu isOpen={isOpen} onClose={() => toggleOpen(pre => !pre)} />
    </header>
  );
};



export default Header;
