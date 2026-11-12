// Teste de Autoavaliação de Marca (Campanha Crise) · regras de classificação.
// Este arquivo é usado pela página (resultado de reserva, sem Inteligência Artificial)
// e pela função do Netlify (que passa a classificação para a Inteligência Artificial escrever o texto).
//
// Cada alternativa fechada vale uma situação:
//   A = prática estruturada · B = prática informal · C = ponto de atenção
//   D = informação insuficiente · NA = não se aplica ao modelo de negócio
// D e NA não entram no cálculo do pilar.

export const VERSAO = 1;
export const FERRAMENTA = 'Teste de Autoavaliação de Marca';

export const SITUACOES = {
  A: 'Prática estruturada',
  B: 'Prática informal',
  C: 'Ponto de atenção',
  D: 'Informação insuficiente',
  NA: 'Não se aplica'
};

export const CONTEXTO = {
  produto: {
    id: 'produto',
    q: 'Qual é o principal produto ou serviço que sua empresa oferece?',
    ajuda: 'Responda em poucas palavras. Ex.: tratamentos odontológicos, roupas femininas, móveis planejados, seguros, consultoria, alimentação.',
    max: 120
  },
  clientes: {
    id: 'clientes',
    q: 'Quem são seus principais clientes?',
    r: ['Consumidores finais', 'Outras empresas', 'Ambos', 'Outro']
  }
};

export const PILARES = {
  1: { nome: 'Sinais de força da marca', sub: 'Práticas e evidências que sustentam a entrega' },
  2: { nome: 'Capacidade de demonstrar valor', sub: 'Como a empresa mostra por que merece ser escolhida' }
};

