import React from 'react';

// Utility function to combine className strings
const classNames = (...classes: (string | undefined)[]) => {
  return classes.filter(Boolean).join(' ');
};

interface NavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  active?: boolean;
  variant?: 'default' | 'subtle';
  size?: 'sm' | 'md';
  href: string;
}

export default function NavLink({
  active = false,
  variant = 'default',
  size = 'sm',
  className = '',
  children,
  href,
  ...props
}: NavLinkProps) {
  const baseStyles = 'inline-flex items-center border-b-2 px-1 pt-1 font-medium transition duration-150 ease-in-out focus:outline-none';

  const variants = {
    default: {
      active: 'border-indigo-400 text-gray-900 focus:border-indigo-700',
      inactive: 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 focus:border-gray-300 focus:text-gray-700'
    },
    subtle: {
      active: 'border-gray-300 text-gray-700 focus:border-gray-400',
      inactive: 'border-transparent text-gray-500 hover:border-gray-200 hover:text-gray-600 focus:border-gray-200 focus:text-gray-600'
    }
  };

  const sizes = {
    sm: 'text-sm leading-5',
    md: 'text-base leading-6'
  };

  return (
    <a
      href={href}
      {...props}
      className={classNames(
        baseStyles,
        sizes[size],
        active ? variants[variant].active : variants[variant].inactive,
        className
      )}
    >
      {children}
    </a>
  );
}
