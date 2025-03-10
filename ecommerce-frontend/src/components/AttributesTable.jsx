import React, { forwardRef } from "react";

const AttributesTable = forwardRef(({ attributes }, ref) => {
  if (!attributes || attributes.length === 0) {
    return <p className="text-gray-500 mt-4">Няма налични характеристики.</p>;
  }

  return (
    <div ref={ref} className="flex flex-col items-center">
      <div className="divider"></div>
      <h1  className="text-xl font-bold mb-4">Технически Характеристики</h1>
      
      {/* Table */}
      <table className="table-auto w-full max-w-2xl ">
        <tbody>
          {attributes.map((attr, index) => (
            <tr key={index} className={`${index % 2 === 0 ? "bg-neutral" : "bg-gray-50"}`}>
              <td className="px-4 py-2 font-bold text-left">{attr.name}</td>
              <td className="px-4 py-2 font-normal text-right">{attr.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

export default AttributesTable;
