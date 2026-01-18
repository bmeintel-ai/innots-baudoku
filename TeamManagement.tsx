
import React, { useState } from 'react';
import { TeamMember } from '../types';

interface TeamManagementProps {
  team: TeamMember[];
}

const TeamManagement: React.FC<TeamManagementProps> = ({ team: initialTeam }) => {
  const [team, setTeam] = useState(initialTeam);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<TeamMember | null>(null);

  const handleEdit = (member: TeamMember) => {
    setEditingId(member.id);
    setEditForm({ ...member });
  };

  const handleSave = () => {
    if (editForm) {
      setTeam(prev => prev.map(m => m.id === editForm.id ? editForm : m));
      setEditingId(null);
      setEditForm(null);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditForm(prev => prev ? { ...prev, [name]: value } : null);
  };

  return (
    <div className="p-8 mt-16 ml-64 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Team-Verwaltung</h2>
          <p className="text-slate-500">Verwalten Sie Zugriffsrechte und Profile Ihrer Mitarbeiter.</p>
        </div>
        <button className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-600 shadow-lg shadow-orange-500/20">
          <i className="fas fa-user-plus mr-2"></i> Mitarbeiter einladen
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 text-xs font-bold uppercase tracking-widest">
              <th className="px-6 py-4">Mitarbeiter</th>
              <th className="px-6 py-4">Rolle / Abteilung</th>
              <th className="px-6 py-4">Kontakt</th>
              <th className="px-6 py-4 text-center">Aktive Projekte</th>
              <th className="px-6 py-4 text-right">Aktionen</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {team.map((member) => (
              <tr key={member.id} className="group hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img src={member.avatar} alt={member.name} className="w-12 h-12 rounded-full border-2 border-white shadow-sm" />
                    {editingId === member.id ? (
                      <input 
                        name="name"
                        value={editForm?.name}
                        onChange={handleChange}
                        className="border border-slate-200 rounded px-2 py-1 text-sm outline-none focus:border-orange-500"
                      />
                    ) : (
                      <div>
                        <p className="text-slate-900 font-bold">{member.name}</p>
                        <p className="text-slate-500 text-xs font-medium">ID: {member.id}</p>
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  {editingId === member.id ? (
                    <div className="space-y-1">
                      <input 
                        name="role"
                        value={editForm?.role}
                        onChange={handleChange}
                        className="block w-full border border-slate-200 rounded px-2 py-1 text-sm mb-1"
                      />
                      <input 
                        name="department"
                        value={editForm?.department}
                        onChange={handleChange}
                        className="block w-full border border-slate-200 rounded px-2 py-1 text-sm"
                      />
                    </div>
                  ) : (
                    <div>
                      <p className="text-slate-900 text-sm font-semibold">{member.role}</p>
                      <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded font-bold uppercase tracking-tight">
                        {member.department}
                      </span>
                    </div>
                  )}
                </td>
                <td className="px-6 py-4">
                  {editingId === member.id ? (
                    <div className="space-y-1">
                      <input 
                        name="email"
                        value={editForm?.email}
                        onChange={handleChange}
                        className="block w-full border border-slate-200 rounded px-2 py-1 text-sm mb-1"
                      />
                      <input 
                        name="phone"
                        value={editForm?.phone}
                        onChange={handleChange}
                        className="block w-full border border-slate-200 rounded px-2 py-1 text-sm"
                      />
                    </div>
                  ) : (
                    <div>
                      <p className="text-slate-700 text-sm"><i className="far fa-envelope mr-2 text-slate-400"></i>{member.email}</p>
                      <p className="text-slate-700 text-sm"><i className="fas fa-phone mr-2 text-slate-400 text-xs"></i>{member.phone}</p>
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-orange-50 text-orange-600 rounded-full font-bold text-sm">
                    {member.activeProjects}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  {editingId === member.id ? (
                    <div className="flex gap-2 justify-end">
                      <button onClick={handleSave} className="bg-green-500 text-white w-8 h-8 rounded-lg hover:bg-green-600 shadow-md">
                        <i className="fas fa-check"></i>
                      </button>
                      <button onClick={() => setEditingId(null)} className="bg-slate-100 text-slate-400 w-8 h-8 rounded-lg hover:bg-slate-200">
                        <i className="fas fa-times"></i>
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => handleEdit(member)} className="bg-slate-100 text-slate-500 w-8 h-8 rounded-lg hover:bg-slate-200">
                        <i className="fas fa-pen text-xs"></i>
                      </button>
                      <button className="bg-red-50 text-red-500 w-8 h-8 rounded-lg hover:bg-red-100">
                        <i className="fas fa-trash-alt text-xs"></i>
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeamManagement;
