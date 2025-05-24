
export interface Chip {
  id: string;
  model: string;
  description: string;
  manufacturer: string;
  datasheetUrl?: string;
  imageUrl?: string;
  lifecycleStatus?: 'Active' | 'EOL' | 'NRND' | 'Preliminary' | 'Obsolete'; // Not Recommended for New Designs
  packageTypes?: string[];
  distributors?: { name: string; url: string }[];
  parameters?: Record<string, string | number | undefined>; // Allow undefined for flexibility
  tags?: string[];
  // New fields for advanced filtering
  category?: string; // e.g., "MCU > 32-bit MCU", "Power Management > LDO"
  rohsCompliant?: boolean;
  lowPower?: boolean;
  internalOscillator?: boolean;
  automotiveGrade?: boolean; // Can also be a tag, but explicit field is clearer for filtering
  // Fields for new list item display
  applications?: string[];
  series?: boolean; // To indicate if it's part of a "series" and show badge
}

export interface AlternativeChip extends Chip {
  alternativeLevel: 'Direct Drop-in' | 'Similar Functionality' | 'Potential Alternative';
  keyDifferences?: string[];
  similarityScore?: number; // 0-1
}

