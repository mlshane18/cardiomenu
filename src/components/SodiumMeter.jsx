import { getSodiumLevel, getSodiumColor, getSodiumPercent, formatMg } from '../utils/nutrition';

export default function SodiumMeter({ sodiumMg, dailyTarget, compact = false }) {
  const level = getSodiumLevel(sodiumMg, dailyTarget);
  const color = getSodiumColor(level);
  const percent = getSodiumPercent(sodiumMg, dailyTarget);
  const perMeal = Math.round(dailyTarget / 3);

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full sodium-fill"
            style={{ width: `${Math.min(percent * 3, 100)}%`, backgroundColor: color }}
          />
        </div>
        <span className="text-xs font-medium" style={{ color }}>
          {formatMg(sodiumMg)}
        </span>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-lg">🧂</span>
          <span className="font-semibold text-gray-800 text-sm">Sodium Meter</span>
        </div>
        <div className="text-right">
          <span className="text-lg font-bold" style={{ color }}>
            {formatMg(sodiumMg)}
          </span>
          <span className="text-xs text-gray-400 ml-1">/ {formatMg(perMeal)} per meal</span>
        </div>
      </div>

      {/* Main bar */}
      <div className="relative h-4 bg-gray-100 rounded-full overflow-hidden">
        {/* Zone markers */}
        <div className="absolute inset-0 flex">
          <div className="h-full" style={{ width: '33%', background: 'rgba(34,197,94,0.15)' }} />
          <div className="h-full" style={{ width: '27%', background: 'rgba(234,179,8,0.15)' }} />
          <div className="h-full flex-1" style={{ background: 'rgba(239,68,68,0.1)' }} />
        </div>
        {/* Fill */}
        <div
          className="absolute inset-y-0 left-0 rounded-full sodium-fill"
          style={{
            width: `${Math.min(percent * 3, 100)}%`,
            backgroundColor: color,
            boxShadow: `0 0 8px ${color}40`,
          }}
        />
      </div>

      {/* Labels */}
      <div className="flex justify-between mt-1 text-[10px] text-gray-400">
        <span>0</span>
        <span>Low</span>
        <span>Moderate</span>
        <span>High</span>
      </div>

      {/* Status message */}
      <div
        className="mt-2 text-xs font-medium text-center py-1 px-2 rounded-full"
        style={{ backgroundColor: `${color}15`, color }}
      >
        {level === 'green' && '✓ Great choice — low sodium for this meal!'}
        {level === 'yellow' && '⚠ Moderate sodium — be mindful of your other meals today'}
        {level === 'red' && '⚠ High sodium — this exceeds your per-meal target'}
      </div>
    </div>
  );
}
