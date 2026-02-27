// ══════════════════════════════════════════
// SAMPLE DATA FOR ALUMINUM BUSINESS MANAGEMENT
// ══════════════════════════════════════════

export type AlloyType = '6061' | '6063' | '7075' | '2024' | '5052' | '5083' | '6060' | '6082' | 'Other';
export type Temper = 'T6' | 'T5' | 'T4' | 'T651' | 'O' | 'H14' | 'H32' | 'Other';
export type ProductForm = 'Sheet' | 'Plate' | 'Bar/Rod' | 'Tube/Pipe' | 'Angle' | 'Channel' | 'Beam' | 'Profile' | 'Coil' | 'Custom';
export type OrderStatus = 'Draft' | 'Quote Accepted' | 'Payment Received' | 'Processing' | 'Ready' | 'Shipped' | 'Delivered' | 'Completed' | 'Cancelled';
export type QuoteStatus = 'Draft' | 'Sent' | 'Accepted' | 'Rejected' | 'Expired';
export type POStatus = 'Draft' | 'Sent' | 'Confirmed' | 'Shipped' | 'Received' | 'Partially Received' | 'Cancelled';
export type CustomerType = 'Retail' | 'Wholesale' | 'Fabricator' | 'Contractor' | 'Distributor';

export interface Product {
  id: string;
  name: string;
  alloy: AlloyType;
  temper: Temper;
  form: ProductForm;
  length?: number;
  width?: number;
  thickness?: number;
  diameter?: number;
  wallThickness?: number;
  weightPerMeter: number;
  quantity: number;
  minStock: number;
  maxStock: number;
  location: string;
  supplierId: string;
  purchasePrice: number;
  sellingPrice: number;
  batchNumber: string;
  millCert: boolean;
  dateReceived: string;
  notes: string;
  unit: 'kg' | 'lb' | 'piece';
}

export interface Customer {
  id: string;
  company: string;
  contact: string;
  phone: string;
  email: string;
  billingAddress: string;
  shippingAddress: string;
  taxId: string;
  paymentTerms: string;
  creditLimit: number;
  customerType: CustomerType;
  status: 'Active' | 'Inactive';
  totalOrders: number;
  totalSpent: number;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  date: string;
  deliveryDate: string;
  status: OrderStatus;
  paymentStatus: 'Paid' | 'Partial' | 'Unpaid';
  total: number;
  items: number;
}

export interface Quote {
  id: string;
  customerId: string;
  customerName: string;
  date: string;
  validUntil: string;
  status: QuoteStatus;
  total: number;
  items: number;
  margin: number;
}

export interface Supplier {
  id: string;
  company: string;
  contact: string;
  phone: string;
  email: string;
  leadTime: number;
  rating: number;
  preferred: boolean;
  paymentTerms: string;
}

export interface CuttingJob {
  id: string;
  orderId: string;
  product: string;
  originalLength: number;
  cuts: number;
  waste: number;
  assignedTo: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  date: string;
}

export interface Activity {
  id: string;
  type: 'order' | 'stock' | 'alert' | 'quote';
  message: string;
  time: string;
}

