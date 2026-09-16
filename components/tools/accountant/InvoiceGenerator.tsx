'use client';

import React, { useState } from 'react';
import { Plus, Trash2, Download, Receipt, FileSpreadsheet, Building2, User, FileDown, Loader2 } from 'lucide-react';
import { generateInvoiceWithJsPdfAndAutoTable } from '@/lib/pdfGenerator';

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
}

export function InvoiceGenerator() {
  const [invoiceNumber, setInvoiceNumber] = useState('INV-2026-001');
  const [invoiceDate, setInvoiceDate] = useState('2026-09-15');
  const [dueDate, setDueDate] = useState('2026-09-29');
  const [currency, setCurrency] = useState('USD ($)');
  const [currencySymbol, setCurrencySymbol] = useState('$');

  // Business info
  const [businessName, setBusinessName] = useState('Hafiz Muhammad Usman / TechUsar');
  const [businessEmail, setBusinessEmail] = useState('techusar17@gmail.com');
  const [businessPhone, setBusinessPhone] = useState('0331-8917330');
  const [businessAddress, setBusinessAddress] = useState('Karachi, Pakistan');

  // Client info
  const [clientName, setClientName] = useState('Acme Corporation');
  const [clientEmail, setClientEmail] = useState('billing@acme.corp');
  const [clientAddress, setClientAddress] = useState('742 Evergreen Terrace, Tech Park');

  // Line items
  const [items, setItems] = useState<InvoiceItem[]>([
    { id: '1', description: 'Full-Stack Web Application Development (React & Node)', quantity: 1, rate: 1200 },
    { id: '2', description: 'Brand Identity Design & Vector UI Kit', quantity: 1, rate: 450 },
    { id: '3', description: 'Accounting & Inventory Management Integration', quantity: 1, rate: 650 },
  ]);

  const [taxPercent, setTaxPercent] = useState(5);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [notes, setNotes] = useState('Payment terms: Net 14. Thank you for your business!');

  const handleCurrencyChange = (val: string) => {
    setCurrency(val);
    if (val.includes('$')) setCurrencySymbol('$');
    else if (val.includes('PKR') || val.includes('₨')) setCurrencySymbol('₨');
    else if (val.includes('€')) setCurrencySymbol('€');
    else if (val.includes('£')) setCurrencySymbol('£');
    else if (val.includes('₹')) setCurrencySymbol('₹');
    else if (val.includes('AED')) setCurrencySymbol('AED ');
    else setCurrencySymbol('$');
  };

  const addItem = () => {
    setItems((prev) => [
      ...prev,
      { id: Date.now().toString(), description: 'New Service / Deliverable', quantity: 1, rate: 100 },
    ]);
  };

  const updateItem = (id: string, field: keyof InvoiceItem, val: string | number) => {
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, [field]: val } : it))
    );
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  // Calculations
  const subtotal = items.reduce((sum, it) => sum + (Number(it.quantity) || 0) * (Number(it.rate) || 0), 0);
  const discountAmount = (subtotal * (Number(discountPercent) || 0)) / 100;
  const taxableAmount = subtotal - discountAmount;
  const taxAmount = (taxableAmount * (Number(taxPercent) || 0)) / 100;
  const total = taxableAmount + taxAmount;
  const [isPdfGenerating, setIsPdfGenerating] = useState(false);

  const handleDownloadPdf = () => {
    if (isPdfGenerating) return;
    setIsPdfGenerating(true);
    const cleanId = (invoiceNumber || 'Invoice').replace(/[^a-zA-Z0-9_-]/g, '_');
    generateInvoiceWithJsPdfAndAutoTable(
      {
        invoiceNumber,
        invoiceDate,
        dueDate,
        currencySymbol,
        businessName,
        businessEmail,
        businessPhone,
        businessAddress,
        clientName,
        clientEmail,
        clientAddress,
        items,
        discountPercent: Number(discountPercent) || 0,
        taxPercent: Number(taxPercent) || 0,
      },
      `${cleanId}.pdf`
    );
    setIsPdfGenerating(false);
  };

  return (
    <div className="space-y-6">
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200/80 dark:border-blue-900/40 no-print">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
            <Receipt className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-neutral-900 dark:text-white">
              Instant Professional Invoice &amp; Receipt Generator
            </h2>
            <p className="text-xs text-neutral-600 dark:text-neutral-400">
              Tax, VAT &amp; discount compliant. Generate, preview, and print/save clean PDFs.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={currency}
            onChange={(e) => handleCurrencyChange(e.target.value)}
            className="p-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-xs font-medium"
          >
            <option value="USD ($)">USD ($)</option>
            <option value="PKR (₨)">PKR (₨)</option>
            <option value="EUR (€)">EUR (€)</option>
            <option value="GBP (£)">GBP (£)</option>
            <option value="INR (₹)">INR (₹)</option>
            <option value="AED (AED)">AED (AED)</option>
          </select>

          <button
            type="button"
            onClick={handleDownloadPdf}
            disabled={isPdfGenerating}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs disabled:opacity-70 cursor-pointer"
          >
            {isPdfGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Generating PDF...</span>
              </>
            ) : (
              <>
                <FileDown className="w-4 h-4" />
                <span>Download PDF</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Invoice Canvas (Printable Area) */}
      <div
        id="invoice-document"
        className="p-8 sm:p-12 rounded-2xl bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-8 text-neutral-900 dark:text-white print:border-none print:p-0 print:shadow-none"
      >
        {/* Header / Brand & Invoice Meta */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 border-b border-neutral-200 dark:border-neutral-800 pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-mono font-bold text-sm">
              <Building2 className="w-4 h-4" />
              <span>FROM / ISSUER</span>
            </div>
            <input
              type="text"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className="text-xl sm:text-2xl font-extrabold tracking-tight font-sans bg-transparent border-b border-dashed border-neutral-300 dark:border-neutral-700 focus:border-blue-500 outline-none w-full"
              placeholder="Your Company Name"
            />
            <div className="space-y-1 text-xs text-neutral-600 dark:text-neutral-400 font-sans">
              <input
                type="text"
                value={businessEmail}
                onChange={(e) => setBusinessEmail(e.target.value)}
                className="bg-transparent border-b border-transparent hover:border-neutral-300 outline-none w-full"
                placeholder="email@example.com"
              />
              <input
                type="text"
                value={businessPhone}
                onChange={(e) => setBusinessPhone(e.target.value)}
                className="bg-transparent border-b border-transparent hover:border-neutral-300 outline-none w-full"
                placeholder="+92-xxx-xxxxxxx"
              />
              <input
                type="text"
                value={businessAddress}
                onChange={(e) => setBusinessAddress(e.target.value)}
                className="bg-transparent border-b border-transparent hover:border-neutral-300 outline-none w-full"
                placeholder="City, Country"
              />
            </div>
          </div>

          <div className="space-y-3 sm:text-right">
            <h1 className="text-3xl font-extrabold tracking-tight text-neutral-950 dark:text-white uppercase font-sans">
              INVOICE
            </h1>
            <div className="space-y-1.5 text-xs text-neutral-600 dark:text-neutral-400">
              <div className="flex items-center sm:justify-end gap-2">
                <span className="font-semibold text-neutral-800 dark:text-neutral-200">Invoice No:</span>
                <input
                  type="text"
                  value={invoiceNumber}
                  onChange={(e) => setInvoiceNumber(e.target.value)}
                  className="font-mono bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded text-neutral-900 dark:text-white w-32 sm:text-right"
                />
              </div>
              <div className="flex items-center sm:justify-end gap-2">
                <span className="font-semibold text-neutral-800 dark:text-neutral-200">Date:</span>
                <input
                  type="date"
                  value={invoiceDate}
                  onChange={(e) => setInvoiceDate(e.target.value)}
                  className="bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded text-neutral-900 dark:text-white text-xs"
                />
              </div>
              <div className="flex items-center sm:justify-end gap-2">
                <span className="font-semibold text-neutral-800 dark:text-neutral-200">Due Date:</span>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded text-neutral-900 dark:text-white text-xs"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bill To */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-mono font-bold text-xs uppercase">
            <User className="w-3.5 h-3.5" />
            <span>BILLED TO / CLIENT</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <input
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="font-bold text-sm bg-transparent border-b border-dashed border-neutral-300 dark:border-neutral-700 p-1 outline-none"
              placeholder="Client Name / Business"
            />
            <input
              type="text"
              value={clientEmail}
              onChange={(e) => setClientEmail(e.target.value)}
              className="bg-transparent border-b border-dashed border-neutral-300 dark:border-neutral-700 p-1 outline-none text-neutral-600 dark:text-neutral-400"
              placeholder="client.billing@email.com"
            />
            <input
              type="text"
              value={clientAddress}
              onChange={(e) => setClientAddress(e.target.value)}
              className="bg-transparent border-b border-dashed border-neutral-300 dark:border-neutral-700 p-1 outline-none text-neutral-600 dark:text-neutral-400"
              placeholder="Address / City"
            />
          </div>
        </div>

        {/* Line Items Table */}
        <div className="space-y-3">
          <div className="w-full overflow-x-auto pb-1 -mx-1 px-1">
            <table className="w-full min-w-[500px] text-left text-xs border-collapse">
              <thead>
                <tr className="border-b-2 border-neutral-300 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 font-sans text-xs font-semibold">
                  <th className="py-2.5 px-2">Description</th>
                  <th className="py-2.5 px-2 w-20 text-center">Qty</th>
                  <th className="py-2.5 px-2 w-28 text-right">Rate ({currencySymbol.trim()})</th>
                  <th className="py-2.5 px-2 w-28 text-right">Amount</th>
                  <th className="py-2.5 px-2 w-10 text-center no-print"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                {items.map((it) => (
                  <tr key={it.id} className="group">
                    <td className="py-2 px-2">
                      <input
                        type="text"
                        value={it.description}
                        onChange={(e) => updateItem(it.id, 'description', e.target.value)}
                        className="w-full bg-transparent p-1 rounded hover:bg-neutral-50 dark:hover:bg-neutral-900 outline-none text-neutral-900 dark:text-white font-medium"
                      />
                    </td>
                    <td className="py-2 px-2 text-center">
                      <input
                        type="number"
                        min="1"
                        value={it.quantity}
                        onChange={(e) => updateItem(it.id, 'quantity', Number(e.target.value))}
                        className="w-16 text-center bg-transparent p-1 rounded hover:bg-neutral-50 dark:hover:bg-neutral-900 outline-none font-mono"
                      />
                    </td>
                    <td className="py-2 px-2 text-right">
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={it.rate}
                        onChange={(e) => updateItem(it.id, 'rate', Number(e.target.value))}
                        className="w-24 text-right bg-transparent p-1 rounded hover:bg-neutral-50 dark:hover:bg-neutral-900 outline-none font-mono"
                      />
                    </td>
                    <td className="py-2 px-2 text-right font-mono font-bold text-neutral-900 dark:text-white">
                      {currencySymbol}
                      {((Number(it.quantity) || 0) * (Number(it.rate) || 0)).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td className="py-2 px-2 text-center no-print">
                      <button
                        type="button"
                        onClick={() => removeItem(it.id)}
                        className="text-neutral-400 hover:text-rose-500 transition-colors p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="no-print pt-2">
            <button
              type="button"
              onClick={addItem}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-dashed border-neutral-300 dark:border-neutral-700 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:border-blue-500 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Line Item</span>
            </button>
          </div>
        </div>

        {/* Summary Totals & Notes */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-8 pt-4 border-t border-neutral-200 dark:border-neutral-800">
          <div className="sm:col-span-7 space-y-2">
            <label className="block text-xs font-mono font-bold uppercase text-neutral-500">
              Payment Instructions &amp; Terms
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full p-2.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 text-xs text-neutral-700 dark:text-neutral-300"
            />
          </div>

          <div className="sm:col-span-5 space-y-2 text-xs">
            <div className="flex justify-between py-1 text-neutral-600 dark:text-neutral-400">
              <span>Subtotal:</span>
              <span className="font-mono font-medium">
                {currencySymbol}
                {subtotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>

            <div className="flex items-center justify-between py-1 text-neutral-600 dark:text-neutral-400">
              <span className="flex items-center gap-1">
                <span>Discount (%):</span>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={discountPercent}
                  onChange={(e) => setDiscountPercent(Number(e.target.value))}
                  className="w-12 px-1 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-center font-mono"
                />
              </span>
              <span className="font-mono text-emerald-600 dark:text-emerald-400">
                -{currencySymbol}
                {discountAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>

            <div className="flex items-center justify-between py-1 text-neutral-600 dark:text-neutral-400">
              <span className="flex items-center gap-1">
                <span>Tax / VAT (%):</span>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={taxPercent}
                  onChange={(e) => setTaxPercent(Number(e.target.value))}
                  className="w-12 px-1 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-center font-mono"
                />
              </span>
              <span className="font-mono">
                +{currencySymbol}
                {taxAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>

            <div className="flex justify-between py-3 border-t-2 border-neutral-950 dark:border-white text-base font-black text-neutral-950 dark:text-white">
              <span>Total Due:</span>
              <span className="font-mono">
                {currencySymbol}
                {total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
