import { create } from 'zustand';
import { GAME_CONFIG } from '@/utils/gameConfig';

interface TableState {
  tableHeight: number;
  tableStartY: number;
  tableEndY: number;
}

interface TableAction {
  setTableHeight: (height: number) => void;
  setTableBounds: (startY: number, endY: number) => void;
}

export const useTableStateStore = create<TableState & TableAction>((set) => ({
  tableHeight: GAME_CONFIG.TABLE.INIT_HEIGHT,
  tableStartY: GAME_CONFIG.TABLE.INIT_START_Y,
  tableEndY: GAME_CONFIG.TABLE.INIT_END_Y,

  setTableHeight: (height: number) => set({ tableHeight: height }),
  setTableBounds: (startY: number, endY: number) =>
    set({ tableStartY: startY, tableEndY: endY }),
}));
