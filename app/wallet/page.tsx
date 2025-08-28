// FILE: app/wallet/page.tsx
import Html from '@/components/Html';

export default function WalletPage() {
  const html = `
<div
  class="relative flex size-full min-h-screen flex-col bg-[#f8f9fc] justify-between group/design-root overflow-x-hidden"
  style='font-family: Inter, "Noto Sans", sans-serif;'
>
  <div>
    <div class="flex items-center bg-[#f8f9fc] p-4 pb-2 justify-between">
      <div class="text-[#0e121b] flex size-12 shrink-0 items-center" data-icon="ArrowLeft" data-size="24px" data-weight="regular">
        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
          <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path>
        </svg>
      </div>
      <h2 class="text-[#0e121b] text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12">Portafoglio</h2>
    </div>
    <h2 class="text-[#0e121b] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Le tue Attivazioni</h2>

    <div class="p-4 @container">
      <div class="flex flex-col items-stretch justify-start rounded-xl @xl:flex-row @xl:items-start">
        <div
          class="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl"
          style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuDCHSmPalKPwgRe5krcSxEsrT3YndU22JMPsVzFE-klSwsQbcbI2rcNsT-ehiWCwRvMMzwHM6uKF2xxpKVp-ia4vR0LewTfZwSeG7xKF8jVEE3dgf6wK2PbJp-vq25tRwg_roDFEYH6hFaJDyn49PsZEXsyfx_7WjyHBdJOQ4zqj5rwKr89jnMOY4mtcO3duzC7n3QFmUDZGN-262SdM5OPND0fiMiS9ywhV3ThKQwfForL_8FEQhZqUFByJNC0vmlJn-OQgQmzUg");'
        ></div>
        <div class="flex w-full min-w-72 grow flex-col items-stretch justify-center gap-1 py-4 @xl:px-4">
          <p class="text-[#0e121b] text-lg font-bold leading-tight tracking-[-0.015em]">Confermato</p>
          <div class="flex items-end gap-3 justify-between">
            <div class="flex flex-col gap-1">
              <p class="text-[#4e6797] text-base font-normal leading-normal">Orologio di lusso</p>
              <p class="text-[#4e6797] text-base font-normal leading-normal">Attivazione #1234567890</p>
            </div>
            <a
              href="/profile"
              class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-8 px-4 bg-[#081c44] text-[#f8f9fc] text-sm font-medium leading-normal"
            >
              <span class="truncate">Apri</span>
            </a>
          </div>
        </div>
      </div>
    </div>

    <div class="p-4 @container">
      <div class="flex flex-col items-stretch justify-start rounded-xl @xl:flex-row @xl:items-start">
        <div
          class="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl"
          style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuCezTmuesxsPcgzRmu3dtRhV6dR0ykkZxY7vt9jkkqR36du-zR6M4Ia0V_Duxtf3u8q-OVR-vrjwHeKJRvGF9lj2t_mCm9N-VmAGpDeq7yCjO6xVjH2fvhILw4npbP5o7SJxntKbZU__C7kJFJm9naIUVfD_BPlaLvuwufTr0xwUK1g2KFFIu2PgmEY4b4wD55pXJGJ0z_mWgMyIpskpF_ZNHoa_Gou-54DOZGYyxNkFFNabW6W4Y4gqGBFM_MStGb5LDfV6loJLw");'
        ></div>
        <div class="flex w-full min-w-72 grow flex-col items-stretch justify-center gap-1 py-4 @xl:px-4">
          <p class="text-[#0e121b] text-lg font-bold leading-tight tracking-[-0.015em]">A tempo</p>
          <div class="flex items-end gap-3 justify-between">
            <div class="flex flex-col gap-1">
              <p class="text-[#4e6797] text-base font-normal leading-normal">Borsa di lusso</p>
              <p class="text-[#4e6797] text-base font-normal leading-normal">Attivazione #9876543210</p>
            </div>
            <a
              href="/profile"
              class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-8 px-4 bg-[#081c44] text-[#f8f9fc] text-sm font-medium leading-normal"
            >
              <span class="truncate">Apri</span>
            </a>
          </div>
        </div>
      </div>
    </div>

    <div class="flex px-4 py-3">
      <button
        class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 flex-1 bg-[#e7ebf3] text-[#0e121b] text-sm font-bold leading-normal tracking-[0.015em]"
      >
        <span class="truncate">Condividi</span>
      </button>
    </div>
  </div>

  <div>
    <div class="flex gap-2 border-t border-[#e7ebf3] bg-[#f8f9fc] px-4 pb-3 pt-2">
      <a class="just flex flex-1 flex-col items-center justify-end gap-1 text-[#4e6797]" href="/">
        <div class="text-[#4e6797] flex h-8 items-center justify-center" data-icon="House" data-size="24px" data-weight="regular">
          <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
            <path d="M218.83,103.77l-80-75.48a1.14,1.14,0,0,1-.11-.11,16,16,0,0,0-21.53,0l-.11.11L37.17,103.77A16,16,0,0,0,32,115.55V208a16,16,0,0,0,16,16H96a16,16,0,0,0,16-16V160h32v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V115.55A16,16,0,0,0,218.83,103.77Z"></path>
          </svg>
        </div>
        <p class="text-[#4e6797] text-xs font-medium leading-normal tracking-[0.015em]">Beni</p>
      </a>
      <a class="just flex flex-1 flex-col items-center justify-end gap-1 rounded-full text-[#0e121b]" href="/wallet">
        <div class="text-[#0e121b] flex h-8 items-center justify-center" data-icon="Wallet" data-size="24px" data-weight="fill">
          <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
            <path d="M216,72H56a8,8,0,0,1,0-16H192a8,8,0,0,0,0-16H56A24,24,0,0,0,32,64V192a24,24,0,0,0,24,24H216a16,16,0,0,0,16-16V88A16,16,0,0,0,216,72Zm-36,80a12,12,0,1,1,12-12A12,12,0,0,1,180,152Z"></path>
          </svg>
        </div>
        <p class="text-[#0e121b] text-xs font-medium leading-normal tracking-[0.015em]">Portafoglio</p>
      </a>
      <a class="just flex flex-1 flex-col items-center justify-end gap-1 text-[#4e6797]" href="/profile">
        <div class="text-[#4e6797] flex h-8 items-center justify-center" data-icon="User" data-size="24px" data-weight="regular">
          <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
            <path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"></path>
          </svg>
        </div>
        <p class="text-[#4e6797] text-xs font-medium leading-normal tracking-[0.015em]">Profilo</p>
      </a>
    </div>
    <div class="h-5 bg-[#f8f9fc]"></div>
  </div>
</div>
  `;
  return <Html html={html} />;
}