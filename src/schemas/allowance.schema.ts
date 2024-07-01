import { AllowanceFormData } from "@/types";
import { ZodType, z } from "zod";

export const AllowanceSchema: ZodType<AllowanceFormData> = z
  .object({
    wallet_address: z
      .string()
      .includes("0x", { message: "Invalid address value" })
      .min(10),
    value: z.number({ invalid_type_error: "Enter a number" }),
  })
  .required();
