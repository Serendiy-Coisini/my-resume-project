import { create } from 'zustand';
import type { IHJSchema, IWidget, IWidgetCss, IWidgetDataSource } from '@/types/lego';
import { normalizeLegoSchema } from '@/lib/schema-normalizer';

const TEMPLATES_STORAGE_KEY = 'LEGO_MY_TEMPLATES';

export interface SavedTemplate {
  id: string;
  name: string;
  category: string;
  description: string;
  cover: string;
  createTime: string;
  schema: IHJSchema;
}

const DEFAULT_PAGE_WIDTH = 820;
const DEFAULT_PAGE_HEIGHT = 1160;

export const DEFAULT_LEGO_SCHEMA: IHJSchema = {
  id: 'lego-default',
  version: '1.0.0',
  componentsTree: [
    {
      id: 'page-1',
      componentName: 'page',
      commentType: 'page',
      children: []
    }
  ],
  css: {
    width: DEFAULT_PAGE_WIDTH,
    height: DEFAULT_PAGE_HEIGHT,
    background: '#ffffff',
    opacity: 1,
    backgroundImage: '',
    fontFamily: 'Inter, sans-serif',
    themeColor: '#2563eb'
  },
  config: {
    title: '我的积木简历'
  }
};

const MAX_HISTORY_LIMIT = 30;

function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

interface LegoDesignerState {
  schema: IHJSchema;
  selectedWidgetId: string | null;
  pageActiveIndex: number;
  scale: number;
  undoStack: IHJSchema[];
  redoStack: IHJSchema[];
  savedTemplates: SavedTemplate[];

  // Actions
  pushHistoryState: () => void;
  setSchema: (schema: IHJSchema | Record<string, unknown> | unknown, saveHistory?: boolean) => void;
  setSelectedWidgetId: (id: string | null) => void;
  setPageActiveIndex: (index: number) => void;
  setScale: (scale: number | ((prev: number) => number)) => void;

  updateWidgetCss: (widgetId: string, cssUpdate: Partial<IWidgetCss>, saveHistory?: boolean) => void;
  updateWidgetDataSource: (widgetId: string, dataUpdate: Partial<IWidgetDataSource>, saveHistory?: boolean) => void;
  
  addWidget: (widget: IWidget, pageIndex?: number, saveHistory?: boolean) => void;
  addWidgets: (widgets: IWidget[], pageIndex?: number, saveHistory?: boolean) => void;
  deleteWidget: (widgetId: string, saveHistory?: boolean) => void;
  duplicateWidget: (widgetId: string, saveHistory?: boolean) => void;
  moveWidgetLayer: (widgetId: string, direction: 'up' | 'down' | 'top' | 'bottom', saveHistory?: boolean) => void;
  
  addPage: () => void;
  deletePage: (pageIndex: number) => void;

  undo: () => void;
  redo: () => void;
  resetSchema: (newSchema?: IHJSchema | Record<string, unknown> | unknown, saveHistory?: boolean) => void;
  getSelectedWidget: () => IWidget | null;

  // Template management
  loadSavedTemplates: () => void;
  saveAsTemplate: (name: string, category: string, description: string, cover: string) => void;
  deleteSavedTemplate: (id: string) => void;
  loadSavedTemplate: (id: string) => void;
  updateTemplateCover: (id: string, cover: string) => void;
}

