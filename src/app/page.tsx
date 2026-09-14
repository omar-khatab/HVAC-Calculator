import BTUCalculator from "@/app/components/BTUCalculator";
import DuctSizer from "@/app/components/DuctSizer";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full max-w-3xl items-center justify-between py-32 px-16 bg-white dark:bg-black flex-wrap gap-2">
        <BTUCalculator/>
        <DuctSizer/>
      </main>
    </div>
  );
}
