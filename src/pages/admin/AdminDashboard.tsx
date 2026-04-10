import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { supabase } from '../../lib/supabase';
import type { DbProject, DbService, DbTestimonial, DbCertificate } from '../../lib/supabase';
import { useProjects, useServices, useTestimonials, useCertificates } from '../../hooks/useSupabase';
import { PROJECTS } from '../../constants';

type ActiveTab = 'projects' | 'services' | 'testimonials' | 'certificates';

// ===== Skeleton Loading =====
const Skeleton = ({ className = '' }: { className?: string }) => (
  <div className={`bg-gray-200 animate-pulse border-2 border-gray-300 ${className}`}></div>
);

// ===== Confirm Dialog =====
const ConfirmDialog = ({ message, onConfirm, onCancel }: { message: string; onConfirm: () => void; onCancel: () => void }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
    <div className="relative max-w-sm w-full">
      <div className="absolute inset-0 bg-red-500 translate-x-2 translate-y-2"></div>
      <div className="relative bg-white border-4 border-black p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-red-500 border-2 border-black flex items-center justify-center text-white font-black text-sm">!</div>
          <span className="font-black uppercase text-sm tracking-tighter">Konfirmasi Hapus</span>
        </div>
        <p className="font-bold text-sm">{message}</p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 border-4 border-black py-2 font-black uppercase text-sm hover:bg-gray-100 transition-colors">Batal</button>
          <button onClick={onConfirm} className="flex-1 border-4 border-black bg-red-500 text-white py-2 font-black uppercase text-sm hover:bg-red-600 transition-colors shadow-[4px_4px_0_0_rgba(0,0,0,1)]">Hapus</button>
        </div>
      </div>
    </div>
  </div>
);

// ===== Tag Input =====
const TagInput = ({ value, onChange }: { value: string[]; onChange: (tags: string[]) => void }) => {
  const [input, setInput] = useState('');
  const addTag = () => {
    const trimmed = input.trim();
    if (trimmed && !value.includes(trimmed)) onChange([...value, trimmed]);
    setInput('');
  };
  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2 min-h-8">
        {value.map((tag) => (
          <span key={tag} className="bg-black text-white border-2 border-black px-2 py-0.5 text-xs font-black uppercase flex items-center gap-1">
            {tag}
            <button type="button" onClick={() => onChange(value.filter(t => t !== tag))} className="text-red-300 hover:text-white leading-none">&times;</button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTag())}
          placeholder="Tambah tag, tekan Enter..."
          className="flex-1 border-4 border-black px-3 py-2 font-bold text-xs focus:outline-none focus:bg-yellow-50"
        />
        <button type="button" onClick={addTag} className="border-4 border-black bg-black text-white px-3 py-2 font-black text-xs uppercase hover:bg-yellow-300 hover:text-black transition-colors">+</button>
      </div>
    </div>
  );
};

// ===== Image Uploader =====
const ImageUploader = ({ 
  bucket, 
  value, 
  onChange, 
  disabled 
}: { 
  bucket: string, 
  value: string, 
  onChange: (url: string) => void, 
  disabled?: boolean 
}) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      setError('');
      if (!e.target.files || e.target.files.length === 0) return;
      
      const file = e.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage.from(bucket).upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
      onChange(data.publicUrl);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      setError(errorMessage);
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      {value ? (
        <div className="relative group border-4 border-black inline-block">
          <img src={value} alt="Preview" className="h-32 object-cover bg-gray-100" />
          <button 
            type="button" 
            onClick={() => onChange('')} 
            className="absolute top-2 right-2 bg-red-400 text-white p-1.5 border-2 border-black opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-black uppercase"
          >
            Hapus
          </button>
        </div>
      ) : (
        <div className="relative">
           <input 
             type="file" 
             accept="image/*" 
             onChange={handleUpload} 
             disabled={disabled || uploading} 
             className="w-full border-4 border-black px-3 py-2 font-bold text-sm bg-white file:mr-4 file:py-1 file:px-3 file:border-2 file:border-black file:bg-yellow-300 file:font-black file:text-xs file:uppercase file:cursor-pointer hover:file:bg-black hover:file:text-white transition-all cursor-pointer disabled:opacity-50"
           />
           {uploading && <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black uppercase flex items-center gap-2 bg-white px-2 py-0.5 border-2 border-black"><span className="w-3 h-3 border-2 border-black border-t-transparent rounded-full animate-spin"></span> Uploading...</span>}
        </div>
      )}
      {error && <p className="text-red-500 text-[10px] font-black uppercase bg-red-100 p-1 border-2 border-red-500 inline-block">{error}</p>}
    </div>
  );
};