export const useLegoDesignerStore = create<LegoDesignerState>((set, get) => {
  const saveStateToHistory = (currentSchema: IHJSchema) => {
    const { undoStack } = get();
    const cloned = deepClone(currentSchema);
    const newUndo = [...undoStack, cloned];
    if (newUndo.length > MAX_HISTORY_LIMIT) {
      newUndo.shift();
    }
    return { undoStack: newUndo, redoStack: [] };
  };

  // Load templates from localStorage on init
  const loadTemplatesFromStorage = (): SavedTemplate[] => {
    if (typeof window === 'undefined') return [];
    try {
      const raw = localStorage.getItem(TEMPLATES_STORAGE_KEY);
      if (raw) return JSON.parse(raw) as SavedTemplate[];
    } catch { /* ignore */ }
    return [];
  };

  const saveTemplatesToStorage = (templates: SavedTemplate[]) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(TEMPLATES_STORAGE_KEY, JSON.stringify(templates));
  };

  return {
    schema: deepClone(DEFAULT_LEGO_SCHEMA),
    selectedWidgetId: null,
    pageActiveIndex: 0,
    scale: 0.62,
    undoStack: [],
    redoStack: [],
    savedTemplates: loadTemplatesFromStorage(),

    pushHistoryState: () => {
      const { schema } = get();
      const historyUpdate = saveStateToHistory(schema);
      set(historyUpdate);
    },

    setSchema: (newSchema, saveHistory = true) => {
      const normalized = normalizeLegoSchema(newSchema);
      set((state) => {
        const historyUpdate = saveHistory ? saveStateToHistory(state.schema) : {};
        return {
          schema: normalized,
          ...historyUpdate
        };
      });
    },

    setSelectedWidgetId: (id) => set({ selectedWidgetId: id }),

    setPageActiveIndex: (index) => set({ pageActiveIndex: index }),

    setScale: (scaleArg) =>
      set((state) => ({
        scale: typeof scaleArg === 'function' ? scaleArg(state.scale) : scaleArg
      })),

    updateWidgetCss: (widgetId, cssUpdate, saveHistory = true) => {
      const { schema } = get();
      const historyUpdate = saveHistory ? saveStateToHistory(schema) : {};
      const newSchema = deepClone(schema);

      for (const page of newSchema.componentsTree) {
        const widget = page.children?.find((item) => item.id === widgetId);
        if (widget) {
          widget.css = { ...widget.css, ...cssUpdate };
          break;
        }
      }

      set({ schema: newSchema, ...historyUpdate });
    },

    updateWidgetDataSource: (widgetId, dataUpdate, saveHistory = true) => {
      const { schema } = get();
      const historyUpdate = saveHistory ? saveStateToHistory(schema) : {};
      const newSchema = deepClone(schema);

      for (const page of newSchema.componentsTree) {
        const widget = page.children?.find((item) => item.id === widgetId);
        if (widget) {
          widget.dataSource = { ...widget.dataSource, ...dataUpdate };
          break;
        }
      }

      set({ schema: newSchema, ...historyUpdate });
    },

    addWidgets: (widgets, pageIndexArg, saveHistory = true) => {
      if (!widgets || widgets.length === 0) return;
      const { schema, pageActiveIndex } = get();
      const historyUpdate = saveHistory ? saveStateToHistory(schema) : {};
      const newSchema = deepClone(schema);
      const targetPageIndex = pageIndexArg ?? (pageActiveIndex >= 0 ? pageActiveIndex : 0);

      if (!newSchema.componentsTree[targetPageIndex]) {
        newSchema.componentsTree[targetPageIndex] = {
          id: `page-${Date.now()}`,
          componentName: 'page',
          commentType: 'page',
          children: []
        };
      }

      if (!newSchema.componentsTree[targetPageIndex].children) {
        newSchema.componentsTree[targetPageIndex].children = [];
      }

      let lastId = '';
      let maxBottom = Number(newSchema.css.height) || 1160;

      widgets.forEach((widget, index) => {
        const newWidget = deepClone(widget);
        if (!newWidget.id) {
          newWidget.id = `widget-${Date.now()}-${index}-${Math.random().toString(36).substring(2, 7)}`;
        }
        lastId = newWidget.id;

        const widgetBottom = (Number(newWidget.css.top) || 0) + (Number(newWidget.css.height) || 40);
        if (widgetBottom + 60 > maxBottom) {
          maxBottom = widgetBottom + 60;
        }

        newSchema.componentsTree[targetPageIndex].children.push(newWidget);
      });

      newSchema.css.height = maxBottom;

      set({
        schema: newSchema,
        selectedWidgetId: lastId,
        ...historyUpdate
      });
    },

    addWidget: (widget, pageIndexArg, saveHistory = true) => {
      const { addWidgets } = get();
      addWidgets([widget], pageIndexArg, saveHistory);
    },

    deleteWidget: (widgetId, saveHistory = true) => {
      const { schema, selectedWidgetId } = get();
      const historyUpdate = saveHistory ? saveStateToHistory(schema) : {};
      const newSchema = deepClone(schema);

      for (const page of newSchema.componentsTree) {
        if (!page.children) continue;
        const index = page.children.findIndex((item) => item.id === widgetId);
        if (index !== -1) {
          page.children.splice(index, 1);
          break;
        }
      }

      set({
        schema: newSchema,
        selectedWidgetId: selectedWidgetId === widgetId ? null : selectedWidgetId,
        ...historyUpdate
      });
    },

    duplicateWidget: (widgetId, saveHistory = true) => {
      const { schema } = get();
      const newSchema = deepClone(schema);
      let targetWidget: IWidget | null = null;
      let targetPageIndex = 0;

      for (let pIdx = 0; pIdx < newSchema.componentsTree.length; pIdx++) {
        if (!newSchema.componentsTree[pIdx]?.children) continue;
        const found = newSchema.componentsTree[pIdx].children.find((item) => item.id === widgetId);
        if (found) {
          targetWidget = found;
          targetPageIndex = pIdx;
          break;
        }
      }

      if (!targetWidget) return;

      const historyUpdate = saveHistory ? saveStateToHistory(schema) : {};
      const duplicated: IWidget = deepClone(targetWidget);
      duplicated.id = `widget-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
      duplicated.css.left = (duplicated.css.left || 0) + 20;
      duplicated.css.top = (duplicated.css.top || 0) + 20;

      newSchema.componentsTree[targetPageIndex].children.push(duplicated);

      set({
        schema: newSchema,
        selectedWidgetId: duplicated.id,
        ...historyUpdate
      });
    },

    moveWidgetLayer: (widgetId, direction, saveHistory = true) => {
      const { schema } = get();
      const newSchema = deepClone(schema);

      for (const page of newSchema.componentsTree) {
        const list = page.children;
        if (!list) continue;
        const idx = list.findIndex((item) => item.id === widgetId);
        if (idx === -1) continue;

        const historyUpdate = saveHistory ? saveStateToHistory(schema) : {};

        if (direction === 'up' && idx < list.length - 1) {
          const temp = list[idx];
          list[idx] = list[idx + 1];
          list[idx + 1] = temp;
        } else if (direction === 'down' && idx > 0) {
          const temp = list[idx];
          list[idx] = list[idx - 1];
          list[idx - 1] = temp;
        } else if (direction === 'top') {
          const [moved] = list.splice(idx, 1);
          list.push(moved);
        } else if (direction === 'bottom') {
          const [moved] = list.splice(idx, 1);
          list.unshift(moved);
        }

        // Adjust zIndexes
        list.forEach((item, index) => {
          if (item.css) {
            item.css.zIndex = index + 1;
          }
        });

        set({ schema: newSchema, ...historyUpdate });
        break;
      }
    },

    addPage: () => {
      const { schema } = get();
      const historyUpdate = saveStateToHistory(schema);
      const newSchema = deepClone(schema);

      newSchema.componentsTree.push({
        id: `page-${Date.now()}`,
        componentName: 'page',
        commentType: 'page',
        children: []
      });

      set({
        schema: newSchema,
        pageActiveIndex: newSchema.componentsTree.length - 1,
        ...historyUpdate
      });
    },

    deletePage: (pageIndex) => {
      const { schema, pageActiveIndex } = get();
      if (schema.componentsTree.length <= 1) return; // Keep at least 1 page

      const historyUpdate = saveStateToHistory(schema);
      const newSchema = deepClone(schema);
      newSchema.componentsTree.splice(pageIndex, 1);

      set({
        schema: newSchema,
        pageActiveIndex: Math.min(pageActiveIndex, newSchema.componentsTree.length - 1),
        ...historyUpdate
      });
    },

    undo: () => {
      const { undoStack, redoStack, schema } = get();
      if (undoStack.length === 0) return;

      const previousSchema = undoStack[undoStack.length - 1];
      const newUndo = undoStack.slice(0, undoStack.length - 1);
      const newRedo = [deepClone(schema), ...redoStack];

      set({
        schema: deepClone(previousSchema),
        undoStack: newUndo,
        redoStack: newRedo,
        selectedWidgetId: null
      });
    },

    redo: () => {
      const { undoStack, redoStack, schema } = get();
      if (redoStack.length === 0) return;

      const nextSchema = redoStack[0];
      const newRedo = redoStack.slice(1);
      const newUndo = [...undoStack, deepClone(schema)];

      set({
        schema: deepClone(nextSchema),
        undoStack: newUndo,
        redoStack: newRedo,
        selectedWidgetId: null
      });
    },

    resetSchema: (newSchema, saveHistory = true) => {
      const { schema } = get();
      const historyUpdate = saveHistory ? saveStateToHistory(schema) : {};
      set({
        schema: normalizeLegoSchema(newSchema || DEFAULT_LEGO_SCHEMA),
        selectedWidgetId: null,
        pageActiveIndex: 0,
        ...historyUpdate
      });
    },

    getSelectedWidget: () => {
      const { schema, selectedWidgetId } = get();
      if (!selectedWidgetId || !schema?.componentsTree) return null;

      for (const page of schema.componentsTree) {
        if (!page?.children) continue;
        const found = page.children.find((item) => item?.id === selectedWidgetId);
        if (found) return found;
      }
      return null;
    },

    // Template management actions
    loadSavedTemplates: () => {
      set({ savedTemplates: loadTemplatesFromStorage() });
    },

    saveAsTemplate: (name, category, description, cover) => {
      const { schema, savedTemplates } = get();
      const newTemplate: SavedTemplate = {
        id: `tpl-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        name,
        category: category || '个人自定义',
        description: description || '',
        cover,
        createTime: new Date().toLocaleString(),
        schema: deepClone(schema)
      };
      const updated = [newTemplate, ...savedTemplates];
      saveTemplatesToStorage(updated);
      set({ savedTemplates: updated });
    },

    deleteSavedTemplate: (id) => {
      const { savedTemplates } = get();
      const updated = savedTemplates.filter(t => t.id !== id);
      saveTemplatesToStorage(updated);
      set({ savedTemplates: updated });
    },

    loadSavedTemplate: (id) => {
      const { savedTemplates, schema } = get();
      const tpl = savedTemplates.find(t => t.id === id);
      if (!tpl) return;
      const historyUpdate = saveStateToHistory(schema);
      set({
        schema: deepClone(tpl.schema),
        selectedWidgetId: null,
        pageActiveIndex: 0,
        ...historyUpdate
      });
    },

    updateTemplateCover: (id, cover) => {
      const { savedTemplates } = get();
      const updated = savedTemplates.map(t =>
        t.id === id ? { ...t, cover } : t
      );
      saveTemplatesToStorage(updated);
      set({ savedTemplates: updated });
    }
  };
});
