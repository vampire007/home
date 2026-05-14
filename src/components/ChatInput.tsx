
import { useAppStore } from '../store';
import { Send, X } from 'lucide-react';

export function ChatInput() {
  const { currentPrompt, setCurrentPrompt, selectedModels, isLoading, sendChat, clearResponses } = useAppStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendChat();
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={currentPrompt}
          onChange={(e) => setCurrentPrompt(e.target.value)}
          placeholder="输入你的问题，同时向多个大模型提问..."
          className="w-full h-32 bg-gray-900 border border-gray-700 rounded-lg p-4 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 resize-none"
          disabled={isLoading}
        />
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">
            已选择 {selectedModels.length} 个模型
          </span>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={clearResponses}
              className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
              清空
            </button>
            <button
              type="submit"
              disabled={isLoading || !currentPrompt.trim() || selectedModels.length === 0}
              className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-medium hover:from-cyan-400 hover:to-blue-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
              {isLoading ? '发送中...' : '发送'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
