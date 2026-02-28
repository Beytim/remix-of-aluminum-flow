// ══════════════════════════════════════════
// ALUMINUM WINDOW & DOOR MANUFACTURING ERP
// TYPES & SAMPLE DATA
// ══════════════════════════════════════════

// ═══ TYPES ═══

export interface Product {
  id: string;
  code: string;
  name: string;
  nameAm: string;
  category: 'Windows' | 'Doors' | 'Curtain Walls' | 'Handrails' | 'Louvers' | 'Partitions';
  subcategory: string;
  profile: string;
  glass: string;
  colors: string[];
  laborHrs: number;
  materialCost: number;
  sellingPrice: number;
  status: 'Active' | 'Inactive';
}

export interface Project {
  id: string;
  name: string;
  nameAm: string;
  customerId: string;
  customerName: string;
  type: 'Residential' | 'Commercial';
  status: 'Quote' | 'Deposit' | 'Materials Ordered' | 'Production' | 'Ready' | 'Installation' | 'Completed';
  value: number;
  deposit: number;
  balance: number;
  progress: number;
  orderDate: string;
  dueDate: string;
}

export interface WorkOrder {
  id: string;
  projectId: string;
  productId: string;
  productName: string;
  quantity: number;
  completed: number;
  assignee: string;
  priority: 'High' | 'Medium' | 'Low';
  stage: 'Cutting' | 'Machining' | 'Assembly' | 'Welding' | 'Glazing' | 'Quality Check' | 'Packaging';
  progress: number;
  startDate: string;
  dueDate: string;
}

export interface InventoryItem {
  id: string;
  code: string;
  name: string;
  nameAm: string;
  category: 'Profile' | 'Glass' | 'Hardware' | 'Accessory' | 'Steel';
  unit: string;
  stock: number;
  minStock: number;
  reserved: number;
  available: number;
  location: string;
  cost: number;
}

export interface Customer {
  id: string;
  name: string;
  nameAm: string;
  contact: string;
  type: 'Individual' | 'Company' | 'Contractor' | 'Developer';
  phone: string;
  email: string;
  address: string;
  projects: number;
  totalValue: number;
  outstanding: number;
}

export interface Quote {
  id: string;
  customerId: string;
  customerName: string;
  projectName: string;
  items: number;
  materialCost: number;
  laborCost: number;
  installCost: number;
  transportCost: number;
  subtotal: number;
  vat: number;
  total: number;
  status: 'Pending' | 'Accepted' | 'Rejected';
  date: string;
  validity: string;
}

export interface Supplier {
  id: string;
  company: string;
  contact: string;
  phone: string;
  email: string;
  country: string;
  leadTime: number;
  rating: number;
  preferred: boolean;
  paymentTerms: string;
  certifications: string[];
}

export interface Invoice {
  id: string;
  projectId: string;
  customerName: string;
  amount: number;
  paid: number;
  balance: number;
  status: 'Paid' | 'Partial' | 'Overdue';
  dueDate: string;
}

export interface Payment {
  id: string;
  invoiceId: string;
  date: string;
  customerName: string;
  amount: number;
  method: 'Bank Transfer' | 'TeleBirr' | 'Cash' | 'Cheque';
  reference: string;
}

export interface Employee {
  id: string;
  name: string;
  nameAm: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  hireDate: string;
  status: 'active' | 'on-leave';
  salary: number;
  performance: number;
}

export interface Installation {
  id: string;
  projectId: string;
  projectName: string;
  customerName: string;
  address: string;
  scheduledDate: string;
  team: string;
  status: 'Scheduled' | 'In Progress' | 'Completed';
  notes: string;
  notesAm: string;
}

export interface MaintenanceTask {
  id: string;
  machineId: string;
  machineName: string;
  type: 'Preventive' | 'Corrective' | 'Predictive';
  scheduledDate: string;
  status: 'Scheduled' | 'In Progress' | 'Completed' | 'Overdue';
  assignee: string;
  notes: string;
}

export interface QualityCheck {
  id: string;
  workOrderId: string;
  productName: string;
  inspector: string;
  date: string;
  result: 'Pass' | 'Fail' | 'Conditional';
  defects: string[];
  notes: string;
}

export interface Activity {
  id: string;
  type: 'order' | 'stock' | 'alert' | 'quote' | 'production' | 'install';
  message: string;
  messageAm: string;
  time: string;
}

