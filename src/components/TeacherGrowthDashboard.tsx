import React, { useState } from 'react';
import { Users, Plus, Award, Download, CheckCircle2, AlertCircle, Heart, Brain, Lightbulb, Compass, FileText } from 'lucide-react';
import { StudentProfile, ObservationRecord, AssessmentGrade } from '../types';
import { INITIAL_STUDENTS, INITIAL_OBSERVATIONS } from '../data/mockData';
import { playSound } from '../utils/sound';

export const TeacherGrowthDashboard: React.FC = () => {
  const [students] = useState<StudentProfile[]>(INITIAL_STUDENTS);
  const [selectedStudentId, setSelectedStudentId] = useState<string>(INITIAL_STUDENTS[0].id);
  const [observations, setObservations] = useState<ObservationRecord[]>(INITIAL_OBSERVATIONS);

  // New observation form states
  const [showAddModal, setShowAddModal] = useState(false);
  const [activityName, setActivityName] = useState('Eco Rescue & Pilah Sampah Nyata');
  const [domain, setDomain] = useState<ObservationRecord['domain']>('Problem Solving');
  const [grade, setGrade] = useState<AssessmentGrade>('BSH');
  const [indicator, setIndicator] = useState('Mampu mencoba strategi baru saat menghadapi tantangan');
  const [teacherNote, setTeacherNote] = useState('');

  const selectedStudent = students.find((s) => s.id === selectedStudentId) || students[0];
  const studentObservations = observations.filter((o) => o.studentId === selectedStudent.id);

  const handleAddObservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teacherNote.trim()) return;

    playSound('coin');
    const newRecord: ObservationRecord = {
      id: `obs_${Date.now()}`,
      studentId: selectedStudent.id,
      studentName: selectedStudent.name,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16),
      activityName,
      domain,
      grade,
      indicator,
      teacherNote,
    };

    setObservations([newRecord, ...observations]);
    setTeacherNote('');
    setShowAddModal(false);
  };

  const getGradeBadge = (g: AssessmentGrade) => {
    switch (g) {
      case 'BSB':
        return <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">BSB (Berkembang Sangat Baik)</span>;
      case 'BSH':
        return <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800 border border-blue-300">BSH (Sesuai Harapan)</span>;
      case 'MB':
        return <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-300">MB (Mulai Berkembang)</span>;
      case 'BB':
        return <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-300">BB (Belum Berkembang)</span>;
    }
  };

  const handleExportReport = () => {
    playSound('star');
    alert(`Laporan Portofolio Observasi Anak: "${selectedStudent.name}" berhasil diunduh untuk dokumentasi Kurikulum Merdeka PAUD!`);
  };

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-700 rounded-3xl p-6 text-white shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur text-xs font-bold font-game">
              WAWI Growth Tracker & Kurikulum Merdeka PAUD
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-game">
            Dashboard Observasi & Perkembangan Anak
          </h2>
          <p className="text-xs sm:text-sm text-teal-100 mt-1 max-w-xl">
            Alat bantu observasi proses berpikir tingkat tinggi (kognitif, trial-and-error, empati & regulasi diri) — bukan sekadar penilaian angka atau tes kaku.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={handleExportReport}
            className="game-btn-gold px-4 py-2 rounded-xl text-xs font-bold font-game flex items-center gap-1.5"
          >
            <Download className="w-4 h-4" />
            Unduh Portofolio PAUD
          </button>
        </div>
      </div>

      {/* Student Selector Strip */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Pilih Murid untuk Observasi & Analisis:
          </span>
          <span className="text-xs text-slate-400">Total 4 Anak di Kelas Kelinci</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {students.map((std) => {
            const isSelected = std.id === selectedStudentId;
            return (
              <button
                key={std.id}
                onClick={() => {
                  playSound('pop');
                  setSelectedStudentId(std.id);
                }}
                className={`p-3 rounded-2xl border text-left flex items-center gap-3 transition cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-50 border-emerald-500 shadow-sm ring-2 ring-emerald-400'
                    : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-2xl shrink-0 shadow-sm">
                  {std.avatar}
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-xs text-slate-800 truncate">{std.name}</div>
                  <div className="text-[11px] text-slate-500">{std.age} Tahun · {std.level.toUpperCase()}</div>
                  <div className="text-[10px] text-emerald-600 font-semibold">{std.stars} Bintang ⭐</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Student Overview & Developmental Domains */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Profile Details (1 Col) */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 rounded-2xl bg-amber-100 border-2 border-amber-300 flex items-center justify-center text-3xl shadow-sm">
              {selectedStudent.avatar}
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-800">{selectedStudent.name}</h3>
              <p className="text-xs text-slate-500">Usia: {selectedStudent.age} Tahun</p>
              <div className="mt-1 flex items-center gap-1.5 text-xs">
                <span className="font-bold text-amber-600">Level: {selectedStudent.level}</span>
                <span>·</span>
                <span className="text-slate-500">{selectedStudent.xp} XP</span>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-3">
            <h4 className="text-xs font-bold text-slate-600 mb-2">Badge Prestasi Terbuka:</h4>
            <div className="flex flex-wrap gap-1.5">
              {selectedStudent.badges.map((b, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-1"
                >
                  <span>🏅</span> {b}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-teal-50 rounded-2xl p-3.5 border border-teal-200 text-xs text-teal-950 flex flex-col gap-1.5">
            <div className="font-bold flex items-center gap-1.5 text-teal-900">
              <Lightbulb className="w-4 h-4 text-teal-700" />
              Rekomendasi Aktivitas Lanjutan:
            </div>
            <p className="leading-relaxed">
              Dapat diberikan tantangan <strong>Building City Tingkat 2</strong> dengan batasan balok kayu untuk memperdalam strategi estimasi dan uji beban jembatan.
            </p>
          </div>
        </div>

        {/* Developmental Domain Progress (2 Cols) */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-800 flex items-center gap-2">
              <Brain className="w-4 h-4 text-emerald-600" />
              Pemetaan 5 Fondasi Perkembangan Anak
            </h3>
            <span className="text-xs text-slate-400">Kurikulum Merdeka PAUD</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {/* Domain 1: Kognitif */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex flex-col gap-1.5">
              <div className="flex items-center justify-between font-bold">
                <span className="text-slate-800 flex items-center gap-1.5">
                  <Brain className="w-3.5 h-3.5 text-emerald-600" />
                  Kognitif & Pola
                </span>
                <span className="text-emerald-700">BSB (88%)</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full w-[88%]"></div>
              </div>
              <p className="text-[11px] text-slate-500">Mengenali pola berulang dan klasifikasi 3 kategori sampah dengan cepat.</p>
            </div>

            {/* Domain 2: Problem Solving */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex flex-col gap-1.5">
              <div className="flex items-center justify-between font-bold">
                <span className="text-slate-800 flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-sky-600" />
                  Problem Solving & Resilience
                </span>
                <span className="text-sky-700">BSB (92%)</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div className="bg-sky-500 h-full w-[92%]"></div>
              </div>
              <p className="text-[11px] text-slate-500">Tidak mudah menyerah saat balok jatuh, mencoba 3 alternatif balok penyangga.</p>
            </div>

            {/* Domain 3: Kreativitas */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex flex-col gap-1.5">
              <div className="flex items-center justify-between font-bold">
                <span className="text-slate-800 flex items-center gap-1.5">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                  Kreativitas & Desain
                </span>
                <span className="text-amber-700">BSH (80%)</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full w-[80%]"></div>
              </div>
              <p className="text-[11px] text-slate-500">Menghias kotak daur ulang dengan kombinasi pola origami buatan sendiri.</p>
            </div>

            {/* Domain 4: Sosial-Emosional */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex flex-col gap-1.5">
              <div className="flex items-center justify-between font-bold">
                <span className="text-slate-800 flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-rose-500" />
                  Sosial-Emosional & Empati
                </span>
                <span className="text-rose-700">BSB (90%)</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div className="bg-rose-500 h-full w-[90%]"></div>
              </div>
              <p className="text-[11px] text-slate-500">Mampu menunggu giliran dengan tertib dan menghibur teman yang sedih.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Observation Log Table & Add Action */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
              <FileText className="w-5 h-5 text-teal-600" />
              Catatan Observasi Pembelajaran Nyata
            </h3>
            <p className="text-xs text-slate-500">
              Dokumentasi perilaku, strategi yang dicoba, dan perkembangan anak selama sesi digital-ke-fisik.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="game-btn-green px-4 py-2 rounded-xl text-xs font-bold font-game flex items-center gap-1.5 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            + Tambah Catatan Observasi
          </button>
        </div>

        {/* Observations List */}
        <div className="space-y-3">
          {studentObservations.length > 0 ? (
            studentObservations.map((obs) => (
              <div
                key={obs.id}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-300 transition flex flex-col sm:flex-row sm:items-start justify-between gap-3"
              >
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span className="font-bold text-xs text-slate-800">{obs.activityName}</span>
                    <span>·</span>
                    <span className="text-xs font-semibold text-teal-700 bg-teal-100/70 px-2 py-0.5 rounded-md">
                      {obs.domain}
                    </span>
                    <span>·</span>
                    {getGradeBadge(obs.grade)}
                  </div>

                  <p className="text-xs text-slate-700 font-medium">
                    Indikator: <span className="text-slate-900 font-normal">{obs.indicator}</span>
                  </p>
                  <p className="text-xs text-slate-600 italic bg-white p-2.5 rounded-xl border border-slate-200 mt-2">
                    "{obs.teacherNote}"
                  </p>
                </div>

                <div className="text-[11px] text-slate-400 self-start shrink-0">
                  {obs.timestamp}
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-xs text-slate-500 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
              Belum ada catatan observasi untuk anak ini. Klik tombol "+ Tambah Catatan Observasi" untuk mencatat proses belajar.
            </div>
          )}
        </div>
      </div>

      {/* Add Observation Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl border-2 border-emerald-300">
            <h3 className="font-bold text-lg font-game text-slate-800 mb-1">
              Tambah Catatan Observasi: {selectedStudent.name}
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Standar Evaluasi Observasional Kurikulum Merdeka PAUD
            </p>

            <form onSubmit={handleAddObservation} className="flex flex-col gap-3.5 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Aktivitas Pembelajaran:</label>
                <input
                  type="text"
                  value={activityName}
                  onChange={(e) => setActivityName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Aspek Perkembangan:</label>
                  <select
                    value={domain}
                    onChange={(e) => setDomain(e.target.value as ObservationRecord['domain'])}
                    className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  >
                    <option value="Problem Solving">Problem Solving</option>
                    <option value="Kognitif">Kognitif</option>
                    <option value="Kreativitas">Kreativitas</option>
                    <option value="Sosial-Emosional">Sosial-Emosional</option>
                    <option value="Motorik Halus">Motorik Halus</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Capaian Anak (Rubrik):</label>
                  <select
                    value={grade}
                    onChange={(e) => setGrade(e.target.value as AssessmentGrade)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  >
                    <option value="BSB">BSB (Berkembang Sangat Baik)</option>
                    <option value="BSH">BSH (Berkembang Sesuai Harapan)</option>
                    <option value="MB">MB (Mulai Berkembang)</option>
                    <option value="BB">BB (Belum Berkembang)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Indikator Teramati:</label>
                <input
                  type="text"
                  value={indicator}
                  onChange={(e) => setIndicator(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Catatan Anekdot & Refleksi Guru:</label>
                <textarea
                  rows={3}
                  value={teacherNote}
                  onChange={(e) => setTeacherNote(e.target.value)}
                  placeholder="Contoh: Ketika jembatannya jatuh, anak tidak menangis melainkan mengambil balok persegi panjang untuk memperkuat pondasi..."
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  required
                ></textarea>
              </div>

              <div className="flex items-center justify-end gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="game-btn-green px-5 py-2 rounded-xl font-bold font-game"
                >
                  Simpan Catatan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