// ═══ PRODUCTS ═══
export const sampleProducts: Product[] = [
  { id: 'ALU-001', name: '6061-T6 Sheet 4x8', alloy: '6061', temper: 'T6', form: 'Sheet', length: 2438, width: 1219, thickness: 3.175, weightPerMeter: 8.6, quantity: 45, minStock: 10, maxStock: 100, location: 'A-01-1', supplierId: 'SUP-001', purchasePrice: 4.50, sellingPrice: 6.75, batchNumber: 'B2024-0891', millCert: true, dateReceived: '2024-12-15', notes: 'Standard stock item', unit: 'kg' },
  { id: 'ALU-002', name: '6063-T5 Profile Extrusion', alloy: '6063', temper: 'T5', form: 'Profile', length: 6000, thickness: 2, weightPerMeter: 1.2, quantity: 120, minStock: 20, maxStock: 200, location: 'B-03-2', supplierId: 'SUP-002', purchasePrice: 3.80, sellingPrice: 5.70, batchNumber: 'B2024-1102', millCert: true, dateReceived: '2025-01-08', notes: 'Window frame profile', unit: 'kg' },
  { id: 'ALU-003', name: '7075-T651 Plate 1"', alloy: '7075', temper: 'T651', form: 'Plate', length: 2438, width: 1219, thickness: 25.4, weightPerMeter: 68.5, quantity: 8, minStock: 5, maxStock: 30, location: 'A-05-1', supplierId: 'SUP-001', purchasePrice: 12.00, sellingPrice: 18.50, batchNumber: 'B2024-0772', millCert: true, dateReceived: '2024-11-20', notes: 'Aerospace grade', unit: 'kg' },
  { id: 'ALU-004', name: '6061-T6 Round Bar 2"', alloy: '6061', temper: 'T6', form: 'Bar/Rod', length: 3000, diameter: 50.8, weightPerMeter: 5.5, quantity: 32, minStock: 10, maxStock: 60, location: 'C-02-3', supplierId: 'SUP-003', purchasePrice: 5.20, sellingPrice: 7.80, batchNumber: 'B2025-0012', millCert: true, dateReceived: '2025-01-15', notes: '', unit: 'kg' },
  { id: 'ALU-005', name: '5052-H32 Sheet 0.063"', alloy: '5052', temper: 'H32', form: 'Sheet', length: 2438, width: 1219, thickness: 1.6, weightPerMeter: 4.3, quantity: 3, minStock: 15, maxStock: 80, location: 'A-02-2', supplierId: 'SUP-002', purchasePrice: 3.90, sellingPrice: 5.85, batchNumber: 'B2024-0955', millCert: false, dateReceived: '2024-12-01', notes: 'Marine grade - LOW STOCK', unit: 'kg' },
  { id: 'ALU-006', name: '6063-T6 Square Tube 2x2', alloy: '6063', temper: 'T6', form: 'Tube/Pipe', length: 6000, thickness: 3.175, wallThickness: 3.175, weightPerMeter: 1.8, quantity: 65, minStock: 15, maxStock: 120, location: 'B-01-1', supplierId: 'SUP-002', purchasePrice: 4.10, sellingPrice: 6.15, batchNumber: 'B2025-0045', millCert: true, dateReceived: '2025-01-22', notes: '', unit: 'kg' },
  { id: 'ALU-007', name: '6061-T6 Angle 2x2x1/4', alloy: '6061', temper: 'T6', form: 'Angle', length: 6000, width: 50.8, thickness: 6.35, weightPerMeter: 1.5, quantity: 48, minStock: 10, maxStock: 80, location: 'C-01-2', supplierId: 'SUP-001', purchasePrice: 3.60, sellingPrice: 5.40, batchNumber: 'B2024-1200', millCert: true, dateReceived: '2025-01-05', notes: '', unit: 'kg' },
  { id: 'ALU-008', name: '2024-T4 Sheet 0.125"', alloy: '2024', temper: 'T4', form: 'Sheet', length: 2438, width: 1219, thickness: 3.175, weightPerMeter: 8.8, quantity: 2, minStock: 8, maxStock: 40, location: 'A-04-1', supplierId: 'SUP-003', purchasePrice: 9.50, sellingPrice: 14.25, batchNumber: 'B2024-0680', millCert: true, dateReceived: '2024-10-15', notes: 'Aerospace - CRITICAL LOW', unit: 'kg' },
  { id: 'ALU-009', name: '5083-H14 Plate 1/2"', alloy: '5083', temper: 'H14', form: 'Plate', length: 2438, width: 1219, thickness: 12.7, weightPerMeter: 34.3, quantity: 15, minStock: 5, maxStock: 25, location: 'A-06-1', supplierId: 'SUP-001', purchasePrice: 7.80, sellingPrice: 11.70, batchNumber: 'B2025-0088', millCert: true, dateReceived: '2025-02-01', notes: 'Marine & structural', unit: 'kg' },
  { id: 'ALU-010', name: '6082-T6 Channel 3"', alloy: '6082', temper: 'T6', form: 'Channel', length: 6000, width: 76.2, thickness: 6.35, weightPerMeter: 2.8, quantity: 22, minStock: 8, maxStock: 50, location: 'C-03-1', supplierId: 'SUP-002', purchasePrice: 5.00, sellingPrice: 7.50, batchNumber: 'B2025-0110', millCert: false, dateReceived: '2025-02-10', notes: '', unit: 'kg' },
];