// ═══ SAMPLE PRODUCTS ═══
export const sampleProducts: Product[] = [
  { id: 'PRD-001', code: 'SW-6063-S1', name: 'Sliding Window 2-Panel', nameAm: 'ተንሸራታች መስኮት 2-ፓነል', category: 'Windows', subcategory: 'Sliding', profile: '6063-T5', glass: '6mm Clear Tempered', colors: ['White', 'Bronze', 'Black'], laborHrs: 3.5, materialCost: 4500, sellingPrice: 7200, status: 'Active' },
  { id: 'PRD-002', code: 'CW-6063-S2', name: 'Casement Window Single', nameAm: 'ካዝመንት መስኮት ነጠላ', category: 'Windows', subcategory: 'Casement', profile: '6063-T5', glass: '5mm Clear Float', colors: ['White', 'Silver'], laborHrs: 2.5, materialCost: 3200, sellingPrice: 5100, status: 'Active' },
  { id: 'PRD-003', code: 'FW-6063-S3', name: 'Fixed Window Large', nameAm: 'ቋሚ መስኮት ትልቅ', category: 'Windows', subcategory: 'Fixed', profile: '6063-T5', glass: '8mm Tinted Tempered', colors: ['White', 'Bronze', 'Grey'], laborHrs: 2.0, materialCost: 3800, sellingPrice: 6000, status: 'Active' },
  { id: 'PRD-004', code: 'SD-6063-D1', name: 'Sliding Door 3-Panel', nameAm: 'ተንሸራታች በር 3-ፓነል', category: 'Doors', subcategory: 'Sliding', profile: '6063-T6', glass: '10mm Clear Tempered', colors: ['White', 'Black', 'Bronze'], laborHrs: 6.0, materialCost: 12000, sellingPrice: 19500, status: 'Active' },
  { id: 'PRD-005', code: 'HD-6063-D2', name: 'Hinged Door Double', nameAm: 'የሚከፈት በር ድርብ', category: 'Doors', subcategory: 'Hinged', profile: '6063-T6', glass: '8mm Frosted Tempered', colors: ['White', 'Bronze'], laborHrs: 5.0, materialCost: 9500, sellingPrice: 15200, status: 'Active' },
  { id: 'PRD-006', code: 'FD-6063-D3', name: 'Folding Door 4-Panel', nameAm: 'ተጣጣፊ በር 4-ፓነል', category: 'Doors', subcategory: 'Folding', profile: '6063-T6', glass: '10mm Clear Tempered', colors: ['Black', 'Grey'], laborHrs: 8.0, materialCost: 18000, sellingPrice: 29000, status: 'Active' },
  { id: 'PRD-007', code: 'CW-6060-C1', name: 'Curtain Wall System', nameAm: 'ከርተን ወል ሲስተም', category: 'Curtain Walls', subcategory: 'Stick System', profile: '6060-T5', glass: '12mm DGU', colors: ['Silver'], laborHrs: 12.0, materialCost: 35000, sellingPrice: 55000, status: 'Active' },
  { id: 'PRD-008', code: 'HR-6063-H1', name: 'Glass Handrail System', nameAm: 'የመስታወት ዘንግ ስርዓት', category: 'Handrails', subcategory: 'Glass', profile: '6063-T6', glass: '12mm Clear Tempered', colors: ['Silver', 'Black'], laborHrs: 4.0, materialCost: 8500, sellingPrice: 13500, status: 'Active' },
  { id: 'PRD-009', code: 'LV-6063-L1', name: 'Aluminum Louver Window', nameAm: 'አልሚኒየም ላውቨር መስኮት', category: 'Louvers', subcategory: 'Adjustable', profile: '6063-T5', glass: '5mm Frosted', colors: ['White', 'Silver'], laborHrs: 3.0, materialCost: 3500, sellingPrice: 5600, status: 'Active' },
  { id: 'PRD-010', code: 'PT-6063-P1', name: 'Office Partition System', nameAm: 'የቢሮ ክፋፍል ስርዓት', category: 'Partitions', subcategory: 'Full Height', profile: '6063-T5', glass: '10mm Clear Tempered', colors: ['Silver', 'White'], laborHrs: 5.0, materialCost: 7200, sellingPrice: 11500, status: 'Active' },
];

