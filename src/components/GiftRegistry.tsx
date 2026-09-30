import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Landmark, Copy, Check, ExternalLink, Sparkles, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import type { BankAccount } from '../types/wedding';

export const GiftRegistry: React.FC = () => {
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);

  const bankAccounts: BankAccount[] = [
    {
      bankName: 'Sterling Bank',
      accountNumber: '0071595240',
      accountName: 'Ezeukwu John Tochukwu',
      currency: 'NGN (Naira)',
      notes: 'Sterling Bank Account',
    },
    {
      bankName: 'Palmpay',
      accountNumber: '7045037383',
      accountName: 'Ezeukwu John Tochukwu',
      currency: 'NGN (Naira)',
      notes: 'Palmpay Account',
    },
  ];

  const handleCopy = (accNumber: string) => {
    navigator.clipboard.writeText(accNumber);
    setCopiedAccount(accNumber);
    confetti({
      particleCount: 40,
      spread: 50,
      origin: { y: 0.7 },
      colors: ['#C85A17', '#F97316', '#FFFDF9'],
    });

    setTimeout(() => {
      setCopiedAccount(null);
    }, 3000);
  };

  return (
    <section id="registry" className="py-24 px-4 bg-[#FDFBF7] relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#C85A17] bg-[#C85A17]/10 px-4 py-1.5 rounded-full inline-block mb-3">
            Bless The Couple
          </span>
          <h2 className="font-display text-4xl sm:text-5xl text-[#1F130E] font-normal tracking-tight">
            Gift Registry &amp; Financial Blessings
          </h2>
          <div className="w-16 h-0.5 bg-[#C85A17] mx-auto my-4" />
          <p className="font-serif italic text-lg text-stone-600">
            "Your prayers, presence, and love are the greatest gifts of all. Should you wish to honor us with a gift or financial blessing, we are deeply grateful."
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
          {/* Online Registry Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-[#3B1F14] text-white rounded-3xl p-8 border border-[#C85A17]/40 shadow-2xl flex flex-col justify-between relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10 text-white pointer-events-none group-hover:scale-110 transition-transform">
              <CreditCard className="w-32 h-32" />
            </div>

            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C85A17]/30 text-[#F97316] text-xs font-semibold uppercase tracking-wider mb-4 border border-[#C85A17]/40">
                <Sparkles className="w-3.5 h-3.5" />
                WithJoy Online Registry
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-semibold text-white mb-3">
                Online Registry
              </h3>

              <p className="text-stone-300 text-sm leading-relaxed mb-6 font-light">
                Send your monetary gift or select from our official wedding registry securely online via WithJoy.
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-white/10">
              <a
                href="https://withjoy.com/john-and-esther-nov-2026"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-6 rounded-2xl bg-[#C85A17] hover:bg-[#A3430B] text-white text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl hover:shadow-[#C85A17]/30"
              >
                <CreditCard className="w-4 h-4" />
                Visit WithJoy Registry
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <div className="flex items-center justify-center gap-2 text-[11px] text-stone-400">
                <ShieldCheck className="w-3.5 h-3.5 text-[#25D366]" />
                <span>withjoy.com/john-and-esther-nov-2026</span>
              </div>
            </div>
          </motion.div>

          {/* Direct Bank Transfer Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-[#F8F4EE] rounded-3xl p-6 sm:p-8 border border-[#E5D9CE] shadow-xl flex flex-col justify-between relative overflow-hidden group hover:border-[#C85A17] transition-all"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 text-[#3B1F14] pointer-events-none group-hover:scale-110 transition-transform">
              <Landmark className="w-32 h-32" />
            </div>

            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C85A17]/10 text-[#C85A17] text-xs font-semibold uppercase tracking-wider mb-4 border border-[#C85A17]/20">
                <Landmark className="w-3.5 h-3.5" />
                Direct Bank Deposit
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#1F130E] mb-2">
                Bank Account Details
              </h3>

              <p className="text-stone-600 text-sm leading-relaxed mb-6 font-light">
                Direct bank transfer details for cash gifts. Tap the copy button to copy any account number instantly.
              </p>

              {/* Direct Account Cards */}
              <div className="space-y-4">
                {bankAccounts.map((account) => (
                  <div
                    key={account.accountNumber}
                    className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E5D9CE] relative group/acc hover:border-[#C85A17] transition-all shadow-sm hover:shadow-md"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#C85A17]">
                        {account.bankName}
                      </span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[#F8F4EE] text-stone-600 border border-[#E5D9CE]">
                        {account.currency}
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                      <div>
                        <p className="font-mono text-xl sm:text-2xl font-bold text-[#1F130E] tracking-wider">
                          {account.accountNumber}
                        </p>
                        <p className="text-xs text-stone-600 font-medium mt-0.5">
                          {account.accountName}
                        </p>
                      </div>

                      <button
                        onClick={() => handleCopy(account.accountNumber)}
                        className={`px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 text-xs font-semibold transition-all shrink-0 ${
                          copiedAccount === account.accountNumber
                            ? 'bg-[#25D366] text-white shadow-md scale-105'
                            : 'bg-[#3B1F14] text-white hover:bg-[#C85A17] shadow-sm'
                        }`}
                      >
                        {copiedAccount === account.accountNumber ? (
                          <>
                            <Check className="w-4 h-4" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            <span>Copy Number</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-center text-[11px] text-stone-400 mt-6 font-medium">
              ✨ Copied account numbers can be pasted into any banking app.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

