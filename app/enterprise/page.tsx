export default function EnterprisePage() {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center sm:px-8">
      <div className="max-w-2xl space-y-6">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Enterprise program
        </h1>
        <p className="text-base text-muted-foreground sm:text-lg">
          We&apos;re reshaping our enterprise experience right now. If your team
          would like to be notified when the new program opens, drop us a note at
          <a href="mailto:enterprise@gamistar.com" className="ml-1 font-medium text-primary underline">
            enterprise@gamistar.com
          </a>
          .
        </p>
      </div>
    </section>
  );
}