// ═══ CUSTOMERS ═══
export const sampleCustomers: Customer[] = [
  { id: 'CUS-001', company: 'Pacific Metal Works', contact: 'James Chen', phone: '(555) 123-4567', email: 'james@pacificmetal.com', billingAddress: '123 Industrial Blvd, Portland, OR 97201', shippingAddress: '123 Industrial Blvd, Portland, OR 97201', taxId: '12-3456789', paymentTerms: 'Net 30', creditLimit: 50000, customerType: 'Fabricator', status: 'Active', totalOrders: 47, totalSpent: 128450 },
  { id: 'CUS-002', company: 'BuildRight Construction', contact: 'Sarah Martinez', phone: '(555) 234-5678', email: 'sarah@buildright.com', billingAddress: '456 Main St, Seattle, WA 98101', shippingAddress: '789 Job Site Rd, Tacoma, WA 98402', taxId: '98-7654321', paymentTerms: 'Net 60', creditLimit: 75000, customerType: 'Contractor', status: 'Active', totalOrders: 23, totalSpent: 89200 },
  { id: 'CUS-003', company: 'Precision Aero Parts', contact: 'David Kim', phone: '(555) 345-6789', email: 'david@precisionaero.com', billingAddress: '100 Aerospace Way, Everett, WA 98203', shippingAddress: '100 Aerospace Way, Everett, WA 98203', taxId: '55-1234567', paymentTerms: 'Net 30', creditLimit: 100000, customerType: 'Fabricator', status: 'Active', totalOrders: 62, totalSpent: 245800 },
  { id: 'CUS-004', company: 'Metro Window & Door', contact: 'Lisa Thompson', phone: '(555) 456-7890', email: 'lisa@metrowindow.com', billingAddress: '200 Commerce Dr, Vancouver, WA 98660', shippingAddress: '200 Commerce Dr, Vancouver, WA 98660', taxId: '33-9876543', paymentTerms: 'COD', creditLimit: 25000, customerType: 'Wholesale', status: 'Active', totalOrders: 15, totalSpent: 34500 },
  { id: 'CUS-005', company: 'Harbor Marine Supply', contact: 'Mike O\'Brien', phone: '(555) 567-8901', email: 'mike@harbormarine.com', billingAddress: '50 Dock Rd, Astoria, OR 97103', shippingAddress: '50 Dock Rd, Astoria, OR 97103', taxId: '77-5432109', paymentTerms: 'Net 30', creditLimit: 40000, customerType: 'Distributor', status: 'Active', totalOrders: 31, totalSpent: 67300 },
  { id: 'CUS-006', company: 'DIY Home Center', contact: 'Robert Williams', phone: '(555) 678-9012', email: 'robert@diyhome.com', billingAddress: '900 Retail Ave, Bend, OR 97701', shippingAddress: '900 Retail Ave, Bend, OR 97701', taxId: '44-1112223', paymentTerms: 'COD', creditLimit: 10000, customerType: 'Retail', status: 'Active', totalOrders: 8, totalSpent: 4200 },
];

