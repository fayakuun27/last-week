import { useCart } from "@/contexts/cart";

type Props = {
    productId: number;
};

const QuantitySelector = ({ productId }: Props) => {
    const { cart, increaseQuantity, decreaseQuantity } = useCart()
    const item = cart.find((p) => p.id === productId);
    const quantity = item?.inCart || 0;

    return (
        <div className="flex items-center justify-center space-x-4 mt-2">
            <button
                onClick={() => decreaseQuantity(productId)}
                className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded text-lg font-bold"
                disabled={quantity <= 1}
            >
                -
            </button>
            <span className="min-w-[32px] text-center font-semibold text-lg">{quantity}</span>
            <button
                onClick={() => increaseQuantity(productId)}
                className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded text-lg font-bold"
            >
                +
            </button>
        </div>
    );
};

export default QuantitySelector;
