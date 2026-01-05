
import React, { useState, useEffect } from 'react';
import { MemorialSeed } from '../types';

export default function VirtualGarden() {
  const [seeds, setSeeds] = useState<MemorialSeed[]>([]);
  const [form, setForm] = useState({ name: '', message: '', flowerType: 'rose' as MemorialSeed['flowerType'] });
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const savedSeeds = localStorage.getItem('jardin_espoir_seeds');
    if (savedSeeds) {
      try {
        const parsed = JSON.parse(savedSeeds);
        const formatted = parsed.map((s: any) => ({ ...s, date: new Date(s.date) }));
        setSeeds(formatted);
      } catch (e) {
        console.error("Erreur de chargement du jardin", e);
      }
    } else {
      const defaultSeeds: MemorialSeed[] = [
        { id: '1', name: 'Marie', message: 'Toujours dans mon cœur, petit ange.', flowerType: 'rose', color: 'pink', date: new Date() },
        { id: '2', name: 'Anonyme', message: 'Douces pensées pour toi.', flowerType: 'lily', color: 'white', date: new Date() },
        { id: '3', name: 'Papa de Léo', message: 'Ta lumière brille pour l’éternité.', flowerType: 'tulip', color: 'yellow', date: new Date() },
      ];
      setSeeds(defaultSeeds);
      localStorage.setItem('jardin_espoir_seeds', JSON.stringify(defaultSeeds));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.message) return;
    
    const newSeed: MemorialSeed = {
      id: Date.now().toString(),
      name: form.name || 'Anonyme',
      message: form.message,
      flowerType: form.flowerType,
      color: 'violet',
      date: new Date(),
    };
    
    const updatedSeeds = [newSeed, ...seeds];
    setSeeds(updatedSeeds);
    localStorage.setItem('jardin_espoir_seeds', JSON.stringify(updatedSeeds));
    
    setForm({ name: '', message: '', flowerType: 'rose' });
    setIsAdding(false);
  };

  const flowerIcons = {
    rose: '🌹',
    tulip: '🌷',
    lily: '🌸',
    daisy: '🌼'
  };

  return (
    <section id="jardin" className="py-20 bg-cream-perso/40">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-violet-perso mb-4">Le Jardin Mémoriel</h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto italic">Un espace paisible où chaque pensée devient une fleur. Laissez une trace, une lumière, un souffle pour votre ange.</p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {seeds.map((seed, index) => (
            <div 
              key={seed.id} 
              className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all transform hover:-translate-y-2 group relative border border-white animate-flower-entry"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="animate-flower-oniric inline-block mb-3" style={{ animationDelay: `${index * 0.5}s` }}>
                <div className="text-4xl">{flowerIcons[seed.flowerType]}</div>
              </div>
              <p className="text-xs font-bold text-violet-perso uppercase tracking-wider mb-1">{seed.name}</p>
              <p className="text-[10px] text-gray-400 mb-2">{seed.date.toLocaleDateString()}</p>
              
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-white/95 rounded-2xl flex items-center justify-center p-4 transition-opacity z-10 border border-violet-100 shadow-xl pointer-events-none group-hover:pointer-events-auto">
                <p className="text-xs italic text-gray-600 leading-relaxed">{seed.message}</p>
              </div>
            </div>
          ))}
          
          <button 
            onClick={() => setIsAdding(true)}
            className="border-2 border-dashed border-violet-200 p-6 rounded-2xl flex flex-col items-center justify-center text-violet-400 hover:bg-violet-50 hover:border-violet-400 transition"
          >
            <span className="text-3xl mb-2">+</span>
            <span className="text-xs font-bold uppercase">Planter une fleur</span>
          </button>
        </div>
      </div>

      {isAdding && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl p-8 shadow-2xl animate-in zoom-in duration-300">
            <h3 className="text-2xl font-bold text-violet-perso mb-6 text-center">Déposer une pensée</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Prénom ou Pseudo</label>
                <input 
                  type="text" 
                  value={form.name} 
                  onChange={e => setForm({...form, name: e.target.value})}
                  className="w-full p-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-violet-perso border-none" 
                  placeholder="Votre nom..." 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type de fleur</label>
                <div className="flex justify-between p-2 bg-gray-50 rounded-xl">
                  {Object.entries(flowerIcons).map(([type, icon]) => (
                    <button 
                      key={type}
                      type="button"
                      onClick={() => setForm({...form, flowerType: type as any})}
                      className={`text-2xl p-2 rounded-lg transition ${form.flowerType === type ? 'bg-white shadow-sm scale-110' : 'opacity-40 grayscale'}`}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Votre message</label>
                <textarea 
                  required
                  value={form.message}
                  onChange={e => setForm({...form, message: e.target.value})}
                  className="w-full p-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-violet-perso border-none h-32" 
                  placeholder="Quelques mots doux..."
                ></textarea>
              </div>
              <div className="flex space-x-3 pt-4">
                <button 
                  type="button" 
                  onClick={() => setIsAdding(false)} 
                  className="flex-1 py-3 text-gray-500 font-bold hover:text-gray-700 transition"
                >
                  Annuler
                </button>
                <button 
                  type="submit" 
                  className="flex-1 bg-violet-perso text-white py-3 rounded-xl font-bold shadow-lg hover:opacity-90 transition"
                >
                  Déposer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