// r: [texto, situação]
export const PERGUNTAS = [
  { id: 'P1', pilar: 1, tema: 'Recompra e continuidade',
    q: 'Como sua empresa acompanha se os clientes voltam a comprar ou contratar seus serviços?',
    r: [['Acompanha e registra a recompra ou renovação', 'A'],
        ['Percebe que os clientes retornam, mas não registra', 'B'],
        ['Tem poucos clientes recorrentes', 'C'],
        ['Não sabe informar', 'D'],
        ['Não se aplica ao modelo de negócio', 'NA']] },
  { id: 'P2', pilar: 1, tema: 'Indicações',
    q: 'Sua empresa sabe quantos clientes chegam por indicação?',
    r: [['Sim, acompanha e registra as indicações', 'A'],
        ['Recebe indicações com frequência, mas não registra', 'B'],
        ['Recebe indicações de vez em quando', 'B'],
        ['Não sabe informar', 'D'],
        ['Ainda não tem clientes suficientes para avaliar', 'NA']] },
  { id: 'P3', pilar: 1, tema: 'Satisfação',
    q: 'Como sua empresa verifica se os clientes estão satisfeitos com seus produtos ou serviços?',
    r: [['Tem uma rotina de avaliação e acompanha os resultados', 'A'],
        ['Pede avaliações, mas não acompanha com regularidade', 'B'],
        ['Conversa informalmente com os clientes', 'B'],
        ['Só fica sabendo quando há reclamações', 'C'],
        ['Não tem nenhuma forma de acompanhamento', 'C']] },
  { id: 'P4', pilar: 1, tema: 'Diferenciais',
    q: 'Sua empresa consegue identificar algo que faz melhor ou diferente dos concorrentes?',
    r: [['Sim, e tem exemplos ou evidências que mostram essa diferença', 'A'],
        ['Sim, mas ainda não consegue comprovar com clareza', 'B'],
        ['Acredita que oferece qualidade e bom atendimento, como outras empresas', 'C'],
        ['Não consegue identificar diferenças relevantes', 'C']],
    complemento: { id: 'P4b', q: 'Qual é o seu principal diferencial?', ajuda: 'Opcional. Escreva em uma frase.', max: 200, opcional: true } },
  { id: 'P5', pilar: 1, tema: 'Cumprimento das promessas',
    q: 'Como sua empresa verifica se está cumprindo o que promete aos clientes?',
    r: [['Tem processos e acompanha com regularidade a qualidade da entrega', 'A'],
        ['Tem orientações internas, mas não acompanha os resultados', 'B'],
        ['Verifica principalmente quando acontece algum problema', 'C'],
        ['Não tem uma rotina definida para esse acompanhamento', 'C']] },
  { id: 'P6', pilar: 1, tema: 'Provas de qualidade',
    q: 'Sua empresa tem evidências que ajudam a comprovar a qualidade do que oferece?',
    r: [['Sim, tem resultados, avaliações ou casos reais organizados e atualizados', 'A'],
        ['Tem algumas evidências, mas não organiza com regularidade', 'B'],
        ['Tem exemplos positivos, mas não registra', 'B'],
        ['Não tem evidências organizadas', 'C']] },
  { id: 'P7', pilar: 2, tema: 'Objeções de preço',
    q: 'Quando um cliente diz que seu produto ou serviço está caro, o que normalmente acontece?',
    r: [['A empresa procura entender o motivo e explica os benefícios da oferta', 'A'],
        ['A empresa explica os benefícios, mas não investiga a preocupação do cliente', 'B'],
        ['A empresa costuma oferecer desconto para tentar fechar a venda', 'C'],
        ['A empresa tem dificuldade para responder a essa objeção', 'C'],
        ['Esse tipo de situação raramente acontece', 'D']] },
  { id: 'P8', pilar: 2, tema: 'Clareza da proposta de valor', aberta: true,
    q: 'Em uma frase, por que um cliente deveria escolher sua empresa?',
    ajuda: 'Escreva do seu jeito, como você explicaria para um cliente novo.',
    max: 250 },
  { id: 'P9', pilar: 2, tema: 'Diferenciação na comunicação',
    q: 'Como sua empresa mostra as diferenças em relação aos concorrentes?',
    r: [['Apresenta diferenças claras e exemplos que ajudam a comprová-las', 'A'],
        ['Explica as diferenças, mas apresenta poucas evidências', 'B'],
        ['Usa principalmente argumentos genéricos, como qualidade e atendimento', 'C'],
        ['Comunica basicamente produtos, serviços e preços', 'C'],
        ['Não sabe informar', 'D']] },
  { id: 'P10', pilar: 2, tema: 'Canais de comunicação',
    q: 'Nos canais que sua empresa usa, o cliente encontra informações que explicam os benefícios do que você oferece?',
    r: [['Sim, os principais canais apresentam benefícios e evidências', 'A'],
        ['Alguns canais apresentam essas informações, outros não', 'B'],
        ['Os canais mostram principalmente produtos, serviços e preços', 'C'],
        ['A comunicação é pouco estruturada', 'C'],
        ['Não sabe informar', 'D']] },
  { id: 'P11', pilar: 2, tema: 'Argumentos de venda',
    q: 'Quando um cliente compara sua empresa com uma opção mais barata, como sua equipe costuma explicar o valor da oferta?',
    r: [['Apresenta benefícios concretos e evidências relevantes', 'A'],
        ['Explica os benefícios, mas nem sempre consegue demonstrá-los', 'B'],
        ['Usa argumentos genéricos sobre qualidade e atendimento', 'C'],
        ['Costuma recorrer a descontos', 'C'],
        ['Não existe uma orientação definida para essa situação', 'C'],
        ['Não sabe informar', 'D']] }
];

export const DIFICULDADES = {
  titulo: 'Hoje, quais são as maiores dificuldades do seu negócio relacionadas à marca?',
  apoio: 'Marque todas que fazem sentido para você. Não existe resposta certa. Isso não entra em nenhuma pontuação: serve para a leitura considerar o que você já reconhece.',
  grupos: [
    { nome: 'Quem a sua marca é', itens: [
      ['Posicionamento', 'não está claro que lugar a minha marca ocupa no mercado'],
      ['Diferencial', 'não consigo mostrar por que o cliente deve me escolher'],
      ['Propósito e valores', 'falta clareza sobre o que a marca defende'],
      ['Público', 'não sei bem quem é o meu cliente ideal']] },
    { nome: 'Como a sua marca se apresenta', itens: [
      ['Identidade visual', 'logo, cores e materiais não mostram o nível da empresa'],
      ['Comunicação e tom de voz', 'cada hora a marca fala de um jeito'],
      ['Instagram e redes sociais', 'não sei o que postar ou não traz resultado'],
      ['Site e presença digital', 'não tenho site ou ele está desatualizado'],
      ['Embalagem e ponto de venda', 'o produto não se destaca na hora da compra']] },
    { nome: 'Como a sua marca é vivida', itens: [
      ['Experiência do cliente', 'a jornada de compra não encanta'],
      ['Atendimento', 'o atendimento não transmite o valor da marca'],
      ['Fidelização', 'o cliente compra uma vez e não volta'],
      ['Reputação', 'tenho poucas avaliações, depoimentos ou indicações'],
      ['Equipe', 'o meu time não vive nem transmite a marca']] },
    { nome: 'Como a sua marca vende', itens: [
      ['Preço', 'o cliente acha caro e eu acabo dando desconto'],
      ['Concorrência', 'sou comparado só por preço'],
      ['Produtos e serviços', 'o meu portfólio está confuso ou espalhado'],
      ['Crescimento', 'a marca não acompanha o tamanho que a empresa quer ter']] }
  ],
  nenhuma: 'Nenhuma dificuldade identificada',
  aviso: 'Marque pelo menos uma opção para seguir. Se não tiver nenhuma dificuldade agora, marque "Nenhuma dificuldade identificada".'
};

