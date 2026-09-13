import React, { useState } from 'react';
import { X, Ruler, Sparkles, CheckCircle } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { SIZE_CHART_MEN, SIZE_CHART_WOMEN } from '../data/mockData';

export const SizeGuideModal: React.FC = () => {
  const { isSizeGuideOpen, setIsSizeGuideOpen } = useShop();

  const [activeGender, setActiveGender] = useState<'Men' | 'Women'>('Men');
  const [unit, setUnit] = useState<'in' | 'cm'>('in');

  // Recommendation tool state
  const [heightCm, setHeightCm] = useState(175);
  const [weightKg, setWeightKg] = useState(72);
  const [fitPreference, setFitPreference] = useState<'fitted' | 'regular' | 'oversized'>('oversized');
  const [recommendedSize, setRecommendedSize] = useState<string | null>(null);

  if (!isSizeGuideOpen) return null;

  const calculateRecommendation = () => {
    let base = 'M';
    if (activeGender === 'Men') {
      if (weightKg < 60) base = 'S';
      else if (weightKg <= 72) base = 'M';
      else if (weightKg <= 84) base = 'L';
      else if (weightKg <= 96) base = 'XL';
      else base = 'XXL';
    } else {
      if (weightKg < 50) base = 'XS';
      else if (weightKg <= 58) base = 'S';
      else if (weightKg <= 68) base = 'M';
      else if (weightKg <= 78) base = 'L';
      else base = 'XL';
    }

    // Adjust for fit preference
    const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
    const idx = sizes.indexOf(base);
    if (fitPreference === 'oversized' && idx < sizes.length - 1) {
      setRecommendedSize(sizes[idx + 1]);
    } else if (fitPreference === 'fitted' && idx > 0) {
      setRecommendedSize(sizes[idx - 1]);
    } else {
      setRecommendedSize(base);
    }
  };

  const chartData = activeGender === 'Men' ? SIZE_CHART_MEN : SIZE_CHART_WOMEN;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-neutral-200 flex items-center justify-between bg-neutral-50">
          <div className="flex items-center gap-2">
            <Ruler className="w-5 h-5 text-neutral-900" />
            <div>
              <h3 className="font-serif-luxury text-lg font-bold text-neutral-950">
                SAVARA ATELIER SIZE GUIDE
              </h3>
              <p className="text-xs text-neutral-500">
                Garment measurements taken flat. Compare with your best-fitting clothes.
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsSizeGuideOpen(false)}
            className="p-1.5 text-neutral-400 hover:text-black rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Tabs */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Gender & Unit Selectors */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-neutral-100">
            <div className="flex bg-neutral-100 p-1 rounded-xl">
              <button
                onClick={() => {
                  setActiveGender('Men');
                  setRecommendedSize(null);
                }}
                className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  activeGender === 'Men' ? 'bg-white text-neutral-950 shadow-sm' : 'text-neutral-500'
                }`}
              >
                MEN’S SIZING
              </button>
              <button
                onClick={() => {
                  setActiveGender('Women');
                  setRecommendedSize(null);
                }}
                className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  activeGender === 'Women' ? 'bg-white text-neutral-950 shadow-sm' : 'text-neutral-500'
                }`}
              >
                WOMEN’S SIZING
              </button>
            </div>

            <div className="flex items-center gap-2 text-xs font-medium text-neutral-600">
              <span>Unit:</span>
              <div className="flex bg-neutral-100 p-0.5 rounded-lg">
                <button
                  onClick={() => setUnit('in')}
                  className={`px-2.5 py-1 text-xs font-bold rounded-md ${
                    unit === 'in' ? 'bg-white text-neutral-950 shadow-xs' : 'text-neutral-400'
                  }`}
                >
                  Inches
                </button>
                <button
                  onClick={() => setUnit('cm')}
                  className={`px-2.5 py-1 text-xs font-bold rounded-md ${
                    unit === 'cm' ? 'bg-white text-neutral-950 shadow-xs' : 'text-neutral-400'
                  }`}
                >
                  CM
                </button>
              </div>
            </div>
          </div>

          {/* Measurements Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-neutral-900 text-white uppercase text-[10px] tracking-wider">
                  <th className="p-3 font-semibold rounded-l-lg">Size</th>
                  <th className="p-3 font-semibold">Chest / Bust</th>
                  <th className="p-3 font-semibold">Shoulder</th>
                  <th className="p-3 font-semibold">Length</th>
                  <th className="p-3 font-semibold rounded-r-lg">Waist Range</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {chartData.map((row) => (
                  <tr
                    key={row.size}
                    className={`hover:bg-neutral-50 transition-colors ${
                      recommendedSize === row.size ? 'bg-amber-50 font-bold' : ''
                    }`}
                  >
                    <td className="p-3 font-bold text-neutral-900">
                      <div className="flex items-center gap-1.5">
                        <span>{row.size}</span>
                        {recommendedSize === row.size && (
                          <span className="text-[9px] px-1.5 py-0.5 bg-neutral-900 text-amber-300 rounded font-bold">
                            YOUR FIT
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-3 text-neutral-700">{row.chest}</td>
                    <td className="p-3 text-neutral-700">{row.shoulder}</td>
                    <td className="p-3 text-neutral-700">{row.length}</td>
                    <td className="p-3 text-neutral-700">{row.waist}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Interactive Size Recommendation Tool */}
          <div className="bg-neutral-50 rounded-2xl p-5 border border-neutral-200">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                Not sure about your size? Smart Fit Finder
              </h4>
            </div>
            <p className="text-xs text-neutral-500 mb-4">
              Enter your basic body measurements and our SAVARA tailoring algorithm will suggest your ideal silhouette size.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-[11px] font-semibold text-neutral-600 block mb-1">
                  Height: {heightCm} cm ({Math.floor(heightCm / 30.48)}&apos;{Math.round((heightCm % 30.48) / 2.54)}&quot;)
                </label>
                <input
                  type="range"
                  min={145}
                  max={205}
                  value={heightCm}
                  onChange={(e) => setHeightCm(Number(e.target.value))}
                  className="w-full accent-neutral-900 cursor-pointer"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-neutral-600 block mb-1">
                  Weight: {weightKg} kg ({Math.round(weightKg * 2.205)} lbs)
                </label>
                <input
                  type="range"
                  min={40}
                  max={120}
                  value={weightKg}
                  onChange={(e) => setWeightKg(Number(e.target.value))}
                  className="w-full accent-neutral-900 cursor-pointer"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-neutral-600 block mb-1">
                  Desired Fit
                </label>
                <select
                  value={fitPreference}
                  onChange={(e) => setFitPreference(e.target.value as any)}
                  className="w-full p-2 text-xs border border-neutral-300 rounded-lg bg-white focus:outline-none focus:border-neutral-900"
                >
                  <option value="fitted">Tailored / Slim</option>
                  <option value="regular">Regular Classic</option>
                  <option value="oversized">Contemporary Oversized (Recommended)</option>
                </select>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-neutral-200">
              <button
                onClick={calculateRecommendation}
                className="px-5 py-2.5 bg-neutral-900 hover:bg-black text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
              >
                CALCULATE MY SIZE
              </button>

              {recommendedSize && (
                <div className="flex items-center gap-2 text-xs text-neutral-900 font-semibold bg-amber-100/70 border border-amber-300 px-4 py-2 rounded-xl">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>
                    Suggested Size: <strong>{recommendedSize}</strong> (98% match for your proportions)
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
