'use client'
import { useState } from 'react';
import sheetStore from '@/stores/sheetStore';


export default function HomePage() {
  const { grids, updateCell, resetCell } = sheetStore()
  const [editingCell, setEditingCell] = useState({ row: null, col: null });
  const handleChange = (row, col, value) => {
    updateCell(row, col, value);
  };

  return (
    <div className="p-4">
      <div className='pb-4'>Control bar</div>
      <div className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-4">
        {grids.slice(0, 50).map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className="border p-1 bg-white rounded shadow-sm h-8"
            >
              {editingCell.row === rowIndex && editingCell.col === colIndex ? (
                <input
                  type="text"
                  className="w-full h-full border-none outline-none"
                  value={cell}
                  onChange={(e) =>
                    handleChange(rowIndex, colIndex, e.target.value)
                  }
                  onBlur={() => setEditingCell({ row: null, col: null })}
                  autoFocus
                />
              ) : (
                <div
                  className="w-full h-full cursor-pointer"
                  onClick={() => setEditingCell({ row: rowIndex, col: colIndex })}
                >
                  {cell || ''}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}