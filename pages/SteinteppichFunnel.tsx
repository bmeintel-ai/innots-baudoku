import React, { useState } from 'react';

const SteinteppichFunnel: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    project: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Integration mit E-Mail-Marketing-Tool
    console.log('Form submitted:', formData);
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-amber-600 to-orange-500 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Ihr Weg zum perfekten Steinteppich
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Der ultimative Sanierungs-Ratgeber für langlebige, stilvolle und pflegeleichte Oberflächen
          </p>
          <a 
            href="#download" 
            className="inline-block bg-white text-orange-600 font-bold py-4 px-8 rounded-full text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl"
          >
            🎁 Gratis-Ratgeber jetzt sichern
          </a>
        </div>
      </section>

      {/* Vorteile Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            5 unschlagbare Vorteile von Steinteppichen
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: '✨', title: 'Fugenlos & Nahtlos', desc: 'Elegante Optik ohne störende Fugen' },
              { icon: '☀️', title: 'UV-beständig & Farbecht', desc: 'Keine Ausbleichung durch Sonnenlicht' },
              { icon: '🛡️', title: 'Rutschfest & Sicher', desc: 'Optimaler Grip bei jedem Wetter' },
              { icon: '💧', title: 'Pflegeleicht & Langlebig', desc: 'Einfache Reinigung, jahrzehntelange Haltbarkeit' },
              { icon: '🌧️', title: 'Wasserdurchlässig', desc: 'Perfekt für Balkone und Terrassen' }
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Einsatzbereiche Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            Vielfältige Einsatzmöglichkeiten
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              '🏛️ Balkon- & Terrassensanierung',
              '🪧 Treppensanierung',
              '🏠 Wohn- & Innenbereiche',
              '🌳 Außenbereiche'
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
                <span className="text-2xl">{item.split(' ')[0]}</span>
                <span className="text-lg font-semibold text-gray-700">{item.substring(3)}</span>
              </div>
            ))}
          </div>
          <p className="text-center mt-8 text-lg text-gray-600">
            📍 Spezialisiert auf Freudenstadt & Rottweil
          </p>
        </div>
      </section>

      {/* Lead-Magnet Download Section */}
      <section id="download" className="py-20 px-4 bg-gradient-to-r from-orange-500 to-amber-600 text-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-8">
            Jetzt Gratis-Ratgeber herunterladen!
          </h2>
          <p className="text-xl text-center mb-12 opacity-90">
            Erhalten Sie wertvolle Insider-Tipps zur Steinteppich-Sanierung direkt per E-Mail
          </p>
          
          {!submitted ? (
            <form onSubmit={handleSubmit} className="bg-white rounded-lg p-8 shadow-2xl">
              <div className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Ihr Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none text-gray-800"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Ihre E-Mail-Adresse"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none text-gray-800"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Ihre Telefonnummer (optional)"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none text-gray-800"
                />
                <textarea
                  name="project"
                  placeholder="Beschreiben Sie kurz Ihr Projekt (optional)"
                  value={formData.project}
                  onChange={handleChange}
                  rows={4}
                  className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none text-gray-800"
                />
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:from-orange-700 hover:to-amber-700 transition-all transform hover:scale-105 shadow-lg"
                >
                  📥 Ratgeber kostenlos anfordern
                </button>
              </div>
              <p className="text-gray-600 text-sm text-center mt-4">
                🔒 Ihre Daten sind bei uns sicher. Kein Spam, versprochen!
              </p>
            </form>
          ) : (
            <div className="bg-white rounded-lg p-12 shadow-2xl text-center">
              <div className="text-6xl mb-6">✅</div>
              <h3 className="text-3xl font-bold text-gray-800 mb-4">
                Vielen Dank!
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                Ihr Ratgeber ist auf dem Weg zu Ihnen. Prüfen Sie Ihr E-Mail-Postfach!
              </p>
              <a 
                href="/downloads/steinteppich-ratgeber.pdf" 
                download
                className="inline-block bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold py-3 px-6 rounded-lg hover:from-orange-700 hover:to-amber-700 transition-all"
              >
                📄 Direkter Download
              </a>
            </div>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            Häufig gestellte Fragen
          </h2>
          <div className="space-y-6">
            {[
              { q: 'Wie lange dauert die Verlegung?', a: 'Je nach Projektgröße 1-3 Tage. Die Oberfläche ist nach 24h begehbar.' },
              { q: 'Ist der Steinteppich rutschfest?', a: 'Ja! Die natürliche Struktur bietet optimalen Grip, auch bei Nässe.' },
              { q: 'Wie reinige ich den Steinteppich?', a: 'Einfach mit Wasser und mildem Reiniger. Kein spezielles Equipment nötig.' },
              { q: 'Kann man Steinteppich auf alten Fliesen verlegen?', a: 'Ja, nach entsprechender Vorbereitung ist das problemlos möglich.' }
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-3 text-orange-600">{item.q}</h3>
                <p className="text-gray-700">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Über Bitschus Section */}
      <section className="py-16 px-4 bg-gray-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Über Bitschus Steinteppiche
          </h2>
          <p className="text-xl mb-4">
            🏆 15+ Jahre Erfahrung in Freudenstadt
          </p>
          <p className="text-lg opacity-90 mb-8">
            Qualität und Handwerkskunst - Darauf können Sie bauen
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="bg-orange-600 px-6 py-3 rounded-full">✅ Meisterbetrieb</span>
            <span className="bg-orange-600 px-6 py-3 rounded-full">✅ Lokaler Ansprechpartner</span>
            <span className="bg-orange-600 px-6 py-3 rounded-full">✅ Faire Preise</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4 text-center">
        <p className="mb-2">&copy; 2026 Bitschus Steinteppiche | Freudenstadt & Rottweil</p>
        <div className="space-x-4">
          <a href="#" className="hover:text-orange-400 transition-colors">Datenschutz</a>
          <a href="#" className="hover:text-orange-400 transition-colors">Impressum</a>
          <a href="#" className="hover:text-orange-400 transition-colors">Kontakt</a>
        </div>
      </footer>
    </div>
  );
};

export default SteinteppichFunnel;
