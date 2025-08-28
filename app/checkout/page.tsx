import Html from '@/components/Html';

export default function CheckoutPage() {
  const html = `
<div
  class="relative flex size-full min-h-screen flex-col bg-[#f8f9fc] justify-between group/design-root overflow-x-hidden"
  style='font-family: Inter, "Noto Sans", sans-serif;'
>
  <div>
    <div class="flex items-center bg-[#f8f9fc] p-4 pb-2 justify-between">
      <div class="text-[#0e121b] flex size-12 shrink-0 items-center" data-icon="X" data-size="24px" data-weight="regular">
        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
          <path
            d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"
          ></path>
        </svg>
      </div>
      <h2 class="text-[#0e121b] text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12">Checkout</h2>
    </div>
    <div class="p-4">
      <div class="flex items-stretch justify-between gap-4 rounded-xl">
        <div class="flex flex-col gap-1 flex-[2_2_0px]">
          <p class="text-[#4e6797] text-sm font-normal leading-normal">1x</p>
          <p class="text-[#0e121b] text-base font-bold leading-tight">Rolex Submariner</p>
          <p class="text-[#4e6797] text-sm font-normal leading-normal">Valore stimato: €12.000,00</p>
        </div>
        <div
          class="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl flex-1"
          style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuBaB927K0D4Zn9R66pWHBicnxxoalUWm9_zwfuu6p5pUgcK0moAk9vI0wTY3FAz9Ky5aQ2T-bg7UM0HI-neTtyzEGNaRMc7d3ZJNIzKesuDFk6j7PleF4ykFB4i1dnuB85WXC_YmCIjd2kjAkWOn3xbiZjOkZ9YZRcHLb7llu_HdwkDfNqdNrYXbPYb_RCOJZevL_OGY1gohVpZu0EAlhTItF_6FmIFh87rYp-uUuaZoHaqEz_HBqfvxn5Y1xIFmcttkNmMHwlQcw");'
        ></div>
      </div>
    </div>
    <h3 class="text-[#0e121b] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">Metodo di pagamento</h3>
    <div class="flex items-center gap-4 bg-[#f8f9fc] px-4 min-h-14">
      <div class="bg-center bg-no-repeat aspect-video bg-contain h-6 w-10 shrink-0" style='background-image: url("/mastercard.svg");'></div>
      <p class="text-[#0e121b] text-base font-normal leading-normal flex-1 truncate">Carta</p>
    </div>
    <div class="flex items-center gap-4 bg-[#f8f9fc] px-4 min-h-14">
      <div class="bg-center bg-no-repeat aspect-video bg-contain h-6 w-10 shrink-0" style='background-image: url("/applepay.svg");'></div>
      <p class="text-[#0e121b] text-base font-normal leading-normal flex-1 truncate">Apple Pay/Google Pay</p>
    </div>
    <div class="flex items-center gap-4 bg-[#f8f9fc] px-4 min-h-14">
      <div class="bg-center bg-no-repeat aspect-video bg-contain h-6 w-10 shrink-0" style='background-image: url("/paypal.svg");'></div>
      <p class="text-[#0e121b] text-base font-normal leading-normal flex-1 truncate">PayPal</p>
    </div>
    <h3 class="text-[#0e121b] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">Dettagli di pagamento</h3>
    <div class="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
      <label class="flex flex-col min-w-40 flex-1">
        <input
          placeholder="Numero di carta"
          class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#0e121b] focus:outline-0 focus:ring-0 border-none bg-[#e7ebf3] focus:border-none h-14 placeholder:text-[#4e6797] p-4 text-base font-normal leading-normal"
          value=""
        />
      </label>
    </div>
    <div class="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
      <label class="flex flex-col min-w-40 flex-1">
        <input
          placeholder="MM/AA"
          class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#0e121b] focus:outline-0 focus:ring-0 border-none bg-[#e7ebf3] focus:border-none h-14 placeholder:text-[#4e6797] p-4 text-base font-normal leading-normal"
          value=""
        />
      </label>
      <label class="flex flex-col min-w-40 flex-1">
        <input
          placeholder="CVV"
          class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#0e121b] focus:outline-0 focus:ring-0 border-none bg-[#e7ebf3] focus:border-none h-14 placeholder:text-[#4e6797] p-4 text-base font-normal leading-normal"
          value=""
        />
      </label>
    </div>
    <div class="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
      <label class="flex flex-col min-w-40 flex-1">
        <input
          placeholder="Nome sulla carta"
          class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#0e121b] focus:outline-0 focus:ring-0 border-none bg-[#e7ebf3] focus:border-none h-14 placeholder:text-[#4e6797] p-4 text-base font-normal leading-normal"
          value=""
        />
      </label>
    </div>
    <p class="text-[#4e6797] text-sm font-normal leading-normal pb-3 pt-1 px-4">Procedendo, accetti la nostra Informativa sulla privacy e i Termini di servizio.</p>
  </div>
  <div>
    <div class="flex px-4 py-3">
      <button
        class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-5 flex-1 bg-[#081c44] text-[#f8f9fc] text-base font-bold leading-normal tracking-[0.015em]"
      >
        <span class="truncate">Paga e attiva</span>
      </button>
    </div>
    <p class="text-[#4e6797] text-sm font-normal leading-normal pb-3 pt-1 px-4 text-center">
      Riceverai una ricevuta e il tuo pass sarà disponibile nel tuo portafoglio digitale.
    </p>
    <div class="h-5 bg-[#f8f9fc]"></div>
  </div>
</div>
  `;
  return <Html html={html} />;
}