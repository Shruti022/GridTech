import GridStats from './GridStats';
import FacilityTable from './FacilityTable';
import ResponseEvents from './ResponseEvents';
import FrequencyChart from '../FrequencyChart';
import FacilityMap from '../FacilityMap';

export default function GridDashboard({
  frequency, status, frequencyHistory, facilities, events,
  totalCurtailedMW, triggerEvent, isEventActive, avgResponseLatency,
}) {
  return (
    <div className="flex flex-col gap-3 p-4 flex-1 overflow-hidden">
      <GridStats
        frequency={frequency}
        status={status}
        totalCurtailedMW={totalCurtailedMW}
        facilities={facilities}
        avgResponseLatency={avgResponseLatency}
      />

      <div className="grid grid-cols-5 gap-3 flex-1 min-h-0">
        {/* Left column - 3/5 */}
        <div className="col-span-3 flex flex-col gap-3">
          <FrequencyChart data={frequencyHistory} height={200} />
          <FacilityTable facilities={facilities} />
        </div>

        {/* Right column - 2/5 */}
        <div className="col-span-2 flex flex-col gap-3">
          <FacilityMap facilities={facilities} />
          <ResponseEvents events={events} />

          {/* Trigger Event Button */}
          <button
            onClick={triggerEvent}
            disabled={isEventActive}
            className={`
              w-full py-3 rounded-sm font-mono text-sm uppercase tracking-wider
              border-2 transition-all cursor-pointer
              ${isEventActive
                ? 'border-red-900 text-red-900 bg-red-950/20 cursor-not-allowed'
                : 'border-red-600 text-red-500 bg-red-950/30 hover:bg-red-950/50 hover:shadow-[0_0_20px_rgba(239,68,68,0.3)]'
              }
            `}
          >
            {isEventActive ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                EVENT IN PROGRESS
              </span>
            ) : (
              'TRIGGER FREQUENCY EVENT'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
