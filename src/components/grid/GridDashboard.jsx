import GridStats from './GridStats';
import DataCenterTable from './FacilityTable';
import EventLog from './ResponseEvents';
import FrequencyChart from '../FrequencyChart';
import NYMap from '../FacilityMap';

export default function GridDashboard({
  frequency, status, frequencyHistory, dataCenters, events,
  totalFlexibleMW, totalCapacityMW, totalCurrentDraw,
  avgResponseLatency,
}) {
  return (
    <div className="flex flex-col gap-3 p-4 flex-1 overflow-hidden">
      <GridStats
        frequency={frequency}
        status={status}
        totalFlexibleMW={totalFlexibleMW}
        totalCapacityMW={totalCapacityMW}
        totalCurrentDraw={totalCurrentDraw}
        dataCenters={dataCenters}
        avgResponseLatency={avgResponseLatency}
      />

      <div className="grid grid-cols-5 gap-3 flex-1 min-h-0">
        {/* Left column - 3/5 */}
        <div className="col-span-3 flex flex-col gap-3">
          <FrequencyChart data={frequencyHistory} height={200} />
          <DataCenterTable dataCenters={dataCenters} />
        </div>

        {/* Right column - 2/5 */}
        <div className="col-span-2 flex flex-col gap-3">
          <NYMap dataCenters={dataCenters} />
          <EventLog events={events} />
        </div>
      </div>
    </div>
  );
}
