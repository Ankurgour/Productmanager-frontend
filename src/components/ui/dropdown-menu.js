import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

function DropdownMenu({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <div onClick={toggleMenu}>
        {children[0]} {/* DropdownMenuTrigger */}
      </div>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md ring-1 ring-black ring-opacity-5">
          {children[1]} {/* DropdownMenuContent */}
        </div>
      )}
    </div>
  );
}

DropdownMenu.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

function DropdownMenuTrigger({ children, asChild }) {
  if (asChild) {
    return <>{children}</>;
  }

  return <div>{children}</div>;
}

DropdownMenuTrigger.propTypes = {
  children: PropTypes.node.isRequired,
  asChild: PropTypes.bool,
};

DropdownMenuTrigger.defaultProps = {
  asChild: false,
};

function DropdownMenuContent({ children, align }) {
  let alignmentClass = '';

  if (align === 'end') {
    alignmentClass = 'origin-top-right right-0';
  }

  return (
    <div className={`py-1 ${alignmentClass}`} role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
      {children}
    </div>
  );
}

DropdownMenuContent.propTypes = {
  children: PropTypes.node.isRequired,
  align: PropTypes.oneOf(['start', 'end']),
};

DropdownMenuContent.defaultProps = {
  align: 'start',
};

function DropdownMenuItem({ children }) {
  return (
    <div className="hover:bg-gray-100 hover:text-primary cursor-pointer px-3 py-2 text-sm font-medium">
      {children}
    </div>
  );
}

DropdownMenuItem.propTypes = {
  children: PropTypes.node.isRequired,
};

export { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem };
