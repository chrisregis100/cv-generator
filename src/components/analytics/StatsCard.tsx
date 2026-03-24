import { Eye, Globe, Monitor } from "lucide-react";

interface StatsCardProps {
  totalViews: number;
  topCountries: { country: string; count: number }[];
  deviceSplit: { device: string; count: number }[];
}

export default function StatsCard({
  totalViews,
  topCountries,
  deviceSplit,
}: StatsCardProps) {
  const maxDeviceCount = Math.max(...deviceSplit.map((d) => d.count), 1);

  return (
    <div className="card bg-base-100 shadow">
      <div className="card-body gap-6">
        <h3 className="card-title text-lg">Analytics</h3>

        {/* Total views */}
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 p-3 rounded-xl">
            <Eye className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-3xl font-bold">{totalViews}</p>
            <p className="text-sm text-base-content/60">
              {totalViews === 1 ? "vue" : "vues"} au total
            </p>
          </div>
        </div>

        {/* Top countries */}
        {topCountries.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Globe className="w-4 h-4 text-base-content/60" />
              <span className="text-sm font-semibold text-base-content/60 uppercase tracking-wide">
                Top pays
              </span>
            </div>
            <ul className="space-y-1">
              {topCountries.map(({ country, count }) => (
                <li key={country} className="flex justify-between items-center text-sm">
                  <span className="font-medium">{country}</span>
                  <span className="badge badge-ghost badge-sm">{count}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Device split */}
        {deviceSplit.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Monitor className="w-4 h-4 text-base-content/60" />
              <span className="text-sm font-semibold text-base-content/60 uppercase tracking-wide">
                Appareils
              </span>
            </div>
            <ul className="space-y-2">
              {deviceSplit.map(({ device, count }) => {
                const percentage = Math.round((count / maxDeviceCount) * 100);
                return (
                  <li key={device}>
                    <div className="flex justify-between items-center text-sm mb-1">
                      <span className="capitalize font-medium">{device}</span>
                      <span className="text-base-content/60">{count}</span>
                    </div>
                    <div className="w-full bg-base-200 rounded-full h-1.5">
                      <div
                        className="bg-primary h-1.5 rounded-full transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {totalViews === 0 && (
          <p className="text-sm text-base-content/40 text-center py-2">
            Aucune vue pour l&apos;instant. Partagez votre CV !
          </p>
        )}
      </div>
    </div>
  );
}