// Quais perguntas cada dificuldade declarada ajuda a priorizar (só para ordenar, nunca para pontuar).
const DIF_PERGUNTAS = {
  'Posicionamento': ['P8', 'P4', 'P9'], 'Diferencial': ['P4', 'P9', 'P8'], 'Propósito e valores': ['P8'],
  'Público': ['P8'], 'Identidade visual': ['P10'], 'Comunicação e tom de voz': ['P10', 'P9'],
  'Instagram e redes sociais': ['P10'], 'Site e presença digital': ['P10'], 'Embalagem e ponto de venda': ['P10', 'P9'],
  'Experiência do cliente': ['P3', 'P5'], 'Atendimento': ['P3', 'P5'], 'Fidelização': ['P1', 'P3'],
  'Reputação': ['P6', 'P2'], 'Equipe': ['P11', 'P5'], 'Preço': ['P7', 'P11'], 'Concorrência': ['P9', 'P11', 'P4'],
  'Produtos e serviços': ['P8', 'P10'], 'Crescimento': ['P1', 'P2']
};
// Ordem padrão de prioridade: o que mais pesa na escolha e na valorização da marca vem primeiro.
const PRIORIDADE = ['P8', 'P7', 'P11', 'P9', 'P4', 'P6', 'P10', 'P3', 'P5', 'P1', 'P2'];

