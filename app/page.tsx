import Html from '@/components/Html';

const html = `
<div
  class="relative flex size-full min-h-screen flex-col bg-[#f8f9fc] justify-between group/design-root overflow-x-hidden"
  style='font-family: Inter, "Noto Sans", sans-serif;'
>
  <div>
    <div class="flex items-center bg-[#f8f9fc] p-4 pb-2 justify-between">
      <h2 class="text-[#0e121b] text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pl-12 pr-12">QuotaVera</h2>
    </div>
    <h2 class="text-[#0e121b] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">In evidenza</h2>
    <div class="flex overflow-y-auto [-ms-scrollbar-style:none] [scrollbar-width:none] [&amp;::-webkit-scrollbar]:hidden">
      <div class="flex items-stretch p-4 gap-3">
        <div class="flex h-full flex-1 flex-col gap-4 rounded-lg min-w-60">
          <div
            class="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl flex flex-col"
            style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuDweBzGgPTnaFZ6cxqlga0F7E4ZBzUqWSqKJ1lrY703M259UL7CMSqtzfdbeP6hzV2kqTVHBZIQwlofSFvGcMfKW08nji6BQRUJd192Ed1qHU3foBG_YbWXbZr98jEWEidfirKbNmrP1hIaZ45jpzPWEE7g5q2bYDQ2rbGuTCOR2KYmjqobwcuiT85gXvKnAleoax6AX5OOA1Zq-qPYFOOhC_HxgqKNBPCNoLTH27bZggy6GqamGwzuUWlAo1Kk81aeGr53YyKR2w");'
          ></div>
          <div>
            <p class="text-[#0e121b] text-base font-medium leading-normal">Rolex Daytona</p>
            <p class="text-[#4e6797] text-sm font-normal leading-normal">Valore stimato: 100.000 €</p>
          </div>
        </div>
        <div class="flex h-full flex-1 flex-col gap-4 rounded-lg min-w-60">
          <div
            class="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl flex flex-col"
            style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuAGULwxm1AKmT6oQkIDqMeen44IsCWNOUcwd8jVQ1w_Kt002gj7FCNuwhVPk8_DEg1Iz29vR5LT-XEeYBSpLOiBrCNKTX8UPTJhlwT7wYXZ28MKihd9CwZZZJW3xc1cdBIkdSPvUYxFZeKko7qM4dqGfFIrRGjN6Lq5pb-2ZiLKw4GoEn7bD_SR3dYhiTdsCGu_9R-HuLmw8pMsRghnR_sBIDXBA2L5cqWsL6RKJFyADHtAjFIysHP6zTsjnEOtSgyfLqjHJ4Y2uQ");'
          ></div>
          <div>
            <p class="text-[#0e121b] text-base font-medium leading-normal">Porsche 996 Carrera</p>
            <p class="text-[#4e6797] text-sm font-normal leading-normal">Valore stimato: 50.000 €</p>
          </div>
        </div>
        <div class="flex h-full flex-1 flex-col gap-4 rounded-lg min-w-60">
          <div
            class="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl flex flex-col"
            style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuCPmD3p4v03s_8GaChGBs-1e5dSpHwXFJ92Jk0ubQjIlrYPGaODkhh33zzdjLt6wCkpN-GwZlEoDMgdXnAXcc1wvOi3h0ncrvRzGxE_KiXuaiS4ZrLElDlX7vVcvSrZQQTsHQpCMNQN4kTzJ5ZypWXjqE1KGqM331wVtxS66SOJfOfd13VJ1ebu1e40oTLwNmUoqyA_1C1II23SaKDHvlRcEElMEQhL-hJp7pWLUv_a0sztJxW9klYNqM8BRx62RErZXSjLZLLr8g");'
          ></div>
          <div>
            <p class="text-[#0e121b] text-base font-medium leading-normal">Hermès Birkin 30</p>
            <p class="text-[#4e6797] text-sm font-normal leading-normal">Valore stimato: 200.000 €</p>
          </div>
        </div>
      </div>
    </div>
    <div class="flex gap-3 p-3 overflow-x-hidden">
      <div class="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-xl bg-[#e7ebf3] pl-4 pr-4">
        <p class="text-[#0e121b] text-sm font-medium leading-normal">Tutti</p>
      </div>
      <div class="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-xl bg-[#e7ebf3] pl-4 pr-4">
        <p class="text-[#0e121b] text-sm font-medium leading-normal">Orologi</p>
      </div>
      <div class="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-xl bg-[#e7ebf3] pl-4 pr-4">
        <p class="text-[#0e121b] text-sm font-medium leading-normal">Auto</p>
      </div>
      <div class="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-xl bg-[#e7ebf3] pl-4 pr-4">
        <p class="text-[#0e121b] text-sm font-medium leading-normal">Case</p>
      </div>
      <div class="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-xl bg-[#e7ebf3] pl-4 pr-4">
        <p class="text-[#0e121b] text-sm font-medium leading-normal">Borse</p>
      </div>
      <div class="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-xl bg-[#e7ebf3] pl-4 pr-4">
        <p class="text-[#0e121b] text-sm font-medium leading-normal">Altro</p>
      </div>
    </div>
    <div class="flex items-center gap-4 bg-[#f8f9fc] px-4 min-h-[72px] py-2">
      <div
        class="bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-14"
        style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuBJgj2jCdx3pxN5UjxqZfEh-EOX_DqrQoVLWQGoL30_vpxZILcW9tSxZN5Scl4ShTB0bhMlBFJKbALRUBVLG75xZUBtxbVtkSTsu2i25AT4Y7iMpkHMsYG0ybZvlIyfAT_A5mfTTKwxz5DeEHzurIzlHIgo2X8mjGCjPJzgBXkAu5Db1vlvcCnciknEIWXtz6locuf51FV4quNSwnxTLG1cI2KqfJF9QGPGK9PX34JkQCuzciw3itkpP0RqS9-BTwj3AhLUhaq1fg");'
      ></div>
      <div class="flex flex-col justify-center">
        <p class="text-[#0e121b] text-base font-medium leading-normal line-clamp-1">Rolex Daytona</p>
        <p class="text-[#4e6797] text-sm font-normal leading-normal line-clamp-2">Valore stimato: 100.000 €</p>
      </div>
    </div>
    <div class="flex items-center gap-4 bg-[#f8f9fc] px-4 min-h-[72px] py-2">
      <div
        class="bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-14"
        style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuCXLOkW_ed7SkzjDBSmY4wFzrKaDc9BHsOzMs-09tvHBiyZtu2kO9LPptt6HQQat6NackckJJvGFRxnr3PSBZaHyIX2BXWpvRUPBRTW2pKsNgiB6akmuigf79rPRwXOSmTbBUpuPoOs73MzNMzDtWv6cCo7qlmO10Ot_kD_2IqUQ0tnwoLczGUErH5dWi98_hek7BPMkqtT3A-2Q4Wvsk0ej_WZ2Wzu3-3WaJRoYJEQvD8nL5oH0YFqFwma599RyK1nqzLXA8-skA");'
      ></div>
      <div class="flex flex-col justify-center">
        <p class="text-[#0e121b] text-base font-medium leading-normal line-clamp-1">Porsche 996 Carrera</p>
        <p class="text-[#4e6797] text-sm font-normal leading-normal line-clamp-2">Valore stimato: 50.000 €</p>
      </div>
    </div>
    <div class="flex items-center gap-4 bg-[#f8f9fc] px-4 min-h-[72px] py-2">
      <div
        class="bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-14"
        style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuDZvkyNjOeibv3niQ02oMyLPDbRkJG3pkS9VVYHYrhhfGtkkbbVDfvCxIU5lMLYk--_XpZbYr14x5CvUB41uB3AkIOmXo43FlNrD6YR5lZ2tALWx9ghie4SJ5XUs-h6X8d0-fdxqj-7chP84NBtLBoR84AxQrjVYsOuRV2Z6vhlFTo8adj_XejrYuEHMI_WUAfQZyJlbLap1HEBaN-_ecKTNMDxrKvup0j9S-s65y65oROzRCE-BTOtuGssesznwMkMie-LCvu5bg");'
      ></div>
      <div class="flex flex-col justify-center">
        <p class="text-[#0e121b] text-base font-medium leading-normal line-clamp-1">Hermès Birkin 30</p>
        <p class="text-[#4e6797] text-sm font-normal leading-normal line-clamp-2">Valore stimato: 200.000 €</p>
      </div>
    </div>
  </div>
  <div>
    <p class="text-[#4e6797] text-sm font-normal leading-normal pb-3 pt-1 px-4 text-center">
      Nota legale: I concorsi a premi sono soggetti a termini e condizioni. Si prega di giocare responsabilmente.
    </p>
    <div class="flex gap-2 border-t border-[#e7ebf3] bg-[#f8f9fc] px-4 pb-3 pt-2">
      <a class="just flex flex-1 flex-col items-center justify-end gap-1 rounded-full text-[#0e121b]" href="/">
        <div class="text-[#0e121b] flex h-8 items-center justify-center" data-icon="House" data-size="24px" data-weight="fill">
          <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
            <path
              d="M224,115.55V208a16,16,0,0,1-16,16H168a16,16,0,0,1-16-16V168a8,8,0,0,0-8-8H112a8,8,0,0,0-8,8v40a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V115.55a16,16,0,0,1,5.17-11.78l80-75.48.11-.11a16,16,0,0,1,21.53,0,1.14,1.14,0,0,0,.11.11l80,75.48A16,16,0,0,1,224,115.55Z"
            ></path>
          </svg>
        </div>
        <p class="text-[#0e121b] text-xs font-medium leading-normal tracking-[0.015em]">Beni</p>
      </a>
      <a class="just flex flex-1 flex-col items-center justify-end gap-1 text-[#4e6797]" href="/wallet">
        <div class="text-[#4e6797] flex h-8 items-center justify-center" data-icon="Wallet" data-size="24px" data-weight="regular">
          <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
            <path
              d="M216,72H56a8,8,0,0,1,0-16H192a8,8,0,0,0,0-16H56A24,24,0,0,0,32,64V192a24,24,0,0,0,24,24H216a16,16,0,0,0,16-16V88A16,16,0,0,0,216,72Zm0,128H56a8,8,0,0,1-8-8V86.63A23.84,23.84,0,0,0,56,88H216Zm-48-60a12,12,0,1,1,12,12A12,12,0,0,1,168,140Z"
            ></path>
          </svg>
        </div>
        <p class="text-[#4e6797] text-xs font-medium leading-normal tracking-[0.015em]">Portafoglio</p>
      </a>
      <a class="just flex flex-1 flex-col items-center justify-end gap-1 text-[#4e6797]" href="/profile">
        <div class="text-[#4e6797] flex h-8 items-center justify-center" data-icon="User" data-size="24px" data-weight="regular">
          <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
            <path
              d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"
            ></path>
          </svg>
        </div>
        <p class="text-[#4e6797] text-xs font-medium leading-normal tracking-[0.015em]">Profilo</p>
      </a>
    </div>
    <div class="h-5 bg-[#f8f9fc]"></div>
  </div>
</div>
`;

export default function Page() { return <Html html={html} /> }