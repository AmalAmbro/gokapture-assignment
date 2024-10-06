import { create } from 'zustand';
import { persist } from 'zustand/middleware'

interface GridStore {
    grids: string[][];
    updateCell: (row: number, col: number, value: string) => void;
  }

let emptyGrids: string[][];
const gridsInitialize = (): string[][] => {
    const rows = 100;
    const cols = 10;
    emptyGrids = Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => '')
    )
    return emptyGrids;
}


const sheetStore = create<GridStore>()(
    persist(
      (set) => ({
        grids: gridsInitialize(),
        updateCell: (row, col, value) =>
          set((state) => {
            const updatedCell = [...state.grids];
            updatedCell[row][col] = value;
            return { grids: updatedCell };
          }),
      }),
      { name: 'gridcells-storage' }
    )
  );

export default sheetStore;