// ═══ SAMPLE PROJECTS ═══
export const sampleProjects: Project[] = [
  { id: 'PJ-001', name: 'Bole Apartments Tower A', nameAm: 'ቦሌ አፓርትመንት ታወር ሀ', customerId: 'CUS-001', customerName: 'Ayat Real Estate', type: 'Commercial', status: 'Production', value: 850000, deposit: 425000, balance: 425000, progress: 45, orderDate: '2025-01-15', dueDate: '2025-04-30' },
  { id: 'PJ-002', name: 'Villa Sunshine Residence', nameAm: 'ቪላ ሳንሻይን መኖሪያ', customerId: 'CUS-002', customerName: 'Ato Kebede Alemu', type: 'Residential', status: 'Materials Ordered', value: 285000, deposit: 142500, balance: 142500, progress: 25, orderDate: '2025-02-01', dueDate: '2025-05-15' },
  { id: 'PJ-003', name: 'Megenagna Office Complex', nameAm: 'መገናኛ ቢሮ ኮምፕሌክስ', customerId: 'CUS-003', customerName: 'Ethio Engineering', type: 'Commercial', status: 'Installation', value: 1200000, deposit: 900000, balance: 300000, progress: 85, orderDate: '2024-11-01', dueDate: '2025-03-15' },
  { id: 'PJ-004', name: 'Sarbet Hotel Renovation', nameAm: 'ሳርቤት ሆቴል ማደስ', customerId: 'CUS-004', customerName: 'Getahun Hotels PLC', type: 'Commercial', status: 'Quote', value: 450000, deposit: 0, balance: 450000, progress: 5, orderDate: '2025-02-20', dueDate: '2025-06-30' },
  { id: 'PJ-005', name: 'CMC Residential Block', nameAm: 'ሲኤምሲ መኖሪያ ብሎክ', customerId: 'CUS-005', customerName: 'Noah Construction', type: 'Residential', status: 'Ready', value: 520000, deposit: 390000, balance: 130000, progress: 95, orderDate: '2024-12-10', dueDate: '2025-03-01' },
  { id: 'PJ-006', name: 'Kazanchis Bank Branch', nameAm: 'ካዛንቺስ ባንክ ቅርንጫፍ', customerId: 'CUS-006', customerName: 'Commercial Bank Ethiopia', type: 'Commercial', status: 'Deposit', value: 380000, deposit: 190000, balance: 190000, progress: 15, orderDate: '2025-02-10', dueDate: '2025-05-20' },
  { id: 'PJ-007', name: 'Addis View Penthouse', nameAm: 'አዲስ ቪው ፔንትሃውስ', customerId: 'CUS-007', customerName: 'W/ro Tigist Haile', type: 'Residential', status: 'Completed', value: 195000, deposit: 195000, balance: 0, progress: 100, orderDate: '2024-09-15', dueDate: '2025-01-15' },
];

// ═══ SAMPLE INVENTORY ═══
export const sampleInventory: InventoryItem[] = [
  { id: 'INV-001', code: 'PF-6063-01', name: 'Window Frame Profile 6063', nameAm: 'የመስኮት ፍሬም ፕሮፋይል 6063', category: 'Profile', unit: 'meter', stock: 450, minStock: 100, reserved: 120, available: 330, location: 'R1-A1', cost: 85 },
  { id: 'INV-002', code: 'PF-6063-02', name: 'Door Frame Profile 6063', nameAm: 'የበር ፍሬም ፕሮፋይል 6063', category: 'Profile', unit: 'meter', stock: 280, minStock: 80, reserved: 90, available: 190, location: 'R1-A2', cost: 120 },
  { id: 'INV-003', code: 'PF-6060-01', name: 'Curtain Wall Mullion 6060', nameAm: 'ከርተን ወል ሙሊዮን 6060', category: 'Profile', unit: 'meter', stock: 150, minStock: 50, reserved: 80, available: 70, location: 'R1-B1', cost: 180 },
  { id: 'INV-004', code: 'GL-CLR-06', name: '6mm Clear Tempered Glass', nameAm: '6ሚሜ ግልጽ ጠንካራ መስታወት', category: 'Glass', unit: 'sqm', stock: 85, minStock: 30, reserved: 25, available: 60, location: 'R2-A1', cost: 450 },
  { id: 'INV-005', code: 'GL-TNT-08', name: '8mm Tinted Tempered Glass', nameAm: '8ሚሜ ቀለም ጠንካራ መስታወት', category: 'Glass', unit: 'sqm', stock: 45, minStock: 20, reserved: 15, available: 30, location: 'R2-A2', cost: 620 },
  { id: 'INV-006', code: 'GL-DGU-12', name: '12mm DGU Glass Unit', nameAm: '12ሚሜ ዲጂዩ መስታወት', category: 'Glass', unit: 'sqm', stock: 25, minStock: 15, reserved: 10, available: 15, location: 'R2-B1', cost: 1200 },
  { id: 'INV-007', code: 'HW-HNG-01', name: 'Heavy Duty Hinge (pair)', nameAm: 'ከባድ ሂንጅ (ጥንድ)', category: 'Hardware', unit: 'pair', stock: 120, minStock: 40, reserved: 30, available: 90, location: 'R3-A1', cost: 350 },
  { id: 'INV-008', code: 'HW-LCK-01', name: 'Multi-point Lock System', nameAm: 'ብዙ-ነጥብ ቁልፍ ስርዓት', category: 'Hardware', unit: 'piece', stock: 65, minStock: 25, reserved: 15, available: 50, location: 'R3-A2', cost: 850 },
  { id: 'INV-009', code: 'HW-HDL-01', name: 'Aluminum Handle Set', nameAm: 'የአልሚኒየም እጀታ ስብስብ', category: 'Hardware', unit: 'set', stock: 95, minStock: 30, reserved: 20, available: 75, location: 'R3-B1', cost: 280 },
  { id: 'INV-010', code: 'AC-GSK-01', name: 'EPDM Gasket Roll', nameAm: 'ኢፒዲኤም ጋስኬት ጥቅል', category: 'Accessory', unit: 'meter', stock: 500, minStock: 200, reserved: 100, available: 400, location: 'R4-A1', cost: 25 },
  { id: 'INV-011', code: 'AC-WS-01', name: 'Weather Strip Roll', nameAm: 'የአየር ሁኔታ ስትሪፕ ጥቅል', category: 'Accessory', unit: 'meter', stock: 350, minStock: 150, reserved: 80, available: 270, location: 'R4-A2', cost: 18 },
  { id: 'INV-012', code: 'AC-SIL-01', name: 'Silicone Sealant (tube)', nameAm: 'ሲሊኮን ማተሚያ (ቱቦ)', category: 'Accessory', unit: 'piece', stock: 180, minStock: 50, reserved: 30, available: 150, location: 'R4-B1', cost: 120 },
  { id: 'INV-013', code: 'AC-SCR-01', name: 'Self-tapping Screws (box)', nameAm: 'ራስ-ቆፋሪ ብሎኖች (ሳጥን)', category: 'Accessory', unit: 'box', stock: 45, minStock: 20, reserved: 10, available: 35, location: 'R4-B2', cost: 85 },
  { id: 'INV-014', code: 'ST-ANG-01', name: 'Steel Angle 40x40mm', nameAm: 'ብረት አንግል 40x40ሚሜ', category: 'Steel', unit: 'meter', stock: 8, minStock: 30, reserved: 0, available: 8, location: 'R5-A1', cost: 95 },
  { id: 'INV-015', code: 'ST-PLT-01', name: 'Steel Base Plate 6mm', nameAm: 'ብረት መሰረት ሰሌዳ 6ሚሜ', category: 'Steel', unit: 'piece', stock: 12, minStock: 10, reserved: 5, available: 7, location: 'R5-A2', cost: 250 },
];

// ═══ SAMPLE CUSTOMERS ═══
export const sampleCustomers: Customer[] = [
  { id: 'CUS-001', name: 'Ayat Real Estate', nameAm: 'አያት ሪል ኢስቴት', contact: 'Ato Yonas Bekele', type: 'Developer', phone: '+251-911-234567', email: 'yonas@ayatre.com', address: 'Bole, Addis Ababa', projects: 3, totalValue: 2500000, outstanding: 425000 },
  { id: 'CUS-002', name: 'Ato Kebede Alemu', nameAm: 'አቶ ከበደ ዓለሙ', contact: 'Kebede Alemu', type: 'Individual', phone: '+251-912-345678', email: 'kebede@gmail.com', address: 'CMC, Addis Ababa', projects: 1, totalValue: 285000, outstanding: 142500 },
  { id: 'CUS-003', name: 'Ethio Engineering', nameAm: 'ኢትዮ ኢንጅነሪንግ', contact: 'Eng. Dawit Tesfaye', type: 'Contractor', phone: '+251-913-456789', email: 'dawit@ethioeng.com', address: 'Megenagna, Addis Ababa', projects: 5, totalValue: 3800000, outstanding: 300000 },
  { id: 'CUS-004', name: 'Getahun Hotels PLC', nameAm: 'ጌታሁን ሆቴሎች ኃ/የ/ማ', contact: 'W/ro Meron Getahun', type: 'Company', phone: '+251-914-567890', email: 'meron@getahunhotels.com', address: 'Sarbet, Addis Ababa', projects: 2, totalValue: 950000, outstanding: 450000 },
  { id: 'CUS-005', name: 'Noah Construction', nameAm: 'ኖህ ኮንስትራክሽን', contact: 'Ato Samuel Noah', type: 'Contractor', phone: '+251-915-678901', email: 'samuel@noahcon.com', address: 'Lideta, Addis Ababa', projects: 4, totalValue: 1800000, outstanding: 130000 },
  { id: 'CUS-006', name: 'Commercial Bank Ethiopia', nameAm: 'የኢትዮጵያ ንግድ ባንክ', contact: 'Ato Tadesse Girma', type: 'Company', phone: '+251-916-789012', email: 'tadesse@cbe.com.et', address: 'Kazanchis, Addis Ababa', projects: 1, totalValue: 380000, outstanding: 190000 },
  { id: 'CUS-007', name: 'W/ro Tigist Haile', nameAm: 'ወ/ሮ ትግስት ኃይሌ', contact: 'Tigist Haile', type: 'Individual', phone: '+251-917-890123', email: 'tigist@yahoo.com', address: 'Bole Atlas, Addis Ababa', projects: 1, totalValue: 195000, outstanding: 0 },
  { id: 'CUS-008', name: 'Addis Builders PLC', nameAm: 'አዲስ ገንቢዎች ኃ/የ/ማ', contact: 'Ato Henok Assefa', type: 'Contractor', phone: '+251-918-901234', email: 'henok@addisbuilders.com', address: 'Mexico, Addis Ababa', projects: 2, totalValue: 620000, outstanding: 85000 },
];

// ═══ SAMPLE QUOTES ═══
export const sampleQuotes: Quote[] = [
  { id: 'QT-001', customerId: 'CUS-004', customerName: 'Getahun Hotels PLC', projectName: 'Sarbet Hotel Renovation', items: 12, materialCost: 280000, laborCost: 85000, installCost: 45000, transportCost: 15000, subtotal: 425000, vat: 63750, total: 488750, status: 'Pending', date: '2025-02-20', validity: '2025-03-20' },
  { id: 'QT-002', customerId: 'CUS-001', customerName: 'Ayat Real Estate', projectName: 'Bole Tower B', items: 45, materialCost: 520000, laborCost: 150000, installCost: 80000, transportCost: 25000, subtotal: 775000, vat: 116250, total: 891250, status: 'Pending', date: '2025-02-18', validity: '2025-03-18' },
  { id: 'QT-003', customerId: 'CUS-008', customerName: 'Addis Builders PLC', projectName: 'Residential Complex G+5', items: 28, materialCost: 185000, laborCost: 55000, installCost: 35000, transportCost: 10000, subtotal: 285000, vat: 42750, total: 327750, status: 'Accepted', date: '2025-02-10', validity: '2025-03-10' },
  { id: 'QT-004', customerId: 'CUS-002', customerName: 'Ato Kebede Alemu', projectName: 'Villa Gate & Windows', items: 8, materialCost: 65000, laborCost: 18000, installCost: 12000, transportCost: 5000, subtotal: 100000, vat: 15000, total: 115000, status: 'Rejected', date: '2025-01-25', validity: '2025-02-25' },
  { id: 'QT-005', customerId: 'CUS-005', customerName: 'Noah Construction', projectName: 'CMC Phase 2 Block C', items: 35, materialCost: 320000, laborCost: 95000, installCost: 55000, transportCost: 18000, subtotal: 488000, vat: 73200, total: 561200, status: 'Accepted', date: '2025-02-05', validity: '2025-03-05' },
];

// ═══ SAMPLE WORK ORDERS ═══
export const sampleWorkOrders: WorkOrder[] = [
  { id: 'WO-001', projectId: 'PJ-001', productId: 'PRD-001', productName: 'Sliding Window 2-Panel', quantity: 48, completed: 22, assignee: 'Team Alpha', priority: 'High', stage: 'Assembly', progress: 46, startDate: '2025-02-10', dueDate: '2025-03-15' },
  { id: 'WO-002', projectId: 'PJ-001', productId: 'PRD-004', productName: 'Sliding Door 3-Panel', quantity: 12, completed: 5, assignee: 'Team Beta', priority: 'High', stage: 'Welding', progress: 42, startDate: '2025-02-12', dueDate: '2025-03-20' },
  { id: 'WO-003', projectId: 'PJ-002', productId: 'PRD-002', productName: 'Casement Window Single', quantity: 16, completed: 0, assignee: 'Team Alpha', priority: 'Medium', stage: 'Cutting', progress: 5, startDate: '2025-02-25', dueDate: '2025-04-01' },
  { id: 'WO-004', projectId: 'PJ-003', productId: 'PRD-007', productName: 'Curtain Wall System', quantity: 1, completed: 0, assignee: 'Team Gamma', priority: 'High', stage: 'Glazing', progress: 75, startDate: '2025-01-15', dueDate: '2025-03-01' },
  { id: 'WO-005', projectId: 'PJ-005', productId: 'PRD-001', productName: 'Sliding Window 2-Panel', quantity: 32, completed: 30, assignee: 'Team Beta', priority: 'Medium', stage: 'Quality Check', progress: 94, startDate: '2025-01-20', dueDate: '2025-02-28' },
  { id: 'WO-006', projectId: 'PJ-005', productId: 'PRD-005', productName: 'Hinged Door Double', quantity: 8, completed: 8, assignee: 'Team Alpha', priority: 'Low', stage: 'Packaging', progress: 100, startDate: '2025-02-01', dueDate: '2025-02-28' },
  { id: 'WO-007', projectId: 'PJ-003', productId: 'PRD-008', productName: 'Glass Handrail System', quantity: 6, completed: 4, assignee: 'Team Gamma', priority: 'High', stage: 'Assembly', progress: 67, startDate: '2025-02-05', dueDate: '2025-03-10' },
  { id: 'WO-008', projectId: 'PJ-001', productId: 'PRD-003', productName: 'Fixed Window Large', quantity: 24, completed: 10, assignee: 'Team Beta', priority: 'Medium', stage: 'Machining', progress: 42, startDate: '2025-02-15', dueDate: '2025-03-25' },
  { id: 'WO-009', projectId: 'PJ-006', productId: 'PRD-010', productName: 'Office Partition System', quantity: 4, completed: 0, assignee: 'Team Alpha', priority: 'Medium', stage: 'Cutting', progress: 0, startDate: '2025-03-01', dueDate: '2025-04-15' },
  { id: 'WO-010', projectId: 'PJ-002', productId: 'PRD-009', productName: 'Aluminum Louver Window', quantity: 6, completed: 0, assignee: 'Team Beta', priority: 'Low', stage: 'Cutting', progress: 0, startDate: '2025-03-05', dueDate: '2025-04-10' },
];

