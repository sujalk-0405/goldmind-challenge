import React, { useState } from 'react';
import { SUBJECTS } from '../constants';
import { useGame } from '../context/GameContext';

export const Leaderboard: React.FC = () => {
  const { leaderboard } = useGame();
  const [filter, setFilter] = useState('All');

  const filteredData = filter === 'All' 
    ? leaderboard 
    : leaderboard.filter(item => item.subject === filter);

  return (
    <div className="min-h-screen pt-24 px-4 pb-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-heading font-bold text-center mb-4 text-gold">Leaderboard</h1>
        <p className="text-center text-gray-400 mb-10">Top performers of the GoldMind Challenge.</p>

        {/* Filter */}
        <div className="flex justify-end mb-6">
            <select 
                value={filter} 
                onChange={(e) => setFilter(e.target.value)}
                className="bg-deep border border-gold/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-gold"
            >
                <option value="All">All Subjects</option>
                {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
        </div>

        {/* Table */}
        <div className="bg-deep/50 border border-white/10 rounded-2xl overflow-hidden shadow-xl">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-midnight/80 text-gold uppercase text-xs tracking-wider border-b border-white/10">
                        <th className="p-4 md:p-6">Rank</th>
                        <th className="p-4 md:p-6">Name</th>
                        <th className="p-4 md:p-6 hidden md:table-cell">Subject</th>
                        <th className="p-4 md:p-6">Status</th>
                        <th className="p-4 md:p-6 hidden md:table-cell">Date</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    {filteredData.map((player) => (
                        <tr key={`${player.rank}-${player.name}`} className="hover:bg-white/5 transition-colors group">
                            <td className="p-4 md:p-6 font-bold text-white">
                                {player.rank === 1 && '🥇'}
                                {player.rank === 2 && '🥈'}
                                {player.rank === 3 && '🥉'}
                                {player.rank > 3 && `#${player.rank}`}
                            </td>
                            <td className="p-4 md:p-6 font-medium text-white group-hover:text-gold transition-colors">{player.name}</td>
                            <td className="p-4 md:p-6 text-gray-400 hidden md:table-cell">{player.subject}</td>
                            <td className="p-4 md:p-6">
                                <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${player.status === 'Completed' ? 'bg-correct/20 text-correct' : 'bg-gold/10 text-gold'}`}>
                                    {player.status}
                                </span>
                            </td>
                            <td className="p-4 md:p-6 text-gray-500 text-sm hidden md:table-cell">{player.date}</td>
                        </tr>
                    ))}
                    {filteredData.length === 0 && (
                        <tr>
                            <td colSpan={5} className="p-8 text-center text-gray-500">No records found for this filter.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};