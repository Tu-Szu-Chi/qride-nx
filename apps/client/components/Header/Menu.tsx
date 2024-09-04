import Link from 'next/link';
import React from 'react';

const menuItems = [
  ['Home', '/home'],
  ['Member', '/member'],
  ['My Garage', '/garage'],
  ['Service Records', ''],
  ['Coupons', ''],
  ['News', '/news'],
  ['Promotion', ''],
  ['Contact Us', ''],
  ['Privacy Policy', '/privacy-policy'],
  ['Terms of Service', '/terms-of-service'],
];

type Props = {
  isOpen?: boolean;
  onClose?: () => void;
};
const Menu: React.FC<Props> = ({ isOpen, onClose }) => {
  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-30 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      <div
        className={`fixed top-0 left-0 h-full pt-12 w-64 bg-orange-600 z-50 text-white transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="px-6">
          <button onClick={onClose} className="text-4xl mb-4">
            ×
          </button>
          <nav className="px-6 text-xl">
            <ul>
              {menuItems.map((item, index) => (
                <li key={index} className="py-4">
                  <Link href={item[1]} className="hover:underline">
                    {item[0]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Menu;
