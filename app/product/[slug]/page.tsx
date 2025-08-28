import Html from '@/components/Html';

export default function BuyPage() {
  const html = `
<div
  class="relative flex size-full min-h-screen flex-col bg-[#f8f9fc] justify-between group/design-root overflow-x-hidden"
  style="--radio-dot-svg: url('data:image/svg+xml,%3csvg viewBox=%270 0 16 16%27 fill=%27rgb(8,28,68)%27 xmlns=%27http://www.w3.org/2000/svg%27%3e%3ccircle cx=%278%27 cy=%278%27 r=%273%27/%3e%3c/svg%3e'); font-family: Inter, &quot;Noto Sans&quot;, sans-serif;"
>
  <div>
    <div class="flex absolute top-0 left-0 h-full w-full flex-col justify-end items-stretch bg-[#141414]/40">
      <div class="flex flex-col items-stretch bg-[#f8f9fc]">
        <button class="flex h-5 w-full items-center justify-center"><div class="h-1 w-9 rounded-full bg-[#d0d7e7]"></div></button>
        <div class="flex-1">
          <h1 class="text-[#0e121b] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 text-left pb-3 pt-5">Seleziona il Tuo Pacchetto</h1>
          <div class="flex flex-col gap-3 p-4">
            <label class="flex items-center gap-4 rounded-xl border border-solid border-[#d0d7e7] p-[15px] flex-row-reverse">
              <input
                type="radio"
                class="h-5 w-5 border-2 border-[#d0d7e7] bg-transparent text-transparent checked:border-[#081c44] checked:bg-[image:--radio-dot-svg] focus:outline-none focus:ring-0 focus:ring-offset-0 checked:focus:border-[#081c44]"
                name="pack"
                checked=""
              />
              <div class="flex grow flex-col">
                <p class="text-[#0e121b] text-sm font-medium leading-normal">Base</p>
                <p class="text-[#4e6797] text-sm font-normal leading-normal">1 attivazione</p>
              </div>
            </label>
            <label class="flex items-center gap-4 rounded-xl border border-solid border-[#d0d7e7] p-[15px] flex-row-reverse">
              <input
                type="radio"
                class="h-5 w-5 border-2 border-[#d0d7e7] bg-transparent text-transparent checked:border-[#081c44] checked:bg-[image:--radio-dot-svg] focus:outline-none focus:ring-0 focus:ring-offset-0 checked:focus:border-[#081c44]"
                name="pack"
              />
              <div class="flex grow flex-col">
                <p class="text-[#0e121b] text-sm font-medium leading-normal">Smart</p>
                <p class="text-[#4e6797] text-sm font-normal leading-normal">3 attivazioni</p>
              </div>
            </label>
            <label class="flex items-center gap-4 rounded-xl border border-solid border-[#d0d7e7] p-[15px] flex-row-reverse">
              <input
                type="radio"
                class="h-5 w-5 border-2 border-[#d0d7e7] bg-transparent text-transparent checked:border-[#081c44] checked:bg-[image:--radio-dot-svg] focus:outline-none focus:ring-0 focus:ring-offset-0 checked:focus:border-[#081c44]"
                name="pack"
              />
              <div class="flex grow flex-col">
                <p class="text-[#0e121b] text-sm font-medium leading-normal">Plus</p>
                <p class="text-[#4e6797] text-sm font-normal leading-normal">5 attivazioni</p>
              </div>
            </label>
          </div>
          <div class="flex items-center gap-4 bg-[#f8f9fc] px-4 min-h-14 justify-between">
            <p class="text-[#0e121b] text-base font-normal leading-normal flex-1 truncate">Totale</p>
            <div class="shrink-0"><p class="text-[#0e121b] text-base font-normal leading-normal">10 €</p></div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div>
    <div class="flex px-4 py-3">
      <a
        href="/checkout"
        class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-5 flex-1 bg-[#081c44] text-[#f8f9fc] text-base font-bold leading-normal tracking-[0.015em]"
      >
        <span class="truncate">Procedi al Pagamento</span>
      </a>
    </div>
    <p class="text-[#4e6797] text-sm font-normal leading-normal pb-3 pt-1 px-4 text-center underline">Dettagli Pacchetto</p>
    <div class="h-5 bg-[#f8f9fc]"></div>
  </div>
</div>
  `;
  return <Html html={html} />;
}