// ========================================================
// PROJECTS CRUD PANEL
// ========================================================
const ProjectsPanel = () => {
  const { projects, loading, refetch } = useProjects();
  const [editing, setEditing] = useState<Partial<DbProject> | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const emptyProject: Partial<DbProject> = {
    title: '', description: '', tags: [], year: String(new Date().getFullYear()),
    category: 'Web Development', color: 'bg-cyan-300', image: '',
    github_url: '', live_url: '', featured: false, sort_order: 0,
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    setSaving(true);
    let supabaseError = null;
    if (editing.id) {
      const { error } = await supabase.from('projects').update(editing).eq('id', editing.id);
      supabaseError = error;
    } else {
      const { error } = await supabase.from('projects').insert([editing]);
      supabaseError = error;
    }
    setSaving(false);
    
    if (supabaseError) {
      alert("Gagal menyimpan: " + supabaseError.message);
      return;
    }
    
    setEditing(null);
    refetch();
  };

  const handleDelete = async (id: string) => {
    await supabase.from('projects').delete().eq('id', id);
    setDeleteId(null);
    refetch();
  };

  const handleSeedDefaults = async () => {
    if (!window.confirm("Ini akan memasukkan 5 proyek default dari GitHub Anda ke dalam database CMS. Lanjutkan?")) return;
    setSaving(true);
    try {
      // Omit 'id' so Supabase auto-generates UUIDs
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const projectsToInsert = PROJECTS.map(({ id, ...rest }) => rest);
      
      const { error } = await supabase.from('projects').insert(projectsToInsert);
      if (error) throw error;
      
      refetch();
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      alert("Gagal memuat default: " + errorMessage);
    } finally {
      setSaving(false);
    }
  };

  if (loading && projects.length === 0) return (
    <div className="space-y-4">
      {[1, 2, 3].map(i => <Skeleton key={i} className="w-full h-24" />)}
    </div>
  );

  return (
    <div className="space-y-4">
      {deleteId && <ConfirmDialog message="Yakin ingin menghapus project ini?" onConfirm={() => handleDelete(deleteId)} onCancel={() => setDeleteId(null)} />}

      {/* Add Button */}
      {!editing && (
        <button onClick={() => setEditing(emptyProject)} className="relative group w-full border-4 border-black border-dashed py-4 font-black uppercase text-sm hover:bg-lime-300 hover:border-solid transition-all flex items-center justify-center gap-2">
          <span className="text-xl font-black">+</span> Tambah Project Baru
        </button>
      )}

      {/* FORM MODAL */}
      {editing && (
        <div className="fixed inset-0 z-100 flex justify-center p-4 sm:p-8 bg-black/80 backdrop-blur-sm overflow-y-auto" onClick={() => setEditing(null)}>
          <div className="relative w-full max-w-4xl mt-10 mb-20 h-fit pointer-events-auto shrink-0 animate-[slideIn_0.2s_ease-out]" onClick={e => e.stopPropagation()}>
            <div className="absolute inset-0 bg-lime-400 translate-x-2 sm:translate-x-4 border-4 sm:border-8 border-black translate-y-2 sm:translate-y-4"></div>
            <div className="relative bg-white border-4 sm:border-8 border-black p-6 sm:p-10 space-y-6 shadow-[8px_8px_0_0_rgba(0,0,0,1)]">
            <h3 className="font-black uppercase text-lg tracking-tighter border-b-4 border-black pb-3">{editing.id ? '✏️ Edit Project' : '+ Project Baru'}</h3>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className="block font-black text-[10px] uppercase tracking-widest mb-1">Judul *</label><input required value={editing.title || ''} onChange={e => setEditing({ ...editing, title: e.target.value })} className="w-full border-4 border-black px-3 py-2 font-bold text-sm focus:outline-none focus:bg-yellow-50" /></div>
                <div><label className="block font-black text-[10px] uppercase tracking-widest mb-1">Tahun</label><input value={editing.year || ''} onChange={e => setEditing({ ...editing, year: e.target.value })} className="w-full border-4 border-black px-3 py-2 font-bold text-sm focus:outline-none focus:bg-yellow-50" /></div>
              </div>
              <div><label className="block font-black text-[10px] uppercase tracking-widest mb-1">Deskripsi *</label><textarea required value={editing.description || ''} onChange={e => setEditing({ ...editing, description: e.target.value })} rows={3} className="w-full border-4 border-black px-3 py-2 font-bold text-sm focus:outline-none focus:bg-yellow-50 resize-none" /></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className="block font-black text-[10px] uppercase tracking-widest mb-1">Kategori</label><input value={editing.category || ''} onChange={e => setEditing({ ...editing, category: e.target.value })} className="w-full border-4 border-black px-3 py-2 font-bold text-sm focus:outline-none focus:bg-yellow-50" /></div>
                <div><label className="block font-black text-[10px] uppercase tracking-widest mb-1">Warna Card (Tailwind class)</label><input value={editing.color || ''} onChange={e => setEditing({ ...editing, color: e.target.value })} placeholder="bg-cyan-300" className="w-full border-4 border-black px-3 py-2 font-bold text-sm focus:outline-none focus:bg-yellow-50" /></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className="block font-black text-[10px] uppercase tracking-widest mb-1">URL Cover Gambar</label><ImageUploader bucket="portfolio-images" value={editing.image || ''} onChange={url => setEditing({ ...editing, image: url })} /></div>
                <div><label className="block font-black text-[10px] uppercase tracking-widest mb-1">Live URL</label><input value={editing.live_url || ''} onChange={e => setEditing({ ...editing, live_url: e.target.value })} placeholder="https://..." className="w-full border-4 border-black px-3 py-2 font-bold text-sm focus:outline-none focus:bg-yellow-50" /></div>
              </div>
              <div><label className="block font-black text-[10px] uppercase tracking-widest mb-1">GitHub URL</label><input value={editing.github_url || ''} onChange={e => setEditing({ ...editing, github_url: e.target.value })} placeholder="https://github.com/..." className="w-full border-4 border-black px-3 py-2 font-bold text-sm focus:outline-none focus:bg-yellow-50" /></div>
              <div><label className="block font-black text-[10px] uppercase tracking-widest mb-1">Tags</label><TagInput value={editing.tags || []} onChange={tags => setEditing({ ...editing, tags })} /></div>
              <div className="flex items-center gap-3 p-3 border-4 border-black border-dashed">
                <input type="checkbox" id="featured" checked={editing.featured || false} onChange={e => setEditing({ ...editing, featured: e.target.checked })} className="w-5 h-5 border-4 border-black cursor-pointer" />
                <label htmlFor="featured" className="font-black text-sm uppercase cursor-pointer">Featured (tampil di homepage)</label>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setEditing(null)} className="flex-1 border-4 border-black py-3 font-black uppercase text-sm hover:bg-gray-100 transition-colors">Batal</button>
                <button type="submit" disabled={saving} className="flex-1 border-4 border-black bg-black text-white py-3 font-black uppercase text-sm hover:bg-yellow-300 hover:text-black transition-colors shadow-[4px_4px_0_0_rgba(0,0,0,1)] disabled:opacity-50">
                  {saving ? 'Menyimpan...' : 'Simpan'}
                </button>
              </div>
            </form>
          </div>
        </div>
        </div>
      )}

      {/* LIST */}
      <div className="space-y-3">
        {projects.map((p) => (
          <div key={p.id} className="relative group">
            <div className="absolute inset-0 bg-black translate-x-1 translate-y-1 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform"></div>
            <div className="relative bg-white border-4 border-black p-4 flex items-center gap-4">
              {p.image ? <img src={p.image} alt={p.title} className="w-16 h-16 object-cover border-4 border-black shrink-0 bg-gray-100" /> : <div className="w-16 h-16 border-4 border-black border-dashed shrink-0 flex items-center justify-center text-xs font-black opacity-30">IMG</div>}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="font-black uppercase tracking-tighter text-base">{p.title}</h4>
                  {p.featured && <span className="bg-lime-300 border-2 border-black px-2 text-[9px] font-black uppercase">Featured</span>}
                  <span className="bg-black text-white border-2 border-black px-2 text-[9px] font-black uppercase">{p.year}</span>
                </div>
                <p className="text-xs font-bold opacity-60 truncate mt-0.5">{p.description}</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {(p.tags || []).slice(0, 3).map(t => <span key={t} className="bg-black text-white px-2 text-[8px] font-black uppercase">{t}</span>)}
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => setEditing(p)} className="border-4 border-black p-2 font-black text-xs uppercase hover:bg-yellow-300 transition-colors" title="Edit">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                </button>
                <button onClick={() => setDeleteId(p.id)} className="border-4 border-black p-2 font-black text-xs uppercase hover:bg-red-400 hover:text-white transition-colors" title="Hapus">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"></path></svg>
                </button>
              </div>
            </div>
          </div>
        ))}
        {projects.length === 0 && !loading && (
          <div className="text-center py-12 border-4 border-black border-dashed space-y-4">
            <p className="font-black uppercase opacity-40">Belum ada project di database CMS.</p>
            <button 
              onClick={handleSeedDefaults} 
              disabled={saving}
              className="inline-block px-6 py-3 bg-cyan-300 text-black font-black uppercase text-sm hover:bg-yellow-300 border-4 border-black transition-all shadow-[4px_4px_0_0_rgba(0,0,0,1)] disabled:opacity-50"
            >
              {saving ? 'Loading...' : 'Tarik Otomatis dari GitHub'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// ========================================================
// SERVICES CRUD PANEL
// ========================================================
const ICON_OPTIONS = ['FaRocket', 'FaRobot', 'FaBuilding', 'FaFigma', 'FaCode', 'FaMobile', 'FaDatabase', 'FaServer'];

const ServicesPanel = () => {
  const { services, loading, refetch } = useServices();
  const [editing, setEditing] = useState<Partial<DbService> | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const emptyService: Partial<DbService> = { title: '', description: '', icon_name: 'FaRocket', color: 'bg-cyan-300', badge: '', sort_order: 0 };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    setSaving(true);
    let supabaseError = null;
    if (editing.id) {
      const { error } = await supabase.from('services').update(editing).eq('id', editing.id);
      supabaseError = error;
    } else {
      const { error } = await supabase.from('services').insert([editing]);
      supabaseError = error;
    }
    setSaving(false);
    
    if (supabaseError) {
      alert("Gagal menyimpan: " + supabaseError.message);
      return;
    }
    
    setEditing(null);
    refetch();
  };

  const handleDelete = async (id: string) => {
    await supabase.from('services').delete().eq('id', id);
    setDeleteId(null);
    refetch();
  };

  const COLOR_OPTIONS = ['bg-cyan-300', 'bg-pink-300', 'bg-lime-300', 'bg-yellow-300', 'bg-blue-300', 'bg-purple-300', 'bg-orange-300'];

  if (loading && services.length === 0) return <div className="space-y-4">{[1, 2].map(i => <Skeleton key={i} className="w-full h-20" />)}</div>;

  return (
    <div className="space-y-4">
      {deleteId && <ConfirmDialog message="Yakin ingin menghapus service ini?" onConfirm={() => handleDelete(deleteId)} onCancel={() => setDeleteId(null)} />}
      {!editing && (
        <button onClick={() => setEditing(emptyService)} className="w-full border-4 border-black border-dashed py-4 font-black uppercase text-sm hover:bg-lime-300 hover:border-solid transition-all flex items-center justify-center gap-2">
          <span className="text-xl font-black">+</span> Tambah Service Baru
        </button>
      )}
      {/* FORM MODAL */}
      {editing && (
        <div className="fixed inset-0 z-100 flex justify-center p-4 sm:p-8 bg-black/80 backdrop-blur-sm overflow-y-auto" onClick={() => setEditing(null)}>
          <div className="relative w-full max-w-3xl mt-10 mb-20 h-fit pointer-events-auto shrink-0 animate-[slideIn_0.2s_ease-out]" onClick={e => e.stopPropagation()}>
            <div className="absolute inset-0 bg-cyan-400 translate-x-2 sm:translate-x-4 border-4 sm:border-8 border-black translate-y-2 sm:translate-y-4"></div>
            <div className="relative bg-white border-4 sm:border-8 border-black p-6 sm:p-10 space-y-6 shadow-[8px_8px_0_0_rgba(0,0,0,1)]">
            <h3 className="font-black uppercase text-lg tracking-tighter border-b-4 border-black pb-3">{editing.id ? '✏️ Edit Service' : '+ Service Baru'}</h3>
            <form onSubmit={handleSave} className="space-y-4">
              <div><label className="block font-black text-[10px] uppercase tracking-widest mb-1">Judul *</label><input required value={editing.title || ''} onChange={e => setEditing({ ...editing, title: e.target.value })} className="w-full border-4 border-black px-3 py-2 font-bold text-sm focus:outline-none focus:bg-yellow-50" /></div>
              <div><label className="block font-black text-[10px] uppercase tracking-widest mb-1">Deskripsi *</label><textarea required value={editing.description || ''} onChange={e => setEditing({ ...editing, description: e.target.value })} rows={3} className="w-full border-4 border-black px-3 py-2 font-bold text-sm focus:outline-none focus:bg-yellow-50 resize-none" /></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-black text-[10px] uppercase tracking-widest mb-1">Icon</label>
                  <select value={editing.icon_name || 'FaRocket'} onChange={e => setEditing({ ...editing, icon_name: e.target.value })} className="w-full border-4 border-black px-3 py-2 font-bold text-sm focus:outline-none bg-white">
                    {ICON_OPTIONS.map(i => <option key={i} value={i}>{i}</option>)}
                  </select>
                </div>
                <div><label className="block font-black text-[10px] uppercase tracking-widest mb-1">Badge Text</label><input value={editing.badge || ''} onChange={e => setEditing({ ...editing, badge: e.target.value })} className="w-full border-4 border-black px-3 py-2 font-bold text-sm focus:outline-none focus:bg-yellow-50" /></div>
              </div>
              <div>
                <label className="block font-black text-[10px] uppercase tracking-widest mb-2">Warna Card</label>
                <div className="flex flex-wrap gap-2">
                  {COLOR_OPTIONS.map(c => (
                    <button key={c} type="button" onClick={() => setEditing({ ...editing, color: c })} className={`w-10 h-10 border-4 ${editing.color === c ? 'border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)] -translate-x-0.5 -translate-y-0.5' : 'border-gray-300'} ${c} transition-all`}></button>
                  ))}
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setEditing(null)} className="flex-1 border-4 border-black py-3 font-black uppercase text-sm hover:bg-gray-100 transition-colors">Batal</button>
                <button type="submit" disabled={saving} className="flex-1 border-4 border-black bg-black text-white py-3 font-black uppercase text-sm hover:bg-yellow-300 hover:text-black transition-colors shadow-[4px_4px_0_0_rgba(0,0,0,1)] disabled:opacity-50">
                  {saving ? 'Menyimpan...' : 'Simpan'}
                </button>
              </div>
            </form>
          </div>
        </div>
        </div>
      )}
      <div className="space-y-3">
        {services.map((s) => (
          <div key={s.id} className="relative group">
            <div className="absolute inset-0 bg-black translate-x-1 translate-y-1 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform"></div>
            <div className={`relative border-4 border-black p-4 flex items-center gap-4 ${s.color}`}>
              <div className="flex-1">
                <div className="flex items-center gap-2"><h4 className="font-black uppercase tracking-tighter">{s.title}</h4><span className="bg-black text-white border-2 border-black px-2 text-[9px] font-black uppercase">{s.badge}</span></div>
                <p className="text-xs font-bold opacity-70 mt-0.5">{s.description}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => setEditing(s)} className="border-4 border-black bg-white p-2 hover:bg-yellow-300 transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg></button>
                <button onClick={() => setDeleteId(s.id)} className="border-4 border-black bg-white p-2 hover:bg-red-400 hover:text-white transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"></path></svg></button>
              </div>
            </div>
          </div>
        ))}
        {services.length === 0 && !loading && <div className="text-center py-12 border-4 border-black border-dashed"><p className="font-black uppercase opacity-40">Belum ada service.</p></div>}
      </div>
    </div>
  );
};

