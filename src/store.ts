
import { create } from 'zustand';
import type { ModelStatus, ChatResponse, HistoryItem, ModelPlatform } from '../shared/types';

interface AppState {
  models: ModelStatus[];
  selectedModels: ModelPlatform[];
  responses: ChatResponse[];
  history: HistoryItem[];
  isLoading: boolean;
  currentPrompt: string;

  setModels: (models: ModelStatus[]) => void;
  toggleModelSelection: (platform: ModelPlatform) => void;
  toggleModelConnection: (platform: ModelPlatform) => Promise<void>;
  setCurrentPrompt: (prompt: string) => void;
  sendChat: () => Promise<void>;
  fetchHistory: () => Promise<void>;
  loadHistoryItem: (item: HistoryItem) => void;
  deleteHistoryItem: (id: string) => Promise<void>;
  clearResponses: () => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  models: [],
  selectedModels: [],
  responses: [],
  history: [],
  isLoading: false,
  currentPrompt: '',

  setModels: (models) => set({ models }),

  toggleModelSelection: (platform) => set((state) => {
    const selected = state.selectedModels.includes(platform)
      ? state.selectedModels.filter(p => p !== platform)
      : [...state.selectedModels, platform];
    return { selectedModels: selected };
  }),

  toggleModelConnection: async (platform) => {
    const res = await fetch(`/api/models/${platform}/toggle`, { method: 'POST' });
    const data = await res.json();
    if (data.success) {
      set((state) => ({
        models: state.models.map(m =>
          m.platform === platform ? data.data : m
        )
      }));
    }
  },

  setCurrentPrompt: (prompt) => set({ currentPrompt: prompt }),

  sendChat: async () => {
    const { currentPrompt, selectedModels } = get();
    if (!currentPrompt.trim() || selectedModels.length === 0) return;

    set({ isLoading: true, responses: [] });

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: currentPrompt, platforms: selectedModels }),
      });
      const data = await res.json();
      if (data.success) {
        set({ responses: data.data });
      }
    } catch (error) {
      console.error('Chat error:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  fetchHistory: async () => {
    try {
      const res = await fetch('/api/history');
      const data = await res.json();
      if (data.success) {
        set({ history: data.data });
      }
    } catch (error) {
      console.error('Fetch history error:', error);
    }
  },

  loadHistoryItem: (item) => {
    set({
      currentPrompt: item.prompt,
      responses: item.responses,
      selectedModels: item.responses.map(r => r.platform),
    });
  },

  deleteHistoryItem: async (id) => {
    try {
      await fetch(`/api/history/${id}`, { method: 'DELETE' });
      set((state) => ({
        history: state.history.filter(h => h.id !== id)
      }));
    } catch (error) {
      console.error('Delete history error:', error);
    }
  },

  clearResponses: () => set({ responses: [], currentPrompt: '' }),
}));