// Textos de reserva (usados quando a Inteligência Artificial não responde a tempo).
// Sempre no modo "você relata": nada aqui afirma o que o cliente pensa.
export const TEXTOS = {
  P1: { pos: 'Você relata que acompanha e registra a recompra ou a renovação dos clientes.',
        att: 'Você relata ter poucos clientes recorrentes. Antes de tirar conclusões, vale entender se isso é próprio do seu tipo de negócio ou se há um motivo a investigar.',
        ori: 'Converse com três clientes que compraram uma vez e não voltaram. Pergunte o que faria eles comprarem de novo e anote as respostas.',
        insuf: 'Ainda não há informação sobre a volta dos clientes. Esse é um ponto a investigar.' },
  P2: { pos: 'Você relata que acompanha de onde vêm as indicações.',
        att: 'As indicações ainda não são acompanhadas.',
        ori: 'Pergunte a cada cliente novo como ele conheceu sua empresa e registre a resposta numa planilha simples.',
        insuf: 'Ainda não há informação suficiente sobre as indicações.' },
  P3: { pos: 'Você relata ter uma rotina para avaliar a satisfação dos clientes e acompanhar os resultados.',
        att: 'Hoje a empresa não acompanha a satisfação de forma ativa. Isso não quer dizer que os clientes estão insatisfeitos: quer dizer que falta informação para avaliar.',
        ori: 'Depois de cada entrega, faça uma pergunta simples ao cliente, como "De 0 a 10, o quanto você indicaria a gente?", e anote as respostas durante um mês.',
        insuf: 'Ainda não há informação suficiente sobre a satisfação dos clientes.' },
  P4: { pos: 'Você identifica um diferencial e relata ter exemplos que mostram essa diferença.',
        att: 'O diferencial ainda se apoia em qualidade e bom atendimento, argumentos que muitas empresas também usam.',
        ori: 'Liste três situações reais em que um cliente escolheu sua empresa em vez de outra opção e escreva o motivo de cada uma. O que se repetir é o ponto de partida do seu diferencial.',
        insuf: 'Ainda não há informação suficiente sobre os diferenciais.' },
  P5: { pos: 'Você relata ter processos para acompanhar se a empresa cumpre o que promete.',
        att: 'Não existe uma rotina definida para verificar se as promessas feitas ao cliente são cumpridas.',
        ori: 'Escolha as três promessas mais importantes que sua empresa faz, como prazo, qualidade e condições, e defina como vai conferir cada uma em todas as entregas.',
        insuf: 'Ainda não há informação suficiente sobre o cumprimento das promessas.' },
  P6: { pos: 'Você relata ter resultados, avaliações ou casos reais organizados.',
        att: 'Ainda não há evidências organizadas que ajudem a comprovar a qualidade do que a empresa oferece.',
        ori: 'Reúna num só lugar as avaliações, os resultados e os casos reais que você já tem, respeitando as regras da sua atividade. Esse material passa a apoiar a venda e a comunicação.',
        insuf: 'Ainda não há informação suficiente sobre as provas de qualidade.' },
  P7: { pos: 'Diante da objeção de preço, você relata que a empresa procura entender o motivo e explica os benefícios.',
        att: 'Quando o cliente acha caro, a empresa tende a dar desconto ou tem dificuldade para responder. A objeção não prova que o valor é baixo, mas mostra que a conversa de venda pode ser mais bem conduzida.',
        ori: 'Na próxima objeção de preço, antes de responder, pergunte: "Caro em comparação com o quê?". A resposta mostra se o problema é orçamento ou falta de clareza sobre o que o cliente recebe.',
        insuf: 'A objeção de preço raramente acontece, então não há informação para avaliar esse ponto.' },
  P8: { pos: 'A frase sobre por que escolher sua empresa apresenta um benefício concreto e compreensível.',
        att: 'A frase sobre por que escolher sua empresa ainda é genérica e não deixa claro o benefício para o cliente.',
        ori: 'Reescreva a frase respondendo a três pontos: para quem você trabalha, o que entrega e que resultado o cliente tem. Depois, teste a nova versão com dois clientes.',
        insuf: 'A frase sobre por que escolher sua empresa não trouxe informação suficiente para avaliar.' },
  P9: { pos: 'Você relata que a empresa apresenta diferenças claras em relação aos concorrentes, com exemplos.',
        att: 'A comunicação se apoia em argumentos genéricos ou mostra basicamente produtos, serviços e preços.',
        ori: 'Escolha um diferencial e mostre um exemplo real dele em cada canal que a empresa usa durante as próximas semanas.',
        insuf: 'Ainda não há informação suficiente sobre como a empresa mostra suas diferenças.' },
  P10: { pos: 'Você relata que os principais canais da empresa apresentam benefícios e evidências.',
         att: 'Os canais mostram principalmente produtos, serviços e preços, com pouca explicação dos benefícios.',
         ori: 'Revise o canal por onde o cliente mais chega até você e confira se ele explica o benefício de cada produto ou serviço, e não só as características e o preço.',
         insuf: 'Ainda não há informação suficiente sobre os canais de comunicação.' },
  P11: { pos: 'Na comparação com opções mais baratas, você relata que a equipe apresenta benefícios concretos e evidências.',
         att: 'Na comparação com opções mais baratas, a equipe recorre a argumentos genéricos ou a descontos, ou não tem uma orientação definida.',
         ori: 'Escreva com a equipe três respostas para a pergunta "por que é mais caro?", cada uma com um benefício e uma prova. Use nas próximas conversas de venda.',
         insuf: 'Ainda não há informação suficiente sobre os argumentos de venda.' }
};

export const PERFIS = {
  valor_pouco_demonstrado: { nome: 'Valor pouco demonstrado',
    txt: 'Suas respostas indicam práticas positivas na entrega, mas a forma de demonstrar esse valor ainda tem pontos de atenção.' },
  comunicacao_comprovacao: { nome: 'Comunicação que precisa de comprovação',
    txt: 'Suas respostas indicam que a empresa explica bem o que oferece, mas ainda tem pouca informação organizada para sustentar o que promete.' },
  pontos_atencao: { nome: 'Marca com pontos de atenção',
    txt: 'Suas respostas indicam oportunidades de melhoria tanto nas práticas que sustentam a entrega quanto na forma de demonstrar valor.' },
  estruturada: { nome: 'Práticas e comunicação estruturadas',
    txt: 'Suas respostas indicam práticas favoráveis nos dois pilares: a empresa acompanha a entrega e consegue apresentar motivos para ser escolhida.' },
  inconclusiva: { nome: 'Avaliação inicial inconclusiva',
    txt: 'Algumas respostas não trouxeram informação suficiente para definir um perfil. Isso também é um sinal: vale começar organizando essas informações.' }
};

export const AVISO = 'Este resultado é baseado nas suas respostas, e não em uma pesquisa com os seus clientes.';

