import { ZodType, z } from "zod";

export type AllowanceFormData = {
  wallet_address: string;
  value: number;
};
