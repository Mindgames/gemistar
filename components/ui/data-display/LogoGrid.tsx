import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { cn } from '@/lib/utils';
import { platformLogos } from './platform-logos';

interface LogoGridProps {
  className?: string;
}

export function LogoGrid({ className }: LogoGridProps = {}) {
  return (
    <section data-logo-grid className={cn('w-full bg-transparent', className)}>
      <div className="container mx-auto flex w-full flex-col items-center gap-5 px-4 py-0 sm:px-6 md:px-10">
        <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
          {platformLogos.map((logo) => (
            <div
              key={logo.name}
              className="flex aspect-square w-full items-center justify-center text-sm font-semibold uppercase tracking-[0.08em] text-white"
            >
              <div className="flex flex-col items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center text-white/80">
                  <FontAwesomeIcon
                    icon={logo.icon}
                    className="text-xl"
                    style={logo.iconScale ? { transform: `scale(${logo.iconScale})` } : undefined}
                  />
                </span>
                <span className="text-white/90">{logo.shortName ?? logo.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
