import React from 'react';
import { useTheme } from 'next-themes'
import Link from 'next/link';

interface HeaderProps {
  className?: string;
}
const HandIcon = () => (
  <svg
    width={40}
    height={40}
    className="mr-1"
    viewBox="0 0 300 301"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  
  >
    <rect 
      y={1} 
      width={300} 
      height={300} 
      rx={52} 
      fill="none"
    />
    <g clipPath="url(#clip0_1_2)">
      <path
        d="M99.8032 197.534L101.232 157.834M79.5701 157.722C74.3201 157.678 69.2098 159.719 65.3635 163.398C61.5172 167.076 59.2499 172.09 59.0603 177.337C58.8708 182.584 60.7746 187.634 64.3529 191.375C67.9311 195.117 72.8908 197.244 78.1408 197.289L210.697 198.384C212.999 198.406 215.287 197.863 217.36 196.801L246.071 181.996C246.64 181.7 247.121 181.257 247.466 180.716C247.81 180.175 248.003 179.554 248.025 178.921C248.048 178.287 247.898 177.664 247.592 177.118C247.286 176.572 246.836 176.122 246.288 175.818L218.661 160.53C216.672 159.432 214.429 158.846 212.131 158.823L79.5701 157.722Z"
        stroke="var(--color-primary)"
        strokeWidth={15}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <g clipPath="url(#clip1_1_2)">
      <path
        d="M170.023 129.914L170.244 233.529C170.254 238.453 168.309 243.176 164.835 246.662C161.361 250.148 156.644 252.109 151.721 252.115C146.798 252.122 142.072 250.172 138.583 246.695C135.095 243.219 133.129 238.5 133.119 233.577L132.898 129.961"
        fill="var(--color-base-300)"
      />
      <path
        d="M207.148 129.867L207.043 80.3667Z"
        fill="none"
      />
      <path
        d="M207.056 86.5542L183.37 86.5843C178.729 86.5909 174.273 84.7536 170.984 81.4767L163.717 74.2342L135.749 74.2697C121.949 74.2912 108.718 79.7449 98.9164 89.451L76.9229 111.222L87.6878 110.589C95.3151 110.121 102.956 111.276 110.108 113.975C117.259 116.675 123.759 120.86 129.178 126.253L139.099 136.14L163.849 136.109L171.085 128.848C174.36 125.563 178.808 123.714 183.449 123.709L207.135 123.679"
        fill="var(--color-base-300)"
      />
      <path
        d="M170.023 129.914L170.244 233.529C170.254 238.453 168.309 243.176 164.835 246.662C161.361 250.148 156.644 252.109 151.721 252.115C146.798 252.122 142.072 250.172 138.583 246.695C135.095 243.219 133.129 238.5 133.119 233.577L132.898 129.961M207.148 129.867L207.043 80.3667M207.056 86.5542L183.37 86.5843C178.729 86.5909 174.273 84.7536 170.984 81.4767L163.717 74.2342L135.749 74.2697C121.949 74.2912 108.718 79.7449 98.9164 89.451L76.9229 111.222L87.6878 110.589C95.3151 110.121 102.956 111.276 110.108 113.975C117.259 116.675 123.759 120.86 129.178 126.253L139.099 136.14L163.849 136.109L171.085 128.848C174.36 125.563 178.808 123.714 183.449 123.709L207.135 123.679"
        stroke="var(--color-primary)"
        strokeWidth={15}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_1_2">
        <rect
          width={166.2}
          height={170.853}
          fill="white"
          transform="translate(145.886 297.201) rotate(-133.729)"
        />
      </clipPath>
      <clipPath id="clip1_1_2">
        <rect
          width={209.92}
          height={210.101}
          fill="white"
          transform="translate(3 148.688) rotate(-45.0974)"
        />
      </clipPath>
    </defs>
  </svg>
);


const Header: React.FC<HeaderProps> = ({ className }) => {
  
  const { theme, setTheme } = useTheme()


  return (
  
<div className={`navbar px-6 py-4 z-10 ${className || ''}`}>
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost px-1 lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li><Link href="/contact">Contact</Link></li>
    
        <li><a>Feedback</a></li>
      </ul>
    </div>
    <Link href="/" className="btn btn-ghost text-xl px-2"> <div className='flex items-center justify-items-center'>

<HandIcon/>
<span className="text-xl font-semibold text-primary mt-1">
  QwQ-TkitAI
</span>
</div> </Link>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      <li><Link href="/contact">Contact</Link></li>
    
      <li><a>Feedback</a></li>
    </ul>
  </div>
  <div className="navbar-end">
  <div className="flex gap-4">
        <label className="flex cursor-pointer gap-2">
        <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
  </svg>
  <input type="checkbox" className="toggle theme-controller" 
  onChange={() => setTheme(theme === "lofi" ? "night" : "lofi")}
  checked={theme === "lofi"}
/>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <circle cx="12" cy="12" r="5" />
    <path
      d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
  </svg>
</label>
        </div>  </div>
</div>
  );
};

export default Header;


