
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ConstructionSite, DailyReport, TeamMember } from '../types';

interface ProjectDetailProps {
  site: ConstructionSite;
  reports: DailyReport[];
  team: TeamMember[];
  onBack: () => void;
  onAddReport: (report: Omit<DailyReport, 'id'>) => void;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ site, reports, team, onBack, onAddReport }) => {
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [galleryImages, setGalleryImages] = useState<string[]>([
    'https://picsum.photos/seed/gallery1/400/400',
    'https://picsum.photos/seed/gallery2/400/400',
    'https://picsum.photos/seed/gallery3/400/400',
    'https://picsum.photos/seed/gallery4/400/400',
    'https://picsum.photos/seed/gallery5/400/400',
    'https://picsum.photos/seed/gallery6/400/400',
  ]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);

  // Speech Recognition state
  const [isListening, setIsListening] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);

  // Form state for new report
  const [reportForm, setReportForm] = useState<Omit<DailyReport, 'id' | 'projectId'>>({
    date: new Date().toISOString().split('T')[0],
    authors: [],
    startTime: '07:00',
    endTime: '16:00',
    weather: 'sunny',
    temperature: 20,
    activities: '',
    summary: '',
    images: []
  });

  const weatherIcons = {
    sunny: 'fa-sun text-yellow-500',
    cloudy: 'fa-cloud text-slate-400',
    rainy: 'fa-cloud-showers-heavy text-blue-400',
    snowy: 'fa-snowflake text-slate-300',
    stormy: 'fa-bolt text-purple-500'
  };

  const weatherLabels = {
    sunny: 'Sonnig',
    cloudy: 'Bewölkt',
    rainy: 'Regen',
    snowy: 'Schnee',
    stormy: 'Gewitter'
  };

  // Speech Recognition Logic
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'de-DE';

      recognition.onresult = (event: any) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        
        if (isListening) {
          setReportForm(prev => ({
            ...prev,
            [isListening]: (prev[isListening as keyof typeof prev] as string) + (event.results[event.results.length - 1].isFinal ? transcript : '')
          }));
        }
      };

      recognition.onend = () => {
        setIsListening(null);
      };

      recognitionRef.current = recognition;
    }
  }, [isListening]);

  const toggleListening = (fieldName: string) => {
    if (!recognitionRef.current) {
      alert("Spracherkennung wird von diesem Browser leider nicht unterstützt.");
      return;
    }

    if (isListening === fieldName) {
      recognitionRef.current.stop();
      setIsListening(null);
    } else {
      if (isListening) recognitionRef.current.stop();
      setIsListening(fieldName);
      recognitionRef.current.start();
    }
  };

  // Canvas Signature logic
  useEffect(() => {
    if (isReportModalOpen && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
      }
    }
  }, [isReportModalOpen]);

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    isDrawing.current = true;
    draw(e);
  };

  const endDrawing = () => {
    isDrawing.current = false;
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      ctx?.beginPath();
    }
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing.current || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    let x, y;

    if ('touches' in e) {
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const clearSignature = () => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      ctx?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  };

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    let signatureBase64 = '';
    if (canvasRef.current) {
      signatureBase64 = canvasRef.current.toDataURL();
    }

    onAddReport({
      ...reportForm,
      projectId: site.id,
      signature: signatureBase64
    });

    setIsReportModalOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setReportForm({
      date: new Date().toISOString().split('T')[0],
      authors: [],
      startTime: '07:00',
      endTime: '16:00',
      weather: 'sunny',
      temperature: 20,
      activities: '',
      summary: '',
      images: []
    });
    clearSignature();
    if (isListening) recognitionRef.current?.stop();
  };

  const handleAuthorToggle = (authorName: string) => {
    setReportForm(prev => {
      const isSelected = prev.authors.includes(authorName);
      if (isSelected) {
        return { ...prev, authors: prev.authors.filter(a => a !== authorName) };
      } else {
        return { ...prev, authors: [...prev.authors, authorName] };
      }
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setGalleryImages(prev => [reader.result as string, ...prev]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setGalleryImages(prev => [reader.result as string, ...prev]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  return (
    <div className="p-8 mt-16 ml-64 min-h-screen">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-slate-500 hover:text-orange-500 transition-colors mb-6 font-medium"
      >
        <i className="fas fa-arrow-left"></i>
        Zurück zur Übersicht
      </button>

      <div className="flex flex-col lg:flex-row gap-8 mb-8">
        <div className="flex-1 bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-4xl font-black text-slate-900 mb-2">{site.name}</h2>
              <p className="text-slate-500 flex items-center gap-2 text-lg">
                <i className="fas fa-map-marker-alt text-orange-500"></i> {site.location}
              </p>
            </div>
            <span className="bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-widest">
              {site.status === 'active' ? 'Im Bau' : site.status}
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="p-4 bg-slate-50 rounded-2xl">
              <p className="text-xs text-slate-400 font-bold uppercase mb-1">Fortschritt</p>
              <p className="text-2xl font-black text-orange-500">{site.progress}%</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl">
              <p className="text-xs text-slate-400 font-bold uppercase mb-1">Bauleiter</p>
              <p className="text-lg font-bold text-slate-900">{site.manager}</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl">
              <p className="text-xs text-slate-400 font-bold uppercase mb-1">Deadline</p>
              <p className="text-lg font-bold text-slate-900">{new Date(site.deadline).toLocaleDateString('de-DE')}</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl">
              <p className="text-xs text-slate-400 font-bold uppercase mb-1">Berichte</p>
              <p className="text-lg font-bold text-slate-900">{reports.length} Gesamt</p>
            </div>
          </div>

          <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden mb-2">
            <div className="h-full bg-orange-500 transition-all duration-1000" style={{ width: `${site.progress}%` }}></div>
          </div>
          <p className="text-xs text-slate-400 text-right font-medium">Aktualisiert vor 2 Stunden</p>
        </div>

        <div className="w-full lg:w-80 space-y-4">
          <button 
            onClick={() => setIsReportModalOpen(true)}
            className="w-full bg-orange-500 text-white py-4 rounded-2xl font-bold hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/30 flex items-center justify-center gap-3"
          >
            <i className="fas fa-file-signature text-xl"></i>
            Tagesbericht erstellen
          </button>
          
          <input 
            type="file" 
            multiple 
            accept="image/*" 
            className="hidden" 
            ref={fileInputRef} 
            onChange={handleFileUpload}
          />
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-3"
          >
            <i className="fas fa-camera text-xl"></i>
            Foto hochladen
          </button>
          
          <button className="w-full bg-white border border-slate-200 text-slate-700 py-4 rounded-2xl font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-3">
            <i className="fas fa-file-pdf text-xl text-red-500"></i>
            Exportiere Bautagebuch
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-6">
          <h3 className="text-2xl font-bold text-slate-900">Bautagebuch</h3>
          <div className="space-y-4">
            {reports.length === 0 ? (
              <div className="bg-white p-12 rounded-3xl border border-dashed border-slate-200 flex flex-col items-center justify-center text-center">
                <i className="fas fa-clipboard-list text-4xl text-slate-200 mb-4"></i>
                <p className="text-slate-400 font-medium italic">Noch keine Tagesberichte für dieses Projekt vorhanden.</p>
                <button 
                  onClick={() => setIsReportModalOpen(true)}
                  className="mt-4 text-orange-500 font-bold hover:underline"
                >
                  Ersten Bericht erstellen
                </button>
              </div>
            ) : (
              reports.map((report) => (
                <div key={report.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-100 rounded-xl flex flex-col items-center justify-center leading-none">
                        <span className="text-[10px] font-bold text-slate-400 uppercase">{new Date(report.date).toLocaleString('de-DE', { month: 'short' })}</span>
                        <span className="text-xl font-black text-slate-900">{new Date(report.date).getDate()}</span>
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">{report.authors.join(', ') || 'Anonym'}</p>
                        <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                          <span className="flex items-center gap-1">
                            <i className={`fas ${weatherIcons[report.weather]}`}></i>
                            {report.temperature}°C
                          </span>
                          <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                          <span>{report.startTime} - {report.endTime} Uhr</span>
                          <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                          <span>{new Date(report.date).toLocaleDateString('de-DE')}</span>
                        </div>
                      </div>
                    </div>
                    <button className="text-slate-400 hover:text-slate-600 p-2"><i className="fas fa-edit"></i></button>
                  </div>
                  <div className="mb-4">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Tätigkeiten:</p>
                    <p className="text-slate-700 text-sm whitespace-pre-wrap">{report.activities}</p>
                  </div>
                  <div className="mb-4">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Zusammenfassung:</p>
                    <p className="text-slate-600 text-sm leading-relaxed">{report.summary}</p>
                  </div>
                  {report.signature && (
                    <div className="mb-4">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Unterschrift:</p>
                      <img src={report.signature} className="h-16 border border-slate-100 bg-slate-50 rounded" alt="Signatur" />
                    </div>
                  )}
                  {report.images.length > 0 && (
                    <div className="flex gap-2">
                      {report.images.map((img, idx) => (
                        <img key={idx} src={img} className="w-20 h-20 object-cover rounded-lg border border-slate-100" />
                      ))}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-slate-900">Fotogalerie</h3>
          <div 
            className="grid grid-cols-2 gap-4 p-4 border-2 border-dashed border-slate-100 rounded-3xl"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
          >
            {galleryImages.map((img, i) => (
              <div key={i} className="aspect-square bg-slate-100 rounded-2xl overflow-hidden group relative">
                <img src={img} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <i className="fas fa-search-plus text-white text-2xl"></i>
                </div>
              </div>
            ))}
            {galleryImages.length === 0 && (
              <div className="col-span-2 py-8 text-center text-slate-300 text-xs font-medium">
                Fotos hierher ziehen
              </div>
            )}
          </div>
          <button className="w-full py-3 text-orange-500 font-bold text-sm hover:underline">Alle {galleryImages.length} Fotos anzeigen</button>
        </div>
      </div>

      {/* NEW REPORT MODAL */}
      {isReportModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl w-full max-w-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 my-8">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50 sticky top-0 z-10">
              <h3 className="text-xl font-bold text-slate-900">Tagesbericht erstellen</h3>
              <button onClick={() => setIsReportModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>
            <form onSubmit={handleReportSubmit} className="p-8 space-y-8 max-h-[80vh] overflow-y-auto">
              
              {/* Sektion 1: Allgemeine Infos */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Datum</label>
                  <input 
                    required
                    type="date"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 transition-all font-medium"
                    value={reportForm.date}
                    onChange={e => setReportForm({...reportForm, date: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Von (Uhrzeit)</label>
                    <input 
                      required
                      type="time"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 transition-all font-medium"
                      value={reportForm.startTime}
                      onChange={e => setReportForm({...reportForm, startTime: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Bis (Uhrzeit)</label>
                    <input 
                      required
                      type="time"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 transition-all font-medium"
                      value={reportForm.endTime}
                      onChange={e => setReportForm({...reportForm, endTime: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              {/* Sektion 2: Wetter */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Wetterlage</label>
                  <div className="grid grid-cols-5 gap-2">
                    {(Object.keys(weatherIcons) as Array<keyof typeof weatherIcons>).map(w => (
                      <button
                        key={w}
                        type="button"
                        onClick={() => setReportForm({...reportForm, weather: w})}
                        className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all ${
                          reportForm.weather === w 
                          ? 'border-orange-500 bg-orange-50 text-orange-600' 
                          : 'border-slate-100 bg-slate-50 text-slate-400 hover:border-slate-200'
                        }`}
                      >
                        <i className={`fas ${weatherIcons[w]} text-lg mb-1`}></i>
                        <span className="text-[10px] font-bold uppercase">{weatherLabels[w]}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Temperatur (°C)</label>
                  <div className="relative">
                    <input 
                      type="number"
                      className="w-full pl-4 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 transition-all font-medium"
                      value={reportForm.temperature}
                      onChange={e => setReportForm({...reportForm, temperature: parseInt(e.target.value) || 0})}
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">°C</span>
                  </div>
                </div>
              </div>

              {/* Sektion 3: Mitarbeiter (Multi-Select) */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Anwesende Mitarbeiter</label>
                <div className="flex flex-wrap gap-2">
                  {team.map(member => (
                    <button
                      key={member.id}
                      type="button"
                      onClick={() => handleAuthorToggle(member.name)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 transition-all ${
                        reportForm.authors.includes(member.name)
                        ? 'border-orange-500 bg-orange-50 text-orange-700 font-bold'
                        : 'border-slate-100 bg-slate-50 text-slate-500 hover:border-slate-200'
                      }`}
                    >
                      <img src={member.avatar} className="w-6 h-6 rounded-full" alt="" />
                      <span className="text-sm">{member.name}</span>
                      {reportForm.authors.includes(member.name) && <i className="fas fa-check-circle text-orange-500 ml-1"></i>}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sektion 4: Tätigkeiten & Zusammenfassung */}
              <div className="space-y-6">
                <div className="relative">
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest">Ausgeführte Tätigkeiten</label>
                    <button 
                      type="button"
                      onClick={() => toggleListening('activities')}
                      className={`flex items-center gap-2 px-3 py-1 rounded-lg text-[10px] font-bold uppercase transition-all ${
                        isListening === 'activities' 
                        ? 'bg-red-500 text-white animate-pulse' 
                        : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                      }`}
                    >
                      <i className={`fas ${isListening === 'activities' ? 'fa-stop' : 'fa-microphone'}`}></i>
                      {isListening === 'activities' ? 'Aufnahme stoppen' : 'Diktieren'}
                    </button>
                  </div>
                  <textarea 
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 transition-all resize-none text-slate-700 font-medium"
                    placeholder="Beschreiben Sie detailliert, welche Arbeiten heute durchgeführt wurden..."
                    value={reportForm.activities}
                    onChange={e => setReportForm({...reportForm, activities: e.target.value})}
                  ></textarea>
                </div>
                <div className="relative">
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest">Besondere Vorkommnisse / Zusammenfassung</label>
                    <button 
                      type="button"
                      onClick={() => toggleListening('summary')}
                      className={`flex items-center gap-2 px-3 py-1 rounded-lg text-[10px] font-bold uppercase transition-all ${
                        isListening === 'summary' 
                        ? 'bg-red-500 text-white animate-pulse' 
                        : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                      }`}
                    >
                      <i className={`fas ${isListening === 'summary' ? 'fa-stop' : 'fa-microphone'}`}></i>
                      {isListening === 'summary' ? 'Aufnahme stoppen' : 'Diktieren'}
                    </button>
                  </div>
                  <textarea 
                    rows={2}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 transition-all resize-none text-slate-700"
                    placeholder="Gab es Probleme, Verzögerungen oder Abweichungen?"
                    value={reportForm.summary}
                    onChange={e => setReportForm({...reportForm, summary: e.target.value})}
                  ></textarea>
                </div>
              </div>

              {/* Sektion 5: Digitale Unterschrift */}
              <div>
                <div className="flex justify-between items-end mb-2">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest">Digitale Unterschrift</label>
                  <button 
                    type="button" 
                    onClick={clearSignature}
                    className="text-[10px] font-bold text-red-500 uppercase hover:underline"
                  >
                    Löschen
                  </button>
                </div>
                <div className="border-2 border-slate-100 bg-slate-50 rounded-2xl overflow-hidden cursor-crosshair">
                  <canvas
                    ref={canvasRef}
                    width={600}
                    height={150}
                    className="w-full h-32 block"
                    onMouseDown={startDrawing}
                    onMouseUp={endDrawing}
                    onMouseMove={draw}
                    onTouchStart={startDrawing}
                    onTouchEnd={endDrawing}
                    onTouchMove={draw}
                  ></canvas>
                </div>
                <p className="text-[10px] text-slate-400 mt-2 italic text-center">Bitte unterschreiben Sie im obigen Feld mit Maus oder Finger.</p>
              </div>

              {/* Footer */}
              <div className="pt-8 border-t border-slate-100 flex gap-4 sticky bottom-0 bg-white">
                <button 
                  type="button"
                  onClick={() => setIsReportModalOpen(false)}
                  className="flex-1 px-6 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-colors"
                >
                  Abbrechen
                </button>
                <button 
                  type="submit"
                  className="flex-1 px-6 py-4 bg-orange-500 text-white rounded-2xl font-bold hover:bg-orange-600 shadow-xl shadow-orange-500/30 transition-colors flex items-center justify-center gap-2"
                >
                  <i className="fas fa-save"></i>
                  Bericht finalisieren
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;
