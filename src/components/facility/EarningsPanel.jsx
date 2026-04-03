export default function RevenueDisplay({ revenue }) {
  const total = revenue.capacityPayment + revenue.responseEvents + revenue.frequencyRegulation;

  return (
    <div className="bg-grid-surface border border-grid-border rounded-sm p-4">
      <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-grid-dim">
        Revenue Streams
      </span>

      <div className="mt-3 mb-3">
        <span className="text-3xl font-mono font-bold tabular-nums text-accent">
          ${total.toFixed(2)}
        </span>
        <span className="text-xs font-mono text-grid-dim ml-2">total earned</span>
      </div>

      <div className="space-y-2 border-t border-grid-border pt-3">
        <div className="flex justify-between items-center text-[11px] font-mono">
          <div className="flex flex-col">
            <span className="text-grid-dim">Capacity Payment</span>
            <span className="text-[9px] text-grid-dim">$1,200/day enrollment</span>
          </div>
          <span className="text-success tabular-nums">+${revenue.capacityPayment.toFixed(2)}</span>
        </div>

        <div className="flex justify-between items-center text-[11px] font-mono">
          <div className="flex flex-col">
            <span className="text-grid-dim">Response Events</span>
            <span className="text-[9px] text-grid-dim">{revenue.eventCount} events @ $85</span>
          </div>
          <span className="text-success tabular-nums">+${revenue.responseEvents.toFixed(2)}</span>
        </div>

        <div className="flex justify-between items-center text-[11px] font-mono">
          <div className="flex flex-col">
            <span className="text-grid-dim">Frequency Regulation</span>
            <span className="text-[9px] text-grid-dim">Continuous during response</span>
          </div>
          <span className="text-success tabular-nums">+${revenue.frequencyRegulation.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-[11px] font-mono border-t border-grid-border pt-2">
          <span className="text-grid-text font-bold">Total Revenue</span>
          <span className="text-accent tabular-nums font-bold">${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
