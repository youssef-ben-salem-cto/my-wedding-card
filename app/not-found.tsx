import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f0f6fc] text-[#0f2742] p-4 text-center">
      <h2 className="text-3xl font-bold mb-3">الصفحة غير موجودة</h2>
      <p className="text-sm text-[#627d98] mb-6">عذراً، الصفحة التي تبحث عنها غير متوفرة.</p>
      <Link
        href="/"
        className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#b8860b] to-[#d4af37] text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all"
      >
        العودة إلى بطاقة الدعوة
      </Link>
    </div>
  );
}
