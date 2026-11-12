// Teste de Autoavaliação de Marca (Campanha Crise) · perguntas e regras.
// Usado pela página (resultado de reserva, sem Inteligência Artificial) e pela função do Netlify
// (que passa as respostas classificadas para a Inteligência Artificial cruzar e interpretar).
//
// Cada alternativa vale uma situação:
//   A = prática estruturada · B = prática informal · C = ponto de atenção
//   D = informação insuficiente · NA = não se aplica ao modelo de negócio
// D e NA não entram no cálculo do pilar.

export const VERSAO = 2;
export const FERRAMENTA = 'Teste de Autoavaliação de Marca';

export const SITUACOES = {
  A: 'Prática estruturada',
  B: 'Prática informal',
  C: 'Ponto de atenção',
  D: 'Informação insuficiente',
  NA: 'Não se aplica'
};

export const SEGMENTOS = ['Advocacia e serviços jurídicos', 'Agronegócio', 'Alimentação e gastronomia', 'Arquitetura e decoração', 'Automotivo',
  'Beleza e estética', 'Bem-estar e terapias', 'Clínicas e consultórios', 'Comunicação e marketing', 'Construção civil e engenharia',
  'Consultoria e gestão', 'Contabilidade e finanças', 'Educação e cursos', 'Eventos e casamentos', 'Fitness e academias',
  'Fotografia e audiovisual', 'Imobiliário', 'Indústria', 'Moda e vestuário', 'Móveis e planejados', 'Odontologia', 'Pet', 'Saúde',
  'Seguros', 'Serviços para empresas', 'Tecnologia', 'Turismo e hotelaria', 'Varejo', 'Outro'];

// Contexto do negócio: só alternativas, para orientar a leitura (nunca entra na pontuação).
export const CONTEXTO = [
  { id: 'segmento', q: 'Qual é o segmento da sua empresa?', lista: SEGMENTOS },
  { id: 'clientes', q: 'Quem são seus principais clientes?', r: ['Consumidores finais', 'Outras empresas', 'Os dois'] },
  { id: 'compra', q: 'Com que frequência um cliente costuma comprar de você?',
    r: ['Toda semana ou todo mês', 'Algumas vezes por ano', 'Uma vez a cada poucos anos', 'Normalmente uma vez só'] }
];

export const PILARES = {
  1: { nome: 'Sinais de força da marca', sub: 'O que sustenta a escolha pela sua empresa' },
  2: { nome: 'Capacidade de demonstrar valor', sub: 'Como a sua empresa mostra por que merece ser escolhida' }
};