// ═══ ORDERS ═══
export const sampleOrders: Order[] = [
  { id: 'ORD-2025-001', customerId: 'CUS-003', customerName: 'Precision Aero Parts', date: '2025-02-25', deliveryDate: '2025-03-05', status: 'Processing', paymentStatus: 'Paid', total: 12450, items: 4 },
  { id: 'ORD-2025-002', customerId: 'CUS-001', customerName: 'Pacific Metal Works', date: '2025-02-24', deliveryDate: '2025-03-01', status: 'Ready', paymentStatus: 'Paid', total: 8320, items: 3 },
  { id: 'ORD-2025-003', customerId: 'CUS-002', customerName: 'BuildRight Construction', date: '2025-02-23', deliveryDate: '2025-03-10', status: 'Quote Accepted', paymentStatus: 'Unpaid', total: 15780, items: 6 },
  { id: 'ORD-2025-004', customerId: 'CUS-005', customerName: 'Harbor Marine Supply', date: '2025-02-22', deliveryDate: '2025-02-28', status: 'Shipped', paymentStatus: 'Paid', total: 6200, items: 2 },
  { id: 'ORD-2025-005', customerId: 'CUS-004', customerName: 'Metro Window & Door', date: '2025-02-20', deliveryDate: '2025-02-27', status: 'Delivered', paymentStatus: 'Partial', total: 9450, items: 5 },
  { id: 'ORD-2025-006', customerId: 'CUS-001', customerName: 'Pacific Metal Works', date: '2025-02-18', deliveryDate: '2025-02-25', status: 'Completed', paymentStatus: 'Paid', total: 4850, items: 2 },
  { id: 'ORD-2025-007', customerId: 'CUS-006', customerName: 'DIY Home Center', date: '2025-02-26', deliveryDate: '2025-03-08', status: 'Draft', paymentStatus: 'Unpaid', total: 1250, items: 1 },
];

// ═══ QUOTES ═══
export const sampleQuotes: Quote[] = [
  { id: 'QT-2025-001', customerId: 'CUS-002', customerName: 'BuildRight Construction', date: '2025-02-24', validUntil: '2025-03-10', status: 'Sent', total: 22500, items: 8, margin: 34 },
  { id: 'QT-2025-002', customerId: 'CUS-003', customerName: 'Precision Aero Parts', date: '2025-02-22', validUntil: '2025-03-08', status: 'Accepted', total: 18900, items: 5, margin: 42 },
  { id: 'QT-2025-003', customerId: 'CUS-005', customerName: 'Harbor Marine Supply', date: '2025-02-20', validUntil: '2025-03-06', status: 'Draft', total: 7800, items: 3, margin: 28 },
  { id: 'QT-2025-004', customerId: 'CUS-001', customerName: 'Pacific Metal Works', date: '2025-02-15', validUntil: '2025-03-01', status: 'Expired', total: 5400, items: 2, margin: 31 },
  { id: 'QT-2025-005', customerId: 'CUS-004', customerName: 'Metro Window & Door', date: '2025-02-26', validUntil: '2025-03-12', status: 'Sent', total: 11200, items: 4, margin: 38 },
];

// ═══ SUPPLIERS ═══
export const sampleSuppliers: Supplier[] = [
  { id: 'SUP-001', company: 'Alcoa Mill Products', contact: 'Tom Anderson', phone: '(800) 555-0101', email: 'sales@alcoa.example.com', leadTime: 14, rating: 5, preferred: true, paymentTerms: 'Net 30' },
  { id: 'SUP-002', company: 'Pacific Aluminum Supply', contact: 'Nancy Wu', phone: '(800) 555-0202', email: 'orders@pacificalum.example.com', leadTime: 7, rating: 4, preferred: true, paymentTerms: 'Net 30' },
  { id: 'SUP-003', company: 'Global Metal Trading', contact: 'Ahmed Hassan', phone: '(800) 555-0303', email: 'info@globalmetals.example.com', leadTime: 21, rating: 3, preferred: false, paymentTerms: 'Net 45' },
  { id: 'SUP-004', company: 'Northwest Extrusions', contact: 'Karen Mills', phone: '(800) 555-0404', email: 'karen@nwextrusions.example.com', leadTime: 10, rating: 4, preferred: true, paymentTerms: 'Net 30' },
];

// ═══ CUTTING JOBS ═══
export const sampleCuttingJobs: CuttingJob[] = [
  { id: 'CUT-001', orderId: 'ORD-2025-001', product: '6061-T6 Sheet 4x8', originalLength: 2438, cuts: 6, waste: 2.3, assignedTo: 'Mike R.', status: 'In Progress', date: '2025-02-26' },
  { id: 'CUT-002', orderId: 'ORD-2025-002', product: '6063-T6 Square Tube 2x2', originalLength: 6000, cuts: 12, waste: 1.8, assignedTo: 'Steve L.', status: 'Pending', date: '2025-02-27' },
  { id: 'CUT-003', orderId: 'ORD-2025-004', product: '5083-H14 Plate 1/2"', originalLength: 2438, cuts: 4, waste: 3.1, assignedTo: 'Mike R.', status: 'Completed', date: '2025-02-24' },
];

