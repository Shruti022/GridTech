import { useState } from 'react';
import { useSimulation } from './hooks/useSimulation';
import Header from './components/Header';
import GridDashboard from './components/grid/GridDashboard';
import FacilityDashboard from './components/facility/FacilityDashboard';

function App() {
  const [view, setView] = useState('grid');
  const sim = useSimulation();

  return (
    <div className="h-screen flex flex-col bg-grid-bg overflow-hidden">
      <Header
        frequency={sim.frequency}
        status={sim.status}
        view={view}
        onViewChange={setView}
      />
      {view === 'grid' ? (
        <GridDashboard {...sim} />
      ) : (
        <FacilityDashboard {...sim} />
      )}
    </div>
  );
}

export default App;