// r: [texto, situação]
export const PERGUNTAS = [
  { id: 'P1', pilar: 1, tema: 'Recompra',
    q: 'Você sabe quantos clientes voltam a comprar?',
    r: [['Sim, acompanhamos e registramos.', 'A'],
        ['Percebemos que voltam, mas não registramos.', 'B'],
        ['Poucos clientes voltam.', 'C'],
        ['No nosso negócio, o cliente costuma comprar uma vez só.', 'NA']] },
  { id: 'P2', pilar: 1, tema: 'Indicações',
    q: 'Seus clientes chegam por indicação?',
    r: [['Muitos, e sabemos quem indicou.', 'A'],
        ['Muitos, mas não registramos.', 'B'],
        ['Alguns, de vez em quando.', 'B'],
        ['Raramente.', 'C'],
        ['Não sabemos dizer.', 'D']] },
  { id: 'P3', pilar: 1, tema: 'Satisfação',
    q: 'Como sua empresa sabe se os clientes estão satisfeitos?',
    r: [['Fazemos pesquisas e acompanhamos os resultados.', 'A'],
        ['Pedimos avaliações no Google, LinkedIn ou outras plataformas.', 'A'],
        ['Perguntamos aos clientes, mas não registramos.', 'B'],
        ['Sabemos pelas conversas e comentários.', 'B'],
        ['Não acompanhamos.', 'C']] },
  { id: 'P4', pilar: 1, tema: 'Diferencial',
    q: 'Você consegue dizer o que sua empresa faz melhor que os concorrentes?',
    r: [['Sim, e temos exemplos que provam.', 'A'],
        ['Sim, mas não temos como provar.', 'B'],
        ['Falamos em qualidade e bom atendimento.', 'C'],
        ['Não vemos uma diferença clara.', 'C']] },
  { id: 'P5', pilar: 1, tema: 'Promessas',
    q: 'Como você confere se a empresa entrega o que promete?',
    r: [['Temos um processo e conferimos sempre.', 'A'],
        ['Temos orientações, mas não conferimos.', 'B'],
        ['Só quando aparece um problema.', 'C'],
        ['Não conferimos.', 'C']] },
  { id: 'P6', pilar: 1, tema: 'Provas de qualidade',
    q: 'Você tem provas da qualidade do seu trabalho, como avaliações, resultados ou casos?',
    r: [['Sim, organizadas e atualizadas.', 'A'],
        ['Temos algumas, mas espalhadas.', 'B'],
        ['Temos bons exemplos, mas nunca registramos.', 'B'],
        ['Não temos.', 'C']] },
  { id: 'P7', pilar: 2, tema: 'Objeção de preço',
    q: 'Quando o cliente diz que está caro, o que costuma acontecer?',
    r: [['Perguntamos o motivo e explicamos o que ele recebe.', 'A'],
        ['Explicamos os benefícios.', 'B'],
        ['Damos desconto para fechar.', 'C'],
        ['Ficamos sem resposta ou perdemos a venda.', 'C'],
        ['Quase nunca acontece.', 'D']] },
  { id: 'P8', pilar: 2, tema: 'Motivo para escolher',
    q: 'Se um cliente novo pergunta por que escolher sua empresa, você ou sua equipe respondem:',
    r: [['Com um motivo claro, sempre o mesmo.', 'A'],
        ['Cada vez explicamos de um jeito.', 'B'],
        ['Falando de qualidade, atendimento ou preço.', 'C'],
        ['Não temos uma resposta pronta.', 'C']] },
  { id: 'P9', pilar: 2, tema: 'Diferenças na comunicação',
    q: 'O que a comunicação da sua empresa mais mostra?',
    r: [['Nossas diferenças, com exemplos e provas.', 'A'],
        ['Nossas diferenças, mas sem provas.', 'B'],
        ['Produtos, serviços e preços.', 'C'],
        ['Comunicamos pouco ou sem frequência.', 'C']] },
  { id: 'P10', pilar: 2, tema: 'Canais',
    q: 'Nos canais que você usa (site, redes, WhatsApp, propostas, loja), o cliente encontra os benefícios do que você oferece?',
    r: [['Sim, nos principais canais.', 'A'],
        ['Em alguns sim, em outros não.', 'B'],
        ['Eles mostram mais preço e catálogo.', 'C'],
        ['Não sei dizer.', 'D']] },
  { id: 'P11', pilar: 2, tema: 'Comparação com opção mais barata',
    q: 'Quando comparam sua empresa com alguém mais barato, você ou sua equipe:',
    r: [['Mostramos benefícios concretos e provas.', 'A'],
        ['Explicamos, mas nem sempre convence.', 'B'],
        ['Falamos de qualidade e atendimento.', 'C'],
        ['Oferecemos desconto.', 'C'],
        ['Não temos uma resposta definida para isso.', 'C']] }
];

export const DIFICULDADES = {
  titulo: 'Hoje, quais são as maiores dificuldades do seu negócio relacionadas à marca?',
  apoio: 'Marque todas que fazem sentido para você. Isso não entra em nenhuma pontuação: serve para a análise considerar o que você já reconhece.',
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

export const NATUREZA = {
  relato: 'Relato',          // o que o empresário informou
  hipotese: 'Hipótese',      // interpretação a partir da combinação das respostas
  verificar: 'A verificar'   // falta informação para concluir
};

export const AVISO = 'Este resultado é baseado nas suas respostas, e não em uma pesquisa com os seus clientes. Pontos fortes são relatos seus; fragilidades e consequências são hipóteses para você investigar.';

// ─── Classificação ───
// respostas: { P1: índice da alternativa, ..., P11 }
export function classificar(respostas) {
  const itens = PERGUNTAS.map(p => {
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
    const estado = validos < 3 ? 'inconclusivo' : (c.A >= validos / 2 && indice >= 0.65 && c.C <= 1 ? 'favoravel' : 'atencao');
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

// ─── Resultado de reserva (sem Inteligência Artificial) ───
// Também cruza respostas: cada padrão junta duas ou mais respostas e explica o que a combinação sugere.
const FORTES = {
  P1: 'Você acompanha quantos clientes voltam a comprar. Isso dá base real para entender o que mantém a preferência.',
  P2: 'Você sabe de onde vêm as indicações. Indicação é um dos sinais mais fortes de que a marca é lembrada.',
  P3: 'Você tem uma rotina para saber se os clientes estão satisfeitos, com pesquisas ou avaliações públicas, e consegue perceber cedo o que funciona e o que não.',
  P4: 'Você identifica um diferencial e tem exemplos que o sustentam, o que dá matéria-prima para a venda.',
  P5: 'Você confere se a empresa entrega o que promete. Promessa cumprida é a base da confiança.',
  P6: 'Você tem provas organizadas da qualidade do trabalho, um recurso que reduz a dúvida de quem ainda não conhece a empresa.',
  P7: 'Diante do "está caro", a equipe investiga o motivo antes de responder, em vez de ir direto ao desconto.',
  P8: 'A equipe explica com um motivo claro e único por que escolher a empresa.',
  P9: 'A comunicação mostra as diferenças da empresa com exemplos e provas.',
  P10: 'Os principais canais explicam os benefícios do que você oferece.',
  P11: 'Na comparação com opções mais baratas, a equipe mostra benefícios concretos e provas.'
};

const PADROES = [
  { id: 'indicacao_sem_porque', quando: s => ['A', 'B'].includes(s.P2) && ['B', 'C'].includes(s.P3) && (['B', 'C'].includes(s.P4) || ['B', 'C'].includes(s.P8)),
    titulo: 'Indicações sem saber o que as sustenta',
    texto: 'Você relata receber indicações, mas não acompanha a satisfação de forma estruturada e tem dificuldade para explicar o diferencial. As indicações são um possível sinal positivo, mas hoje não dá para saber o que exatamente os clientes valorizam.',
    consequencias: [['Diferenciação', 'Sem saber o que gera as indicações, pode ficar difícil repetir isso com quem ainda não conhece a empresa.'], ['Vendas', 'O crescimento tende a depender de indicações espontâneas, que não se controlam.']],
    prioridade: 'Entender o que faz os clientes indicarem você',
    porque: 'As indicações sugerem que algo funciona. Descobrir o quê transforma um sinal positivo em argumento de venda para novos clientes.',
    orientacao: 'Converse com cinco clientes que já indicaram sua empresa e pergunte o que eles dizem quando recomendam você. Anote as palavras exatas e veja o que se repete.' },
  { id: 'provas_que_nao_chegam', quando: s => (s.P4 === 'A' || s.P6 === 'A' || s.P6 === 'B') && (s.P9 === 'C' || s.P10 === 'C' || s.P8 === 'C' || s.P11 === 'C'),
    titulo: 'Provas que não chegam ao cliente',
    texto: 'Você relata ter diferenciais ou provas de qualidade, mas a comunicação e a venda se apoiam em produtos, preços ou argumentos genéricos. A hipótese é que parte do valor que existe não aparece onde o cliente decide.',
    consequencias: [['Confiança', 'Quem ainda não conhece a empresa precisa decidir sem ver as provas que você já tem.'], ['Descontos', 'Sem provas na conversa, o preço tende a virar o critério mais fácil de comparar.']],
    prioridade: 'Levar as provas que você já tem para a venda e a comunicação',
    porque: 'É o caminho mais curto: o material existe, só não está sendo usado no momento da escolha.',
    orientacao: 'Escolha três provas que você já tem, como uma avaliação, um resultado e um caso real, e use nas próximas propostas e no canal por onde mais chegam clientes.' },
  { id: 'preco_como_argumento', quando: s => (s.P7 === 'C' || s.P11 === 'C') && (['C'].includes(s.P4) || ['B', 'C'].includes(s.P8)),
    titulo: 'Preço ocupando o lugar do diferencial',
    texto: 'Quando o cliente acha caro ou compara com opções mais baratas, a resposta tende a ser desconto ou argumentos genéricos. Ao mesmo tempo, a empresa tem dificuldade para explicar o que faz melhor. Uma coisa reforça a outra.',
    consequencias: [['Descontos', 'Sem um motivo claro para pagar mais, o desconto tende a virar a principal ferramenta de fechamento.'], ['Vendas', 'A margem pode ficar pressionada, e a empresa pode passar a competir no terreno do concorrente mais barato.']],
    prioridade: 'Definir um motivo claro para ser escolhido antes de discutir preço',
    porque: 'Enquanto não houver um motivo claro, cada objeção de preço tende a terminar em desconto.',
    orientacao: 'Liste as três últimas vendas que você fechou sem desconto e anote o que convenceu o cliente. Esse é o ponto de partida do argumento que a equipe deve usar.' },
  { id: 'cada_um_explica', quando: s => ['B', 'C'].includes(s.P8) && (s.P11 === 'C' || s.P11 === 'B'),
    titulo: 'A venda depende de quem atende',
    texto: 'Cada pessoa explica a empresa de um jeito, e não há uma orientação clara para a comparação com opções mais baratas. A hipótese é que o resultado da venda varie conforme quem está atendendo.',
    consequencias: [['Confiança', 'Mensagens diferentes podem deixar o cliente sem uma ideia clara do que esperar.'], ['Vendas', 'O desempenho comercial tende a ficar difícil de repetir e de ensinar.']],
    prioridade: 'Alinhar o motivo para escolher a empresa com toda a equipe',
    porque: 'Uma resposta comum dá consistência à venda e facilita treinar quem chega.',
    orientacao: 'Reúna a equipe e peça que cada um escreva, em uma frase, por que um cliente deveria escolher a empresa. Compare as respostas e escolha juntos a que melhor descreve o que vocês entregam.' },
  { id: 'entrega_sem_sustentacao', quando: s => s.P5 === 'C' && ['B', 'C'].includes(s.P6),
    titulo: 'Entrega difícil de comprovar',
    texto: 'A empresa só confere a entrega quando surge um problema e não tem provas organizadas da qualidade. Isso não quer dizer que a entrega seja ruim: quer dizer que hoje não há como demonstrar que ela é boa.',
    consequencias: [['Confiança', 'Sem conferência e sem provas, a promessa tende a ficar apoiada só na palavra da empresa.'], ['Diferenciação', 'Pode ficar difícil mostrar por que sua entrega vale mais do que a de outra empresa.']],
    prioridade: 'Criar uma conferência simples do que a empresa promete',
    porque: 'É a base para qualquer prova futura: sem saber se a promessa é cumprida, não há o que demonstrar.',
    orientacao: 'Escolha as três promessas mais importantes que você faz, como prazo, qualidade e condições, e confira cada uma em todas as entregas do próximo mês.' },
  { id: 'clientes_que_nao_voltam', quando: s => s.P1 === 'C' && s.P3 !== 'A',
    titulo: 'Clientes que não voltam, sem explicação',
    texto: 'Poucos clientes voltam a comprar e a satisfação não é acompanhada de forma estruturada. Pode ser algo próprio do seu tipo de negócio ou um problema na experiência. Sem informação, não dá para saber qual dos dois.',
    consequencias: [['Vendas', 'Se a recompra for possível no seu negócio, cada cliente que não volta precisa ser substituído por um novo, que custa mais.']],
    prioridade: 'Descobrir por que os clientes não voltam',
    porque: 'Antes de investir em atrair novos clientes, vale entender se há algo que afasta os atuais.',
    orientacao: 'Converse com três clientes que compraram uma vez e não voltaram. Pergunte o que faria eles comprarem de novo e anote as respostas.' },
  { id: 'comunicacao_sem_lastro', quando: s => (s.P9 === 'A' || s.P9 === 'B' || s.P8 === 'A') && (s.P6 === 'C' || s.P5 === 'C'),
    titulo: 'Discurso à frente das provas',
    texto: 'A empresa comunica suas diferenças, mas relata ter poucas provas ou pouca conferência da entrega. A hipótese é que o discurso esteja mais estruturado do que aquilo que o sustenta.',
    consequencias: [['Confiança', 'Promessas sem provas podem gerar desconfiança quando o cliente compara.']],
    prioridade: 'Reunir provas que sustentem o que a comunicação promete',
    porque: 'Comunicação forte sem provas aumenta a promessa, mas não a confiança.',
    orientacao: 'Para cada diferença que sua comunicação destaca, anote uma prova real que você já tem. Onde não houver prova, comece a registrar nos próximos atendimentos.' }
];

export function textosDeReserva(classe, dificuldades) {
  const s = Object.fromEntries(classe.itens.map(x => [x.id, x.situacao]));
  const padroes = PADROES.filter(p => { try { return p.quando(s); } catch (e) { return false; } });
  // Quem marcou "Preço" ou "Concorrência" vê primeiro o padrão de preço; quem marcou "Diferencial", o de provas.
  const peso = p => {
    const d = dificuldades || [];
    if (p.id === 'preco_como_argumento' && (d.includes('Preço') || d.includes('Concorrência'))) return 2;
    if (p.id === 'provas_que_nao_chegam' && d.includes('Diferencial')) return 2;
    if (p.id === 'clientes_que_nao_voltam' && d.includes('Fidelização')) return 2;
    return 0;
  };
  const escolhidos = padroes.map((p, i) => ({ p, i })).sort((a, b) => peso(b.p) - peso(a.p) || a.i - b.i).slice(0, 2).map(x => x.p);
  const fortesIds = ['P2', 'P6', 'P4', 'P3', 'P1', 'P5', 'P8', 'P11', 'P7', 'P9', 'P10'].filter(id => s[id] === 'A').slice(0, 3);
  const pontos_fortes = fortesIds.map(id => ({ titulo: PERGUNTAS.find(p => p.id === id).tema, texto: FORTES[id], natureza: 'relato' }));
  const fragilidades = escolhidos.map(p => ({ titulo: p.titulo, texto: p.texto, natureza: 'hipotese' }));
  const semInfo = classe.itens.filter(x => x.situacao === 'D');
  if (fragilidades.length < 2 && semInfo.length) {
    fragilidades.push({ titulo: 'Informações que faltam', natureza: 'verificar',
      texto: 'Em ' + semInfo.map(x => x.tema.toLowerCase()).join(', ') + ', suas respostas não trouxeram informação suficiente. Esses pontos precisam ser verificados antes de qualquer conclusão.' });
  }
  const consequencias = [];
  escolhidos.forEach(p => p.consequencias.forEach(([area, texto]) => { if (consequencias.length < 3 && !consequencias.some(c => c.area === area)) consequencias.push({ area, texto }); }));
  const principal = escolhidos[0];
  const recomendacao = principal
    ? { prioridade: principal.prioridade, porque: principal.porque, orientacao: principal.orientacao }
    : { prioridade: 'Registrar o que faz sua empresa ser escolhida',
        porque: 'Suas respostas indicam práticas favoráveis. O próximo passo é transformar isso em argumento consistente para toda a equipe.',
        orientacao: 'Escreva os três principais motivos pelos quais os clientes escolhem sua empresa, com uma prova para cada um, e confira se todos os canais e a equipe usam os mesmos argumentos.' };
  const leitura = principal
    ? PERFIS[classe.perfil].txt + ' O ponto que mais chama atenção na combinação das respostas: ' + principal.titulo.toLowerCase() + '.'
    : PERFIS[classe.perfil].txt;
  return { leitura, pontos_fortes, fragilidades, consequencias, recomendacao };
}

// Validação das respostas recebidas pela função (nunca confiar no navegador).
export function validarEntrada(e) {
  const erro = m => ({ ok: false, erro: m });
  if (!e || typeof e !== 'object') return erro('Envio vazio.');
  const segTexto = String(e.segmento || '').trim().replace(/\s+/g, ' ');
  const segmento = SEGMENTOS.includes(segTexto) && segTexto !== 'Outro' ? segTexto
    : (/^Outro: .{2,}/.test(segTexto) ? segTexto.slice(0, 80) : '');
  if (!segmento) return erro('Informe o segmento.');
  const clientes = CONTEXTO[1].r.includes(e.clientes) ? e.clientes : '';
  if (!clientes) return erro('Informe quem são seus principais clientes.');
  const compra = CONTEXTO[2].r.includes(e.compra) ? e.compra : '';
  if (!compra) return erro('Informe a frequência de compra.');
  const r = e.respostas || {};
  const respostas = {};
  for (const p of PERGUNTAS) {
    const i = Number(r[p.id]);
    if (!Number.isInteger(i) || i < 0 || i >= p.r.length) return erro('Resposta inválida em ' + p.id + '.');
    respostas[p.id] = i;
  }
  const todas = DIFICULDADES.grupos.flatMap(g => g.itens.map(x => x[0]));
  const dificuldades = (Array.isArray(e.dificuldades) ? e.dificuldades : [])
    .map(d => String(d).slice(0, 140))
    .filter(d => todas.includes(d) || d.startsWith('Outra: ') || d === DIFICULDADES.nenhuma)
    .slice(0, 20);
  return { ok: true, dados: { segmento, clientes, compra, respostas, dificuldades } };
}
