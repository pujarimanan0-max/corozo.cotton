import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  return (
    <a 
      href="https://wa.me/91XXXXXXXXXX" 
      target="_blank" 
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center group"
    >
      <MessageCircle className="w-6 h-6" />
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-300 whitespace-nowrap text-sm font-medium">
        Chat with us
      </span>
    </a>
  );
}
