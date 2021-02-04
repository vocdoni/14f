import Layout from "../components/layout";

export default function Booth() {
  return (
    <Layout>
      <header>
        <h1 className="mt-8 mb-6 text-lg font-bold leading-none tracking-tight text-center text-gray-900 sm:text-3xl lg:text-4xl sm:mt-12 sm:mb-8">
          Tria el teu emoji preferit!
        </h1>
      </header>
      <div className="grid grid-cols-4 gap-4 px-4 sm:px-6 md:px-8 mb-14 sm:mb-20 xl:mb-8">
        <button className="px-4 py-4 text-3xl shadow bg-translucent">🍍<div className="pt-1 text-xs">CUP</div></button>
        <button className="px-4 py-4 text-3xl shadow bg-translucent">🍋<div className="pt-1 text-xs">ERC</div></button>
        <button className="px-4 py-4 text-3xl shadow bg-translucent">🍈<div className="pt-1 text-xs">JxCAT</div></button>
        <button className="px-4 py-4 text-3xl shadow bg-translucent">🌹<div className="pt-1 text-xs">PSC</div></button>
        <button className="px-4 py-4 text-3xl shadow bg-translucent">🍊<div className="pt-1 text-xs">Cs</div></button>
        <button className="px-4 py-4 text-3xl shadow bg-translucent">🍆<div className="pt-1 text-xs">ECP</div></button>
        <button className="px-4 py-4 text-3xl shadow bg-translucent">💧<div className="pt-1 text-xs">PPC</div></button>
        <button className="px-4 py-4 text-3xl shadow bg-translucent">🥑<div className="pt-1 text-xs">PDeCAT</div></button>
        <button className="px-4 py-4 text-3xl shadow bg-translucent">🥦<div className="pt-1 text-xs">Vox</div></button>
        <button className="px-4 py-4 text-3xl shadow bg-translucent">🍏<div className="pt-1 text-xs">PNC</div></button>
        <button className="px-4 py-4 text-3xl shadow bg-translucent">🍌<div className="pt-1 text-xs">Primàries</div></button>
        <button className="px-4 py-4 text-3xl shadow bg-translucent">🧊<div className="pt-1 text-xs">FNC</div></button>
        <button className="px-4 py-4 text-3xl shadow bg-translucent">🌶<div className="pt-1 text-xs">PCTC</div></button>
        <button className="px-4 py-4 text-3xl shadow bg-translucent">🍅<div className="pt-1 text-xs">IZQ</div></button>
        <button className="px-4 py-4 text-3xl shadow bg-translucent">🍉<div className="pt-1 text-xs">RECORTES CERO</div></button>
        <button className="px-4 py-4 text-3xl shadow bg-translucent">🧄<div className="pt-1 text-xs">UEP</div></button>
        <button className="px-4 py-4 text-3xl shadow bg-translucent">🧁<div className="pt-1 text-xs">PUM+J</div></button>
        <button className="px-4 py-4 text-3xl shadow bg-translucent">🥟<div className="pt-1 text-xs">ALIANZA C V</div></button>
        <button className="px-4 py-4 text-3xl shadow bg-translucent">🌽<div className="pt-1 text-xs">SCAT</div></button>
        <button className="px-4 py-4 text-3xl shadow bg-translucent">🍙<div className="pt-1 text-xs">SOM TERRES DE L'EBRE</div></button>
        <button className="px-4 py-4 text-3xl shadow bg-translucent">🍄<div className="pt-1 text-xs">MCR</div></button>
        <button className="px-4 py-4 text-3xl shadow bg-translucent">🥘<div className="pt-1 text-xs">UNIDOS SI</div></button>
      </div>
    </Layout>
  );
}
