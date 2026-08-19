interface ListingAttribute {
  id: string;
  createdAt: string;
  updatedAt: string;
  listingId: string;
  attributeId: string;
  value: string;
}

interface Address {
  state: string;
}

interface Category {
  industry: string;
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  description: string;
  imageUrl: string;
  secondaryImageUrl: string;
  slug: string;
  order: number;
  isHidden: boolean;
  parentCategoryId: string;
}

interface ListingImage {
  id: string;
  order: number;
  url: string;
}


interface Listing {
  status: string; // Probable ENUM
  tags: string[];
  deliveryMethod: string; // Probable ENUM
  id: string;
  secondaryId: number;
  createdAt: string;
  updatedAt: string;
  listingTitle: string;
  sellingPrice: number;
  estimatedPriceMin: number | null;
  estimatedPriceMax: number | null;
  appraisedPrice: number | null;
  categories: unknown[]; // empty array in sample; adjust type once shape is known
  itemBrand: string;
  listingDescription: string;
  itemAge: number;
  itemLength: number;
  itemWidth: number;
  itemHeight: number;
  itemWeight: number;
  isAuction: boolean;
  startDate: string | null;
  expirationDate: string | null;
  categoryId: string;
  isPickupAvailable: boolean;
  userId: string;
  organizationId: string;
  addressId: string;
  ListingAttribute: ListingAttribute[];
  address: Address;
  category: Category;
  listingImages: ListingImage[];
}