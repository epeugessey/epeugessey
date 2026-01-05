
import React, { useState } from 'react';
import Layout from './components/Layout';
import ChatBot from './components/ChatBot';
import VirtualGarden from './components/VirtualGarden';

export default function App() {
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [showAdmin, setShowAdmin] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) return;

    setIsSubmitting(true);
    
    const newMessage = {
      id: Date.now(),
      ...contactForm,
      date: new Date().toLocaleString('fr-FR')
    };

    const existingMessages = JSON.parse(localStorage.getItem('jardin_espoir_contacts') || '[]');
    const updatedMessages = [newMessage, ...existingMessages];
    
    localStorage.setItem('jardin_espoir_contacts', JSON.stringify(updatedMessages));

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setContactForm({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }, 1000);
  };

  const exportData = (key: string, fileName: string) => {
    const data = JSON.parse(localStorage.getItem(key) || '[]');
    if (data.length === 0) {
      alert("Aucune donnée à exporter pour le moment.");
      return;
    }

    // Conversion en CSV simple
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map((obj: any) => 
      Object.values(obj).map(val => `"${String(val).replace(/"/g, '""')}"`).join(',')
    );
    const csvContent = [headers, ...rows].join('\n');
    
    // Création du lien de téléchargement
    const blob = new Blob(["\ufeff" + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `${fileName}_${new Date().toLocaleDateString()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Layout>
      <header className="bg-cream-perso/80 py-20 md:py-32 px-4 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-32 h-32 bg-violet-perso rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-horizon-perso rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-block px-4 py-1 bg-violet-100 text-violet-perso text-xs font-bold rounded-full mb-6 uppercase tracking-widest">
            Sanctuaire de Solidarité
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
            Vous n'êtes plus seul(e) <br/>
            <span className="text-violet-perso">sur le chemin.</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Le Jardin de l'Espoir est un havre de paix dédié aux <strong className="text-violet-perso">Paranges</strong>. 
            Trouvez du réconfort, partagez votre histoire et honorez la mémoire de votre ange.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="#contact" className="bg-violet-perso text-white text-lg font-bold py-4 px-10 rounded-full shadow-xl hover:scale-105 transition transform">
              Trouver du soutien
            </a>
            <a href="#jardin" className="bg-white text-violet-perso border-2 border-violet-100 text-lg font-bold py-4 px-10 rounded-full shadow-lg hover:bg-violet-50 transition transform">
              Visiter le jardin
            </a>
          </div>
        </div>
      </header>

      <section id="mission" className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-violet-perso mb-4">Notre Mission</h2>
            <div className="w-20 h-1.5 bg-horizon-perso mx-auto rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                title: "Écoute Empathique",
                desc: "Un accompagnement humain et technologique pour libérer la parole en toute confidentialité.",
                icon: "🌿"
              },
              {
                title: "Espace de Recueillement",
                desc: "Un jardin virtuel pour planter des fleurs mémorielles et cultiver la mémoire de vos disparus.",
                icon: "✨"
              },
              {
                title: "Solidarité",
                desc: "Connecter les paranges pour ne plus jamais se sentir isolé face au deuil périnatal.",
                icon: "🤝"
              }
            ].map((item, i) => (
              <div key={i} className="text-center group p-8 rounded-3xl hover:bg-violet-50 transition-colors duration-500">
                <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform">{item.icon}</div>
                <h3 className="text-xl font-bold mb-4 text-gray-800">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <VirtualGarden />

      <section id="contact" className="py-24 px-4 bg-white relative overflow-hidden">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold text-violet-perso mb-6">Faire un pas vers nous</h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Parce que chaque histoire mérite d'être entendue avec douceur, notre équipe est à votre disposition 
                pour vous guider à travers les brumes de l'absence.
              </p>
            </div>
            
            <div className="space-y-4">
              {[
                { label: 'Adresse', val: 'Cocody Angré Rue M42, Abidjan', icon: '📍' },
                { label: 'Téléphone', val: '+225 07 59 87 21 61', icon: '📞' },
                { label: 'Email', val: 'lejardindelespoir@gmail.com', icon: '✉️' },
                { label: 'Réseaux', val: 'Le Jardin de l\'Espoir', icon: '🔵' }
              ].map((item, i) => (
                <div key={i} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-2xl border-l-4 border-horizon-perso hover:bg-white hover:shadow-md transition">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase">{item.label}</p>
                    <p className="text-gray-700 font-medium">{item.val}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Zone d'exportation pour l'utilisateur (Admin) */}
            <div className="pt-8 border-t border-gray-100">
               <button 
                onClick={() => setShowAdmin(!showAdmin)}
                className="text-gray-400 hover:text-violet-perso text-xs flex items-center space-x-2 transition"
               >
                 <span>{showAdmin ? '−' : '+'} Gestion des données</span>
               </button>
               
               {showAdmin && (
                 <div className="mt-4 p-6 bg-violet-50 rounded-3xl border border-violet-100 animate-in fade-in slide-in-from-top-2">
                   <p className="text-sm font-bold text-violet-perso mb-4">Exporter vos archives :</p>
                   <div className="flex flex-wrap gap-3">
                     <button 
                       onClick={() => exportData('jardin_espoir_contacts', 'messages_contact')}
                       className="bg-white text-violet-perso px-4 py-2 rounded-xl text-xs font-bold shadow-sm hover:shadow-md transition flex items-center"
                     >
                       <span className="mr-2">📥</span> Messages Contact (CSV)
                     </button>
                     <button 
                       onClick={() => exportData('jardin_espoir_seeds', 'fleurs_jardin')}
                       className="bg-white text-horizon-perso px-4 py-2 rounded-xl text-xs font-bold shadow-sm hover:shadow-md transition flex items-center"
                     >
                       <span className="mr-2">🌸</span> Fleurs du Jardin (CSV)
                     </button>
                   </div>
                   <p className="text-[10px] text-gray-400 mt-3 italic">
                     Les fichiers seront téléchargés au format CSV (ouvrable avec Excel).
                   </p>
                 </div>
               )}
            </div>
          </div>

          <div className="bg-violet-perso p-10 rounded-[40px] shadow-2xl relative">
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-horizon-perso rounded-full flex items-center justify-center text-4xl shadow-xl transform rotate-12">
              🕊️
            </div>
            <form onSubmit={handleContactSubmit} className="space-y-6">
              <div className="space-y-1">
                <input 
                  required
                  type="text" 
                  value={contactForm.name}
                  onChange={e => setContactForm({...contactForm, name: e.target.value})}
                  placeholder="Votre Prénom / Pseudo" 
                  className="w-full p-4 rounded-2xl focus:outline-none focus:ring-4 focus:ring-white/20 bg-white/10 text-white placeholder:text-white/60 border border-white/20"
                />
              </div>
              <div className="space-y-1">
                <input 
                  required
                  type="email" 
                  value={contactForm.email}
                  onChange={e => setContactForm({...contactForm, email: e.target.value})}
                  placeholder="Votre Email" 
                  className="w-full p-4 rounded-2xl focus:outline-none focus:ring-4 focus:ring-white/20 bg-white/10 text-white placeholder:text-white/60 border border-white/20"
                />
              </div>
              <div className="space-y-1">
                <textarea 
                  required
                  value={contactForm.message}
                  onChange={e => setContactForm({...contactForm, message: e.target.value})}
                  placeholder="Votre message, vos doutes, vos questions..." 
                  className="w-full p-4 rounded-2xl focus:outline-none focus:ring-4 focus:ring-white/20 bg-white/10 text-white placeholder:text-white/60 border border-white/20 min-h-[150px]"
                ></textarea>
              </div>
              
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-white text-violet-perso font-bold py-5 rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl uppercase tracking-widest text-sm disabled:opacity-50"
              >
                {isSubmitting ? 'Envoi en cours...' : 'Envoyer avec douceur'}
              </button>

              {submitStatus === 'success' && (
                <div className="bg-green-100 text-green-800 p-4 rounded-xl text-center font-bold animate-bounce mt-4">
                  Merci ! Votre message a été bien enregistré. ✨
                </div>
              )}
              
              <p className="text-center text-white/60 text-xs mt-6 leading-relaxed">
                Nous vous répondrons sous 24h à 48h, dans le respect de votre rythme.
              </p>
            </form>
          </div>
        </div>
      </section>

      <ChatBot />
    </Layout>
  );
}