// ========================================================
// TESTIMONIALS CRUD PANEL
// ========================================================
const TestimonialsPanel = () => {
  const { testimonials, loading, refetch } = useTestimonials();
  const [editing, setEditing] = useState<Partial<DbTestimonial> | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const empty: Partial<DbTestimonial> = { name: '', role: '', company: '', text: '', color: 'bg-cyan-300', avatar: '', sort_order: 0 };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    setSaving(true);
    let supabaseError = null;
    if (editing.id) { 
      const { error } = await supabase.from('testimonials').update(editing).eq('id', editing.id); 
      supabaseError = error;
    } else { 
      const { error } = await supabase.from('testimonials').insert([editing]); 
      supabaseError = error;
    }
    setSaving(false);
    
    if (supabaseError) {
      alert("Gagal menyimpan: " + supabaseError.message);
      return;
    }
    
    setEditing(null); 
    refetch();
  };
  const handleDelete = async (id: string) => { await supabase.from('testimonials').delete().eq('id', id); setDeleteId(null); refetch(); };

  if (loading && testimonials.length === 0) return <div className="space-y-4">{[1, 2, 3].map(i => <Skeleton key={i} className="w-full h-20" />)}</div>;

  return (
    <div className="space-y-4">
      {deleteId && <ConfirmDialog message="Yakin ingin menghapus testimoni ini?" onConfirm={() => handleDelete(deleteId)} onCancel={() => setDeleteId(null)} />}
      {!editing && (
        <button onClick={() => setEditing(empty)} className="w-full border-4 border-black border-dashed py-4 font-black uppercase text-sm hover:bg-lime-300 hover:border-solid transition-all flex items-center justify-center gap-2">
          <span className="text-xl font-black">+</span> Tambah Testimoni Baru
        </button>
      )}
      {/* FORM MODAL */}
      {editing && (
        <div className="fixed inset-0 z-100 flex justify-center p-4 sm:p-8 bg-black/80 backdrop-blur-sm overflow-y-auto" onClick={() => setEditing(null)}>
          <div className="relative w-full max-w-3xl mt-10 mb-20 h-fit pointer-events-auto shrink-0 animate-[slideIn_0.2s_ease-out]" onClick={e => e.stopPropagation()}>
            <div className="absolute inset-0 bg-purple-400 translate-x-2 sm:translate-x-4 border-4 sm:border-8 border-black translate-y-2 sm:translate-y-4"></div>
            <div className="relative bg-white border-4 sm:border-8 border-black p-6 sm:p-10 space-y-6 shadow-[8px_8px_0_0_rgba(0,0,0,1)]">
            <h3 className="font-black uppercase text-lg tracking-tighter border-b-4 border-black pb-3">{editing.id ? '✏️ Edit Testimoni' : '+ Testimoni Baru'}</h3>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className="block font-black text-[10px] uppercase tracking-widest mb-1">Nama *</label><input required value={editing.name || ''} onChange={e => setEditing({ ...editing, name: e.target.value })} className="w-full border-4 border-black px-3 py-2 font-bold text-sm focus:outline-none focus:bg-yellow-50" /></div>
                <div><label className="block font-black text-[10px] uppercase tracking-widest mb-1">Role / Jabatan</label><input value={editing.role || ''} onChange={e => setEditing({ ...editing, role: e.target.value })} className="w-full border-4 border-black px-3 py-2 font-bold text-sm focus:outline-none focus:bg-yellow-50" /></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className="block font-black text-[10px] uppercase tracking-widest mb-1">Perusahaan</label><input value={editing.company || ''} onChange={e => setEditing({ ...editing, company: e.target.value })} className="w-full border-4 border-black px-3 py-2 font-bold text-sm focus:outline-none focus:bg-yellow-50" /></div>
                <div><label className="block font-black text-[10px] uppercase tracking-widest mb-1">URL Avatar</label><input value={editing.avatar || ''} onChange={e => setEditing({ ...editing, avatar: e.target.value })} placeholder="https://..." className="w-full border-4 border-black px-3 py-2 font-bold text-sm focus:outline-none focus:bg-yellow-50" /></div>
              </div>
              <div><label className="block font-black text-[10px] uppercase tracking-widest mb-1">Isi Testimoni *</label><textarea required value={editing.text || ''} onChange={e => setEditing({ ...editing, text: e.target.value })} rows={4} className="w-full border-4 border-black px-3 py-2 font-bold text-sm focus:outline-none focus:bg-yellow-50 resize-none" /></div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setEditing(null)} className="flex-1 border-4 border-black py-3 font-black uppercase text-sm hover:bg-gray-100 transition-colors">Batal</button>
                <button type="submit" disabled={saving} className="flex-1 border-4 border-black bg-black text-white py-3 font-black uppercase text-sm hover:bg-yellow-300 hover:text-black transition-colors shadow-[4px_4px_0_0_rgba(0,0,0,1)] disabled:opacity-50">{saving ? 'Menyimpan...' : 'Simpan'}</button>
              </div>
            </form>
          </div>
        </div>
        </div>
      )}
      <div className="space-y-3">
        {testimonials.map((t) => (
          <div key={t.id} className="relative group">
            <div className="absolute inset-0 bg-black translate-x-1 translate-y-1 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform"></div>
            <div className="relative bg-white border-4 border-black p-4 flex items-center gap-4">
              {t.avatar ? <img src={t.avatar} alt={t.name} className="w-12 h-12 object-cover border-4 border-black rounded-none shrink-0 grayscale" /> : <div className="w-12 h-12 border-4 border-black shrink-0 flex items-center justify-center font-black text-lg">{t.name?.[0]}</div>}
              <div className="flex-1 min-w-0">
                <h4 className="font-black uppercase tracking-tighter">{t.name}</h4>
                <p className="text-[10px] font-black uppercase opacity-50">{t.role} @ {t.company}</p>
                <p className="text-xs font-bold opacity-70 truncate mt-0.5">"{t.text}"</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => setEditing(t)} className="border-4 border-black p-2 hover:bg-yellow-300 transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg></button>
                <button onClick={() => setDeleteId(t.id)} className="border-4 border-black p-2 hover:bg-red-400 hover:text-white transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"></path></svg></button>
              </div>
            </div>
          </div>
        ))}
        {testimonials.length === 0 && !loading && <div className="text-center py-12 border-4 border-black border-dashed"><p className="font-black uppercase opacity-40">Belum ada testimoni.</p></div>}
      </div>
    </div>
  );
};

