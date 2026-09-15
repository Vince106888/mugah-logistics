import { MessageCircleIcon } from 'lucide-react';
import { whatsappUrl } from '../utils/contact';

export function WhatsAppButton() {
  return (
    <a
      href={whatsappUrl('Hello Mugah Logistics, I would like help with a vehicle.')}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-[#1f7a54] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-black/20 transition duration-200 hover:-translate-y-0.5 hover:bg-forest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-bright focus-visible:ring-offset-2"
      aria-label="Chat with Mugah Logistics on WhatsApp">
      <MessageCircleIcon className="h-5 w-5" aria-hidden="true" />
      <span className="hidden sm:inline">WhatsApp us</span>
    </a>
  );
}
