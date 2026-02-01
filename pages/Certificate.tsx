import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { Button } from '../components/Button';

export const Certificate: React.FC = () => {
  const navigate = useNavigate();
  const { player, gameStatus, score } = useGame();

  if (!player || gameStatus !== 'won') {
    navigate('/');
    return null;
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen pt-24 pb-12 flex flex-col items-center justify-center px-4 bg-midnight">
       {/* Certificate Container (simulates paper) */}
       <div id="certificate-area" className="relative w-full max-w-4xl bg-[#FFFAFA] text-black p-2 md:p-4 shadow-2xl overflow-hidden mb-8">
          <div className="border-[12px] border-double border-[#F5C542] h-full w-full p-8 md:p-16 relative flex flex-col items-center justify-center text-center">
             
             {/* Corner Ornaments (CSS shapes) */}
             <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-[#4C1D95]"></div>
             <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-[#4C1D95]"></div>
             <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-[#4C1D95]"></div>
             <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-[#4C1D95]"></div>

             {/* Content */}
             <div className="mb-6">
                <span className="text-[#4C1D95] font-bold text-2xl tracking-widest border-b-2 border-[#F5C542]">GMC</span>
             </div>

             <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#4C1D95] mb-4 uppercase tracking-wider">
                Certificate of Achievement
             </h1>
             
             <p className="text-gray-600 italic text-lg mb-8">This is to certify that</p>
             
             <h2 className="text-3xl md:text-5xl font-bold text-[#D97706] mb-8 font-heading decoration-clone">
                {player.name}
             </h2>
             
             <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8 max-w-2xl">
                has successfully completed all 12 rounds of the <span className="font-bold text-[#4C1D95]">GoldMind Challenge</span>, demonstrating exceptional mastery in the subject of <span className="font-bold text-[#4C1D95]">{player.subject}</span>.
             </p>

             <p className="text-md font-bold text-[#4C1D95] mb-12">Final Score: {score} Points</p>

             <div className="w-full flex justify-between items-end mt-8 px-4 md:px-12">
                 <div className="text-center">
                    <p className="text-sm text-gray-500 mb-2">{new Date().toLocaleDateString()}</p>
                    <div className="w-32 h-px bg-gray-400 mx-auto"></div>
                    <p className="font-bold text-[#4C1D95] mt-2">Date</p>
                 </div>

                 {/* Seal */}
                 <div className="hidden md:flex flex-col items-center justify-center w-24 h-24 rounded-full border-4 border-[#F5C542] text-[#F5C542]">
                    <span className="text-2xl">🏅</span>
                 </div>

                 <div className="text-center">
                    <p className="font-serif italic text-xl text-[#D97706] mb-1">GoldMind</p>
                    <div className="w-32 h-px bg-gray-400 mx-auto"></div>
                    <p className="font-bold text-[#4C1D95] mt-2">Signature</p>
                 </div>
             </div>
          </div>
       </div>

       <div className="flex gap-4 print:hidden">
          <Button onClick={handlePrint}>Download PDF</Button>
          <Button variant="secondary" onClick={() => navigate('/')}>Back Home</Button>
       </div>

       <style>{`
         @media print {
           body * {
             visibility: hidden;
           }
           #certificate-area, #certificate-area * {
             visibility: visible;
           }
           #certificate-area {
             position: absolute;
             left: 0;
             top: 0;
             margin: 0;
             padding: 0;
             width: 100vw;
             height: 100vh;
             border: none;
             box-shadow: none;
             display: flex;
             align-items: center;
             justify-content: center;
           }
           @page {
             size: landscape;
             margin: 0;
           }
         }
       `}</style>
    </div>
  );
};