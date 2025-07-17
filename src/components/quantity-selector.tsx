interface QuantitySelectorProps {
  productId: number;
  quantity: number;
  onQuantityChange: (newQty: number) => void;
}

const QuantitySelector = ({
  quantity,
  onQuantityChange,
}: QuantitySelectorProps) => {
  return (
    <div className="flex items-center gap-2 justify-center">
      <button
        className="px-3 py-1 bg-gray-200 rounded"
        onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
      >
        -
      </button>
      <span className="px-2">{quantity}</span>
      <button
        className="px-3 py-1 bg-gray-200 rounded"
        onClick={() => onQuantityChange(quantity + 1)}
      >
        +
      </button>
    </div>
  );
};

export default QuantitySelector;