// ═══ SAMPLE INVOICES ═══
export const sampleInvoices: Invoice[] = [
  { id: 'INV-001', projectId: 'PJ-001', customerName: 'Ayat Real Estate', amount: 425000, paid: 425000, balance: 0, status: 'Paid', dueDate: '2025-02-15' },
  { id: 'INV-002', projectId: 'PJ-001', customerName: 'Ayat Real Estate', amount: 425000, paid: 0, balance: 425000, status: 'Overdue', dueDate: '2025-02-28' },
  { id: 'INV-003', projectId: 'PJ-002', customerName: 'Ato Kebede Alemu', amount: 142500, paid: 142500, balance: 0, status: 'Paid', dueDate: '2025-03-01' },
  { id: 'INV-004', projectId: 'PJ-003', customerName: 'Ethio Engineering', amount: 600000, paid: 600000, balance: 0, status: 'Paid', dueDate: '2025-01-30' },
  { id: 'INV-005', projectId: 'PJ-003', customerName: 'Ethio Engineering', amount: 300000, paid: 300000, balance: 0, status: 'Paid', dueDate: '2025-02-15' },
  { id: 'INV-006', projectId: 'PJ-003', customerName: 'Ethio Engineering', amount: 300000, paid: 150000, balance: 150000, status: 'Partial', dueDate: '2025-03-15' },
  { id: 'INV-007', projectId: 'PJ-005', customerName: 'Noah Construction', amount: 260000, paid: 260000, balance: 0, status: 'Paid', dueDate: '2025-01-10' },
  { id: 'INV-008', projectId: 'PJ-006', customerName: 'Commercial Bank Ethiopia', amount: 190000, paid: 190000, balance: 0, status: 'Paid', dueDate: '2025-03-10' },
];

// ═══ SAMPLE PAYMENTS ═══
export const samplePayments: Payment[] = [
  { id: 'PAY-001', invoiceId: 'INV-001', date: '2025-02-10', customerName: 'Ayat Real Estate', amount: 425000, method: 'Bank Transfer', reference: 'CBE-TXN-20250210-001' },
  { id: 'PAY-002', invoiceId: 'INV-003', date: '2025-02-25', customerName: 'Ato Kebede Alemu', amount: 142500, method: 'TeleBirr', reference: 'TB-20250225-4521' },
  { id: 'PAY-003', invoiceId: 'INV-004', date: '2025-01-28', customerName: 'Ethio Engineering', amount: 300000, method: 'Bank Transfer', reference: 'CBE-TXN-20250128-005' },
  { id: 'PAY-004', invoiceId: 'INV-004', date: '2025-01-30', customerName: 'Ethio Engineering', amount: 300000, method: 'Bank Transfer', reference: 'CBE-TXN-20250130-002' },
  { id: 'PAY-005', invoiceId: 'INV-005', date: '2025-02-14', customerName: 'Ethio Engineering', amount: 300000, method: 'Bank Transfer', reference: 'CBE-TXN-20250214-008' },
  { id: 'PAY-006', invoiceId: 'INV-006', date: '2025-03-01', customerName: 'Ethio Engineering', amount: 150000, method: 'Cheque', reference: 'CHQ-0045821' },
  { id: 'PAY-007', invoiceId: 'INV-007', date: '2025-01-05', customerName: 'Noah Construction', amount: 130000, method: 'Bank Transfer', reference: 'CBE-TXN-20250105-003' },
  { id: 'PAY-008', invoiceId: 'INV-007', date: '2025-01-10', customerName: 'Noah Construction', amount: 130000, method: 'Cash', reference: 'CASH-20250110-001' },
  { id: 'PAY-009', invoiceId: 'INV-008', date: '2025-03-05', customerName: 'Commercial Bank Ethiopia', amount: 190000, method: 'Bank Transfer', reference: 'CBE-TXN-20250305-010' },
  { id: 'PAY-010', invoiceId: 'INV-005', date: '2025-02-20', customerName: 'Noah Construction', amount: 65000, method: 'TeleBirr', reference: 'TB-20250220-7812' },
  { id: 'PAY-011', invoiceId: 'INV-001', date: '2025-02-12', customerName: 'Ayat Real Estate', amount: 200000, method: 'Cheque', reference: 'CHQ-0045799' },
  { id: 'PAY-012', invoiceId: 'INV-002', date: '2025-02-28', customerName: 'Getahun Hotels PLC', amount: 95000, method: 'Bank Transfer', reference: 'CBE-TXN-20250228-015' },
];