// ─── Pergunta aberta (P8): clareza e especificidade, sem presumir que é verdade ───
const GENERICOS = ['qualidade', 'atendimento', 'excelencia', 'excelente', 'compromisso', 'confianca', 'confiavel', 'melhor', 'melhores',
  'bom', 'boa', 'otimo', 'otima', 'dedicacao', 'respeito', 'honestidade', 'seriedade', 'serio', 'profissionalismo', 'profissional',
  'profissionais', 'satisfacao', 'diferenciado', 'diferenciada', 'humanizado', 'humanizada', 'carinho', 'amor', 'paixao', 'preco', 'justo',
  'transparencia', 'agilidade', 'eficiencia', 'inovacao', 'solucoes', 'solucao', 'servico', 'servicos', 'produto', 'produtos', 'cliente', 'clientes'];
const VAZIAS = ['porque', 'pois', 'que', 'nos', 'nós', 'nosso', 'nossa', 'nossos', 'nossas', 'temos', 'somos', 'oferecemos', 'para', 'com', 'uma', 'um', 'uns',
  'umas', 'dos', 'das', 'de', 'do', 'da', 'em', 'no', 'na', 'e', 'o', 'a', 'os', 'as', 'ao', 'aos', 'sempre', 'muito', 'muita', 'mais', 'todo', 'toda',
  'cada', 'seu', 'sua', 'seus', 'suas', 'voce', 'empresa', 'marca', 'escolher', 'escolhe', 'deveria', 'ter', 'ser', 'sao', 'tem', 'pela', 'pelo', 'por'];
const PISTAS_EVIDENCIA = /\d|anos|garantia|prazo|resultado|certifica|avalia|clientes atendidos|casos|metodo|método|acompanhamento|relatorio|relatório/;

function semAcento(t) { return String(t || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); }

export function classificarAberta(texto) {
  const t = semAcento(texto).trim();
  if (!t) return 'D';
  const palavras = t.replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(Boolean);
  const concretas = palavras.filter(p => p.length > 2 && !GENERICOS.includes(p) && !VAZIAS.includes(p));
  if (concretas.length < 3) return 'C';
  if (concretas.length >= 6 && PISTAS_EVIDENCIA.test(t)) return 'A';
  return 'B';
}

// ─── Classificação completa ───
// respostas: { P1: índice da alternativa, ..., P8: 'texto', P4b: 'texto' }
export function classificar(respostas) {
  const itens = PERGUNTAS.map(p => {
    if (p.aberta) {
      const texto = String(respostas[p.id] || '').trim();
      return { id: p.id, pilar: p.pilar, tema: p.tema, pergunta: p.q, resposta: texto, situacao: classificarAberta(texto) };
    }
    const i = Number(respostas[p.id]);
    const alt = p.r[i];
    return { id: p.id, pilar: p.pilar, tema: p.tema, pergunta: p.q, resposta: alt ? alt[0] : '', situacao: alt ? alt[1] : 'D' };
  });
  const pilares = {};
  [1, 2].forEach(n => {
    const doPilar = itens.filter(x => x.pilar === n);
    const c = { A: 0, B: 0, C: 0, D: 0, NA: 0 };
    doPilar.forEach(x => { c[x.situacao]++; });
    const validos = c.A + c.B + c.C;
    const indice = validos ? (2 * c.A + c.B) / (2 * validos) : 0;
    // Favorável pede maioria de práticas estruturadas e no máximo um ponto de atenção.
    const estado = validos < 3 ? 'inconclusivo' : (indice >= 0.65 && c.C <= 1 ? 'favoravel' : 'atencao');
    pilares[n] = { ...c, validos, estado };
  });
  const p1 = pilares[1].estado, p2 = pilares[2].estado;
  let perfil;
  if (p1 === 'inconclusivo' || p2 === 'inconclusivo') perfil = 'inconclusiva';
  else if (p1 === 'favoravel' && p2 === 'favoravel') perfil = 'estruturada';
  else if (p1 === 'favoravel') perfil = 'valor_pouco_demonstrado';
  else if (p2 === 'favoravel') perfil = 'comunicacao_comprovacao';
  else perfil = 'pontos_atencao';
  return { versao: VERSAO, itens, pilares, perfil };
}

function ordenar(ids, dificuldades) {
  const peso = {};
  (dificuldades || []).forEach(d => (DIF_PERGUNTAS[d] || []).forEach((id, k) => { peso[id] = Math.max(peso[id] || 0, 3 - k); }));
  return ids.slice().sort((a, b) => (peso[b] || 0) - (peso[a] || 0) || PRIORIDADE.indexOf(a) - PRIORIDADE.indexOf(b));
}

