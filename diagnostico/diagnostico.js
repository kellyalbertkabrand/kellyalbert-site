// Diagnóstico Marca com Essência©: código + perfil → 35 respostas escritas → Inteligência Artificial → resultado.
(function () {
  "use strict";

  var CHAVE = "ka_diagnostico_v1";
  var VERSAO_RESULTADO = 4; // igual à do servidor (netlify/diagnostico/ia.mjs)
  var SITUACOES = { tem: "Tem", tem_em_parte: "Tem em parte", ainda_nao_tem: "Ainda não tem" };
  var WHATSAPP = "https://wa.me/5551993163333?text=" + encodeURIComponent("Oi, Kelly! Fiz o Diagnóstico Marca com Essência© e quero conversar sobre o resultado.");

  var conteudo = null;
  var perguntas = []; // lista achatada: { dim, indice, texto }
  var estado = { codigo: "", perfil: {}, respostas: {}, atual: 0, id: null };
  var CHAVE_PRINTS = "ka_diagnostico_prints_v1";
  var MAX_PRINTS = 6;
  var prints = []; // data URLs JPEG já reduzidas
  var printsSoNaMemoria = false;

  function lerPrints() {
    try { prints = JSON.parse(localStorage.getItem(CHAVE_PRINTS)) || []; } catch (e) { prints = []; }
  }
  function salvarPrints() {
    try { localStorage.setItem(CHAVE_PRINTS, JSON.stringify(prints)); printsSoNaMemoria = false; }
    catch (e) { printsSoNaMemoria = true; }
  }

  // Reduz a imagem para no máximo 1280 px e JPEG, para o envio ficar leve.
  function reduzirImagem(arquivo) {
    return new Promise(function (ok, falha) {
      var leitor = new FileReader();
      leitor.onerror = falha;
      leitor.onload = function () {
        var img = new Image();
        img.onerror = falha;
        img.onload = function () {
          var escala = Math.min(1, 1280 / Math.max(img.width, img.height));
          var tela = document.createElement("canvas");
          tela.width = Math.round(img.width * escala);
          tela.height = Math.round(img.height * escala);
          tela.getContext("2d").drawImage(img, 0, 0, tela.width, tela.height);
          ok(tela.toDataURL("image/jpeg", 0.8));
        };
        img.src = leitor.result;
      };
      leitor.readAsDataURL(arquivo);
    });
  }

  function montarPrints(caixa) {
    var miniaturas = el("div", { class: "dg-prints" });
    var aviso = el("p", { class: "dg-suave dg-pequeno" });
    var entrada = el("input", { type: "file", accept: "image/*", multiple: "multiple", class: "dg-oculto" });
    var botao = el("button", { class: "dg-botao dg-botao-contorno", type: "button", texto: "Adicionar prints" });

    function desenhar() {
      miniaturas.innerHTML = "";
      prints.forEach(function (src, i) {
        var tirar = el("button", { type: "button", class: "dg-print-tirar", "aria-label": "Remover print " + (i + 1), texto: "×" });
        tirar.addEventListener("click", function () { prints.splice(i, 1); salvarPrints(); desenhar(); });
        miniaturas.appendChild(el("div", { class: "dg-print" }, el("img", { src: src, alt: "Print " + (i + 1) }), tirar));
      });
      botao.classList.toggle("dg-oculto", prints.length >= MAX_PRINTS);
      aviso.textContent = prints.length
        ? prints.length + " de " + MAX_PRINTS + " prints." + (printsSoNaMemoria ? " Atenção: os prints não couberam na memória do navegador e ficam guardados só enquanto esta página estiver aberta." : "")
        : "Até " + MAX_PRINTS + " imagens.";
    }

    botao.addEventListener("click", function () { entrada.click(); });
    entrada.addEventListener("change", function () {
      var arquivos = Array.prototype.slice.call(entrada.files, 0, MAX_PRINTS - prints.length);
      botao.disabled = true;
      Promise.all(arquivos.map(reduzirImagem)).then(function (novos) {
        prints = prints.concat(novos).slice(0, MAX_PRINTS);
        salvarPrints();
      }).catch(function () {
        aviso.textContent = "Não conseguimos ler uma das imagens. Tente outro arquivo.";
      }).then(function () { botao.disabled = false; entrada.value = ""; desenhar(); });
    });

    caixa.appendChild(el("label", { texto: "Prints das redes (opcional)" }));
    caixa.appendChild(el("p", { class: "dg-suave dg-pequeno", style: "margin-top: -4px;", texto: "Ex.: a página inicial do Instagram com a bio e o feed, um post importante, o perfil do LinkedIn. A Inteligência Artificial vê as imagens e avalia também o visual da marca." }));
    caixa.appendChild(miniaturas);
    caixa.appendChild(el("p", {}, botao));
    caixa.appendChild(entrada);
    caixa.appendChild(aviso);
    desenhar();
  }
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
        d.perguntas.forEach(function (p, i) { perguntas.push({ dim: d, indice: i, texto: p.texto, ajuda: p.ajuda || "" }); });
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
    var tituloLinks = false;
    conteudo.perfil.forEach(function (campo) {
      var id = "perfil-" + campo.id;
      if (campo.link && !tituloLinks) {
        tituloLinks = true;
        caixa.appendChild(el("div", { class: "dg-aviso", style: "margin-top: 8px;" },
          el("strong", { texto: "Site e redes sociais (opcional)" }),
          el("p", { style: "margin: 4px 0 0;", texto: "A Inteligência Artificial compara o que você responder com o que a sua marca mostra para o mercado. O site ela visita sozinha. As redes sociais costumam bloquear esse acesso, então, para elas, envie prints ou cole a bio e algumas legendas." })));
      }
      caixa.appendChild(el("label", { for: id, texto: campo.rotulo + (campo.obrigatorio ? "" : " (opcional)") }));
      var input = campo.longo
        ? el("textarea", { id: id, maxlength: "4000", style: "min-height: 140px;" })
        : el("input", { id: id, type: "text", maxlength: "300" });
      if (campo.exemplo) input.placeholder = "Ex.: " + campo.exemplo;
      input.value = estado.perfil[campo.id] || "";
      if (campo.obrigatorio) input.required = true;
      caixa.appendChild(input);
    });
    montarPrints(caixa);
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
  var voltando = false; // true quando a pessoa reabre a página com respostas já salvas

  function avisoSalvo(titulo, texto) {
    $("p-aviso-titulo").textContent = titulo;
    $("p-aviso-texto").textContent = texto;
  }

  function horaAgora() {
    return new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
  }

  function telaPergunta(indice) {
    estado.atual = indice;
    salvarEstado();
    var item = perguntas[indice];
    var area = $("p-resposta");

    $("p-cap").textContent = "Cap. " + String(item.dim.capitulo).padStart(2, "0") + " · " + item.dim.nome;
    $("p-barra").style.width = Math.round((indice / perguntas.length) * 100) + "%";
    $("p-numero").textContent = "Pergunta " + (indice + 1) + " de " + perguntas.length;
    $("p-texto").textContent = item.texto;
    $("p-ajuda").textContent = item.ajuda;
    $("p-ajuda").classList.toggle("dg-oculto", !item.ajuda);
    area.maxLength = conteudo.maxCaracteres;
    area.value = resposta(item);
    $("p-salvo").textContent = "Salvo neste aparelho";

    if (voltando) {
      var primeiro = (estado.perfil.nome || "").split(" ")[0];
      avisoSalvo("Que bom te ver de volta" + (primeiro ? ", " + primeiro : "") + ".",
        "Você parou na pergunta " + (indice + 1) + " de " + perguntas.length + ". As suas respostas anteriores estão salvas.");
      voltando = false;
    } else {
      avisoSalvo("As suas respostas são salvas automaticamente.",
        "Pode fechar a página quando quiser. Ao voltar a kellyalbert.com.br/diagnostico, neste mesmo aparelho e navegador, você continua de onde parou.");
    }

    function atualizar() {
      $("p-avancar").disabled = !respondida(item);
      $("p-caracteres").textContent = area.value.length + " / " + conteudo.maxCaracteres;
    }
    area.oninput = function () {
      if (!estado.respostas[item.dim.id]) estado.respostas[item.dim.id] = [];
      estado.respostas[item.dim.id][item.indice] = area.value;
      salvarEstado();
      $("p-salvo").textContent = "Salvo às " + horaAgora();
      atualizar();
    };

    var ultima = indice === perguntas.length - 1;
    $("p-avancar").textContent = ultima ? "Gerar o meu diagnóstico" : "Avançar";
    $("p-avancar").onclick = function () {
      if (!respondida(item)) return;
      if (ultima) enviar(); else telaPergunta(indice + 1);
    };
    $("p-depois").onclick = function () {
      salvarEstado();
      avisoSalvo("Pronto, está tudo salvo.",
        "Você parou na pergunta " + (indice + 1) + " de " + perguntas.length + ". Para continuar, abra kellyalbert.com.br/diagnostico neste mesmo aparelho e navegador. Pode fechar esta página.");
      window.scrollTo({ top: 0, behavior: "smooth" });
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
    prints = [];
    salvarPrints();
    telaInicio();
  });

  // ---------- envio e acompanhamento ----------
  function enviar() {
    for (var i = 0; i < perguntas.length; i++) if (!respondida(perguntas[i])) return telaPergunta(i);
    mostrarTela("gerando");
    api("/api/diagnostico/iniciar", { codigo: estado.codigo, perfil: estado.perfil, respostas: estado.respostas, prints: prints }).then(function (r) {
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
  // Gera um dos dois PDFs (pela janela de impressão do navegador: "Salvar como PDF").
  function imprimir(tipo, marca) {
    var tituloOriginal = document.title;
    document.body.setAttribute("data-imprimir", tipo);
    document.title = (tipo === "respostas" ? "Perguntas e respostas" : "Diagnostico Marca com Essencia") + " - " + marca;
    function restaurar() {
      document.body.removeAttribute("data-imprimir");
      document.title = tituloOriginal;
      window.removeEventListener("afterprint", restaurar);
    }
    window.addEventListener("afterprint", restaurar);
    window.print();
  }

  // Documento com as 35 perguntas e as respostas da pessoa (aparece só no PDF de respostas).
  function documentoRespostas(r) {
    var p = r.perfil || {};
    var data = r.geradoEm ? new Date(r.geradoEm).toLocaleDateString("pt-BR") : "";
    var wrap = el("div", { class: "dg-wrap" },
      el("div", { class: "dg-resp-cabecalho" },
        el("span", { class: "dg-rotulo", texto: "Diagnóstico Marca com Essência©" }),
        el("h2", { texto: "Perguntas e respostas" }),
        el("p", { texto: [p.marca, p.segmento].filter(Boolean).join(" · ") }),
        el("p", { class: "dg-suave dg-pequeno", texto: "Respondido por " + (p.nome || "") + (p.tempo ? " · Marca com " + p.tempo : "") + (data ? " · " + data : "") })));
    conteudo.dimensoes.forEach(function (d) {
      var bloco = el("div", { class: "dg-resp-dim" },
        el("p", { class: "dg-cap", texto: "Cap. " + String(d.capitulo).padStart(2, "0") }),
        el("h3", { texto: d.nome }));
      d.perguntas.forEach(function (pergunta, i) {
        var lista = (r.respostas && r.respostas[d.id]) || [];
        bloco.appendChild(el("div", { class: "dg-resp-item" },
          el("p", { class: "dg-resp-pergunta", texto: (i + 1) + ". " + pergunta.texto }),
          el("p", { class: "dg-resp-texto", texto: lista[i] || "" })));
      });
      wrap.appendChild(bloco);
    });
    return el("section", { class: "dg-secao dg-doc-resp" }, wrap);
  }

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
        paragrafos(res.coerencia)),
      res.presenca_digital ? el("div", { class: "dg-cartao dg-cartao-borda" },
        el("span", { class: "dg-rotulo", texto: "O que a sua presença digital mostra" }),
        paragrafos(res.presenca_digital),
        el("p", { class: "dg-suave dg-pequeno", texto: "Fontes avaliadas: " + [
          (res.links_avaliados || []).join(" · "),
          res.prints_avaliados ? res.prints_avaliados + " print(s)" : "",
          res.texto_redes_avaliado ? "bio e legendas coladas" : ""].filter(Boolean).join(" · ") })) : null
    )));

    var blocos = el("div", { class: "dg-wrap" }, el("span", { class: "dg-rotulo", texto: "Dimensão por dimensão" }));
    (res.dimensoes || []).forEach(function (d) {
      blocos.appendChild(el("div", { class: "dg-cartao" },
        el("p", { class: "dg-cap", texto: "Cap. " + String(d.capitulo).padStart(2, "0") }),
        el("h3", { texto: d.nome }),
        el("div", { class: "dg-nota-dim", texto: String(d.nota) }),
        d.conceito ? el("div", { class: "dg-conceito" },
          el("h4", { texto: "O que é " + d.conceito_nome + "?" }), el("p", { texto: d.conceito })) : null,
        d.situacao ? el("p", { class: "dg-situacao" },
          el("span", { class: "dg-selo dg-selo-" + d.situacao, texto: "A sua marca: " + (SITUACOES[d.situacao] || d.situacao) })) : null,
        d.situacao_explicacao ? el("p", { texto: d.situacao_explicacao }) : null,
        el("p", { style: "margin-top: 12px;", texto: d.leitura }),
        el("h4", { texto: "Ponto forte" }), el("p", { texto: d.ponto_forte }),
        el("h4", { texto: "Ponto cego" }), el("p", { texto: d.ponto_cego }),
        el("h4", { texto: "Primeiro passo" }), el("p", { texto: d.primeiro_passo }),
        d.recomendacao ? el("div", { class: "dg-recomendacao" },
          el("h4", { texto: d.situacao && d.situacao !== "tem" ? "Recomendação: como ter" : "Recomendação do capítulo" }),
          el("p", { texto: d.recomendacao })) : null));
    });
    raiz.appendChild(el("section", { class: "dg-secao dg-painel" }, blocos));

    var lista = el("ol", { class: "dg-passos" });
    (res.prioridades || []).forEach(function (p) { lista.appendChild(el("li", { texto: p })); });
    raiz.appendChild(el("section", { class: "dg-secao dg-azul2" }, el("div", { class: "dg-wrap" },
      el("span", { class: "dg-rotulo", texto: "Suas 3 prioridades" }), lista)));

    if (res.recomendacao_final) {
      raiz.appendChild(el("section", { class: "dg-secao amb-marinho dg-reticula" }, el("div", { class: "dg-wrap" },
        el("span", { class: "dg-rotulo", texto: "Recomendação final" }),
        el("h2", { texto: "O caminho da " + marca + "." }),
        paragrafos(res.recomendacao_final))));
    }

    // Bibliografia no fim: cada livro ligado a um problema encontrado no diagnóstico.
    if ((res.livros || []).length) {
      var livros = el("div", { class: "dg-wrap" },
        el("span", { class: "dg-rotulo", texto: "Leituras para os pontos do seu diagnóstico" }),
        el("p", { class: "dg-suave", texto: "Cada livro abaixo foi escolhido para um problema que apareceu na leitura da sua marca." }));
      res.livros.forEach(function (b) {
        livros.appendChild(el("div", { class: "dg-cartao dg-cartao-borda" },
          b.problema ? el("p", { class: "dg-livro-problema", texto: "Para: " + b.problema }) : null,
          el("h3", { texto: b.titulo }),
          el("p", { class: "dg-suave dg-pequeno", texto: b.autor }),
          el("p", { texto: b.motivo })));
      });
      raiz.appendChild(el("section", { class: "dg-secao" }, livros));
    }
    if ((res.versao || 1) < VERSAO_RESULTADO) {
      // Resultado gerado antes desta versão: oferece atualizar sem refazer as respostas.
      var atualizar = el("button", { class: "dg-botao", type: "button", texto: "Atualizar o meu diagnóstico" });
      atualizar.addEventListener("click", function () {
        var id = new URLSearchParams(location.search).get("id") || estado.id;
        atualizar.disabled = true;
        var links = {};
        ["site", "instagram", "outras_redes"].forEach(function (k) { links[k] = $("atualizar-" + k).value.trim(); });
        api("/api/diagnostico/iniciar", { id: id, atualizar: true, links: links }).then(function () { acompanhar(id); });
      });
      var camposLinks = el("div", { style: "text-align: left; margin: 20px 0;" });
      [["site", "Site da empresa", "www.suamarca.com.br"], ["instagram", "Instagram da marca", "@suamarca"],
        ["outras_redes", "Outras redes (LinkedIn, TikTok, YouTube…)", "linkedin.com/company/suamarca"]].forEach(function (c) {
        camposLinks.appendChild(el("label", { for: "atualizar-" + c[0], texto: c[1] + " (opcional)" }));
        camposLinks.appendChild(el("input", { id: "atualizar-" + c[0], type: "text", maxlength: "300", placeholder: "Ex.: " + c[2] }));
      });
      raiz.appendChild(el("section", { class: "dg-secao dg-painel dg-nao-imprimir" }, el("div", { class: "dg-wrap dg-centro" },
        el("h2", { texto: "Há uma versão mais completa deste diagnóstico." }),
        el("p", { texto: "Ela explica cada conceito, diz se a sua marca tem ou não tem cada um e como ter, traz uma recomendação por capítulo e uma recomendação final. Se quiser, informe também o site e as redes para a Inteligência Artificial avaliar. As suas respostas são aproveitadas." }),
        camposLinks,
        atualizar)));
    }

    var copiar = el("button", { class: "dg-botao-texto", type: "button", texto: "Copiar o link deste resultado" });
    copiar.addEventListener("click", function () {
      var link = location.origin + "/diagnostico/?id=" + encodeURIComponent(new URLSearchParams(location.search).get("id") || estado.id);
      (navigator.clipboard ? navigator.clipboard.writeText(link) : Promise.reject()).then(
        function () { copiar.textContent = "Link copiado"; },
        function () { prompt("Copie o link do seu resultado:", link); });
    });

    var btnDiag = el("button", { class: "dg-botao dg-botao-largo", type: "button", texto: "Baixar diagnóstico" });
    btnDiag.addEventListener("click", function () { imprimir("diagnostico", marca); });
    var btnResp = el("button", { class: "dg-botao dg-botao-contorno dg-botao-largo", type: "button", texto: "Baixar perguntas e respostas" });
    btnResp.addEventListener("click", function () { imprimir("respostas", marca); });
    var cartaoResp = el("div", { class: "dg-cartao dg-cartao-borda" },
      el("h3", { texto: "Suas perguntas e respostas" }),
      el("p", { class: "dg-suave", texto: "As 35 perguntas com as suas respostas, organizadas por capítulo. Bom para revisitar e ver a sua evolução." }),
      btnResp);

    var data = r.geradoEm ? new Date(r.geradoEm).toLocaleDateString("pt-BR") : "";
    raiz.appendChild(el("section", { class: "dg-secao dg-nao-imprimir" }, el("div", { class: "dg-wrap" },
      el("span", { class: "dg-rotulo", texto: "Seus arquivos em PDF" }),
      el("div", { class: "dg-arquivos" },
        el("div", { class: "dg-cartao dg-cartao-borda" },
          el("h3", { texto: "Diagnóstico completo" }),
          el("p", { class: "dg-suave", texto: "A leitura da sua marca: notas, leitura geral, dimensões, prioridades e bibliografia." }),
          btnDiag),
        cartaoResp),
      el("p", { class: "dg-suave dg-pequeno", texto: "Na janela que abrir, escolha \u201cSalvar como PDF\u201d como destino." })
    )));

    raiz.appendChild(el("section", { class: "dg-secao dg-painel dg-nao-imprimir" }, el("div", { class: "dg-wrap dg-centro" },
      el("h2", { texto: "Quer transformar esta leitura em direção?" }),
      el("p", { texto: "O diagnóstico mostra onde a sua marca está. O próximo passo é decidir para onde ela vai." }),
      el("p", {}, el("a", { class: "dg-botao", href: WHATSAPP, target: "_blank", rel: "noopener", texto: "Falar com a KA" })),
      el("p", {}, copiar),
      el("p", { class: "dg-suave dg-pequeno", texto: data ? "Gerado em " + data : "" })
    )));

    // Todas as seções acima são o diagnóstico; o documento de respostas é montado à parte.
    Array.prototype.forEach.call(raiz.children, function (secao) { secao.classList.add("dg-doc-diag"); });
    if (r.respostas) {
      carregarConteudo().then(function () { raiz.appendChild(documentoRespostas(r)); })
        .catch(function () { cartaoResp.classList.add("dg-oculto"); });
    } else {
      cartaoResp.classList.add("dg-oculto");
    }

    mostrarTela("resultado");
  }

  // ---------- partida ----------
  lerEstado();
  lerPrints();
  var idNaUrl = new URLSearchParams(location.search).get("id");
  if (idNaUrl) { acompanhar(idNaUrl); return; }
  if (estado.id) {
    history.replaceState(null, "", "/diagnostico/?id=" + encodeURIComponent(estado.id));
    acompanhar(estado.id);
    return;
  }
  carregarConteudo().then(function () {
    var perfilOk = conteudo.perfil.every(function (c) { return !c.obrigatorio || (estado.perfil[c.id] || "").trim(); });
    var jaRespondeu = Object.keys(estado.respostas).some(function (k) {
      return (estado.respostas[k] || []).some(function (r) { return (r || "").trim(); });
    });
    voltando = jaRespondeu;
    if (estado.codigo && perfilOk) telaPergunta(Math.min(estado.atual || 0, perguntas.length - 1));
    else telaInicio();
  }).catch(function () {
    telaErro("Não conseguimos carregar o diagnóstico. Atualize a página para tentar de novo.", false);
  });
})();
