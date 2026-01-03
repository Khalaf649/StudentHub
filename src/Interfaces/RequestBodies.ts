export interface CreateParentRequestBody {
  name: string;
  phone: string;
  relationship: "father" | "mother" | "guardian";
}
export interface LoginRequestBody {
  email: string;
  password: string;
  role: string;
}
