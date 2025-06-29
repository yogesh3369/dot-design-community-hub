


function Footer() {
  return (
    <footer className="bg-lbd-dark pt-16 pb-12">
      <div className="relative">
        {/* Background gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-lbd-pink/[0.05] via-transparent to-purple-500/[0.05] blur-3xl" />
        
        <div className="container-custom px-4 md:px-6 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Logo and Description */}
            <div className="col-span-1">
              <div className="flex items-center mb-4">
                <img src="/LBD.svg" alt="Dot Design Community Hub Logo" className="h-16 w-auto" />
              </div>
              <p className="text-gray-300 text-sm mt-2">
                Empowering designers and developers through community, resources, and events.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/" className="block text-gray-300 hover:text-lbd-pink text-sm py-1">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/events" className="block text-gray-300 hover:text-lbd-pink text-sm py-1">
                    Events
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-white font-semibold mb-4">Contact Us</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>Email: littlebigdots2024@gmail.com</li>
                <li>Phone: +91 9667102848</li>
                <li>Location: India</li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex justify-center">
              <p className="text-gray-400 text-sm">
                &copy; {new Date().getFullYear()} Dot Design Community Hub. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer
