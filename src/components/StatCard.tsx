import React from "react";
import { ArrowDownRight, ArrowUpRight, LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change: number | string;
  icon: LucideIcon;
  isLive?: Boolean;
  up?: Boolean;
}

export function StatCard({
  title,
  value,
  change,
  up,
  icon: Icon,
  isLive,
}: StatCardProps) {
  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="flex items-center gap-4 text-gray-400">
            {title}
            {isLive && (
              <span className="flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
            )}{" "}
          </p>
          <p className="text-2xl font-semibold text-white mt-1">{value}</p>
        </div>
        <Icon className="w-8 h-8 text-purple-400" />
      </div>
      <div
        className={`flex items-center gap-1 mt-2 ${
          up ? " text-green-400 " : " text-red-400 "
        } `}
      >
        {up ? (
          <ArrowUpRight className="w-4 h-4" />
        ) : (
          <ArrowDownRight className="w-4 h-4" />
        )}
        <span>{Math.abs(+change) + "%" || "__"}</span>
      </div>
    </div>
  );
}
