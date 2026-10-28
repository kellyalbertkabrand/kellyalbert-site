// Diagnóstico Marca com Essência©: código + perfil → 35 respostas escritas → Inteligência Artificial → resultado.
(function () {
  "use strict";

  var CHAVE = "ka_diagnostico_v1";
  var WHATSAPP = "https://wa.me/5551993163333?text=" + encodeURIComponent("Oi, Kelly! Fiz o Diagnóstico Marca com Essência© e quero conversar sobre o resultado.");

  var conteudo = null;
  var perguntas = []; // lista achatada: { dim, indice, texto }
  var estado = { codigo: "", perfil: {}, respostas: {}, atual: 0, id: null };
  var acompanhando = null;

  // ---------- utilidades ----------
  function $(id) { return document.getElementById(id); }

  function lerEstado() {
    try { var s = JSON.parse(localStorage.getItem(CHAVE)); if (s) estado = Object.assign(estado, s); } catch (e) {}
  }
  function salvarEstado() {
    try { localStorage.setItem(CHAVE, JSON.stringify(estado)); } catch (e) {}
  }

  function mostrarTela(nome) {
    document.querySelectorAll("[data-tela]").forEach(function (el) {
      el.classList.toggle("dg-oculto", el.getAttribute("data-tela") !== nome);
    });
    $("recomecar").classList.toggle("dg-oculto", nome !== "pergunta");
    window.scrollTo(0, 0);
  }

  function el(tag, attrs) {
    var n = document.createElement(tag);
    attrs = attrs || {};
    Object.keys(attrs).forEach(function (k) {
      if (k === "texto") n.textContent = attrs[k];
      else if (k === "class") n.className = attrs[k];
      else n.setAttribute(k, attrs[k]);
    });
    for (var i = 2; i < arguments.length; i++) if (arguments[i]) n.appendChild(arguments[i]);
    return n;
  }

  function paragrafos(texto) {
    var caixa = el("div", { class: "dg-texto" });
    String(texto || "").split(/\n\s*\n/).forEach(function (t) {
      if (t.trim()) caixa.appendChild(el("p", { texto: t.trim() }));
    });
    return caixa;
  }

  function api(caminho, corpo) {
    var opcoes = corpo
      ? { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(corpo) }
      : { cache: "no-store" };
    return fetch(caminho, opcoes).then(function (r) {
      return r.json().catch(function () { return {}; }).then(function (dados) { return { ok: r.ok, status: r.status, dados: dados }; });
    });
  }

  function carregarConteudo() {
    if (conteudo) return Promise.resolve();
    return fetch("/api/diagnostico/conteudo").then(function (r) { return r.json(); }).then(function (c) {
      conteudo = c;
      perguntas = [];
      c.dimensoes.forEach(function (d) {
        d.perguntas.forEach(function (texto, i) { perguntas.push({ dim: d, indice: i, texto: texto }); });
      });
    });
  }

  function resposta(item) {
    var lista = estado.respostas[item.dim.id] || [];
    return lista[item.indice] || "";
  }
  function respondida(item) { return resposta(item).trim().length >= 3; }

  // ---------- início ----------
  function telaInicio() {
    var caixa = $("campos-perfil");
    caixa.innerHTML = "";
    conteudo.perfil.forEach(function (campo) {
      var id = "perfil-" + campo.id;
      caixa.appendChild(el("label", { for: id, texto: campo.rotulo + (campo.obrigatorio ? "" : " (opcional)") }));
      var input = el("input", { id: id, type: "text", maxlength: "200" });
      input.value = estado.perfil[campo.id] || "";
      if (campo.obrigatorio) input.required = true;
      caixa.appendChild(input);
    });
    $("codigo").value = estado.codigo || "";
    mostrarTela("inicio");
  }

  function avisoInicio(texto) {
    var a = $("aviso-inicio");
    a.textContent = texto;
    a.classList.remove("dg-oculto");
    a.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  $("form-inicio").addEventListener("submit", function (ev) {
    ev.preventDefault();
    var botao = ev.target.querySelector("button[type=submit]");
    var codigo = $("codigo").value.trim().toUpperCase();
    botao.disabled = true;
    api("/api/diagnostico/codigo", { codigo: codigo }).then(function (r) {
      botao.disabled = false;
      if (!r.dados.valido) return avisoInicio("Não encontramos este código. Confira se digitou igual ao que você recebeu.");
      if (r.dados.restantes <= 0) return avisoInicio("Este código já foi usado. Se precisar de ajuda, fale com a gente pelo WhatsApp.");
      estado.codigo = codigo;
      conteudo.perfil.forEach(function (campo) { estado.perfil[campo.id] = $("perfil-" + campo.id).value.trim(); });
      salvarEstado();
      telaPergunta(estado.atual || 0);
    }).catch(function () {
      botao.disabled = false;
      avisoInicio("Não conseguimos conferir o código agora. Verifique a sua internet e tente de novo.");
    });
  });

  // ---------- perguntas ----------
  function telaPergunta(indice) {
    estado.atual = indice;
    salvarEstado();
    var item = perguntas[indice];
    var area = $("p-resposta");

    $("p-cap").textContent = "Cap. " + String(item.dim.capitulo).padStart(2, "0") + " · " + item.dim.nome;
    $("p-barra").style.width = Math.round((indice / perguntas.length) * 100) + "%";
    $("p-numero").textContent = "Pergunta " + (indice + 1) + " de " + perguntas.length;
    $("p-texto").textContent = item.texto;
    area.maxLength = conteudo.maxCaracteres;
    area.value = resposta(item);

    function atualizar() {
      $("p-avancar").disabled = !respondida(item);
      $("p-caracteres").textContent = area.value.length + " / " + conteudo.maxCaracteres;
    }
    area.oninput = function () {
      if (!estado.respostas[item.dim.id]) estado.respostas[item.dim.id] = [];
      estado.respostas[item.dim.id][item.indice] = area.value;
      salvarEstado();
      atualizar();
    };

    var ultima = indice === perguntas.length - 1;
    $("p-avancar").textContent = ultima ? "Gerar o meu diagnóstico" : "Avançar";
    $("p-avancar").onclick = function () {
      if (!respondida(item)) return;
      if (ultima) enviar(); else telaPergunta(indice + 1);
    };
    $("p-voltar").onclick = function () { if (indice === 0) telaInicio(); else telaPergunta(indice - 1); };
    atualizar();
    mostrarTela("pergunta");
    setTimeout(function () { area.focus(); }, 60);
  }

  $("recomecar").addEventListener("click", function () {
    if (!confirm("Apagar as respostas deste aparelho e recomeçar?")) return;
    estado = { codigo: "", perfil: {}, respostas: {}, atual: 0, id: null };
    salvarEstado();
    telaInicio();
  });

  // ---------- envio e acompanhamento ----------
  function enviar() {
    for (var i = 0; i < perguntas.length; i++) if (!respondida(perguntas[i])) return telaPergunta(i);
    mostrarTela("gerando");
    api("/api/diagnostico/iniciar", { codigo: estado.codigo, perfil: estado.perfil, respostas: estado.respostas }).then(function (r) {
      if (!r.ok) {
        if (r.status === 403 || r.status === 429) return telaErro("O código de acesso não é mais válido para gerar um diagnóstico. Fale com a gente pelo WhatsApp que a gente resolve.", false);
        if (r.dados.problemas && r.dados.problemas.length) return telaInicio();
        return telaErro(null, false);
      }
      estado.id = r.dados.id;
      salvarEstado();
      history.replaceState(null, "", "/diagnostico/?id=" + encodeURIComponent(estado.id));
      acompanhar(estado.id);
    }).catch(function () { telaErro(null, false); });
  }

  function acompanhar(id) {
    mostrarTela("gerando");
    clearInterval(acompanhando);
    var tentativas = 0;
    function verificar() {
      tentativas++;
      api("/api/diagnostico/resultado?id=" + encodeURIComponent(id)).then(function (r) {
        if (r.status === 404) { clearInterval(acompanhando); return telaErro("Não encontramos este diagnóstico.", false); }
        if (r.dados.status === "pronto") { clearInterval(acompanhando); return renderResultado(r.dados); }
        if (r.dados.status === "erro") { clearInterval(acompanhando); return telaErro(null, true, id); }
        if (tentativas > 75) {
          clearInterval(acompanhando);
          telaErro("O diagnóstico está demorando mais que o normal. Toque em tentar de novo daqui a pouco. As suas respostas estão salvas.", true, id);
        }
      });
    }
    verificar();
    acompanhando = setInterval(verificar, 4000);
  }

  function telaErro(texto, podeTentar, id) {
    $("erro-texto").textContent = texto || "Não conseguimos gerar o seu diagnóstico agora. As suas respostas estão salvas.";
    $("tentar-de-novo").onclick = function () {
      if (podeTentar && id) {
        api("/api/diagnostico/iniciar", { id: id }).then(function () { acompanhar(id); });
      } else if (estado.id) {
        acompanhar(estado.id);
      } else if (!perguntas.length) {
        location.reload();
      } else {
        enviar();
      }
    };
    mostrarTela("erro");
  }

  // ---------- resultado ----------
  function renderResultado(r) {
    var raiz = $("resultado");
    raiz.innerHTML = "";
    var res = r.resultado || {};
    var marca = (r.perfil && r.perfil.marca) || "a sua marca";

    var nota = el("div", { class: "dg-nota", texto: String(r.notaGeral) });
    nota.appendChild(el("small", { texto: "/100" }));
    raiz.appendChild(el("section", { class: "dg-secao amb-marinho dg-reticula" }, el("div", { class: "dg-wrap" },
      el("span", { class: "dg-rotulo", texto: "Diagnóstico Marca com Essência© · " + marca }),
      nota,
      el("h2", { texto: (r.faixa && r.faixa.nome) || "" }),
      el("p", { class: "dg-suave", texto: (r.faixa && r.faixa.resumo) || "" }),
      el("p", { class: "dg-sintese", texto: res.frase_sintese || "" })
    )));

    var mapa = el("div", { class: "dg-wrap" }, el("span", { class: "dg-rotulo", texto: "Mapa da sua marca" }));
    (res.dimensoes || []).forEach(function (d) {
      var trilho = el("div", { class: "dg-trilho" }, el("span"));
      trilho.firstChild.style.width = d.nota + "%";
      mapa.appendChild(el("div", { class: "dg-barra" },
        el("div", { class: "dg-barra-topo" }, el("span", { texto: d.nome }), el("span", { texto: String(d.nota) })),
        trilho));
    });
    raiz.appendChild(el("section", { class: "dg-secao dg-azul2" }, mapa));

    raiz.appendChild(el("section", { class: "dg-secao" }, el("div", { class: "dg-wrap" },
      el("span", { class: "dg-rotulo", texto: "Leitura geral" }),
      paragrafos(res.leitura_geral),
      el("div", { class: "dg-cartao dg-cartao-borda", style: "margin-top: 24px;" },
        el("span", { class: "dg-rotulo", texto: "O que as suas palavras revelam" }),
        paragrafos(res.coerencia))
    )));

    var blocos = el("div", { class: "dg-wrap" }, el("span", { class: "dg-rotulo", texto: "Dimensão por dimensão" }));
    (res.dimensoes || []).forEach(function (d) {
      blocos.appendChild(el("div", { class: "dg-cartao" },
        el("p", { class: "dg-cap", texto: "Cap. " + String(d.capitulo).padStart(2, "0") }),
        el("h3", { texto: d.nome }),
        el("div", { class: "dg-nota-dim", texto: String(d.nota) }),
        el("p", { style: "margin-top: 12px;", texto: d.leitura }),
        el("h4", { texto: "Ponto forte" }), el("p", { texto: d.ponto_forte }),
        el("h4", { texto: "Ponto cego" }), el("p", { texto: d.ponto_cego }),
        el("h4", { texto: "Primeiro passo" }), el("p", { texto: d.primeiro_passo })));
    });
    raiz.appendChild(el("section", { class: "dg-secao dg-painel" }, blocos));

    var lista = el("ol", { class: "dg-passos" });
    (res.prioridades || []).forEach(function (p) { lista.appendChild(el("li", { texto: p })); });
    raiz.appendChild(el("section", { class: "dg-secao dg-azul2" }, el("div", { class: "dg-wrap" },
      el("span", { class: "dg-rotulo", texto: "Suas 3 prioridades" }), lista)));

    var livros = el("div", { class: "dg-wrap" }, el("span", { class: "dg-rotulo", texto: "Bibliografia indicada para a sua marca" }));
    (res.livros || []).forEach(function (b) {
      livros.appendChild(el("div", { class: "dg-cartao dg-cartao-borda" },
        el("h3", { texto: b.titulo }),
        el("p", { class: "dg-suave dg-pequeno", texto: b.autor }),
        el("p", { texto: b.motivo })));
    });
    raiz.appendChild(el("section", { class: "dg-secao" }, livros));

    var pdf = el("button", { class: "dg-botao", type: "button", texto: "Salvar em PDF" });
    pdf.addEventListener("click", function () { window.print(); });
    var copiar = el("button", { class: "dg-botao-texto", type: "button", texto: "Copiar o link deste resultado" });
    copiar.addEventListener("click", function () {
      var link = location.origin + "/diagnostico/?id=" + encodeURIComponent(new URLSearchParams(location.search).get("id") || estado.id);
      (navigator.clipboard ? navigator.clipboard.writeText(link) : Promise.reject()).then(
        function () { copiar.textContent = "Link copiado"; },
        function () { prompt("Copie o link do seu resultado:", link); });
    });
    var data = r.geradoEm ? new Date(r.geradoEm).toLocaleDateString("pt-BR") : "";
    raiz.appendChild(el("section", { class: "dg-secao dg-painel dg-nao-imprimir" }, el("div", { class: "dg-wrap dg-centro" },
      el("h2", { texto: "Quer transformar esta leitura em direção?" }),
      el("p", { texto: "O diagnóstico mostra onde a sua marca está. O próximo passo é decidir para onde ela vai." }),
      pdf,
      el("p", { style: "margin-top: 16px;" }, el("a", { class: "dg-botao dg-botao-contorno", href: WHATSAPP, target: "_blank", rel: "noopener", texto: "Falar com a KA" })),
      el("p", {}, copiar),
      el("p", { class: "dg-suave dg-pequeno", texto: data ? "Gerado em " + data : "" })
    )));

    mostrarTela("resultado");
  }

  // ---------- partida ----------
  lerEstado();
  var idNaUrl = new URLSearchParams(location.search).get("id");
  if (idNaUrl) { acompanhar(idNaUrl); return; }
  if (estado.id) {
    history.replaceState(null, "", "/diagnostico/?id=" + encodeURIComponent(estado.id));
    acompanhar(estado.id);
    return;
  }
  carregarConteudo().then(function () {
    var perfilOk = conteudo.perfil.every(function (c) { return !c.obrigatorio || (estado.perfil[c.id] || "").trim(); });
    if (estado.codigo && perfilOk) telaPergunta(Math.min(estado.atual || 0, perguntas.length - 1));
    else telaInicio();
  }).catch(function () {
    telaErro("Não conseguimos carregar o diagnóstico. Atualize a página para tentar de novo.", false);
  });
})();
