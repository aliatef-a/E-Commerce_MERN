export const calculateCartTotal = (items: any[]) => {
    return items.reduce(
        (total, item) => total + item.unitePrice * item.quantity,
        0
    );
};