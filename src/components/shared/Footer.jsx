import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <footer className="bg-red-400 py-12 text-muted-foreground">
      {/* <div className="container mx-auto grid grid-cols-1 gap-8 px-4 md:grid-cols-3"> */}
      <div className="container mx-auto grid grid-cols-3 gap-4 sm:grid-cols-3 md:grid-cols-3 md:gap-8 px-4 ">
        <div className="space-y-4">
        <div className="flex justify-center items-center"><PackageIcon className="h-10 w-10 text-primary" />
        <h3 className="text-lg font-semibold">Product manager</h3></div>
          <div className="space-y-2 text-sm">
            <p>Ankur Sharma</p>
            <p>123 Main St, Anytown USA</p>
            <p>Phone: (123) 456-7890</p>
            <p>Email: ankur@example.com</p>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <p className="mt-20 text-sm">Made with 🖤 by Ankur &copy; 2024 Acme Inc.</p>
        </div>
        <div className="space-y-4 text-right mr-2">
          <h3 className="text-lg font-semibold">Follow Us</h3>
          <div className="flex items-center justify-end gap-4">
            <Link href="https://x.com/Ankur_gour09" className="text-muted-foreground hover:text-foreground" prefetch={"false"}>
              <TwitterIcon className="h-5 w-5" />
            </Link>
            <Link href="https://www.linkedin.com/in/ankurgour07/" className="text-muted-foreground hover:text-foreground" prefetch={"false"}>
              <LinkedInIcon className="h-5 w-5" />
            </Link>
            <Link href="https://www.instagram.com/__ankur_07/" className="text-muted-foreground hover:text-foreground" prefetch={"false"}>
              <InstagramIcon className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

function LinkedInIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
        <path d="M10 10h4v7h-4z" />
        <path d="M9 6h6" />
        <path d="M9 12h.01" />
        <path d="M9 9h.01" />
      </svg>
    );
  }
  
  


function InstagramIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}


function TwitterIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  )
}
function PackageIcon(props) {
    return (
      <svg
          {...props}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
      >
          <path d="m7.5 4.27 9 5.15" />
          <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
          <path d="m3.3 7 8.7 5 8.7-5" />
          <path d="M12 22V12" />
      </svg>
    );
}