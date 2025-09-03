'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

type PageProps = { params: { slug: string } };

// piccola util per mostrare il titolo dal param "slug"
function prettifySlug(slug: string) {
  const s = decodeURIComponent(slug).replace(/[-_]+/g, ' ').trim();
  return s.length ? s.replace(/\b\w/g, (m) => m.toUpperCase()) : 'Pass';
}

export default function ActivityDetailsPage({ params }: PageProps) {
  const router = useRouter();
  const name = prettifySlug(params.slug);

  // mock dati UI (sostituisci con i tuoi se già li prendi da API)
  const coverUrl =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuA2xCBYe6ZLDn4MacPc-5tsuqpX-1NulfYANBn1xlMkbC85FKrxduUNRqusS24_dCsD5C5eIvc4ykRR-6Q9Uov9nD08TkUEEkTmDn3p1_cWFZsHS3J-ei8cGq6dn5ZGwsnRnfyUPIWu2BQuXe3fThHp0Da20UaHuSyyuNKsRxPGZWBF---mhcY8lyqi5247FDS3px4vjSkivg_REUCAWNAmf9R7bokZGgus982uZVymDxmoyv-VmVwZ98UcdKV_e-WvlqFblcICfg';
  const gallery = [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCA3ZrXi5ZvT3mLs26D9Tw7xYtOq3Vtg90LSzSy8R2BXL8o-69mJlYPpwf-3_h__SUNpIvRQoEdAGSHDMzDN5RUwkLm86v0zidJ8B2Vgnhd64WajtvWZH4in5qQZqGzGrLW2uWUYj1nVQncFtj24UjmVWMnNMJVbhkEERoCyorNsh7sTTYL2IOAH_a8ihXmh1rfrSCKP9Xz7rNcNqZr6S30392MFBPhvmylqlJJ2to5u2qpIzl-LTLEgc9ED3hdSbo5iL8wZGhStg',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuD9ceXrku-gjF4J7BK9ECibDYWKX3P4WE7pF4mdP0m2i9XXwd4dweUJbUMIGL4PGH3Lx8VNXSjPOTapIxSDh5D80BnTbuY3kipB64j3DerPVgU7R6i7JMX0WS9VFgIt3C9JsYLK6YSQIUUqenoC3o8HIhTSawl3fKCk6fzVcdenpTr8iTWn2W-nTS7tSzG18Bd1YHxHaPJ1sJmrM0LqW8FhK_AsL5SHK4k85fjlH8xBkR-19kuIsU2VpY37BlypTPxtKKU_hagt-g',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDnaFBSoolnfiOOYQFOiFdq6FBxu_EMl8bctWeX7RaehXNGXhacoHDzPvn5E7nMwH-AHkL-EMkvzXhv3SG0-8ntRJAwFjqOHv0Cp3_FV3Zv-rsWdU81sZGk1biYUS8B6QxuDNYyVEi8yCbraQFGQu7HQPRtHp22ZuJyg8i34WL4QqBGWOsLfS1p-gHwizJNxzm-7VOXC2TEBDSZ5U2hRLqtA4viUSMmaI49OgBb6p-HZaxcP4roXzbnI1t-LahaqRR-kl0qXfd2Mg',
  ];
  const deadline = '15/07/2024';

  const description =
    'Un pass dedicato agli appassionati di orologeria: accedi al concorso a premi e segui i tuoi progressi direttamente dal portafoglio digitale. Il pass è valido fino al 15/07/2024. Per i dettagli completi consulta termini e condizioni.';

  return (
    <div className="relative flex min-h-screen flex-col justify-between bg-[#f8f9fc]">
      {/* TOP BAR — titolo ripristinato = nome del pass */}
      <div className="flex items-center bg-[#f8f9fc] p-4 pb-2 justify-between">
        <button
          type="button"
          aria-label="Indietro"
          onClick={() => router.back()}
          className="text-[#0e121b] flex size-12 shrink-0 items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
            <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path>
          </svg>
        </button>
        <h2 className="text-[#0e121b] text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12">
          {name}
        </h2>
      </div>

      {/* HERO */}
      <div className="@container">
        <div className="@[480px]:px-4 @[480px]:py-3">
          <div
            className="w-full bg-center bg-no-repeat bg-cover flex min-h-[218px] flex-col justify-end overflow-hidden bg-[#f8f9fc] @[480px]:rounded-xl"
            style={{ backgroundImage: `url("${coverUrl}")` }}
          />
        </div>
      </div>

      {/* STATO / PROGRESS */}
      <div className="flex flex-col gap-3 p-4">
        <div className="flex gap-6 justify-between">
          <p className="text-[#0e121b] text-base font-medium leading-normal">Attivato</p>
        </div>
        <div className="rounded bg-[#d0d7e7]">
          <div className="h-2 rounded bg-[#081c44]" style={{ width: '50%' }} />
        </div>
        <p className="text-[#4e6797] text-sm leading-normal">50%</p>
      </div>

      {/* INFO CARDS */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
        <div className="flex flex-1 items-center gap-3 rounded-lg border border-[#d0d7e7] bg-[#f8f9fc] p-4">
          <div className="text-[#0e121b]">
            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
              <path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,48v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48V48ZM208,208H48V96H208V208Zm-96-88v64a8,8,0,0,1-16,0V132.94l-4.42,2.22a8,8,0,0,1-7.16-14.32l16-8A8,8,0,0,1,112,120Zm59.16,30.45L152,176h16a8,8,0,0,1,0,16H136a8,8,0,0,1-6.4-12.8l28.78-38.37A8,8,0,1,0,145.07,132a8,8,0,1,1-13.85-8A24,24,0,0,1,176,136,23.76,23.76,0,0,1,171.16,150.45Z"></path>
            </svg>
          </div>
          <h2 className="text-[#0e121b] text-base font-bold leading-tight">Disponibile fino al {deadline}</h2>
        </div>

        <div className="flex flex-1 items-center gap-3 rounded-lg border border-[#d0d7e7] bg-[#f8f9fc] p-4">
          <div className="text-[#0e121b]">
            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
              <path d="M232,64H208V56a16,16,0,0,0-16-16H64A16,16,0,0,0,48,56v8H24A16,16,0,0,0,8,80V96a40,40,0,0,0,40,40h3.65A80.13,80.13,0,0,0,120,191.61V216H96a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16H136V191.58c31.94-3.23,58.44-25.64,68.08-55.58H208a40,40,0,0,0,40-40V80A16,16,0,0,0,232,64ZM48,120A24,24,0,0,1,24,96V80H48v32q0,4,.39,8Zm144-8.9c0,35.52-28.49,64.64-63.51,64.9H128a64,64,0,0,1-64-64V56H192ZM232,96a24,24,0,0,1-24,24h-.5a81.81,81.81,0,0,0,.5-8.9V80h24Z"></path>
            </svg>
          </div>
          <h2 className="text-[#0e121b] text-base font-bold leading-tight">Possibilità di vincere un orologio di lusso</h2>
        </div>
      </div>

      {/* 👉 DESCRIZIONE — reinserita prima della Galleria */}
      <div className="px-4">
        <div className="rounded-xl border border-[#d0d7e7] bg-[#f8f9fc] p-4">
          <h3 className="text-[#0e121b] text-base font-semibold leading-tight mb-1">Descrizione</h3>
          <p className="text-[#4e6797] text-sm leading-normal">{description}</p>
        </div>
      </div>

      {/* GALLERIA */}
      <h3 className="text-[#0e121b] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">Galleria</h3>
      <div className="flex w-full bg-[#f8f9fc] @container p-4">
        <div className="w-full grid aspect-[3/2] grid-cols-[2fr_1fr_1fr] gap-1 overflow-hidden rounded-xl bg-[#f8f9fc] @[480px]:gap-2">
          <div
            className="row-span-2 w-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url("${gallery[0]}")` }}
          />
          <div
            className="col-span-2 w-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url("${gallery[1]}")` }}
          />
          <div
            className="col-span-2 w-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url("${gallery[2]}")` }}
          />
        </div>
      </div>

      {/* INFO ESSENZIALI */}
      <div className="flex flex-col gap-3 p-4">
        <details className="group flex flex-col rounded-xl border border-[#d0d7e7] bg-[#f8f9fc] px-[15px] py-[7px]" open>
          <summary className="flex cursor-pointer items-center justify-between gap-6 py-2">
            <p className="text-[#0e121b] text-sm font-medium leading-normal">Informazioni Essenziali</p>
            <div className="text-[#0e121b] transition-transform group-open:rotate-180">
              <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path>
              </svg>
            </div>
          </summary>
          <p className="pb-2 text-[#4e6797] text-sm leading-normal">
            Questo pass ti garantisce l'accesso al concorso a premi per un orologio di lusso. Il concorso si
            concluderà il {deadline}. Per maggiori dettagli, consulta i termini e le condizioni.
          </p>
        </details>
      </div>

      {/* CTA + disclaimer come nel design */}
      <div className="flex px-4 py-3">
        <button
          type="button"
          className="flex h-12 min-w-[84px] max-w-[480px] flex-1 cursor-pointer items-center justify-center overflow-hidden rounded-xl bg-[#081c44] px-5 text-base font-bold leading-normal tracking-[0.015em] text-[#f8f9fc]"
          onClick={() => {
            // qui puoi aprire il tuo bottom sheet/checkout
            // per ora un fallback semplice:
            if (typeof window !== 'undefined') window.alert('Apertura checkout / bottom sheet');
          }}
        >
          <span className="truncate">Attiva Pass</span>
        </button>
      </div>
      <p className="px-4 pb-3 pt-1 text-center text-[#4e6797] text-sm leading-normal">
        Acquistando questo pass, accetti i termini e le condizioni del concorso.
      </p>
    </div>
  );
}
