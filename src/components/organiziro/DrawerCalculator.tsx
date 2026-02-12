'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { OrganiziroProduct } from '@/lib/types';
import { useCart } from '@/lib/cart-context';

interface DrawerCalculatorProps {
  gridBases: OrganiziroProduct[];
}

interface GridRecommendation {
  product: OrganiziroProduct;
  quantity: number;
}

// Available grid piece sizes (will be matched to products)
const AVAILABLE_PIECES = [
  { width: 5, height: 5 },
  { width: 2, height: 5 },
  { width: 2, height: 4 },
  { width: 1, height: 5 },
  { width: 1, height: 4 },
  { width: 1, height: 2 },
  { width: 1, height: 1 },
];

const GRID_UNIT_MM = 42;

// Calculate optimal grid piece combination using greedy algorithm
function calculateOptimalPieces(
  widthUnits: number,
  heightUnits: number,
  gridBases: OrganiziroProduct[]
): GridRecommendation[] {
  // Create a grid to track filled spaces
  const grid: boolean[][] = Array(heightUnits)
    .fill(null)
    .map(() => Array(widthUnits).fill(false));

  const recommendations: Map<string, { product: OrganiziroProduct; quantity: number }> = new Map();

  // Sort pieces by area (largest first) for greedy placement
  const sortedPieces = [...AVAILABLE_PIECES].sort(
    (a, b) => b.width * b.height - a.width * a.height
  );

  // Try to place pieces
  for (let y = 0; y < heightUnits; y++) {
    for (let x = 0; x < widthUnits; x++) {
      if (grid[y][x]) continue; // Already filled

      // Try each piece size (largest first)
      for (const piece of sortedPieces) {
        // Try both orientations
        const orientations = [
          { w: piece.width, h: piece.height },
          { w: piece.height, h: piece.width },
        ];

        for (const { w, h } of orientations) {
          if (canPlacePiece(grid, x, y, w, h, widthUnits, heightUnits)) {
            // Find matching product
            const product = gridBases.find(
              (p) =>
                (p.gridWidth === w && p.gridHeight === h) ||
                (p.gridWidth === h && p.gridHeight === w)
            );

            if (product) {
              // Place the piece
              placePiece(grid, x, y, w, h);

              // Add to recommendations
              const existing = recommendations.get(product.id);
              if (existing) {
                existing.quantity++;
              } else {
                recommendations.set(product.id, { product, quantity: 1 });
              }
              break;
            }
          }
        }

        // Check if we placed a piece
        if (grid[y][x]) break;
      }
    }
  }

  return Array.from(recommendations.values());
}

function canPlacePiece(
  grid: boolean[][],
  x: number,
  y: number,
  width: number,
  height: number,
  maxWidth: number,
  maxHeight: number
): boolean {
  if (x + width > maxWidth || y + height > maxHeight) return false;

  for (let dy = 0; dy < height; dy++) {
    for (let dx = 0; dx < width; dx++) {
      if (grid[y + dy][x + dx]) return false;
    }
  }
  return true;
}

function placePiece(
  grid: boolean[][],
  x: number,
  y: number,
  width: number,
  height: number
): void {
  for (let dy = 0; dy < height; dy++) {
    for (let dx = 0; dx < width; dx++) {
      grid[y + dy][x + dx] = true;
    }
  }
}