// ========================================================
// CERTIFICATES CRUD PANEL
// ========================================================
const CertificatesPanel = () => {
  const { certificates, loading, refetch } = useCertificates();
  const [editing, setEditing] = useState<Partial<DbCertificate> | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const empty: Partial<DbCertificate> = { title: '', issuer: '', year: new Date().getFullYear().toString(), url: '', image: '', sort_order: 0 };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    setSaving(true);
    let supabaseError = null;
    if (editing.id) { 
      const { error } = await supabase.from('certificates').update(editing).eq('id', editing.id); 
      supabaseError = error;
    } else { 
      const { error } = await supabase.from('certificates').insert([editing]); 
      supabaseError = error;
    }
    setSaving(false);
    
    if (supabaseError) {
      alert("Gagal menyimpan: " + supabaseError.message);
      return;
    }
    
    setEditing(null); 
    refetch();
  };
  const handleDelete = async (id: string) => { await supabase.from('certificates').delete().eq('id', id); setDeleteId(null); refetch(); };

  if (loading && certificates.length === 0) return <div className="space-y-4">{[1, 2, 3].map(i => <Skeleton key={i} className="w-full h-20" />)}</div>;

  return (
    <div className="space-y-4">
      {deleteId && <ConfirmDialog message="Yakin ingin menghapus sertifikat ini?" onConfirm={() => handleDelete(deleteId)} onCancel={() => setDeleteId(null)} />}
      {!editing && (
        <button onClick={() => setEditing(empty)} className="w-full border-4 border-black border-dashed py-4 font-black uppercase text-sm hover:bg-lime-300 hover:border-solid transition-all flex items-center justify-center gap-2">
          <span className="text-xl font-black">+</span> Tambah Sertifikat Baru
        </button>
      )}
      {/* FORM MODAL */}
      {editing && (
        <div className="fixed inset-0 z-100 flex justify-center p-4 sm:p-8 bg-black/80 backdrop-blur-sm overflow-y-auto" onClick={() => setEditing(null)}>
          <div className="relative w-full max-w-3xl mt-10 mb-20 h-fit pointer-events-auto shrink-0 animate-[slideIn_0.2s_ease-out]" onClick={e => e.stopPropagation()}>
            <div className="absolute inset-0 bg-blue-400 translate-x-2 sm:translate-x-4 border-4 sm:border-8 border-black translate-y-2 sm:translate-y-4"></div>
            <div className="relative bg-white border-4 sm:border-8 border-black p-6 sm:p-10 space-y-6 shadow-[8px_8px_0_0_rgba(0,0,0,1)]">
            <h3 className="font-black uppercase text-lg tracking-tighter border-b-4 border-black pb-3">{editing.id ? '✏️ Edit Sertifikat' : '+ Sertifikat Baru'}</h3>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className="block font-black text-[10px] uppercase tracking-widest mb-1">Judul Sertifikat *</label><input required value={editing.title || ''} onChange={e => setEditing({ ...editing, title: e.target.value })} className="w-full border-4 border-black px-3 py-2 font-bold text-sm focus:outline-none focus:bg-yellow-50" /></div>
                <div><label className="block font-black text-[10px] uppercase tracking-widest mb-1">Penerbit *</label><input required value={editing.issuer || ''} onChange={e => setEditing({ ...editing, issuer: e.target.value })} className="w-full border-4 border-black px-3 py-2 font-bold text-sm focus:outline-none focus:bg-yellow-50" /></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className="block font-black text-[10px] uppercase tracking-widest mb-1">Tahun *</label><input required value={editing.year || ''} onChange={e => setEditing({ ...editing, year: e.target.value })} className="w-full border-4 border-black px-3 py-2 font-bold text-sm focus:outline-none focus:bg-yellow-50" /></div>
                <div><label className="block font-black text-[10px] uppercase tracking-widest mb-1">URL Verifikasi</label><input value={editing.url || ''} onChange={e => setEditing({ ...editing, url: e.target.value })} placeholder="https://..." className="w-full border-4 border-black px-3 py-2 font-bold text-sm focus:outline-none focus:bg-yellow-50" /></div>
              </div>
              <div><label className="block font-black text-[10px] uppercase tracking-widest mb-1">Upload Gambar / Berkas</label><ImageUploader bucket="portfolio-images" value={editing.image || ''} onChange={url => setEditing({ ...editing, image: url })} /></div>
              
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setEditing(null)} className="flex-1 border-4 border-black py-3 font-black uppercase text-sm hover:bg-gray-100 transition-colors">Batal</button>
                <button type="submit" disabled={saving} className="flex-1 border-4 border-black bg-black text-white py-3 font-black uppercase text-sm hover:bg-yellow-300 hover:text-black transition-colors shadow-[4px_4px_0_0_rgba(0,0,0,1)] disabled:opacity-50">{saving ? 'Menyimpan...' : 'Simpan'}</button>
              </div>
            </form>
          </div>
        </div>
        </div>
      )}
      <div className="space-y-3">
        {certificates.map((c) => (
          <div key={c.id} className="relative group">
            <div className="absolute inset-0 bg-black translate-x-1 translate-y-1 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform"></div>
            <div className="relative bg-white border-4 border-black p-4 flex items-center gap-4">
              {c.image ? <img src={c.image} alt={c.title} className="w-16 h-12 object-cover border-4 border-black shrink-0 grayscale" /> : <div className="w-16 h-12 border-4 border-black border-dashed shrink-0 flex items-center justify-center text-[10px] font-black opacity-30">IMG</div>}
              <div className="flex-1 min-w-0">
                <h4 className="font-black uppercase tracking-tighter truncate">{c.title}</h4>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <span className="bg-black text-white px-2 py-0.5 text-[9px] font-black uppercase">{c.issuer}</span>
                  <span className="border-2 border-black px-2 py-0.5 text-[9px] font-black uppercase">{c.year}</span>
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                {c.url && <a href={c.url} target="_blank" rel="noreferrer" className="border-4 border-black p-2 hover:bg-blue-300 transition-colors" title="Buka URL"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg></a>}
                <button onClick={() => setEditing(c)} className="border-4 border-black p-2 hover:bg-yellow-300 transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg></button>
                <button onClick={() => setDeleteId(c.id)} className="border-4 border-black p-2 hover:bg-red-400 hover:text-white transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"></path></svg></button>
              </div>
            </div>
          </div>
        ))}
        {certificates.length === 0 && !loading && <div className="text-center py-12 border-4 border-black border-dashed"><p className="font-black uppercase opacity-40">Belum ada sertifikat.</p></div>}
      </div>
    </div>
  );
};

