"use client";

import React, { useState, useEffect } from 'react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  PieChart, 
  Pie, 
  Cell, 
  Legend 
} from 'recharts';
import { TrendingUp, ArrowDownRight, ArrowUpRight, DollarSign } from 'lucide-react';
import { useOS } from '../os/OSProvider';

interface Expense {
  category: string;
  amount: number;
  month: string;
}

interface Earning {
  source: string;
  amount: number;
  month: string;
}

export const FinanceWidget: React.FC = () => {
  const { accentColor } = useOS();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [earnings, setEarnings] = useState<Earning[]>([]);
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
    
    Promise.all([
      fetch('/api/admin?module=expenses').then(r => r.json()),
      fetch('/api/admin?module=earnings').then(r => r.json())
    ])
      .then(([expData, earnData]) => {
        setExpenses(expData);
        setEarnings(earnData);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // filter data for latest month (June 2026)
  const targetMonth = "2026-06";
  const monthlyExpenses = expenses.filter(e => e.month === targetMonth);
  const monthlyEarnings = earnings.filter(e => e.month === targetMonth);

  const totalExpenses = monthlyExpenses.reduce((acc, curr) => acc + curr.amount, 0);
  const totalEarnings = monthlyEarnings.reduce((acc, curr) => acc + curr.amount, 0);
  const netSavings = totalEarnings - totalExpenses;

  // 1. Data formatting for Pie Chart (Expense category breakdown)
  const pieData = monthlyExpenses.map(item => ({
    name: item.category,
    value: item.amount
  }));

  const COLORS = ['#00f0ff', '#bd00ff', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#6366f1', '#ec4899'];

  // 2. Data formatting for Bar Chart (Earning sources)
  const barData = monthlyEarnings.map(item => ({
    name: item.source,
    amount: item.amount
  }));

  // 3. Historical data comparison (May vs June)
  const getMonthTotal = (month: string) => {
    const exp = expenses.filter(e => e.month === month).reduce((a, c) => a + c.amount, 0);
    const earn = earnings.filter(e => e.month === month).reduce((a, c) => a + c.amount, 0);
    return { month, expenses: exp, earnings: earn };
  };

  const comparisonData = [
    getMonthTotal("2026-05"),
    getMonthTotal("2026-06")
  ];

  if (!mounted) return null;

  return (
    <div className="space-y-6 text-slate-300">
      {/* Header Overview stats */}
      <div className="flex flex-wrap justify-between items-baseline gap-2">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase font-semibold">FINANCIAL LEDGER</span>
          <h2 className="text-xl font-bold text-white mt-0.5">Finance Dashboard</h2>
        </div>
        <span className="text-[9px] font-mono text-slate-400 bg-white/5 border border-white/5 px-2.5 py-1 rounded">
          LEDGER ACTIVE: {targetMonth}
        </span>
      </div>

      {loading ? (
        <div className="text-center py-20 text-xs font-mono text-slate-500">
          Reconciling finance records...
        </div>
      ) : (
        <>
          {/* Stats Cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/[0.04] flex items-center justify-between">
              <div>
                <span className="text-[8px] font-mono text-slate-500 uppercase">MONTHLY INCOME</span>
                <p className="text-lg font-bold text-white mt-0.5">₹{totalEarnings.toLocaleString('en-IN')}</p>
              </div>
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/[0.04] flex items-center justify-between">
              <div>
                <span className="text-[8px] font-mono text-slate-500 uppercase">MONTHLY OUTFLOWS</span>
                <p className="text-lg font-bold text-white mt-0.5">₹{totalExpenses.toLocaleString('en-IN')}</p>
              </div>
              <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
                <ArrowDownRight className="w-4 h-4" />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/[0.04] flex items-center justify-between">
              <div>
                <span className="text-[8px] font-mono text-slate-500 uppercase">NET CASH FLOW</span>
                <p className="text-lg font-bold mt-0.5 text-cyan-400">₹{netSavings.toLocaleString('en-IN')}</p>
              </div>
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Charts grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left: Expenses Categories breakdown */}
            <div className="p-4 rounded-xl bg-black/35 border border-white/[0.04] flex flex-col justify-between">
              <h3 className="text-xs font-mono text-slate-300 uppercase mb-3 flex items-center">
                <DollarSign className="w-3.5 h-3.5 text-cyan-400 mr-1.5" /> Outflow Categories
              </h3>
              <div className="h-[200px] w-full flex items-center justify-center">
                {pieData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={75}
                        paddingAngle={4}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#0d0d12', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', fontSize: '10px', fontFamily: 'monospace' }}
                      />
                      <Legend 
                        iconType="circle" 
                        layout="horizontal" 
                        verticalAlign="bottom" 
                        align="center"
                        wrapperStyle={{ fontSize: '9px', fontFamily: 'monospace', marginTop: '10px' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <span className="text-[10px] font-mono text-slate-500">No categories logged.</span>
                )}
              </div>
            </div>

            {/* Right: Income Sources or Month Comparison */}
            <div className="p-4 rounded-xl bg-black/35 border border-white/[0.04] flex flex-col justify-between">
              <h3 className="text-xs font-mono text-slate-300 uppercase mb-3">Historical Comparison</h3>
              <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={comparisonData}>
                    <XAxis 
                      dataKey="month" 
                      stroke="#475569" 
                      fontSize={9} 
                      tickLine={false} 
                      fontFamily="monospace"
                    />
                    <YAxis 
                      stroke="#475569" 
                      fontSize={9} 
                      tickLine={false} 
                      axisLine={false} 
                      fontFamily="monospace"
                    />
                    <Tooltip 
                      cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                      contentStyle={{ backgroundColor: '#0d0d12', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', fontSize: '10px', fontFamily: 'monospace' }}
                    />
                    <Bar dataKey="earnings" name="Earnings" fill="#10b981" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="expenses" name="Expenses" fill="#ef4444" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
