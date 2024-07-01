import { Input, Button } from "@/components";
import { useBanana } from "@/hooks/useBanana";
import { AllowanceSchema } from "@/schemas";
import { AllowanceFormData } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Banana } from "lucide-react";
import { useForm } from "react-hook-form";
import { formatUnits } from "viem";
export function Allowance() {
  const { balance, approveBananas, contract } = useBanana();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<AllowanceFormData>({
    resolver: zodResolver(AllowanceSchema),
  });
  const onSubmit = (allowanceData: AllowanceFormData) => {
    if (balance?.data === undefined) {
      return;
    }

    console.log(formatUnits(balance.data.value, 18));
    approveBananas(allowanceData);
  };
  const onInvalidData = (data: any) => console.log(data);
  return (
    <section className="flex flex-col gap-8 text-3xl justify-center items-center flex-grow mt-4">
      <div className="flex gap-4">
        Allow other wallets to spend your
        <span className="flex gap-2 items-center">
          $BANANA <Banana />
        </span>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit, onInvalidData)}
        className="flex flex-col flex-grow gap-3 max-w-[20rem] w-full"
      >
        <div className="flex flex-col gap-1">
          {errors.wallet_address && (
            <span className="text-sm text-red-500">
              {errors.wallet_address.message}
            </span>
          )}
          <Input
            {...register("wallet_address")}
            className="w-full"
            type="text"
            placeholder="wallet address"
          />
        </div>
        <div className="flex flex-col gap-1">
          {errors.value && (
            <span className="text-sm text-red-500">{errors.value.message}</span>
          )}
          <Input
            {...register("value", { valueAsNumber: true })}
            className="w-full"
            type="number"
            placeholder="amount"
          />
        </div>
        <Button
          className="bg-yellow-400  hover:bg-yellow-400/75 flex gap-2 text-xl text-white py-6 justify-center items-center w-full"
          type="submit"
        >
          Submit
        </Button>
        {contract.isPending && "Pending"}
      </form>
    </section>
  );
}
