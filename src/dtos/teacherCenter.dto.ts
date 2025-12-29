export interface CreateCenterDTO {
  name: string;
  location: string;
  phone: string;
}
export interface getCenterDTO extends CreateCenterDTO {
  id: number;
}
