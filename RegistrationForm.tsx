import React, { useState } from 'react';

// =========================================================================
// Wklej swoje dane z Notatnika pomiędzy cudzysłowy poniżej:
// =========================================================================
const SUPABASE_URL = "TUTAJ_WKLEJ_ADRES_URL_Z_NOTATNIKA"; 
const SUPABASE_ANON_KEY = "TUTAJ_WKLEJ_KLUCZ_PUBLISHABLE_Z_NOTATNIKA";
// =========================================================================

export default function RegistrationForm() {
  const [formData, setFormData] = useState({ imie: '', nazwisko: '', email: '', darowizna: 30 });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/uczestnicy_biegu`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify({
          imie: formData.imie,
          nazwisko: formData.nazwisko,
          email: formData.email,
          kwota_cegielki: formData.darowizna,
          status_platnosci: 'OCZEKUJACY'
        })
      });

      if (response.ok) {
        alert("🎉 Sukces! Zostałeś pomyślnie zapisany na bieg w bazie danych OpenRace!");
      } else {
        const errData = await response.json();
        alert(`Błąd bazy danych: ${errData.message}`);
      }
    } catch (error) {
      alert("Wystąpił błąd podczas łączenia z serwerem bazy danych.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{maxWidth: '400px', margin: '40px auto', padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', fontFamily: 'sans-serif'}}>
      <h2 style={{fontSize: '20px', fontWeight: 'bold', marginBottom: '16px'}}>Rejestracja - Bieg Charytatywny</h2>
      <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
        <input type="text" placeholder="Imię" required style={{width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px'}} onChange={e => setFormData({...formData, imie: e.target.value})} />
        <input type="text" placeholder="Nazwisko" required style={{width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px'}} onChange={e => setFormData({...formData, nazwisko: e.target.value})} />
        <input type="email" placeholder="E-mail" required style={{width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px'}} onChange={e => setFormData({...formData, email: e.target.value})} />
        <div style={{padding: '12px', backgroundColor: '#e6f4ea', borderRadius: '4px'}}>
          <label style={{fontSize: '14px', fontWeight: 'bold'}}>Cegiełka: {formData.darowizna} PLN</label>
          <input type="range" min="10" max="200" value={formData.darowizna} style={{width: '100%', marginTop: '8px'}} onChange={e => setFormData({...formData, darowizna: parseInt(e.target.value)})} />
        </div>
        <button type="submit" disabled={loading} style={{width: '100%', padding: '10px', backgroundColor: '#137333', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer'}}>
          {loading ? "Zapisywanie..." : "Zapisz się 🏃‍♂️"}
        </button>
      </form>
    </div>
  );
}
