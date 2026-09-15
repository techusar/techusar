'use client';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import html2canvas from 'html2canvas-pro';
import { CVData } from '@/data/cv-data';

export interface GeneratePdfOptions {
  elementId?: string;
  element?: HTMLElement | null;
  fileName?: string;
  onStart?: () => void;
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}

/**
 * 1. High-Fidelity Native Vector CV Generator
 * Strictly uses jsPDF and autoTable as requested:
 * import jsPDF from "jspdf";
 * import autoTable from "jspdf-autotable";
 *
 * Produces an exact 1:1 single-page replica matching the CV layout shown on screen:
 * - Navy Header with uppercase typography
 * - Divider bar (#253245)
 * - 2-Column structure via autoTable & native vector primitives
 * - Selectable text, crisp at 500% zoom, 0 extra blank pages
 */
export function generateCvWithJsPdfAndAutoTable(
  data: CVData,
  fileName = 'Hafiz_Muhammad_Usman_CV.pdf'
): boolean {
  try {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    const pageWidth = 210;
    const pageMargin = 14;
    const navyColor: [number, number, number] = [37, 50, 69]; // #253245
    const darkText: [number, number, number] = [30, 30, 30];
    const mutedText: [number, number, number] = [90, 90, 90];

    // Document Metadata
    doc.setProperties({
      title: `${data.name} - Official CV`,
      subject: data.title,
      author: data.name,
      creator: 'TechUsar CV Engine',
    });

    // 1. Header (Name & Title)
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.setTextColor(...navyColor);
    doc.text((data.name || 'HAFIZ MUHAMMAD USMAN').toUpperCase(), pageMargin, 20);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(...mutedText);
    doc.text((data.title || 'GRAPHIC DESIGNER & WEB DEVELOPER').toUpperCase(), pageMargin, 26);

    // Header Divider Line (#253245)
    doc.setDrawColor(...navyColor);
    doc.setLineWidth(0.8);
    doc.line(pageMargin, 29, pageWidth - pageMargin, 29);

    // Vertical Divider Line between Left Column & Right Column
    doc.setDrawColor(215, 220, 225);
    doc.setLineWidth(0.35);
    doc.line(72, 33, 72, 285);

    // 2. Left Column via autoTable (Width: 55mm, Left: 14mm)
    const leftRows: [string][] = [
      ['CONTACT'],
      [`Phone: ${data.phone}`],
      [`Email: ${data.email}`],
      [`Location: ${data.location}`],
      [`Website: ${data.website}`],
      [''],
      ['SKILLS'],
      ...data.skills.map((s): [string] => [`•  ${s}`]),
      [''],
      ['LANGUAGES'],
      ...data.languages.map((l): [string] => [`•  ${l.language} (${l.proficiency})`]),
      [''],
      ['TECH & TOOLS'],
      ...data.techTools.map((t): [string] => [`•  ${t}`]),
    ];

    autoTable(doc, {
      startY: 33,
      margin: { left: pageMargin },
      tableWidth: 55,
      theme: 'plain',
      body: leftRows,
      styles: {
        fontSize: 8,
        lineColor: [255, 255, 255],
        cellPadding: { top: 1, bottom: 1, left: 0, right: 2 },
        font: 'helvetica',
        textColor: darkText,
        overflow: 'linebreak',
      },
      didParseCell: (dataCell) => {
        const text = String(dataCell.cell.raw || '');
        if (['CONTACT', 'SKILLS', 'LANGUAGES', 'TECH & TOOLS'].includes(text)) {
          dataCell.cell.styles.fontStyle = 'bold';
          dataCell.cell.styles.textColor = navyColor;
          dataCell.cell.styles.fontSize = 9;
          dataCell.cell.styles.cellPadding = { top: 3.5, bottom: 1.5, left: 0, right: 0 };
        }
      },
    });

    // 3. Right Column via autoTable (Width: 120mm, Left: 76mm)
    const rightRows: [string][] = [
      ['PROFILE'],
      [`"${data.profile}"`],
      [''],
      ['WORK EXPERIENCE'],
    ];

    data.experience.forEach((exp) => {
      rightRows.push([`${exp.role.toUpperCase()} — ${exp.company}  |  ${exp.period}`]);
      exp.bullets.forEach((b) => {
        rightRows.push([`•  ${b}`]);
      });
    });

    rightRows.push(['']);
    rightRows.push(['KEY PROJECTS']);

    data.projects.forEach((proj) => {
      rightRows.push([`${proj.title}  |  ${proj.period}`]);
      rightRows.push([`•  ${proj.description}`]);
    });

    rightRows.push(['']);
    rightRows.push(['EDUCATION']);

    data.education.forEach((edu) => {
      const periodStr = edu.period ? ` (${edu.period})` : '';
      rightRows.push([`${edu.degree}${periodStr} — ${edu.status}`]);
    });

    autoTable(doc, {
      startY: 33,
      margin: { left: 76 },
      tableWidth: 120,
      theme: 'plain',
      body: rightRows,
      styles: {
        fontSize: 8,
        lineColor: [255, 255, 255],
        cellPadding: { top: 0.9, bottom: 0.9, left: 0, right: 0 },
        font: 'helvetica',
        textColor: darkText,
        overflow: 'linebreak',
      },
      didParseCell: (dataCell) => {
        const text = String(dataCell.cell.raw || '');
        if (['PROFILE', 'WORK EXPERIENCE', 'KEY PROJECTS', 'EDUCATION'].includes(text)) {
          dataCell.cell.styles.fontStyle = 'bold';
          dataCell.cell.styles.textColor = [0, 0, 0];
          dataCell.cell.styles.fontSize = 9.5;
          dataCell.cell.styles.cellPadding = { top: 3.5, bottom: 1.5, left: 0, right: 0 };
        } else if (
          data.experience.some((e) => text.startsWith(e.role.toUpperCase())) ||
          data.projects.some((p) => text.startsWith(p.title))
        ) {
          dataCell.cell.styles.fontStyle = 'bold';
          dataCell.cell.styles.textColor = [20, 20, 20];
          dataCell.cell.styles.fontSize = 8.5;
          dataCell.cell.styles.cellPadding = { top: 2, bottom: 0.5, left: 0, right: 0 };
        } else if (text.startsWith('"')) {
          dataCell.cell.styles.fontStyle = 'italic';
          dataCell.cell.styles.textColor = [60, 60, 60];
        }
      },
    });

    const cleanFileName = fileName.endsWith('.pdf') ? fileName : `${fileName}.pdf`;
    doc.save(cleanFileName);
    return true;
  } catch (err) {
    console.error('jsPDF + autoTable CV generation failed:', err);
    return false;
  }
}

