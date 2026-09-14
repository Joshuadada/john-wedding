export interface RSVPData {
  id?: string;
  fullName: string;
  email?: string;
  phone: string;
  attending: 'yes' | 'no' | 'maybe';
  guestCount: number;
  dietary?: string;
  note?: string;
  timestamp?: string;
}

export interface WishMessage {
  id: string;
  name: string;
  relationship: 'Bride\'s Friend/Family' | 'Groom\'s Friend/Family' | 'Mutual Friend' | 'Church Family (CDM)' | 'Well Wisher';
  message: string;
  timestamp: string;
  likes?: number;
}

export interface PhotoItem {
  id: string;
  url: string;
  title: string;
  category: 'proposal' | 'moments' | 'ring' | 'embrace' | 'artwork';
  caption: string;
  aspectRatio: 'vertical' | 'horizontal' | 'square';
}

export interface BankAccount {
  bankName: string;
  accountNumber: string;
  accountName: string;
  currency: string;
  bankCode?: string;
  notes?: string;
}
