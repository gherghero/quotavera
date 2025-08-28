// FILE: app/profile/page.tsx
import Html from '@/components/Html';

export default function ProfilePage() {
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
      <h2 class="text-[#0e121b] text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12">Pass</h2>
    </div>

    <div class="@container">
      <div class="@[480px]:px-4 @[480px]:py-3">
        <div
          class="w-full bg-center bg-no-repeat bg-cover flex flex-col justify-end overflow-hidden bg-[#f8f9fc] @[480px]:rounded-xl min-h-[218px]"
          style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuD9CE1z-QCCY-Q2oqppnKztKDYhgNRgXsnZRQInIM0N4wmofLwUNsIJwFTmzunvonk9imf81aZnGX_viwsFjcruES5b0T1WLUg0lJrWDvEb6JRVtXmqYrViKUKmey4y5kRsBRZczj0nAaPKHJZAM6tX1kOxBo9We0XJWpjOwt7VVnlFG1MoXQFXS9uVtQ573J0JS3oRPuLAhUx7a5UPpjaZ0vYSShMq7AS1mz5UEVZYHovcBriFyl6MII3A2neB2ajnUt0GaHMeBA");'
        ></div>
      </div>
    </div>

    <h3 class="text-[#0e121b] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">Serial Number</h3>
    <p class="text-[#0e121b] text-base font-normal leading-normal pb-3 pt-1 px-4">9876543210</p>

    <h3 class="text-[#0e121b] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">QR Code</h3>
    <div class="flex w-full grow bg-[#f8f9fc] @container p-4">
      <div class="w-full gap-1 overflow-hidden bg-[#f8f9fc] @[480px]:gap-2 aspect-[3/2] rounded-xl flex">
        <div
          class="w-full bg-center bg-no-repeat bg-cover aspect-auto rounded-none flex-1"
          style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuA5zDY6fWvEzIJ3sJiIBcESIALb4X4GqYC_Iu3anzQ9a-BRsSGEyBZYKBHp8K0VKAPboguihiS2JQzcQN1_NX7DF_hz36cMyg6FgcPKikEmllB3kn63I6AAJMfxT1fSVJoTRl49KbjHlMWc7I7IeMeawELQpQxpAIP2JflTWVBDHTv914A2zPZsi8nG0BRNp-eCjTAiTJ_2nX6GT7LskkYvOevg8xaF25hSenWqxsfmw94bnyTC2vZ1xHhKlbTqwwXGfu8RccqRWg");'
        ></div>
      </div>
    </div>

    <div class="flex justify-center">
      <div class="flex flex-1 gap-3 flex-wrap px-4 py-3 max-w-[480px] justify-center">
        <button
          class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#081c44] text-[#f8f9fc] text-sm font-bold leading-normal tracking-[0.015em] grow"
        >
          <span class="truncate">Download</span>
        </button>
        <button
          class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#e7ebf3] text-[#0e121b] text-sm font-bold leading-normal tracking-[0.015em] grow"
        >
          <span class="truncate">Share</span>
        </button>
      </div>
    </div>

    <footer class="flex flex-col gap-6 px-5 py-10 text-center @container">
      <div class="flex flex-wrap items-center justify-center gap-6 @[480px]:flex-row @[480px]:justify-around">
        <a class="text-[#4e6797] text-base font-normal leading-normal min-w-40" href="#">Termini</a>
        <a class="text-[#4e6797] text-base font-normal leading-normal min-w-40" href="#">Privacy</a>
        <a class="text-[#4e6797] text-base font-normal leading-normal min-w-40" href="#">Contatti</a>
      </div>
      <div class="flex flex-wrap justify-center gap-4">
        <a href="#"><div class="text-[#4e6797]" data-icon="TwitterLogo" data-size="24px" data-weight="regular"><svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256"><path d="M247.39,68.94A8,8,0,0,0,240,64H209.57A48.66,48.66,0,0,0,168.1,40a46.91,46.91,0,0,0-33.75,13.7A47.9,47.9,0,0,0,120,88v6.09C79.74,83.47,46.81,50.72,46.46,50.37a8,8,0,0,0-13.65,4.92c-4.31,47.79,9.57,79.77,22,98.18a110.93,110.93,0,0,0,21.88,24.2c-15.23,17.53-39.21,26.74-39.47,26.84a8,8,0,0,0-3.85,11.93c.75,1.12,3.75,5.05,11.08,8.72C53.51,229.7,65.48,232,80,232c70.67,0,129.72-54.42,135.75-124.44l29.91-29.9A8,8,0,0,0,247.39,68.94Zm-45,29.41a8,8,0,0,0-2.32,5.14C196,166.58,143.28,216,80,216c-10.56,0-18-1.4-23.22-3.08,11.51-6.25,27.56-17,37.88-32.48A8,8,0,0,0,92,169.08c-.47-.27-43.91-26.34-44-96,16,13,45.25,33.17,78.67,38.79A8,8,0,0,0,136,104V88a32,32,0,0,1,9.6-22.92A30.94,30.94,0,0,1,167.9,56c12.66.16,24.49,7.88,29.44,19.21A8,8,0,0,0,204.67,80h16Z"></path></svg></div></a>
        <a href="#"><div class="text-[#4e6797]" data-icon="InstagramLogo" data-size="24px" data-weight="regular"><svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256"><path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160ZM176,24H80A56.06,56.06,0,0,0,24,80v96a56.06,56.06,0,0,0,56,56h96a56.06,56.06,0,0,0,56-56V80A56.06,56.06,0,0,0,176,24Zm40,152a40,40,0,0,1-40,40H80a40,40,0,0,1-40-40V80A40,40,0,0,1,80,40h96a40,40,0,0,1,40,40ZM192,76a12,12,0,1,1-12-12A12,12,0,0,1,192,76Z"></path></svg></div></a>
        <a href="#"><div class="text-[#4e6797]" data-icon="FacebookLogo" data-size="24px" data-weight="regular"><svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm8,191.63V152h24a8,8,0,0,0,0-16H136V112a16,16,0,0,1,16-16h16a8,8,0,0,0,0-16H152a32,32,0,0,0-32,32v24H96a8,8,0,0,0,0,16h24v63.63a88,88,0,1,1,16,0Z"></path></svg></div></a>
      </div>
      <p class="text-[#4e6797] text-base font-normal leading-normal">@2024 Beni</p>
    </footer>
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
      <a class="just flex flex-1 flex-col items-center justify-end gap-1 text-[#4e6797]" href="/wallet">
        <div class="text-[#4e6797] flex h-8 items-center justify-center" data-icon="Wallet" data-size="24px" data-weight="regular">
          <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
            <path d="M216,72H56a8,8,0,0,1,0-16H192a8,8,0,0,0,0-16H56A24,24,0,0,0,32,64V192a24,24,0,0,0,24,24H216a16,16,0,0,0,16-16V88A16,16,0,0,0,216,72Zm-36,80a12,12,0,1,1,12-12A12,12,0,0,1,180,152Z"></path>
          </svg>
        </div>
        <p class="text-[#4e6797] text-xs font-medium leading-normal tracking-[0.015em]">Portafoglio</p>
      </a>
      <a class="just flex flex-1 flex-col items-center justify-end gap-1 rounded-full text-[#0e121b]" href="/profile">
        <div class="text-[#0e121b] flex h-8 items-center justify-center" data-icon="User" data-size="24px" data-weight="fill">
          <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
            <path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"></path>
          </svg>
        </div>
        <p class="text-[#0e121b] text-xs font-medium leading-normal tracking-[0.015em]">Profilo</p>
      </a>
    </div>
    <div class="h-5 bg-[#f8f9fc]"></div>
  </div>
</div>
  `;
  return <Html html={html} />;
}