/**
 * 2. High-Precision Vector Invoice Generator using jsPDF and autoTable
 */
export interface InvoicePdfData {
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  currencySymbol: string;
  businessName: string;
  businessEmail: string;
  businessPhone: string;
  businessAddress: string;
  clientName: string;
  clientEmail: string;
  clientAddress: string;
  items: { description: string; quantity: number; rate: number }[];
  discountPercent: number;
  taxPercent: number;
}

export function generateInvoiceWithJsPdfAndAutoTable(
  data: InvoicePdfData,
  fileName = 'Invoice.pdf'
): boolean {
  try {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    const subtotal = data.items.reduce(
      (sum, it) => sum + (Number(it.quantity) || 0) * (Number(it.rate) || 0),
      0
    );
    const discountAmount = (subtotal * (Number(data.discountPercent) || 0)) / 100;
    const taxableAmount = subtotal - discountAmount;
    const taxAmount = (taxableAmount * (Number(data.taxPercent) || 0)) / 100;
    const total = taxableAmount + taxAmount;

    // Header / Branding
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.setTextColor(37, 99, 235); // Blue
    doc.text('INVOICE', 14, 22);

    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.text(`Invoice #: ${data.invoiceNumber}`, 14, 28);
    doc.text(`Date: ${data.invoiceDate}`, 14, 33);
    doc.text(`Due Date: ${data.dueDate}`, 14, 38);

    // Business details (Right aligned)
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(20, 20, 20);
    doc.text(data.businessName, 196, 22, { align: 'right' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(80, 80, 80);
    doc.text(data.businessEmail, 196, 27, { align: 'right' });
    doc.text(data.businessPhone, 196, 32, { align: 'right' });
    doc.text(data.businessAddress, 196, 37, { align: 'right' });

    // Bill To Section
    doc.setFillColor(245, 247, 250);
    doc.roundedRect(14, 44, 182, 22, 2, 2, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(37, 99, 235);
    doc.text('BILLED TO:', 18, 50);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(20, 20, 20);
    doc.text(data.clientName, 18, 56);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(80, 80, 80);
    doc.text(`${data.clientEmail}  |  ${data.clientAddress}`, 18, 62);

    // Items Table using autoTable
    const tableRows = data.items.map((it, idx) => {
      const lineTotal = (Number(it.quantity) || 0) * (Number(it.rate) || 0);
      return [
        String(idx + 1),
        it.description || 'Service/Item',
        String(it.quantity),
        `${data.currencySymbol}${Number(it.rate).toLocaleString()}`,
        `${data.currencySymbol}${lineTotal.toLocaleString()}`,
      ];
    });

    autoTable(doc, {
      startY: 72,
      margin: { left: 14, right: 14 },
      head: [['#', 'Item Description', 'Qty', 'Rate', 'Amount']],
      body: tableRows,
      theme: 'striped',
      headStyles: {
        fillColor: [37, 99, 235],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        fontSize: 9,
      },
      styles: {
        fontSize: 8.5,
        cellPadding: 3,
        font: 'helvetica',
      },
      columnStyles: {
        0: { cellWidth: 10, halign: 'center' },
        1: { cellWidth: 90 },
        2: { cellWidth: 20, halign: 'center' },
        3: { cellWidth: 30, halign: 'right' },
        4: { cellWidth: 32, halign: 'right' },
      },
    });

    // Summary Totals
    const finalY = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 8;

    autoTable(doc, {
      startY: finalY,
      margin: { left: 110, right: 14 },
      body: [
        ['Subtotal:', `${data.currencySymbol}${subtotal.toLocaleString()}`],
        [`Discount (${data.discountPercent}%):`, `-${data.currencySymbol}${discountAmount.toLocaleString()}`],
        [`Tax (${data.taxPercent}%):`, `+${data.currencySymbol}${taxAmount.toLocaleString()}`],
        ['TOTAL DUE:', `${data.currencySymbol}${total.toLocaleString()}`],
      ],
      theme: 'plain',
      styles: { fontSize: 9, cellPadding: 2, font: 'helvetica' },
      columnStyles: {
        0: { fontStyle: 'bold', halign: 'right' },
        1: { halign: 'right', fontStyle: 'bold' },
      },
      didParseCell: (dataCell) => {
        if (dataCell.row.index === 3) {
          dataCell.cell.styles.fontSize = 11;
          dataCell.cell.styles.textColor = [37, 99, 235];
        }
      },
    });

    const cleanFileName = fileName.endsWith('.pdf') ? fileName : `${fileName}.pdf`;
    doc.save(cleanFileName);
    return true;
  } catch (err) {
    console.error('Invoice generation error:', err);
    return false;
  }
}

/**
 * 3. High-resolution Visual DOM Capture
 * Used when capturing custom styled visual templates (e.g. Obsidian Cyber, Creative Studio)
 * Engineered so that it NEVER creates an unwanted 2nd blank page.
 */
export async function generateAndDownloadPdf({
  elementId,
  element,
  fileName = 'document.pdf',
  onStart,
  onSuccess,
  onError,
}: GeneratePdfOptions): Promise<boolean> {
  try {
    if (onStart) onStart();

    const target = element || (elementId ? document.getElementById(elementId) : null);

    if (!target) {
      throw new Error(`Target element not found${elementId ? `: #${elementId}` : ''}`);
    }

    const originalShadow = target.style.boxShadow;

    // Render HTML element to high-res canvas in desktop layout
    const canvas = await html2canvas(target, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      logging: false,
      backgroundColor: null,
      windowWidth: 1280, // Crucial: ensures desktop 2-column layout renders during capture
      onclone: (clonedDoc) => {
        const clonedTarget = elementId
          ? clonedDoc.getElementById(elementId)
          : clonedDoc.querySelector('[data-pdf-capture="true"]') || clonedDoc.body;

        if (clonedTarget && clonedTarget instanceof HTMLElement) {
          clonedTarget.style.boxShadow = 'none';
          clonedTarget.style.width = '850px';
          clonedTarget.style.maxWidth = '850px';
          clonedTarget.style.margin = '0 auto';
        }
      },
    });

    target.style.boxShadow = originalShadow;

    const pdfWidth = 210;
    const pdfHeight = 297;

    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    // Auto-fit to 1 single page if height is within 15% threshold
    // This strictly eliminates the frustrating 2nd blank page
    if (imgHeight <= pdfHeight * 1.15) {
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');
    } else {
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
      heightLeft -= pdfHeight;

      // Only add another page if remaining content is > 8mm (ignores tiny margin slivers)
      while (heightLeft > 8) {
        position -= pdfHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
        heightLeft -= pdfHeight;
      }
    }

    const cleanFileName = fileName.endsWith('.pdf') ? fileName : `${fileName}.pdf`;
    pdf.save(cleanFileName);

    if (onSuccess) onSuccess();
    return true;
  } catch (error) {
    console.error('PDF Generation failed:', error);
    if (onError) onError(error);
    return false;
  }
}
