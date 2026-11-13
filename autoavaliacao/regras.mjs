// Autoavaliação de Marca · ferramenta da aula (Campanha Crise).
// Arquivo compartilhado: a página usa para montar as perguntas e as funções usam para validar e classificar.
// 17 perguntas: Bloco 1 (5, conhecendo a empresa), Pilar 1 (6, entrega de valor), Pilar 2 (6, comunicação de valor).

export const VERSAO = 1;

export const FERRAMENTA = {
  nome: 'Autoavaliação de Marca',
  complemento: 'Avalie como sua empresa entrega e comunica seu valor e descubra o que precisa melhorar.',
};

// Situação de cada resposta: A estruturada, B informal, C ponto de atenção, D a verificar.
export const SITUACOES = { A: 'prática estruturada', B: 'prática informal', C: 'ponto de atenção', D: 'informação insuficiente' };
export const ROTULOS = { A: 'Funciona bem', B: 'Pode melhorar', C: 'Ponto de atenção', D: 'A verificar' };

export const CANAIS = ['Loja ou escritório físico', 'Site ou loja virtual', 'Instagram', 'WhatsApp', 'Google (Perfil da empresa)', 'LinkedIn', 'Marketplace', 'Vendedores ou representantes', 'Indicação de clientes', 'Feiras e eventos', 'Telefone ou e-mail'];

export const DIFICULDADES = ['Clientes comparam só pelo preço', 'Concorrentes mais baratos', 'Vendas caíram', 'Dificuldade para atrair novos clientes', 'Clientes não voltam a comprar', 'Dificuldade para explicar o diferencial', 'Cada pessoa da equipe vende de um jeito', 'Muitos descontos e margem baixa', 'A comunicação não traz resultado', 'Venda demorada, com muita negociação'];

export const CLIENTES = ['Consumidores finais', 'Outras empresas', 'Os dois'];
export const FREQUENCIA = ['Toda semana ou todo mês', 'Algumas vezes por ano', 'Uma vez a cada poucos anos', 'Normalmente uma vez só'];

// Bloco 1 · Conhecendo a empresa (5 perguntas).
export const BLOCO1 = [
  { id: 'B1', tipo: 'texto', q: 'Qual é o nome da sua empresa?', campos: [{ id: 'empresa', rotulo: 'Nome da empresa', max: 80, min: 2 }] },
  { id: 'B2', tipo: 'texto', q: 'O que sua empresa faz?', campos: [
    { id: 'segmento', rotulo: 'Tipo de negócio', max: 80, min: 3, ajuda: 'Seja específico. Ex.: padaria artesanal, loja de roupas infantis, escritório de advocacia tributária, clínica de estética facial.' },
    { id: 'oferta', rotulo: 'Principais produtos ou serviços', max: 240, min: 3, longo: true, ajuda: 'Ex.: pães de fermentação natural, bolos e cafés; ou consultoria tributária e planejamento para empresas.' },
  ] },
  { id: 'B3', tipo: 'publico', q: 'Quem são seus clientes?', campos: [
    { id: 'clientes', rotulo: 'Principais clientes', opcoes: CLIENTES },
    { id: 'frequencia', rotulo: 'Com que frequência um cliente costuma comprar de você?', opcoes: FREQUENCIA },
    { id: 'perfil', rotulo: 'Descreva seu cliente principal (opcional)', max: 200, min: 0, longo: true, opcional: true, ajuda: 'Ex.: mulheres de 30 a 50 anos do bairro; ou indústrias de médio porte da região.' },
  ] },
  { id: 'B4', tipo: 'multi', campo: 'canais', q: 'Por quais canais sua empresa vende e atende?', ajuda: 'Marque todos os que você usa.', opcoes: CANAIS, outro: 'Outro canal' },
  { id: 'B5', tipo: 'multi', campo: 'dificuldades', q: 'Quais são hoje as principais dificuldades comerciais da empresa?', ajuda: 'Marque todas que se aplicam.', opcoes: DIFICULDADES, outro: 'Outra dificuldade' },
];

