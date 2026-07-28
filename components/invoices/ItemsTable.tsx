

export default function ItemsTable({ items = [] }: any) {

    const parseAmount = (value: any) => {
        if (value == null) return 0;

        return Number(
            String(value)
                .replace(/\$/g, "")
                .replace(/,/g, "")
                .trim()
        );
    };
    const total = items.reduce((sum: number, item: any) => {
        const rowTotal =
            parseAmount(item.total) ||
            parseAmount(item.qty) * parseAmount(item.rate);

        return sum + rowTotal;
    }, 0);

    const extractedVat =
        items.length > 0 ? parseAmount(items[0].vat) : 0;

    const hasVat =
        items.length > 0 &&
        items[0].vat !== null &&
        items[0].vat !== undefined &&
        items[0].vat !== "";

    const vat = hasVat ? extractedVat : null;

    const invoiceGrandTotal =
        items.length > 0 ? parseAmount(items[0].grandTotal) : total;
    return (
    <section className="mx-auto mb-6 max-w-[1700px] rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
  <h3 className="mb-3 text-lg font-semibold text-orange-600">
    Items
  </h3>

  <table className="w-full border-collapse text-sm">
    <thead>
      <tr className="h-10 bg-orange-500 text-white">
        <th className="px-3 py-2 text-left font-semibold">SKU</th>
        <th className="px-3 py-2 text-left font-semibold">Description</th>
        <th className="px-3 py-2 text-left font-semibold">Qty</th>
        <th className="px-3 py-2 text-left font-semibold">Rate</th>
        <th className="px-3 py-2 text-left font-semibold">Total</th>
      </tr>
    </thead>

    <tbody>
      {items.map((item: any, index: number) => {
        const rowTotal =
          parseAmount(item.total) ||
          parseAmount(item.qty) * parseAmount(item.rate);

        return (
          <tr
            key={index}
            className="h-10 border-b border-gray-200 hover:bg-orange-50"
          >
            <td className="px-3 py-2">{item.sku}</td>

            <td className="px-3 py-2">{item.description}</td>

            <td className="px-3 py-2">{item.qty}</td>

            <td className="px-3 py-2">
              {parseAmount(item.rate).toFixed(2)}
            </td>

            <td className="px-3 py-2 font-medium">
              {rowTotal.toFixed(2)}
            </td>
          </tr>
        );
      })}

      <tr className="h-10 border-b">
        <td colSpan={3}></td>

        <td className="px-3 py-2 font-semibold">
          Total
        </td>

        <td className="px-3 py-2 font-semibold text-orange-600">
          {total.toFixed(2)}
        </td>
      </tr>

      <tr className="h-10 border-b">
        <td colSpan={3}></td>

        <td className="px-3 py-2 font-semibold">
          VAT (5%)
        </td>

        <td className="px-3 py-2 font-semibold text-orange-600">
          {vat !== null ? vat.toFixed(2) : ""}
        </td>
      </tr>

      <tr className="h-10 bg-orange-50">
        <td colSpan={3}></td>

        <td className="px-3 py-2 font-bold">
          Grand Total
        </td>

        <td className="px-3 py-2 font-bold text-orange-600">
          {invoiceGrandTotal
            ? invoiceGrandTotal.toFixed(2)
            : ""}
        </td>
      </tr>
    </tbody>
  </table>
</section>
    );
}