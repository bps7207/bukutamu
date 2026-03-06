import React, { useState, useEffect } from "react";
import {
  Home,
  BookOpen,
  User,
  Settings,
  ChevronRight,
  CheckCircle2,
  ArrowLeft,
  Send,
  Globe,
  LogOut,
  ShieldCheck,
  Database,
  MessageSquare,
  Library,
  ChevronDown,
  Lock,
  Edit3,
  Save,
  Eye,
} from "lucide-react";

// --- Konfigurasi Awal (Initial State) ---
const DEFAULT_CONFIG = {
  officeName: "BPS Kabupaten Buol",
  pstName: "Pelayanan Statistik Terpadu",
  welcomeSub:
    "Selamat datang di Pelayanan Statistik Terpadu BPS Kabupaten Buol. Kami siap melayani kebutuhan data Anda dengan profesional.",
  formActionUrl: "",
  adminPass: "bpsbuol123", // Password default
  services: [
    {
      title: "Perpustakaan",
      desc: "Akses berbagai publikasi statistik cetak maupun digital secara gratis.",
      iconName: "Library",
    },
    {
      title: "Konsultasi Statistik",
      desc: "Layanan tanya jawab terkait data, metodologi, dan indikator statistik.",
      iconName: "MessageSquare",
    },
    {
      title: "Pembelian Data",
      desc: "Pemesanan publikasi dan data mikro sesuai dengan ketentuan yang berlaku.",
      iconName: "Database",
    },
  ],
};

// Helper untuk Render Icon Dinamis
const IconPicker = ({ name, size = 24, className = "" }) => {
  switch (name) {
    case "Library":
      return <Library size={size} className={`${className} text-blue-500`} />;
    case "MessageSquare":
      return (
        <MessageSquare size={size} className={`${className} text-green-500`} />
      );
    case "Database":
      return (
        <Database size={size} className={`${className} text-orange-500`} />
      );
    default:
      return <Info size={size} className={className} />;
  }
};