export const PILARES = {
  1: { nome: 'Entrega de valor', sub: 'O que a empresa efetivamente faz e oferece aos clientes' },
  2: { nome: 'Comunicação de valor', sub: 'Como a empresa explica e demonstra o valor que oferece' },
};

// Pilares 1 e 2 (12 perguntas de múltipla escolha). Cada alternativa: [texto, situação].
export const PERGUNTAS = [
  { id: 'E1', pilar: 1, tema: 'Qualidade dos produtos e serviços', q: 'Como sua empresa garante a qualidade do que entrega?', r: [
    ['Temos padrões definidos e conferimos antes de cada entrega.', 'A'],
    ['Temos padrões, mas a conferência depende de quem faz.', 'B'],
    ['Confiamos na experiência da equipe, sem padrão definido.', 'B'],
    ['A qualidade varia e às vezes recebemos reclamações.', 'C'],
    ['Não sei dizer.', 'D'] ] },
  { id: 'E2', pilar: 1, tema: 'Atendimento e experiência', q: 'Como é a experiência do cliente, do primeiro contato até depois da compra?', r: [
    ['Cada etapa tem um jeito combinado de atender, inclusive o pós-venda.', 'A'],
    ['O atendimento é bom, mas cada pessoa atende do seu jeito.', 'B'],
    ['Atendemos bem na venda, mas depois da compra quase não há contato.', 'C'],
    ['Recebemos reclamações de demora ou falta de retorno.', 'C'],
    ['Nunca olhamos o atendimento como etapas.', 'D'] ] },
  { id: 'E3', pilar: 1, tema: 'Cumprimento das promessas', q: 'Prazos, condições e resultados prometidos ao cliente são cumpridos?', r: [
    ['Sempre, e acompanhamos isso com algum controle.', 'A'],
    ['Quase sempre, mas não medimos.', 'B'],
    ['Às vezes atrasamos ou entregamos diferente do combinado.', 'C'],
    ['Com frequência precisamos explicar atrasos ou ajustes.', 'C'],
    ['Não temos como saber.', 'D'] ] },
  { id: 'E4', pilar: 1, tema: 'Processos e consistência', q: 'Se o cliente for atendido por pessoas diferentes, ou comprar de novo, a experiência é a mesma?', r: [
    ['Sim, temos processos definidos e a equipe é treinada neles.', 'A'],
    ['Na maior parte das vezes, mas depende de quem atende.', 'B'],
    ['É igual quando eu estou presente; sem mim, muda.', 'B'],
    ['Varia bastante de um atendimento para outro.', 'C'],
    ['Não sei dizer.', 'D'] ] },
  { id: 'E5', pilar: 1, tema: 'Satisfação dos clientes', q: 'Como você sabe se os clientes estão satisfeitos?', r: [
    ['Medimos com frequência (pesquisa, nota ou avaliação) e analisamos os resultados.', 'A'],
    ['Pedimos avaliações no Google, LinkedIn ou outras plataformas, mas não analisamos.', 'B'],
    ['Sabemos pelas conversas e comentários.', 'B'],
    ['Só ficamos sabendo quando alguém reclama.', 'C'],
    ['Não acompanhamos.', 'C'] ] },
  { id: 'E6', pilar: 1, tema: 'Melhoria contínua', q: 'O que acontece com reclamações, sugestões e erros?', r: [
    ['Registramos, analisamos e mudamos processos a partir deles.', 'A'],
    ['Resolvemos cada caso, mas não registramos nem mudamos o processo.', 'B'],
    ['Conversamos sobre isso quando dá tempo.', 'B'],
    ['Os mesmos problemas costumam se repetir.', 'C'],
    ['Não sei dizer.', 'D'] ] },
  { id: 'C1', pilar: 2, tema: 'Clareza dos diferenciais', q: 'Sua empresa consegue dizer, em uma frase, por que é a melhor escolha para o cliente?', r: [
    ['Sim, temos uma frase definida, que a equipe usa e que os concorrentes não podem dizer igual.', 'A'],
    ['Sim, mas cada pessoa explica de um jeito.', 'B'],
    ['Sim, mas quase não falamos disso para o cliente.', 'B'],
    ['Falamos de qualidade, atendimento e preço, como a maioria.', 'C'],
    ['Temos dificuldade de explicar o que nos diferencia.', 'C'] ] },
  { id: 'C2', pilar: 2, tema: 'Benefícios comunicados', q: 'O que a comunicação da empresa (site, redes, materiais) mais mostra?', r: [
    ['O resultado e a transformação que o cliente terá.', 'A'],
    ['Alguns benefícios, misturados com características técnicas.', 'B'],
    ['Produtos, serviços, características e preços.', 'C'],
    ['A comunicação é pouco frequente ou está desatualizada.', 'C'],
    ['Não sei dizer.', 'D'] ] },
  { id: 'C3', pilar: 2, tema: 'Argumentos comerciais', q: 'Quando o cliente diz que está caro ou compara com alguém mais barato, o que acontece?', r: [
    ['Temos argumentos combinados que mostram o valor antes de falar em preço.', 'A'],
    ['Explicamos o valor, mas cada pessoa usa argumentos diferentes.', 'B'],
    ['Damos desconto ou condição especial para fechar.', 'C'],
    ['Perdemos a venda com frequência.', 'C'],
    ['Não sei dizer.', 'D'] ] },
  { id: 'C4', pilar: 2, tema: 'Demonstração de resultados', q: 'Sua empresa mostra resultados concretos do que entrega (números, antes e depois, casos)?', r: [
    ['Sim, temos resultados organizados e usamos na venda e na comunicação.', 'A'],
    ['Temos resultados, mas mostramos pouco ou só quando pedem.', 'B'],
    ['Temos bons resultados, mas nunca registramos.', 'C'],
    ['Não sabemos medir os resultados que entregamos.', 'C'] ] },
  { id: 'C5', pilar: 2, tema: 'Provas de confiança', q: 'Que provas de confiança o cliente encontra antes de comprar?', r: [
    ['Avaliações, depoimentos, certificações ou clientes atendidos, em vários canais.', 'A'],
    ['Algumas avaliações ou depoimentos, em poucos lugares.', 'B'],
    ['Quase nenhuma: dependemos da indicação.', 'C'],
    ['Não sei o que o cliente encontra quando pesquisa sobre nós.', 'D'] ] },
  { id: 'C6', pilar: 2, tema: 'Consistência da comunicação', q: 'Site, redes sociais, WhatsApp, propostas e atendimento passam a mesma mensagem?', r: [
    ['Sim, seguimos um padrão de mensagem, visual e tom em todos os canais.', 'A'],
    ['Em parte: o visual é parecido, mas a mensagem muda.', 'B'],
    ['Cada canal fala de um jeito.', 'C'],
    ['Não sei dizer.', 'D'] ] },
];

