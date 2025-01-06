import {
  FaFacebook,
  FaLinkedin,
  FaGithub,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white px-5 py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Follow Us Section */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Follow Us</h2>
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-400"
            >
              <FaFacebook size={24} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:text-blue-600"
            >
              <FaLinkedin size={24} />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-300"
            >
              <FaGithub size={24} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300"
            >
              <FaTwitter size={24} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-500 hover:text-pink-400"
            >
              <FaInstagram size={24} />
            </a>
          </div>
        </div>

        {/* Resources Section */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Resources</h2>
          <ul>
            <li className="mb-2">
              <a href="/about" className="hover:underline text-gray-300">
                About Us
              </a>
            </li>
            <li className="mb-2">
              <a href="/faq" className="hover:underline text-gray-300">
                FAQ
              </a>
            </li>
            <li className="mb-2">
              <a
                href="/privacy-policy"
                className="hover:underline text-gray-300"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="/terms-of-service"
                className="hover:underline text-gray-300"
              >
                Terms of Service
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Contact Us</h2>
          <p className="mb-2">
            Email:{" "}
            <a
              href="mailto:support@example.com"
              className="text-blue-400 hover:underline"
            >
              support@example.com
            </a>
          </p>
          <p>
            Phone:{" "}
            <a href="tel:+1234567890" className="text-blue-400 hover:underline">
              +123-456-7890
            </a>
          </p>
        </div>
      </div>

      <div className="text-center mt-8 text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} Edufy. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
