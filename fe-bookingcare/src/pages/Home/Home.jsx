import { useHomeData } from '../../hooks/useHomeData';
import HomeUI from '../../components/HomeUI';

const Home = () => {
  const { doctors, specialties, facilities, loading } = useHomeData();

  // KHÔNG BAO GIỜ return null
  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  return (
    <HomeUI
      doctors={doctors}
      specialties={specialties}
      facilities={facilities}
    />
  );
};

export default Home;
