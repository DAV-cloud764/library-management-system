const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-top py-3 px-4 mt-auto">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">

        {/* Left */}
        <div className="text-muted small">
          © {currentYear} Student Library Management System.
          All Rights Reserved.
        </div>

        {/* Right */}
        

      </div>
    </footer>
  );
};

export default Footer;