// ═══ SAMPLE EMPLOYEES ═══
export const sampleEmployees: Employee[] = [
  { id: 'EMP-001', name: 'Abebe Tekle', nameAm: 'አበበ ተክሌ', position: 'Production Manager', department: 'Production', email: 'abebe@aluerp.com', phone: '+251-911-111111', hireDate: '2020-03-15', status: 'active', salary: 35000, performance: 92 },
  { id: 'EMP-002', name: 'Hana Mulugeta', nameAm: 'ሃና ሙሉጌታ', position: 'Sales Manager', department: 'Sales', email: 'hana@aluerp.com', phone: '+251-912-222222', hireDate: '2021-06-01', status: 'active', salary: 28000, performance: 88 },
  { id: 'EMP-003', name: 'Yosef Bekele', nameAm: 'ዮሴፍ በቀለ', position: 'Lead Fabricator', department: 'Production', email: 'yosef@aluerp.com', phone: '+251-913-333333', hireDate: '2019-09-20', status: 'active', salary: 22000, performance: 95 },
  { id: 'EMP-004', name: 'Sara Desta', nameAm: 'ሳራ ደስታ', position: 'Accountant', department: 'Finance', email: 'sara@aluerp.com', phone: '+251-914-444444', hireDate: '2022-01-10', status: 'active', salary: 25000, performance: 85 },
  { id: 'EMP-005', name: 'Dawit Hailu', nameAm: 'ዳዊት ኃይሉ', position: 'Installation Lead', department: 'Installation', email: 'dawit@aluerp.com', phone: '+251-915-555555', hireDate: '2020-08-05', status: 'active', salary: 20000, performance: 90 },
  { id: 'EMP-006', name: 'Marta Teshome', nameAm: 'ማርታ ተሾመ', position: 'Quality Inspector', department: 'Quality', email: 'marta@aluerp.com', phone: '+251-916-666666', hireDate: '2023-02-15', status: 'on-leave', salary: 18000, performance: 87 },
];

// ═══ SAMPLE SUPPLIERS ═══
export const sampleSuppliers: Supplier[] = [
  { id: 'SUP-001', company: 'Emirates Aluminum (EMAL)', contact: 'Ahmed Al-Rashid', phone: '+971-50-1234567', email: 'ahmed@emal.ae', country: 'UAE', leadTime: 45, rating: 5, preferred: true, paymentTerms: 'LC 90 Days', certifications: ['ISO 9001', 'ISO 14001'] },
  { id: 'SUP-002', company: 'China Zhongwang Holdings', contact: 'Li Wei', phone: '+86-139-1234567', email: 'liwei@zhongwang.com', country: 'China', leadTime: 60, rating: 4, preferred: true, paymentTerms: 'TT 30%/70%', certifications: ['ISO 9001'] },
  { id: 'SUP-003', company: 'Schüco International', contact: 'Hans Mueller', phone: '+49-170-1234567', email: 'mueller@schueco.com', country: 'Germany', leadTime: 75, rating: 5, preferred: false, paymentTerms: 'LC 60 Days', certifications: ['ISO 9001', 'ISO 14001', 'CE'] },
  { id: 'SUP-004', company: 'Addis Glass Factory', contact: 'Ato Tewodros Mengistu', phone: '+251-911-987654', email: 'tewodros@addisglass.com', country: 'Ethiopia', leadTime: 7, rating: 4, preferred: true, paymentTerms: 'Net 30', certifications: ['ES ISO'] },
  { id: 'SUP-005', company: 'Guangzhou Hardware Co.', contact: 'Chen Xiao', phone: '+86-135-9876543', email: 'chen@gzhardware.com', country: 'China', leadTime: 55, rating: 3, preferred: false, paymentTerms: 'TT 50%/50%', certifications: ['ISO 9001'] },
];

// ═══ SAMPLE INSTALLATIONS ═══
export const sampleInstallations: Installation[] = [
  { id: 'INST-001', projectId: 'PJ-003', projectName: 'Megenagna Office Complex', customerName: 'Ethio Engineering', address: 'Megenagna, Addis Ababa', scheduledDate: '2025-02-28', team: 'Install Team A', status: 'In Progress', notes: 'Curtain wall floor 5-8 ongoing', notesAm: 'ከርተን ወል ወለል 5-8 በሂደት ላይ' },
  { id: 'INST-002', projectId: 'PJ-005', projectName: 'CMC Residential Block', customerName: 'Noah Construction', address: 'CMC, Addis Ababa', scheduledDate: '2025-03-01', team: 'Install Team B', status: 'Scheduled', notes: 'Windows Block A, floors 1-3', notesAm: 'መስኮቶች ብሎክ ሀ ወለል 1-3' },
  { id: 'INST-003', projectId: 'PJ-001', projectName: 'Bole Apartments Tower A', customerName: 'Ayat Real Estate', address: 'Bole, Addis Ababa', scheduledDate: '2025-03-15', team: 'Install Team A', status: 'Scheduled', notes: 'Pending production completion', notesAm: 'የምርት ማጠናቀቂያ በመጠባበቅ ላይ' },
];

// ═══ SAMPLE MAINTENANCE TASKS ═══
export const sampleMaintenanceTasks: MaintenanceTask[] = [
  { id: 'MT-001', machineId: 'M-001', machineName: 'Double Head Cutting Machine', type: 'Preventive', scheduledDate: '2025-03-01', status: 'Scheduled', assignee: 'Yosef Bekele', notes: 'Blade replacement and calibration' },
  { id: 'MT-002', machineId: 'M-002', machineName: 'CNC Copy Router', type: 'Corrective', scheduledDate: '2025-02-27', status: 'Overdue', assignee: 'Abebe Tekle', notes: 'Motor bearing replacement needed' },
  { id: 'MT-003', machineId: 'M-003', machineName: 'Crimping Machine', type: 'Preventive', scheduledDate: '2025-03-05', status: 'Scheduled', assignee: 'Yosef Bekele', notes: 'Regular maintenance check' },
  { id: 'MT-004', machineId: 'M-004', machineName: 'Glass Cutting Table', type: 'Predictive', scheduledDate: '2025-03-10', status: 'Scheduled', assignee: 'Dawit Hailu', notes: 'Sensor indicates wear on cutting wheel' },
];

