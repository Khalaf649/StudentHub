export interface CreateCenterDTO {
  name: string;
  location: string;
  phone: string;
}

export interface UpdateCenterDTO {
  name?: string;
  location?: string;
  phone?: string;
}

export interface getCenterDTO extends CreateCenterDTO {
  id: number;
}

export interface GetCenterNameOnlyDTO {
  id: number;
  name: string;
}
