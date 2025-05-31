export interface CategoryItem {
  name: string;
  selected: boolean;
}

export type CategoryName =
  | "Movies"
  | "TV Shows"
  | "Countries"
  | "Capital Cities"
  | "Animals"
  | "Sports";

export type Categories = {
  [key in CategoryName]: CategoryItem[];
};

export interface Data {
  categories: Categories;
}
