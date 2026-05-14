
import type { ChatResponse, ModelStatus } from '../../shared/types';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

interface ResponseCardProps {
  response?: ChatResponse;
  model: ModelStatus;
  isLoading: boolean;
}

export function ResponseCard({ response, model, isLoading }: ResponseCardProps) {
  const isSelected = isLoading || response;

  return (
    <div
      className={`bg-gray-800 rounded-xl border border-gray-700 overflow-hidden transition-all ${
        isSelected ? 'opacity-100' : 'opacity-50'
      }`}
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700" style={{ backgroundColor: `${model.color}10` }}>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: model.color }} />
          <span className="font-semibold" style={{ color: model.color }}>
            {model.name}
          </span>
        </div>
        {isLoading && !response && (
          <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />
        )}
        {response && (
          response.success ? (
            <CheckCircle2 className="w-5 h-5 text-green-400" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-400" />
          )
        )}
      </div>
      <div className="p-4 min-h-[200px]">
        {isLoading && !response ? (
          <div className="space-y-3">
            <div className="h-4 bg-gray-700 rounded animate-pulse w-3/4" />
            <div className="h-4 bg-gray-700 rounded animate-pulse w-full" />
            <div className="h-4 bg-gray-700 rounded animate-pulse w-5/6" />
          </div>
        ) : response ? (
          <div className="text-gray-300 whitespace-pre-wrap leading-relaxed">
            {response.success ? response.content : `错误: ${response.error}`}
          </div>
        ) : (
          <div className="text-gray-500 text-center py-8">
            等待响应...
          </div>
        )}
      </div>
    </div>
  );
}