// ========================================================
// MAIN ADMIN DASHBOARD
// ========================================================
interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('projects');
  const { signOut, user } = useAuth();

  const handleLogout = async () => {
    await signOut();
    onLogout();
  };

  const tabs: { id: ActiveTab; label: string; color: string }[] = [
    { id: 'projects', label: 'Projects', color: 'bg-cyan-300' },
    { id: 'services', label: 'Services', color: 'bg-pink-300' },
    { id: 'testimonials', label: 'Testimonials', color: 'bg-purple-300' },
    { id: 'certificates', label: 'Certificates', color: 'bg-blue-300' },
  ];

  return (
    <div className="min-h-screen bg-[#f0f0f0] text-black">
      {/* Top Bar */}
      <div className="sticky top-0 z-50 border-b-4 border-black bg-black text-white px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="bg-yellow-300 text-black border-2 border-yellow-300 px-3 py-1 font-black uppercase text-xs tracking-widest">CMS</span>
          <span className="font-black uppercase text-sm sm:text-base tracking-tighter">Admin Dashboard</span>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <span className="hidden sm:block text-[10px] font-black uppercase opacity-40 truncate max-w-[180px]">{user?.email}</span>
          <a href="/" target="_blank" rel="noopener noreferrer" className="border-2 border-white/30 px-3 py-1.5 font-black uppercase text-[10px] hover:bg-white hover:text-black transition-colors">↗ View Site</a>
          <button onClick={handleLogout} className="border-2 border-red-400 text-red-400 px-3 py-1.5 font-black uppercase text-[10px] hover:bg-red-400 hover:text-white transition-colors">Logout</button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Page Header */}
        <div className="relative">
          <div className="absolute inset-0 bg-lime-400 translate-x-2 translate-y-2 hidden sm:block"></div>
          <div className="relative bg-white border-4 border-black p-6 sm:p-8">
            <span className="bg-black text-white px-3 py-1 text-[10px] font-black uppercase tracking-widest">Portofolio CMS</span>
            <h1 className="text-3xl sm:text-5xl font-black uppercase italic tracking-tighter leading-none mt-2">Content<br />Manager</h1>
            <p className="font-bold text-sm opacity-60 mt-2">Kelola semua konten portofolio Anda di sini. Perubahan otomatis tampil di website.</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-4 border-black overflow-hidden">
          {tabs.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex-1 py-3 font-black uppercase text-xs sm:text-sm tracking-tighter transition-all border-r-4 border-black last:border-r-0 ${activeTab === tab.id ? `${tab.color} -translate-y-0.5 shadow-[0_4px_0_0_rgba(0,0,0,1)]` : 'bg-white hover:bg-gray-50'}`}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Panel Content */}
        <div>
          {activeTab === 'projects' && <ProjectsPanel />}
          {activeTab === 'services' && <ServicesPanel />}
          {activeTab === 'testimonials' && <TestimonialsPanel />}
          {activeTab === 'certificates' && <CertificatesPanel />}
        </div>

        {/* Footer */}
        <div className="border-t-4 border-black border-dashed pt-4 flex items-center justify-between">
          <span className="text-[9px] font-black uppercase opacity-30 tracking-widest">Portofolio CMS v1.0 — Built with Supabase</span>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 bg-lime-500 rounded-full animate-pulse border border-black/20"></span>
            <span className="text-[9px] font-black uppercase opacity-50 tracking-widest">Database Connected</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
