import React from "react";
import { getPasswordStrength } from "@/src/utils/validators";

type PasswordStrengthMeterProps = {
  password: string;
};

export const PasswordStrengthMeter = ({ password }: PasswordStrengthMeterProps) => {
  const { percent, label, labelClass } = getPasswordStrength(password);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/60">
        <span>Password Strength</span>
        <span className={labelClass}>{label}</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-none bg-slate-200">
        <div
          className="h-full bg-gradient-to-r from-red-500 via-amber-500 to-emerald-500 transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
};
