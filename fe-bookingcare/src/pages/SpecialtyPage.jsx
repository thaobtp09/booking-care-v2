import { useEffect, useState } from 'react';
import { getAllSpecialties } from '../api/home.api';
import '../components/home.css';

const SpecialtyPage = () => {
  const [specialties, setSpecialties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllSpecialties()
      .then(res => {
        // ⚠️ tuỳ backend, thường là res.data.data
        setSpecialties(res?.data?.data || []);
      })
      .catch(err => {
        console.error('Get specialties error:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // KHÔNG BAO GIỜ return null
  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  return (
    <div className="home">
      <main className="home-main">

        <section className="home-section">
          <h2>Danh sách chuyên khoa</h2>

          {specialties.length === 0 ? (
            <div className="home-nodata">
              Chưa có dữ liệu chuyên khoa
            </div>
          ) : (
            <div className="home-grid-4">
              {specialties.map(item => (
                <div key={item.id} className="home-card">
                  <div className="home-icon">
                    {item.icon || '🏥'}
                  </div>
                  <div className="home-card-title">
                    {item.name}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

      </main>
    </div>
  );
};

export default SpecialtyPage;