export const TOTAL_PERGUNTAS = BLOCO1.length + PERGUNTAS.length; // 17

export const ESTADOS = {
  forte: 'Estruturado',
  desenvolvimento: 'Em desenvolvimento',
  fragil: 'Frágil',
  inconclusivo: 'Precisa ser verificado',
};

export const AVISO = 'Esta autoavaliação é baseada nas informações fornecidas por você, e não em uma pesquisa com os seus clientes. Ela identifica oportunidades e orienta melhorias iniciais; não substitui um projeto completo de posicionamento.';

// Índice de 0 a 100 por pilar: estruturada vale 100, informal 50, ponto de atenção 0. "A verificar" fica de fora.
export function classificar(respostas) {
  const itens = PERGUNTAS.map(p => {
    const i = Number(respostas[p.id]);
    const [resposta, situacao] = p.r[i];
    return { id: p.id, pilar: p.pilar, tema: p.tema, pergunta: p.q, resposta, situacao };
  });
  const pilares = {};
  for (const n of [1, 2]) {
    const lista = itens.filter(x => x.pilar === n);
    const c = { A: 0, B: 0, C: 0, D: 0 };
    lista.forEach(x => c[x.situacao]++);
    const validos = c.A + c.B + c.C;
    const indice = validos ? Math.round((c.A * 100 + c.B * 50) / validos) : null;
    let estado = 'desenvolvimento';
    if (validos < 3) estado = 'inconclusivo';
    else if (c.A / validos >= 0.7 && c.C === 0) estado = 'forte';
    else if (c.C >= 3 || indice < 35) estado = 'fragil';
    pilares[n] = { ...c, validos, indice, estado };
  }
  return { versao: VERSAO, itens, pilares };
}

