
import { useAppStore } from '../store';
import { History, Trash2, RefreshCcw } from 'lucide-react';

export function HistoryPanel() {
  const { history, loadHistoryItem, deleteHistoryItem } = useAppStore();

  if (history.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <History className="w-12 h-12 mx-auto mb-3 opacity-50" />
        <p>暂无历史记录</p>
      </div>
    );
  }

  return (
    <div className="space-y-3 max-h-[500px] overflow-y-auto">
      {history.map((item) => (
        <div
          key={item.id}
          className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition-colors"
        >
          <p className="text-gray-300 text-sm line-clamp-2 mb-3">
            {item.prompt}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">
              {new Date(item.timestamp).toLocaleString('zh-CN')}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => loadHistoryItem(item)}
                className="p-2 text-gray-400 hover:text-cyan-400 hover:bg-gray-700 rounded-lg transition-colors"
                title="重新加载"
              >
                <RefreshCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => deleteHistoryItem(item.id)}
                className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-700 rounded-lg transition-colors"
                title="删除"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
