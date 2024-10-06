import { create } from 'zustand';
import { persist } from 'zustand/middleware'

const gridsInitialize = () => {
    const rows = 100;
    const cols = 10;
    return Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => '')
    );
}

const sheetStore = create(
    persist(
        (set) => ({
            grids: gridsInitialize(),
            // increase: () => set((state: any) => ({ count: state.count + 1 })),
            // decrease: () => set((state: any) => ({ count: state.count - 1 })),
            updateCell: (row, col, value) =>
                set((state) => {
                  const updatedCell = [...state.grids];
                  updatedCell[row][col] = value;
                  return { grids: updatedCell };
                }),
            resetCell: () => set({ grids: gridsInitialize() }),
        }),
        { name: 'gridcells-storage' }
    ),
);

export default sheetStore;