const limpa = (v, max) => String(v ?? '').replace(/\s+/g, ' ').trim().slice(0, max);
const letras = v => v.replace(/[^\p{L}]/gu, '').length;

// Validação das respostas recebidas pela função (nunca confiar no navegador).
export function validarEntrada(e) {
  const erro = m => ({ ok: false, erro: m });
  if (!e || typeof e !== 'object') return erro('Envio vazio.');
  const empresa = limpa(e.empresa, 80), segmento = limpa(e.segmento, 80), oferta = limpa(e.oferta, 240), perfil = limpa(e.perfil, 200);
  if (letras(empresa) < 2) return erro('Informe o nome da empresa.');
  if (letras(segmento) < 3) return erro('Informe o tipo de negócio.');
  if (letras(oferta) < 3) return erro('Informe os principais produtos ou serviços.');
  if (!CLIENTES.includes(e.clientes)) return erro('Informe quem são seus clientes.');
  if (!FREQUENCIA.includes(e.frequencia)) return erro('Informe a frequência de compra.');
  const lista = (v, validas, prefixo) => (Array.isArray(v) ? v : [])
    .map(x => limpa(x, 120))
    .filter(x => validas.includes(x) || (x.startsWith(prefixo + ': ') && letras(x) > prefixo.length + 1))
    .slice(0, 15);
  const canais = lista(e.canais, CANAIS, 'Outro canal');
  if (!canais.length) return erro('Marque pelo menos um canal.');
  const dificuldades = lista(e.dificuldades, DIFICULDADES, 'Outra dificuldade');
  if (!dificuldades.length) return erro('Marque pelo menos uma dificuldade.');
  const r = e.respostas || {};
  const respostas = {};
  for (const p of PERGUNTAS) {
    const i = Number(r[p.id]);
    if (!Number.isInteger(i) || i < 0 || i >= p.r.length) return erro('Resposta inválida em ' + p.id + '.');
    respostas[p.id] = i;
  }
  return { ok: true, dados: { empresa, segmento, oferta, clientes: e.clientes, frequencia: e.frequencia, perfil, canais, dificuldades, respostas } };
}