// Resultado de reserva, sem Inteligência Artificial: até dois positivos, até dois pontos de atenção, uma orientação.
export function textosDeReserva(classe, dificuldades) {
  const sit = id => classe.itens.find(x => x.id === id).situacao;
  const ids = PERGUNTAS.map(p => p.id);
  // Positivos: alterna os pilares para mostrar os dois lados quando possível.
  const aTodos = PRIORIDADE.filter(id => sit(id) === 'A');
  const p1a = aTodos.filter(id => PERGUNTAS.find(p => p.id === id).pilar === 1);
  const p2a = aTodos.filter(id => PERGUNTAS.find(p => p.id === id).pilar === 2);
  const positivos = [];
  if (p1a[0]) positivos.push(p1a[0]);
  if (p2a[0]) positivos.push(p2a[0]);
  aTodos.forEach(id => { if (positivos.length < 2 && !positivos.includes(id)) positivos.push(id); });
  const atencaoIds = ordenar(ids.filter(id => sit(id) === 'C'), dificuldades).slice(0, 2);
  const informaisIds = ordenar(ids.filter(id => sit(id) === 'B'), dificuldades);
  const insufIds = ordenar(ids.filter(id => sit(id) === 'D'), dificuldades);
  const atencao = atencaoIds.map(id => TEXTOS[id].att);
  // Sem pontos de atenção claros, uma prática informal no pilar mais fraco é o próximo passo natural.
  const informalIds = [];
  if (atencao.length < 2 && informaisIds.length && classe.perfil !== 'estruturada') {
    const id = informaisIds[0];
    informalIds.push(id);
    atencao.push(PERGUNTAS.find(p => p.id === id).tema + ': você relata que a prática existe, mas de forma informal, sem um acompanhamento definido.');
  }
  if (atencao.length < 2 && insufIds.length) atencao.push(TEXTOS[insufIds[0]].insuf + ' Esse aspecto precisa ser investigado.');
  let orientacao;
  if (atencaoIds.length) orientacao = TEXTOS[atencaoIds[0]].ori;
  else if (informalIds.length) orientacao = TEXTOS[informalIds[0]].ori;
  else if (insufIds.length) orientacao = TEXTOS[insufIds[0]].ori;
  else orientacao = 'Registre por escrito os motivos que fazem sua empresa ser escolhida e confira se toda a equipe usa os mesmos argumentos, com as mesmas provas, em todos os canais.';
  return {
    leitura: PERFIS[classe.perfil].txt,
    positivos: positivos.slice(0, 2).map(id => TEXTOS[id].pos),
    atencao: atencao.slice(0, 2),
    orientacao
  };
}

// Validação das respostas recebidas pela função (nunca confiar no navegador).
export function validarEntrada(e) {
  const erro = m => ({ ok: false, erro: m });
  if (!e || typeof e !== 'object') return erro('Envio vazio.');
  const produto = String(e.produto || '').trim().slice(0, CONTEXTO.produto.max);
  if (produto.length < 2) return erro('Informe o principal produto ou serviço.');
  const clientes = CONTEXTO.clientes.r.includes(e.clientes) ? e.clientes : '';
  if (!clientes) return erro('Informe quem são seus principais clientes.');
  const r = e.respostas || {};
  const respostas = {};
  for (const p of PERGUNTAS) {
    if (p.aberta) { respostas[p.id] = String(r[p.id] || '').trim().slice(0, p.max); continue; }
    const i = Number(r[p.id]);
    if (!Number.isInteger(i) || i < 0 || i >= p.r.length) return erro('Resposta inválida em ' + p.id + '.');
    respostas[p.id] = i;
  }
  respostas.P4b = String(r.P4b || '').trim().slice(0, 200);
  const todas = DIFICULDADES.grupos.flatMap(g => g.itens.map(x => x[0]));
  const dificuldades = (Array.isArray(e.dificuldades) ? e.dificuldades : [])
    .map(d => String(d).slice(0, 140))
    .filter(d => todas.includes(d) || d.startsWith('Outra: ') || d === DIFICULDADES.nenhuma)
    .slice(0, 20);
  const segmento = String(e.segmento || '').trim().slice(0, 80);
  return { ok: true, dados: { produto, clientes, segmento, respostas, dificuldades } };
}