export default function DrawerCalculator({ gridBases }: DrawerCalculatorProps) {
  const [widthCm, setWidthCm] = useState<string>('');
  const [heightCm, setHeightCm] = useState<string>('');
  const [hasCalculated, setHasCalculated] = useState(false);
  const { addItem } = useCart();

  const calculation = useMemo(() => {
    const width = parseFloat(widthCm);
    const height = parseFloat(heightCm);

    if (!width || !height || width <= 0 || height <= 0) {
      return null;
    }

    const widthMm = width * 10;
    const heightMm = height * 10;

    const widthUnits = Math.floor(widthMm / GRID_UNIT_MM);
    const heightUnits = Math.floor(heightMm / GRID_UNIT_MM);

    if (widthUnits < 1 || heightUnits < 1) {
      return null;
    }

    const usedWidthMm = widthUnits * GRID_UNIT_MM;
    const usedHeightMm = heightUnits * GRID_UNIT_MM;
    const remainingWidthMm = widthMm - usedWidthMm;
    const remainingHeightMm = heightMm - usedHeightMm;

    const recommendations = calculateOptimalPieces(widthUnits, heightUnits, gridBases);

    const totalPrice = recommendations.reduce(
      (sum, rec) => sum + rec.product.price * rec.quantity,
      0
    );

    return {
      widthUnits,
      heightUnits,
      usedWidthMm,
      usedHeightMm,
      remainingWidthMm,
      remainingHeightMm,
      recommendations,
      totalPrice,
    };
  }, [widthCm, heightCm, gridBases]);

  const handleCalculate = () => {
    setHasCalculated(true);
  };

  const handleAddAllToCart = () => {
    if (!calculation) return;

    calculation.recommendations.forEach((rec) => {
      addItem(
        {
          productId: rec.product.id,
          productName: rec.product.name,
          productSlug: rec.product.slug,
          price: rec.product.price,
          imageUrl: rec.product.images[0]?.url,
          inStock: rec.product.inStock,
          stockQuantity: rec.product.stockQuantity,
        },
        rec.quantity
      );
    });
  };

  const handleAddSingleToCart = (rec: GridRecommendation) => {
    addItem(
      {
        productId: rec.product.id,
        productName: rec.product.name,
        productSlug: rec.product.slug,
        price: rec.product.price,
        imageUrl: rec.product.images[0]?.url,
        inStock: rec.product.inStock,
        stockQuantity: rec.product.stockQuantity,
      },
      rec.quantity
    );
  };

  return (
    <div className="bg-gray-50 p-6 md:p-8">
      <h2 className="text-2xl font-light mb-2">Калкулатор за чекмедже</h2>
      <p className="text-gray-600 mb-6">
        Въведете размерите на вашето чекмедже и ще ви препоръчаме оптималната комбинация от основи.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label htmlFor="width" className="block text-sm font-medium text-gray-700 mb-1">
            Ширина (см)
          </label>
          <input
            type="number"
            id="width"
            value={widthCm}
            onChange={(e) => {
              setWidthCm(e.target.value);
              setHasCalculated(false);
            }}
            placeholder="напр. 30"
            className="w-full px-4 py-3 border border-gray-200 focus:outline-none focus:border-black transition-colors"
            min="1"
            step="0.1"
          />
        </div>
        <div>
          <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-1">
            Дълбочина (см)
          </label>
          <input
            type="number"
            id="height"
            value={heightCm}
            onChange={(e) => {
              setHeightCm(e.target.value);
              setHasCalculated(false);
            }}
            placeholder="напр. 40"
            className="w-full px-4 py-3 border border-gray-200 focus:outline-none focus:border-black transition-colors"
            min="1"
            step="0.1"
          />
        </div>
      </div>

      <button
        onClick={handleCalculate}
        className="w-full md:w-auto px-8 py-3 bg-black text-white text-sm hover:bg-gray-800 transition-colors mb-6"
      >
        Изчисли
      </button>

      {hasCalculated && calculation && (
        <div className="border-t border-gray-200 pt-6 mt-6">
          <div className="bg-white p-4 mb-6">
            <h3 className="font-medium mb-2">Резултат от изчислението</h3>
            <p className="text-sm text-gray-600">
              Вашето чекмедже побира <strong>{calculation.widthUnits} x {calculation.heightUnits}</strong> единици
              ({calculation.usedWidthMm} x {calculation.usedHeightMm} мм)
            </p>
            {(calculation.remainingWidthMm > 0 || calculation.remainingHeightMm > 0) && (
              <p className="text-sm text-gray-500 mt-1">
                Оставащо пространство: {calculation.remainingWidthMm.toFixed(1)} мм ширина, {calculation.remainingHeightMm.toFixed(1)} мм дълбочина
              </p>
            )}
          </div>

          {calculation.recommendations.length > 0 ? (
            <>
              <h3 className="font-medium mb-4">Препоръчани основи:</h3>
              <div className="space-y-3 mb-6">
                {calculation.recommendations.map((rec) => (
                  <div
                    key={rec.product.id}
                    className="flex items-center justify-between bg-white p-4 border border-gray-100"
                  >
                    <div className="flex items-center gap-4">
                      {rec.product.images[0] && (
                        <div className="w-16 h-16 relative shrink-0">
                          <Image
                            src={rec.product.images[0].url}
                            alt={rec.product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div>
                        <p className="font-medium">{rec.product.name}</p>
                        <p className="text-sm text-gray-600">
                          {rec.quantity} бр. x {rec.product.price.toFixed(2)} лв.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="font-medium">
                        {(rec.product.price * rec.quantity).toFixed(2)} лв.
                      </p>
                      <button
                        onClick={() => handleAddSingleToCart(rec)}
                        className="text-sm text-gray-600 hover:text-black underline"
                      >
                        Добави
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between bg-black text-white p-4">
                <div>
                  <p className="text-sm opacity-80">Обща цена за основите</p>
                  <p className="text-xl font-medium">{calculation.totalPrice.toFixed(2)} лв.</p>
                </div>
                <button
                  onClick={handleAddAllToCart}
                  className="px-6 py-3 bg-white text-black text-sm hover:bg-gray-100 transition-colors"
                >
                  Добави всички в количката
                </button>
              </div>
            </>
          ) : (
            <p className="text-gray-600">
              Не можахме да намерим подходящи основи за тези размери. Моля, проверете размерите.
            </p>
          )}
        </div>
      )}

      {hasCalculated && !calculation && (
        <p className="text-red-600 mt-4">
          Моля, въведете валидни размери (минимум 4.2 см за всяка страна).
        </p>
      )}
    </div>
  );
}