// Práticas contínuas de reserva (usadas se a Inteligência Artificial não responder).
const PRATICAS = {
  E1: { titulo: 'Padronizar a qualidade da entrega', melhorar: 'A qualidade depende de quem faz, e isso abre espaço para variação e reclamação.',
    passos: ['Liste os três pontos que mais definem um bom produto ou serviço seu.', 'Transforme esses pontos numa lista de conferência curta.', 'Use a lista antes de cada entrega durante um mês.'],
    rotina: 'Conferência antes de cada entrega, com revisão da lista uma vez por mês.', responsavel: 'Quem faz a entrega, com supervisão do gestor.', acompanhar: 'Número de reclamações e retrabalhos por mês.' },
  E2: { titulo: 'Desenhar a experiência do cliente', melhorar: 'A experiência muda conforme a pessoa e o contato quase some depois da compra.',
    passos: ['Escreva as etapas do cliente: primeiro contato, compra, entrega e pós-venda.', 'Defina o que precisa acontecer em cada etapa.', 'Crie um contato de pós-venda alguns dias após a entrega.'],
    rotina: 'Pós-venda para todo cliente, no prazo combinado, e revisão das etapas a cada trimestre.', responsavel: 'Atendimento ou quem conduz a venda.', acompanhar: 'Percentual de clientes que recebem o pós-venda e respostas obtidas.' },
  E3: { titulo: 'Controlar o cumprimento das promessas', melhorar: 'Sem controle, atrasos e mudanças no combinado desgastam a confiança.',
    passos: ['Liste as promessas que você faz ao cliente: prazos, condições e resultados.', 'Registre em uma planilha cada entrega com o prazo prometido e o realizado.', 'Avise o cliente antes, sempre que algo for mudar.'],
    rotina: 'Registro de cada entrega e revisão semanal dos atrasos.', responsavel: 'Gestor da operação.', acompanhar: 'Percentual de entregas no prazo e conforme o combinado.' },
  E4: { titulo: 'Tornar o atendimento consistente', melhorar: 'A experiência depende de quem atende, e o cliente não sabe o que esperar.',
    passos: ['Escolha os três momentos mais importantes do atendimento.', 'Escreva como cada um deve acontecer, em poucas linhas.', 'Treine a equipe e acompanhe alguns atendimentos.'],
    rotina: 'Conversa curta com a equipe toda semana sobre um desses momentos.', responsavel: 'Gestor ou líder da equipe.', acompanhar: 'Reclamações e elogios por atendente, comparados mês a mês.' },
  E5: { titulo: 'Acompanhar a satisfação dos clientes', melhorar: 'Sem medir a satisfação, você só descobre problemas quando o cliente reclama ou some.',
    passos: ['Defina um momento após a entrega para perguntar a nota de 0 a 10 e o motivo.', 'Envie a pergunta por WhatsApp ou e-mail.', 'Peça avaliação pública a quem der nota alta.'],
    rotina: 'Pergunta enviada após cada entrega e leitura das respostas uma vez por mês.', responsavel: 'Atendimento ou pós-venda.', acompanhar: 'Nota média, número de respostas e avaliações públicas por mês.' },
  E6: { titulo: 'Transformar reclamações em melhoria', melhorar: 'Problemas resolvidos caso a caso tendem a se repetir.',
    passos: ['Crie um registro simples de reclamações, sugestões e erros.', 'Anote o motivo de cada um.', 'Escolha o motivo mais frequente e mude o processo que o causa.'],
    rotina: 'Registro diário e reunião mensal para escolher uma melhoria.', responsavel: 'Gestor, com participação da equipe.', acompanhar: 'Quantidade de ocorrências repetidas por mês.' },
  C1: { titulo: 'Definir o motivo para escolher a empresa', melhorar: 'Sem um motivo claro, a conversa tende a ir para o preço.',
    passos: ['Pergunte a cinco clientes por que escolheram sua empresa e anote as palavras deles.', 'Escreva uma frase que una o que eles disseram ao que só você entrega.', 'Combine essa frase com toda a equipe.'],
    rotina: 'Usar a frase em todo primeiro contato e revisar a cada trimestre.', responsavel: 'Dono da empresa, com a equipe de vendas.', acompanhar: 'Quantas pessoas da equipe explicam o diferencial da mesma forma.' },
  C2: { titulo: 'Comunicar benefícios, não só produtos', melhorar: 'Mostrar produtos e preços coloca a empresa lado a lado com qualquer concorrente.',
    passos: ['Para cada produto ou serviço principal, escreva o resultado que o cliente ganha.', 'Revise a página principal do site e a bio das redes com esses resultados.', 'Planeje publicações que mostrem o cliente usando ou ganhando com o que você entrega.'],
    rotina: 'Ao menos uma publicação por semana focada em benefício ou resultado.', responsavel: 'Quem cuida da comunicação.', acompanhar: 'Proporção de publicações sobre benefícios e mensagens de interesse recebidas.' },
  C3: { titulo: 'Preparar argumentos antes do desconto', melhorar: 'O desconto como resposta reduz a margem e ensina o cliente a pedir abatimento.',
    passos: ['Liste as objeções de preço mais comuns.', 'Escreva para cada uma um argumento com benefício e prova.', 'Treine a equipe para usar o argumento antes de qualquer desconto.'],
    rotina: 'Revisão dos argumentos uma vez por mês com a equipe de vendas.', responsavel: 'Gestor comercial ou dono.', acompanhar: 'Percentual de vendas fechadas sem desconto.' },
  C4: { titulo: 'Registrar e mostrar resultados', melhorar: 'Resultados que não são registrados não ajudam a convencer quem ainda não conhece a empresa.',
    passos: ['Escolha três clientes recentes com bons resultados.', 'Registre o antes, o que foi feito e o depois, com autorização.', 'Use esses casos nas propostas, no site e nas redes.'],
    rotina: 'Registrar um novo caso por mês.', responsavel: 'Quem acompanha a entrega, com apoio da comunicação.', acompanhar: 'Número de casos organizados e uso deles nas vendas.' },
  C5: { titulo: 'Reunir provas de confiança', melhorar: 'Sem provas visíveis, quem não conhece a empresa tem menos motivos para confiar.',
    passos: ['Pesquise sua empresa no Google e nas redes como um cliente faria.', 'Peça avaliações a clientes satisfeitos, com um link direto.', 'Coloque depoimentos e avaliações nos canais onde o cliente decide.'],
    rotina: 'Pedido de avaliação após cada entrega bem-sucedida.', responsavel: 'Atendimento ou pós-venda.', acompanhar: 'Número de avaliações e depoimentos novos por mês.' },
  C6: { titulo: 'Alinhar a mensagem em todos os canais', melhorar: 'Cada canal falando de um jeito confunde o cliente e enfraquece a marca.',
    passos: ['Liste todos os canais da empresa.', 'Confira se cada um apresenta o mesmo motivo para escolher a empresa.', 'Ajuste primeiro o canal por onde mais clientes chegam.'],
    rotina: 'Revisão dos canais a cada trimestre.', responsavel: 'Quem cuida da comunicação, com aprovação do dono.', acompanhar: 'Canais revisados e alinhados à mesma mensagem.' },
};

