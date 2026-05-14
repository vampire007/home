
import { useAppStore } from '../store';
import { CheckCircle2, Circle, Power } from 'lucide-react';
import type { ModelPlatform } from '../../shared/types';

export function ModelSelector() {
  const { models, selectedModels, toggleModelSelection, toggleModelConnection } = useAppStore();

  return (
    <div className="flex flex-wrap gap-3">
      {models.map((model) => (
        <div
          key={model.platform}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all cursor-pointer ${
            selectedModels.includes(model.platform)
              ? 'border-cyan-500 bg-cyan-500/10'
              : 'border-gray-700 bg-gray-800 hover:border-gray-600'
          }`}
        >
          <button
            onClick={() => toggleModelSelection(model.platform)}
            className="flex items-center gap-2"
          >
            {selectedModels.includes(model.platform) ? (
              <CheckCircle2 className="w-5 h-5 text-cyan-400" />
            ) : (
              <Circle className="w-5 h-5 text-gray-500" />
            )}
            <span className="font-medium" style={{ color: model.color }}>
              {model.name}
            </span>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleModelConnection(model.platform);
            }}
            className={`p-1 rounded-full transition-colors ${
              model.connected
                ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                : 'bg-gray-700 text-gray-500 hover:bg-gray-600'
            }`}
            title={model.connected ? '已连接' : '未连接'}
          >
            <Power className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
