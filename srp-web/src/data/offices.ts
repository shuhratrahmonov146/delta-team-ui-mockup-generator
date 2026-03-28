export interface Office {
  country: string;
  city: string;
  address: string;
  phone: string;
  flag: string;
}

export const offices: Office[] = [
  {
    country: "USA",
    city: "Virginia",
    address: "5034 Trissels Road Broadway, VA 22815",
    phone: "+1 717 742 0098",
    flag: "us",
  },
  {
    country: "UK",
    city: "Gosport",
    address: "69A San Diego Road, Gosport, England, PO12 4QS",
    phone: "+44 7925 096139",
    flag: "gb",
  },
  {
    country: "Tajikistan",
    city: "Sughd Region",
    address: "6G89+3G Dehmoy, Tajikistan",
    phone: "+992 55 166 00 01",
    flag: "tj",
  },
  {
    country: "Uzbekistan",
    city: "Fergana",
    address: "9Q8F+5Q2 Fergana, Uzbekistan",
    phone: "+998 94 730 44 77",
    flag: "uz",
  },
];