const ORDEM = ['C1', 'C3', 'E5', 'C4', 'C5', 'E3', 'E2', 'E4', 'C2', 'E1', 'E6', 'C6'];

export function relatorioDeReserva(classe) {
  const s = Object.fromEntries(classe.itens.map(x => [x.id, x]));
  const peso = { C: 0, D: 1, B: 2, A: 3 };
  const escolhidos = ORDEM.slice().sort((a, b) => peso[s[a].situacao] - peso[s[b].situacao] || ORDEM.indexOf(a) - ORDEM.indexOf(b)).slice(0, 3);
  const pilares = [1, 2].map(n => {
    const lista = classe.itens.filter(x => x.pilar === n);
    return {
      pilar: n,
      leitura: { forte: 'Suas respostas indicam práticas estruturadas neste pilar. O desafio é manter e comprovar.', desenvolvimento: 'Há práticas que funcionam, mas parte delas depende de pessoas e não de método.', fragil: 'Este pilar concentra os principais pontos de atenção da empresa.', inconclusivo: 'Faltam informações para concluir. Vale verificar estes pontos.' }[classe.pilares[n].estado],
      funciona: lista.filter(x => x.situacao === 'A').slice(0, 3).map(x => x.tema + ': ' + x.resposta.replace(/\.$/, '').toLowerCase() + '.'),
      fragil: lista.filter(x => x.situacao === 'C' || x.situacao === 'B').sort((a, b) => peso[a.situacao] - peso[b.situacao]).slice(0, 3).map(x => x.tema + ': ' + x.resposta.replace(/\.$/, '').toLowerCase() + '.'),
      verificar: lista.filter(x => x.situacao === 'D').slice(0, 2).map(x => x.tema + ': vale verificar como isso acontece hoje.'),
    };
  });
  const prioridades = escolhidos.map(id => {
    const p = PRATICAS[id];
    return { titulo: p.titulo, porque: 'Você respondeu: "' + s[id].resposta + '"', o_que_melhorar: p.melhorar, como_implementar: p.passos, rotina: p.rotina, responsavel: p.responsavel, acompanhar: p.acompanhar };
  });
  const fortes = [classe.pilares[1], classe.pilares[2]];
  const resumo = fortes[0].estado === 'forte' && fortes[1].estado === 'forte'
    ? 'Suas respostas indicam práticas estruturadas nos dois pilares. O próximo passo é confirmar com clientes e manter a consistência.'
    : 'Suas respostas mostram onde a empresa pode fortalecer a entrega e a comunicação de valor. As três prioridades abaixo indicam por onde começar.';
  return { resumo, pilares, prioridades };
}
