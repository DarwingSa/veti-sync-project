import Image from 'next/image';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-white dark:bg-slate-900 relative">
      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      {/* Left Side - Image & Testimonial */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/20 to-blue-600/40 mix-blend-overlay z-10" />
        <Image
          src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2068&auto=format&fit=crop"
          alt="Veterinary Clinic"
          fill
          className="object-cover opacity-60"
          priority
        />

        <div className="relative z-20 flex flex-col justify-end h-full p-16 text-white">
          <div className="mb-8">
            <div className="flex gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <blockquote className="text-2xl font-medium leading-relaxed mb-6">
              &quot;VetiSync ha transformado completamente la gestión de mi clínica. Ahora puedo enfocarme en lo que realmente importa: mis pacientes.&quot;
            </blockquote>
            <div>
              <p className="font-bold text-lg">Dr. Sarah Wilson</p>
              <p className="text-slate-300">Directora Médica, PetCare Center</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
}
