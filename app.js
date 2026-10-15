(() => {
  const L = window.LOJA, P = window.PRODUTOS, CATS = window.CATEGORIAS;
  const $ = s => document.querySelector(s);
  const $$ = s => [...document.querySelectorAll(s)];
  const brl = n => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  const waLink = msg => `https://wa.me/${L.whatsapp}?text=${encodeURIComponent(msg)}`;

  // contatos
  $$("[data-wa]").forEach(a => { a.href = waLink(a.dataset.wa); a.target = "_blank"; a.rel = "noopener"; });
  $("#cEnd").textContent = L.endereco;
  $("#cTel").textContent = L.telefone + " (WhatsApp)"; $("#cTel").href = waLink("Olá! Vim pelo site da Styllu's.");
  $("#cHora").innerHTML = L.horarios.map(([d, h]) => `<div class="h"><span>${d}</span><b>${h}</b></div>`).join("");
  $("#mapa").src = L.mapa;
  $("#fIg").href = L.instagram;

  // filtros: categoria, marca, busca
  let filtro = { cat: "", marca: "", q: "" };
  const marcas = [...new Set(P.map(p => p.marca))];
  $("#cats").innerHTML = `<div class="wrap cats__in"><button data-cat="" class="on">Todos</button>${CATS.map(c => `<button data-cat="${c}">${c}</button>`).join("")}<button data-ir="marcas">Marcas</button></div>`;
  $("#marcas-lista").innerHTML = marcas.map(m => `<button data-marca="${m}">${m}</button>`).join("");

  const sem = s => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  const lista = () => P.filter(p =>
    (!filtro.cat || p.cat === filtro.cat) &&
    (!filtro.marca || p.marca === filtro.marca) &&
    (!filtro.q || sem(`${p.nome} ${p.marca} ${p.cat}`).includes(sem(filtro.q))));

  // sacola (lista de pedido)
  const KEY = "styllus_lista";
  let sacola = {};
  try { sacola = JSON.parse(localStorage.getItem(KEY)) || {}; } catch {}
  const salvar = () => { try { localStorage.setItem(KEY, JSON.stringify(sacola)); } catch {} };
  const prod = n => P.find(p => p.nome === n);

  const renderGrade = () => {
    const itens = lista();
    $("#vitTitulo").textContent = filtro.q ? `Resultados para “${filtro.q}”` : filtro.marca || filtro.cat || "Novidades";
    $("#grade").innerHTML = itens.map(p => {
      const q = sacola[p.nome] || 0;
      return `<article class="card">
        ${p.tag ? `<span class="tag">${p.tag}</span>` : ""}
        <div class="card__img"><img src="${p.img}" alt="${p.nome}" loading="lazy"></div>
        <small class="card__marca">${p.marca}</small>
        <h3>${p.nome}</h3>
        <p class="card__desc">${p.desc || ""}</p>
        <div class="card__preco">${p.preco ? brl(p.preco) : "Consulte o preço"}</div>
        ${q ? `<div class="qtd"><button data-n="${p.nome}" data-d="-1" aria-label="Tirar">−</button><b>${q}</b><button data-n="${p.nome}" data-d="1" aria-label="Adicionar">+</button></div>`
            : `<button class="btn btn--vinho btn--full" data-n="${p.nome}" data-d="1">Quero este</button>`}
      </article>`;
    }).join("");
    $("#vazio").hidden = itens.length > 0 && !filtro.q;
  };
  const renderSacola = () => {
    const qtd = Object.values(sacola).reduce((a, b) => a + b, 0);
    $("#sacolaBtn").hidden = !qtd;
    $("#sacolaQtd").textContent = $("#qtdTop").textContent = qtd;
    $("#lista").innerHTML = Object.entries(sacola).map(([n, q]) => {
      const p = prod(n);
      return `<li><span>${q}× ${n} <small>${p?.marca || ""}</small></span><b>${p?.preco ? brl(p.preco * q) : ""}</b></li>`;
    }).join("") || "<li>Sua lista está vazia. Toque em “Quero este” nos produtos.</li>";
    const tudoComPreco = qtd && Object.keys(sacola).every(n => prod(n)?.preco);
    $("#totalBox").hidden = !tudoComPreco;
    if (tudoComPreco) $("#total").textContent = brl(Object.entries(sacola).reduce((s, [n, q]) => s + prod(n).preco * q, 0));
  };
  const render = () => { renderGrade(); renderSacola(); };

  $("#cats").onclick = e => {
    const b = e.target.closest("button"); if (!b) return;
    if (b.dataset.ir) { $("#" + b.dataset.ir).scrollIntoView(); return; }
    filtro = { cat: b.dataset.cat, marca: "", q: "" }; $("#busca").value = "";
    $$("#cats button").forEach(x => x.classList.toggle("on", x === b));
    renderGrade(); $("#vitrine").scrollIntoView();
  };
  $("#marcas-lista").onclick = e => {
    const b = e.target.closest("button"); if (!b) return;
    filtro = { cat: "", marca: b.dataset.marca, q: "" }; $("#busca").value = "";
    $$("#cats button").forEach(x => x.classList.remove("on"));
    renderGrade(); $("#vitrine").scrollIntoView();
  };
  $("#busca").oninput = e => { filtro = { cat: "", marca: "", q: e.target.value.trim() }; renderGrade(); };
  $("#busca").onkeydown = e => { if (e.key === "Enter") $("#vitrine").scrollIntoView(); };

  $("#grade").onclick = e => {
    const b = e.target.closest("button[data-n]"); if (!b) return;
    const n = b.dataset.n, q = Math.max(0, (sacola[n] || 0) + +b.dataset.d);
    if (q) sacola[n] = q; else delete sacola[n];
    salvar(); render();
  };

  // painel
  const abrir = () => $("#painel").hidden = false;
  $("#sacolaBtn").onclick = $("#sacolaTop").onclick = abrir;
  $("#fechar").onclick = () => $("#painel").hidden = true;
  $("#painel").onclick = e => { if (e.target.id === "painel") $("#painel").hidden = true; };

  const seg = $("#segPed"); seg.dataset.v = "Retirada na loja";
  seg.onclick = e => {
    const b = e.target.closest("button"); if (!b) return;
    seg.querySelectorAll("button").forEach(x => x.classList.toggle("on", x === b));
    seg.dataset.v = b.dataset.v; $(".endPed").hidden = b.dataset.v !== "Entrega";
  };

  $("#formPed").onsubmit = e => {
    e.preventDefault();
    const f = e.target, modo = seg.dataset.v;
    const itens = Object.entries(sacola).map(([n, q]) => `• ${q}x ${n} (${prod(n)?.marca || ""})`);
    if (!itens.length) { $("#painel").hidden = true; $("#vitrine").scrollIntoView(); return; }
    let msg = `Olá, Styllu's! Montei esta lista pelo site:\n\n${itens.join("\n")}\n\nPode me passar preço e disponibilidade?\n${modo}`;
    if (modo === "Entrega" && f.end.value) msg += `: ${f.end.value}`;
    msg += `\nNome: ${f.nome.value}`;
    if (f.obs.value) msg += `\nObs.: ${f.obs.value}`;
    window.open(waLink(msg), "_blank", "noopener");
  };

  render();
})();
