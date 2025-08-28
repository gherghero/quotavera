'use client';

import { useEffect, useState } from 'react';

type Props = {
  title: string;
  text: string;
};

export default function ShareButton({ title, text }: Props) {
  const [shareData, setShareData] = useState({ title, text, url: '' });

  useEffect(() => {
    // Set the URL only on the client-side
    setShareData(prev => ({ ...prev, url: window.location.href }));
  }, []);

  const handleShare = async () => {
    if (navigator.share && shareData.url) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.error('Error sharing:', error);
        // User probably cancelled the share action, do nothing.
      }
    } else if (shareData.url) {
      // Fallback for browsers that do not support the Web Share API
      try {
        await navigator.clipboard.writeText(shareData.url);
        alert('Link copiato negli appunti!');
      } catch (error) {
        console.error('Error copying to clipboard:', error);
        alert('Impossibile copiare il link. Per favore, copia l\'URL manualmente.');
      }
    }
  };

  return (
    <button
      onClick={handleShare}
      className="flex-1 flex items-center justify-center rounded-xl h-12 px-5 bg-gray-200 text-[#0e121b] text-base font-bold text-center"
    >
      Condividi
    </button>
  );
}
