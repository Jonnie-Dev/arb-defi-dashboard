import React from 'react';
import { ArrowUpRight, LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
}

export function StatCard({ title, value, change, icon: Icon }: StatCardProps) {
  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400">{title}</p>
          <p className="text-2xl font-semibold text-white mt-1">{value}</p>
        </div>
        <Icon className="w-8 h-8 text-purple-400" />
      </div>
      <div className="flex items-center gap-1 mt-2 text-green-400">
        <ArrowUpRight className="w-4 h-4" />
        <span>{change}</span>
      </div>
    </div>
  );
}