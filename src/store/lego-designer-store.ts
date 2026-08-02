import { create } from 'zustand';
import type { IHJSchema, IWidget, IWidgetCss, IWidgetDataSource } from '@/types/lego';

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

const MAX_HISTORY_LIMIT = 20;

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

  // Actions
  setSchema: (schema: IHJSchema, saveHistory?: boolean) => void;
  setSelectedWidgetId: (id: string | null) => void;
  setPageActiveIndex: (index: number) => void;
  setScale: (scale: number | ((prev: number) => number)) => void;

  updateWidgetCss: (widgetId: string, cssUpdate: Partial<IWidgetCss>) => void;
  updateWidgetDataSource: (widgetId: string, dataUpdate: Partial<IWidgetDataSource>) => void;
  
  addWidget: (widget: IWidget, pageIndex?: number) => void;
  deleteWidget: (widgetId: string) => void;
  duplicateWidget: (widgetId: string) => void;
  moveWidgetLayer: (widgetId: string, direction: 'up' | 'down' | 'top' | 'bottom') => void;
  
  addPage: () => void;
  deletePage: (pageIndex: number) => void;

  undo: () => void;
  redo: () => void;
  resetSchema: (newSchema?: IHJSchema) => void;
  getSelectedWidget: () => IWidget | null;
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

  return {
    schema: deepClone(DEFAULT_LEGO_SCHEMA),
    selectedWidgetId: null,
    pageActiveIndex: 0,
    scale: 0.62,
    undoStack: [],
    redoStack: [],

    setSchema: (newSchema, saveHistory = true) => {
      set((state) => {
        const historyUpdate = saveHistory ? saveStateToHistory(state.schema) : {};
        return {
          schema: deepClone(newSchema),
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

    updateWidgetCss: (widgetId, cssUpdate) => {
      const { schema } = get();
      const historyUpdate = saveStateToHistory(schema);
      const newSchema = deepClone(schema);

      for (const page of newSchema.componentsTree) {
        const widget = page.children.find((item) => item.id === widgetId);
        if (widget) {
          widget.css = { ...widget.css, ...cssUpdate };
          break;
        }
      }

      set({ schema: newSchema, ...historyUpdate });
    },

    updateWidgetDataSource: (widgetId, dataUpdate) => {
      const { schema } = get();
      const historyUpdate = saveStateToHistory(schema);
      const newSchema = deepClone(schema);

      for (const page of newSchema.componentsTree) {
        const widget = page.children.find((item) => item.id === widgetId);
        if (widget) {
          widget.dataSource = { ...widget.dataSource, ...dataUpdate };
          break;
        }
      }

      set({ schema: newSchema, ...historyUpdate });
    },

    addWidget: (widget, pageIndexArg) => {
      const { schema, pageActiveIndex } = get();
      const historyUpdate = saveStateToHistory(schema);
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

      const newWidget = deepClone(widget);
      if (!newWidget.id) {
        newWidget.id = `widget-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
      }

      newSchema.componentsTree[targetPageIndex].children.push(newWidget);

      set({
        schema: newSchema,
        selectedWidgetId: newWidget.id,
        ...historyUpdate
      });
    },

    deleteWidget: (widgetId) => {
      const { schema, selectedWidgetId } = get();
      const historyUpdate = saveStateToHistory(schema);
      const newSchema = deepClone(schema);

      for (const page of newSchema.componentsTree) {
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

    duplicateWidget: (widgetId) => {
      const { schema } = get();
      const newSchema = deepClone(schema);
      let targetWidget: IWidget | null = null;
      let targetPageIndex = 0;

      for (let pIdx = 0; pIdx < newSchema.componentsTree.length; pIdx++) {
        const found = newSchema.componentsTree[pIdx].children.find((item) => item.id === widgetId);
        if (found) {
          targetWidget = found;
          targetPageIndex = pIdx;
          break;
        }
      }

      if (!targetWidget) return;

      const historyUpdate = saveStateToHistory(schema);
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

    moveWidgetLayer: (widgetId, direction) => {
      const { schema } = get();
      const newSchema = deepClone(schema);

      for (const page of newSchema.componentsTree) {
        const list = page.children;
        const idx = list.findIndex((item) => item.id === widgetId);
        if (idx === -1) continue;

        const historyUpdate = saveStateToHistory(schema);

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
          item.css.zIndex = index + 1;
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

    resetSchema: (newSchema) => {
      set({
        schema: deepClone(newSchema || DEFAULT_LEGO_SCHEMA),
        selectedWidgetId: null,
        pageActiveIndex: 0,
        undoStack: [],
        redoStack: []
      });
    },

    getSelectedWidget: () => {
      const { schema, selectedWidgetId } = get();
      if (!selectedWidgetId) return null;

      for (const page of schema.componentsTree) {
        const found = page.children.find((item) => item.id === selectedWidgetId);
        if (found) return found;
      }
      return null;
    }
  };
});
