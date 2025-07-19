import { Phone, Shield, Globe } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 px-6 py-4">
      <div className="flex flex-col md:flex-row items-center justify-between text-sm text-gray-600">
        <div className="flex items-center space-x-6 mb-2 md:mb-0">
          <a href="#" className="flex items-center hover:text-blue-600 transition-colors">
            <Phone className="h-4 w-4 mr-1" />
            Emergency: 100
          </a>
          <a href="#" className="hover:text-blue-600 transition-colors">
            Help
          </a>
          <a href="#" className="hover:text-blue-600 transition-colors">
            Privacy Policy
          </a>
        </div>
        <div className="flex items-center space-x-2">
          <Shield className="h-4 w-4" />
          <span>Secure • On-Premise • WCAG AA</span>
        </div>
      </div>
    </footer>
  );
};