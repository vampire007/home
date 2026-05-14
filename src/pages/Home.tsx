
import { useEffect } from 'react';
import { useAppStore } from '../store';
import { ModelSelector } from '../components/ModelSelector';
import { ChatInput } from '../components/ChatInput';
import { ResponseCard } from '../components/ResponseCard';
import { HistoryPanel } from '../components/HistoryPanel';
import { Sparkles, History } from 'lucide-react';

export function Home() {
  const { models, setModels, responses, selectedModels, isLoading, fetchHistory } = useAppStore();

  useEffect(() => {
    const loadModels = async () => {
      const res = await fetch('/api/models');
      const data = await res.json();
      if (data.success) {
        setModels(data.data);
      }
    };
    loadModels();
    fetchHistory();
  }, [setModels, fetchHistory]);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-gray-900/50 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                AI聚合平台
              </h1>
              <p className="text-sm text-gray-400">一次提问，多模型对比</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Model Selector */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h2 className="text-lg font-semibold mb-4 text-gray-200">选择模型</h2>
              <ModelSelector />
            </div>

            {/* Chat Input */}
            <ChatInput />

            {/* Responses */}
            {selectedModels.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-200">响应结果</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {models
                    .filter(m => selectedModels.includes(m.platform))
                    .map((model) => (
                      <ResponseCard
                        key={model.platform}
                        model={model}
                        response={responses.find(r => r.platform === model.platform)}
                        isLoading={isLoading}
                      />
                    ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - History */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 sticky top-24">
              <div className="flex items-center gap-2 mb-4">
                <History className="w-5 h-5 text-cyan-400" />
                <h2 className="text-lg font-semibold text-gray-200">历史记录</h2>
              </div>
              <HistoryPanel />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