// ═══ ACTIVITIES ═══
export const sampleActivities: Activity[] = [
  { id: '1', type: 'order', message: 'New order ORD-2025-007 from DIY Home Center', time: '10 min ago' },
  { id: '2', type: 'alert', message: '2024-T4 Sheet stock critically low (2 remaining)', time: '25 min ago' },
  { id: '3', type: 'stock', message: '50 units of 6063-T5 Profile received from Pacific Aluminum', time: '1 hour ago' },
  { id: '4', type: 'quote', message: 'Quote QT-2025-005 sent to Metro Window & Door', time: '2 hours ago' },
  { id: '5', type: 'order', message: 'Order ORD-2025-004 shipped to Harbor Marine Supply', time: '3 hours ago' },
  { id: '6', type: 'alert', message: '5052-H32 Sheet stock low (3 remaining, min: 15)', time: '4 hours ago' },
  { id: '7', type: 'stock', message: 'Stock adjustment: 6061-T6 Angle -2 units (damaged)', time: '5 hours ago' },
  { id: '8', type: 'order', message: 'Payment received for ORD-2025-001 ($12,450)', time: '6 hours ago' },
];

// ═══ CHART DATA ═══
export const salesTrendData = [
  { date: 'Jan 28', sales: 4200 }, { date: 'Jan 29', sales: 3800 }, { date: 'Jan 30', sales: 5100 },
  { date: 'Jan 31', sales: 4800 }, { date: 'Feb 01', sales: 3200 }, { date: 'Feb 02', sales: 1800 },
  { date: 'Feb 03', sales: 6200 }, { date: 'Feb 04', sales: 5800 }, { date: 'Feb 05', sales: 7100 },
  { date: 'Feb 06', sales: 6400 }, { date: 'Feb 07', sales: 5200 }, { date: 'Feb 08', sales: 2400 },
  { date: 'Feb 09', sales: 3100 }, { date: 'Feb 10', sales: 5500 }, { date: 'Feb 11', sales: 6800 },
  { date: 'Feb 12', sales: 7200 }, { date: 'Feb 13', sales: 6100 }, { date: 'Feb 14', sales: 5900 },
  { date: 'Feb 15', sales: 4200 }, { date: 'Feb 16', sales: 2800 }, { date: 'Feb 17', sales: 7800 },
  { date: 'Feb 18', sales: 8200 }, { date: 'Feb 19', sales: 6900 }, { date: 'Feb 20', sales: 7500 },
  { date: 'Feb 21', sales: 8100 }, { date: 'Feb 22', sales: 3500 }, { date: 'Feb 23', sales: 4100 },
  { date: 'Feb 24', sales: 9200 }, { date: 'Feb 25', sales: 8400 }, { date: 'Feb 26', sales: 7600 },
];

export const topProductsData = [
  { name: '6061-T6 Sheet', sales: 42500 },
  { name: '6063-T5 Profile', sales: 38200 },
  { name: '7075-T651 Plate', sales: 28900 },
  { name: '6063-T6 Tube', sales: 22100 },
  { name: '6061-T6 Round Bar', sales: 18400 },
];

export const inventoryByAlloyData = [
  { name: '6061', value: 35, fill: 'hsl(212, 72%, 42%)' },
  { name: '6063', value: 28, fill: 'hsl(38, 92%, 50%)' },
  { name: '7075', value: 12, fill: 'hsl(142, 72%, 40%)' },
  { name: '5052', value: 10, fill: 'hsl(280, 60%, 50%)' },
  { name: '2024', value: 8, fill: 'hsl(0, 72%, 51%)' },
  { name: 'Other', value: 7, fill: 'hsl(215, 12%, 50%)' },
];