export default function App() {
  // State Utama
  const [view, setView] = useState("landing");
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [config, setConfig] = useState(DEFAULT_CONFIG);
  const [adminInputPass, setAdminInputPass] = useState("");
  const [loginError, setLoginError] = useState("");

  // State Form Buku Tamu
  const [formData, setFormData] = useState({
    nama: "",
    instansi: "",
    tujuan: "",
    whatsapp: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fungsi Login Admin
  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminInputPass === config.adminPass) {
      setIsAdminLoggedIn(true);
      setLoginError("");
      setAdminInputPass("");
    } else {
      setLoginError("Password salah. Silakan coba lagi.");
    }
  };

  // Fungsi Kirim Buku Tamu (Mock)
  const handleSubmitGuestBook = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Di sini biasanya logic fetch ke Google Form Action URL
    setTimeout(() => {
      setIsSubmitting(false);
      setView("success");
      setFormData({ nama: "", instansi: "", tujuan: "", whatsapp: "" });
    }, 1500);
  };

  // Navigasi Bawah
  const BottomNav = () => (
    <div className="fixed rounded-t-4xl bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex justify-around items-center py-3 px-2 z-50 md:max-w-3xl md:mx-auto shadow-[0_-10px_20px_rgba(0,0,0,0.1)]">
      <button
        onClick={() => setView("landing")}
        className={`flex flex-col cursor-pointer items-center gap-1 transition-all ${view === "landing" ? "text-[#003380] scale-110" : "text-slate-400"}`}
      >
        <Home size={22} />
        <span className="text-[10px] font-bold">Beranda</span>
      </button>
      <button
        onClick={() => setView("form")}
        className={`flex flex-col cursor-pointer items-center gap-1 transition-all ${view === "form" ? "text-[#003380] scale-110" : "text-slate-400"}`}
      >
        <BookOpen size={22} />
        <span className="text-[10px] font-bold">Buku Tamu</span>
      </button>
      <button
        onClick={() => setView("admin")}
        className={`flex flex-col cursor-pointer items-center gap-1 transition-all ${view === "admin" ? "text-[#003380] scale-110" : "text-slate-400"}`}
      >
        <User size={22} />
        <span className="text-[10px] font-bold">Admin</span>
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#003380] text-white font-sans overflow-x-hidden selection:bg-yellow-400/30">
      <div className="max-w-3xl mx-auto min-h-screen flex flex-col relative bg-[#003380]">
        {/* --- VIEW: LANDING PAGE --- */}
        {view === "landing" && (
          <div className="flex-1 flex flex-col animate-in fade-in duration-700 pb-24">
            <div className="p-6 flex justify-between items-center">
              <div className="bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full flex items-center gap-2 border border-white/20">
                <Globe size={14} />
                <span className="text-xs font-medium">Bahasa Indonesia</span>
                <ChevronDown size={14} />
              </div>
              <button
                onClick={() => setView("admin")}
                className="p-2 bg-white/10 rounded-xl hover:bg-white/20 transition border border-white/10"
              >
                <Lock size={18} />
              </button>
            </div>

            <div className="px-6 flex flex-col items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center p-1.5 shadow-xl">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <path d="M10 20 L90 20 L90 80 L10 80 Z" fill="#003380" />
                    <circle cx="50" cy="50" r="28" fill="#FFD700" />
                    <path d="M40 40 H60 V60 H40 Z" fill="#003380" />
                  </svg>
                </div>
                <div className="leading-tight">
                  <h1 className="font-extrabold text-xl tracking-tight uppercase">
                    PST BPS BUOL
                  </h1>
                  <p className="text-[10px] opacity-70 uppercase tracking-widest font-bold">
                    Terpercaya Melayani
                  </p>
                </div>
              </div>
            </div>

            <div className="px-10 mb-8">
              <div className="relative aspect-video bg-blue-400/20 rounded-[32px] overflow-hidden border border-white/10 flex items-center justify-center group">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-transparent"></div>
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-20 h-20 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/20 mb-2">
                    <BookOpen size={40} className="text-[#FFD700]" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-60">
                    Digital Guest Book
                  </span>
                </div>
              </div>
            </div>

            <div className="px-8 text-center mb-8">
              <h2 className="text-3xl font-black mb-4 leading-tight">
                {config.pstName}
              </h2>
              <p className="text-blue-100/70 text-sm leading-relaxed mb-8 font-medium">
                {config.welcomeSub}
              </p>

              <button
                onClick={() => setView("form")}
                className="w-full bg-[#FFD700] cursor-pointer text-[#003380] py-4 rounded-[22px] font-black text-lg shadow-[0_12px_24px_rgba(255,215,0,0.3)] hover:translate-y-[-2px] active:translate-y-[1px] transition-all flex items-center justify-center gap-2"
              >
                Mulai Isi Buku Tamu <ChevronRight size={22} />
              </button>
            </div>

            {/* Services Info Section */}
            <div className="px-6 space-y-4">
              <div className="flex items-center gap-4 px-2">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 whitespace-nowrap">
                  Layanan Kami
                </span>
                <div className="h-px w-full bg-white/10"></div>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {config.services.map((s, idx) => (
                  <div
                    key={idx}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 p-5 rounded-3xl flex gap-5 items-center"
                  >
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shrink-0 shadow-lg">
                      <IconPicker name={s.iconName} />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-white mb-0.5">
                        {s.title}
                      </h4>
                      <p className="text-[11px] text-blue-100/50 leading-relaxed font-medium">
                        {s.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* --- VIEW: FORM PAGE --- */}
        {view === "form" && (
          <div className="flex-1 flex flex-col bg-[#003380] animate-in slide-in-from-bottom-8 duration-500 overflow-hidden">
            <div className="p-6 pb-2">
              <button
                onClick={() => setView("landing")}
                className="flex items-center gap-2 text-white/70 font-bold text-sm"
              >
                <ArrowLeft size={18} /> Kembali
              </button>
            </div>

            <div className="flex-1 bg-white rounded-t-[45px] shadow-2xl p-8 mt-4 overflow-y-auto pb-32">
              <div className="mb-10 text-center">
                <div className="w-16 h-1 bg-slate-100 mx-auto rounded-full mb-6"></div>
                <h3 className="text-2xl font-black text-[#003380]">
                  Data Kunjungan
                </h3>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">
                  Isi formulir dengan benar
                </p>
              </div>

              <form
                onSubmit={handleSubmitGuestBook}
                className="space-y-6 text-slate-900"
              >
                {[
                  {
                    id: "nama",
                    label: "Nama Lengkap",
                    type: "text",
                    ph: "Contoh: Nama Anda",
                  },
                  {
                    id: "instansi",
                    label: "Instansi/Lembaga",
                    type: "text",
                    ph: "Asal Universitas/Instansi",
                  },
                  {
                    id: "whatsapp",
                    label: "Nomor WhatsApp",
                    type: "tel",
                    ph: "08xxxxxxxxxx",
                  },
                ].map((field) => (
                  <div key={field.id} className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      required
                      placeholder={field.ph}
                      className="w-full p-4 rounded-2xl bg-slate-50 border-none shadow-inner focus:ring-2 focus:ring-[#003380] transition font-bold text-slate-700"
                      value={formData[field.id]}
                      onChange={(e) =>
                        setFormData({ ...formData, [field.id]: e.target.value })
                      }
                    />
                  </div>
                ))}

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                    Kebutuhan Layanan
                  </label>
                  <select
                    required
                    className="w-full p-4 rounded-2xl bg-slate-50 border-none shadow-inner focus:ring-2 focus:ring-[#003380] transition appearance-none font-bold text-slate-700"
                    value={formData.tujuan}
                    onChange={(e) =>
                      setFormData({ ...formData, tujuan: e.target.value })
                    }
                  >
                    <option value="">Pilih Kategori...</option>
                    <option value="Perpustakaan">Perpustakaan</option>
                    <option value="Konsultasi">Konsultasi Statistik</option>
                    <option value="Data Mikro">Data Mikro</option>
                    <option value="Rekomendasi">Rekomendasi Statistik</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>

                <div className="pt-4">
                  <button
                    disabled={isSubmitting}
                    className="w-full bg-[#003380] text-white py-4 rounded-2xl font-black text-lg shadow-xl hover:bg-blue-900 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      <>
                        Simpan Kunjungan <Send size={20} />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* --- VIEW: ADMIN PANEL --- */}
        {view === "admin" && (
          <div className="flex-1 flex flex-col bg-[#003380] animate-in slide-in-from-bottom-8 duration-500 overflow-hidden">
            <div className="p-6 pb-2 flex justify-between items-center">
              <button
                onClick={() => setView("landing")}
                className="flex items-center gap-2 text-white/70 font-bold text-sm"
              >
                <ArrowLeft size={18} /> Kembali
              </button>
              {isAdminLoggedIn && (
                <button
                  onClick={() => setIsAdminLoggedIn(false)}
                  className="bg-red-500/20 text-red-200 px-4 py-1.5 rounded-full text-xs font-bold border border-red-500/20 flex items-center gap-1"
                >
                  <LogOut size={14} /> Keluar
                </button>
              )}
            </div>

            <div className="flex-1 bg-white rounded-t-[45px] shadow-2xl p-8 mt-4 overflow-y-auto pb-32">
              {!isAdminLoggedIn ? (
                <div className="space-y-8 py-10">
                  <div className="flex justify-center">
                    <div className="w-20 h-20 bg-blue-50 text-[#003380] rounded-[28px] flex items-center justify-center shadow-lg">
                      <ShieldCheck size={40} />
                    </div>
                  </div>
                  <div className="text-center">
                    <h3 className="text-2xl font-black text-[#003380]">
                      Autentikasi Admin
                    </h3>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">
                      Masuk untuk mengelola sistem
                    </p>
                  </div>

                  <form onSubmit={handleAdminLogin} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                        Password Administrator
                      </label>
                      <input
                        type="password"
                        required
                        placeholder="••••••••"
                        className="w-full p-5 rounded-2xl bg-slate-50 border-none shadow-inner focus:ring-2 focus:ring-[#003380] text-center font-bold text-slate-800"
                        value={adminInputPass}
                        onChange={(e) => setAdminInputPass(e.target.value)}
                      />
                      {loginError && (
                        <p className="text-red-500 text-[10px] font-bold text-center mt-2 italic">
                          {loginError}
                        </p>
                      )}
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-[#003380] text-white py-4 rounded-2xl font-black text-lg shadow-lg hover:bg-blue-900 active:scale-95 transition-all flex items-center justify-center gap-2"
                    >
                      Masuk Dashboard <ChevronRight size={20} />
                    </button>
                  </form>
                </div>
              ) : (
                <div className="space-y-8">
                  <div className="flex items-center justify-between border-b pb-4">
                    <div>
                      <h3 className="font-black text-xl text-[#003380]">
                        Konfigurasi
                      </h3>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        Kustomisasi Halaman
                      </p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-2xl text-[#003380]">
                      <Settings size={22} />
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Section 1: Teks Utama */}
                    <div className="p-6 bg-slate-50 rounded-3xl space-y-4 border border-slate-100">
                      <h4 className="text-[10px] font-black text-[#003380] uppercase tracking-[0.2em] flex items-center gap-2">
                        <Edit3 size={12} /> Teks Sambutan Landing
                      </h4>
                      <div className="space-y-3">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-400">
                            Pesan Utama
                          </label>
                          <textarea
                            className="w-full p-4 bg-white rounded-2xl text-sm border-none shadow-sm font-medium text-slate-700"
                            rows="3"
                            value={config.welcomeSub}
                            onChange={(e) =>
                              setConfig({
                                ...config,
                                welcomeSub: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>

                    {/* Section 2: Edit Layanan */}
                    <div className="p-6 bg-slate-50 rounded-3xl space-y-4 border border-slate-100">
                      <h4 className="text-[10px] font-black text-[#003380] uppercase tracking-[0.2em] flex items-center gap-2">
                        <Database size={12} /> Kelola Info Layanan
                      </h4>
                      <div className="space-y-4">
                        {config.services.map((s, idx) => (
                          <div
                            key={idx}
                            className="p-4 bg-white rounded-2xl shadow-sm space-y-2 border border-blue-50"
                          >
                            <input
                              className="w-full font-bold text-sm text-[#003380] bg-transparent border-b border-slate-100 pb-1 focus:outline-none"
                              value={s.title}
                              onChange={(e) => {
                                const newServices = [...config.services];
                                newServices[idx].title = e.target.value;
                                setConfig({ ...config, services: newServices });
                              }}
                            />
                            <textarea
                              className="w-full text-xs text-slate-500 bg-transparent border-none focus:outline-none resize-none"
                              rows="2"
                              value={s.desc}
                              onChange={(e) => {
                                const newServices = [...config.services];
                                newServices[idx].desc = e.target.value;
                                setConfig({ ...config, services: newServices });
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Section 3: Integrasi */}
                    <div className="p-6 bg-[#003380] text-white rounded-[32px] shadow-xl space-y-4">
                      <div className="flex items-center gap-2">
                        <Save size={16} className="text-yellow-400" />
                        <h4 className="text-[10px] font-black uppercase tracking-widest">
                          Koneksi Data
                        </h4>
                      </div>
                      <div className="space-y-2">
                        <p className="text-[10px] opacity-60 leading-relaxed font-bold">
                          Tempelkan Google Form Action URL untuk sinkronisasi
                          Google Sheets.
                        </p>
                        <input
                          className="w-full p-4 bg-white/10 rounded-2xl text-xs border border-white/20 placeholder:text-white/20 font-mono"
                          placeholder="https://docs.google.com/forms/d/.../formResponse"
                          value={config.formActionUrl}
                          onChange={(e) =>
                            setConfig({
                              ...config,
                              formActionUrl: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="bg-green-50 p-4 rounded-2xl flex items-center gap-4 border border-green-100">
                      <div className="w-10 h-10 bg-green-500 text-white rounded-xl flex items-center justify-center">
                        <Eye size={20} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-green-700 uppercase tracking-widest">
                          Live Preview
                        </p>
                        <p className="text-xs text-green-600 font-medium italic">
                          Semua perubahan diterapkan langsung ke Beranda.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* --- VIEW: SUCCESS PAGE --- */}
        {view === "success" && (
          <div className="flex-1 flex flex-col items-center justify-center p-10 animate-in zoom-in duration-500">
            <div className="relative mb-12">
              <div className="absolute inset-0 bg-yellow-400 blur-2xl opacity-40 animate-pulse"></div>
              <div className="w-32 h-32 bg-[#FFD700] rounded-full flex items-center justify-center shadow-2xl relative z-10">
                <CheckCircle2 size={64} className="text-[#003380]" />
              </div>
            </div>
            <h2 className="text-4xl font-black text-center mb-4 leading-tight">
              Terima Kasih!
            </h2>
            <p className="text-blue-100/70 text-center mb-12 font-medium leading-relaxed px-4">
              Data kunjungan Anda telah tersimpan. Silakan hubungi petugas untuk
              bantuan lebih lanjut.
            </p>
            <button
              onClick={() => setView("landing")}
              className="w-full py-5 bg-white/10 backdrop-blur-md rounded-[22px] font-black border border-white/20 hover:bg-white/20 active:scale-95 transition-all shadow-lg"
            >
              Selesai
            </button>
          </div>
        )}

        {/* --- PERMANENT BOTTOM NAV --- */}
        <BottomNav />
      </div>
    </div>
  );
}