// ═══ SAMPLE QUALITY CHECKS ═══
export const sampleQualityChecks: QualityCheck[] = [
  { id: 'QC-001', workOrderId: 'WO-005', productName: 'Sliding Window 2-Panel', inspector: 'Marta Teshome', date: '2025-02-25', result: 'Pass', defects: [], notes: 'All specs within tolerance' },
  { id: 'QC-002', workOrderId: 'WO-001', productName: 'Sliding Window 2-Panel', inspector: 'Marta Teshome', date: '2025-02-26', result: 'Conditional', defects: ['Minor scratch on frame'], notes: 'Touch-up required before packaging' },
  { id: 'QC-003', workOrderId: 'WO-004', productName: 'Curtain Wall System', inspector: 'Abebe Tekle', date: '2025-02-27', result: 'Pass', defects: [], notes: 'Pressure test passed' },
  { id: 'QC-004', workOrderId: 'WO-002', productName: 'Sliding Door 3-Panel', inspector: 'Marta Teshome', date: '2025-02-26', result: 'Fail', defects: ['Welding defect', 'Alignment off by 2mm'], notes: 'Rework required' },
];

// ═══ SAMPLE ACTIVITIES ═══
export const sampleActivities: Activity[] = [
  { id: '1', type: 'production', message: 'Work Order WO-005 quality check passed', messageAm: 'የሥራ ትዕዛዝ WO-005 ጥራት ምርመራ አልፏል', time: '10 min ago' },
  { id: '2', type: 'alert', message: 'Steel Angle 40x40mm critically low (8 remaining)', messageAm: 'ብረት አንግል 40x40ሚሜ በጣም ዝቅ (8 ቀሪ)', time: '25 min ago' },
  { id: '3', type: 'stock', message: '200m Window Frame Profile received', messageAm: '200ሜ የመስኮት ፍሬም ፕሮፋይል ተቀብሏል', time: '1 hour ago' },
  { id: '4', type: 'quote', message: 'Quote QT-001 sent to Getahun Hotels', messageAm: 'ዋጋ ግምት QT-001 ለጌታሁን ሆቴሎች ተልኳል', time: '2 hours ago' },
  { id: '5', type: 'install', message: 'Installation INST-001 started at Megenagna', messageAm: 'ማስገጠም INST-001 በመገናኛ ተጀምሯል', time: '3 hours ago' },
  { id: '6', type: 'order', message: 'PJ-006 deposit received from CBE', messageAm: 'PJ-006 ቅድመ ክፍያ ከንግድ ባንክ ተቀብሏል', time: '4 hours ago' },
  { id: '7', type: 'production', message: 'WO-006 completed - 8 Hinged Doors packaged', messageAm: 'WO-006 ተጠናቋል - 8 የሚከፈት በሮች ተጠቅልለዋል', time: '5 hours ago' },
  { id: '8', type: 'alert', message: 'Maintenance overdue: CNC Copy Router', messageAm: 'ጥገና ያለፈው ጊዜ: CNC ኮፒ ራውተር', time: '6 hours ago' },
];

// ═══ CHART DATA ═══
export const revenueTargetData = [
  { month: 'Sep', revenue: 680000, target: 750000 },
  { month: 'Oct', revenue: 820000, target: 750000 },
  { month: 'Nov', revenue: 710000, target: 800000 },
  { month: 'Dec', revenue: 950000, target: 800000 },
  { month: 'Jan', revenue: 780000, target: 850000 },
  { month: 'Feb', revenue: 890000, target: 850000 },
];

export const projectsByTypeData = [
  { name: 'Residential', value: 35, fill: 'hsl(212, 72%, 42%)' },
  { name: 'Commercial', value: 65, fill: 'hsl(38, 92%, 50%)' },
];

export const salesTrendData = revenueTargetData;
export const topProductsData = sampleProducts.slice(0, 5).map(p => ({ name: p.name.substring(0, 20), sales: p.sellingPrice * (Math.floor(Math.random() * 10) + 5) }));
export const inventoryByAlloyData = [
  { name: 'Profiles', value: 35, fill: 'hsl(212, 72%, 42%)' },
  { name: 'Glass', value: 25, fill: 'hsl(38, 92%, 50%)' },
  { name: 'Hardware', value: 20, fill: 'hsl(142, 72%, 40%)' },
  { name: 'Accessories', value: 15, fill: 'hsl(280, 60%, 50%)' },
  { name: 'Steel', value: 5, fill: 'hsl(0, 72%, 51%)' },
];
