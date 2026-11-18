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
  { id: 'segmento', q: 'Qual é o seu tipo de negócio?', texto: true, curto: true, obrigatorio: true, max: 80,
    erro: 'Escreva o seu tipo de negócio para continuar. Ex.: padaria artesanal.',
    ajuda: 'Quanto mais específico, mais precisa fica a análise. Ex.: padaria artesanal, loja de roupas infantis, loja de roupas masculinas, escritório de advocacia tributária, clínica de estética facial, farmácia de manipulação.' },
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
        ['Sim, mas quase não falamos disso para o cliente.', 'B'],
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

// Como cada situação aparece para o empresário (sem jargão de método).
export const ROTULOS = {
  A: 'Ponto forte',
  B: 'Pode melhorar',
  C: 'Ponto de atenção',
  D: 'A verificar',
  NA: 'Não se aplica'
};

// O que cada resposta reflete no negócio (resultado de reserva, sem Inteligência Artificial).
export const REFLETE = {
  P1: { A: 'Registrar a recompra mostra quanto da receita vem de quem já confia em você. O próximo passo é entender por que esses clientes voltam.',
        B: 'Os clientes voltam, mas sem registro você não sabe quantos, quais nem por quê. Um sinal bom que ainda não vira informação para decidir.',
        C: 'Pouca recompra pode ser próprio do negócio ou um sinal de que algo na experiência não convence a voltar. Vale investigar antes de concluir.',
        NA: 'Como a compra costuma ser única, a confiança precisa ser construída antes da venda, com provas e indicações.' },
  P2: { A: 'Saber quem indica mostra quais clientes e trabalhos geram mais confiança. É um dos sinais mais fortes de marca lembrada.',
        B: 'As indicações existem, mas sem registro você não sabe o que as provoca nem como repetir isso com quem ainda não conhece a empresa.',
        C: 'Poucas indicações podem indicar que a experiência não é marcante a ponto de ser recomendada, ou que ninguém pede. Vale investigar.',
        D: 'Sem saber de onde vêm os clientes, fica difícil entender o que realmente traz novos negócios.',
        NA: 'Ainda não há clientes suficientes para avaliar as indicações.' },
  P3: { A: 'Ouvir o cliente com método permite perceber cedo o que funciona. O próximo nível é usar o que ele diz para decidir e para comunicar.',
        B: 'A opinião do cliente chega, mas se perde. Sem registro, o que ele valoriza não vira argumento nem melhoria.',
        C: 'Sem acompanhamento, a empresa só descobre um problema quando ele já custou um cliente. Isso não prova insatisfação: prova falta de informação.' },
  P4: { A: 'Ter um diferencial com exemplos dá matéria-prima para vender melhor. O ponto é conferir se ele aparece de forma clara em todas as conversas.',
        B: 'Existe um diferencial, mas ele não chega ao cliente com força: falta prova ou falta falar dele. O que o cliente não vê, ele não valoriza.',
        C: 'Qualidade e atendimento são o mínimo esperado. Sem uma diferença clara, o cliente tende a comparar pelo preço.' },
  P5: { A: 'Conferir a entrega sustenta a confiança e evita surpresas. É a base para transformar promessas em provas.',
        B: 'Há orientação, mas sem conferência não dá para garantir que toda entrega cumpre o que foi prometido.',
        C: 'Conferir só quando há problema significa descobrir falhas pelo cliente. A promessa fica apoiada só na palavra da empresa.' },
  P6: { A: 'Provas organizadas reduzem a dúvida de quem ainda não conhece a empresa. O próximo passo é garantir que elas apareçam na venda.',
        B: 'As provas existem, mas espalhadas ou sem registro. Quando o cliente precisa decidir, elas não estão à mão.',
        C: 'Sem provas, o cliente precisa acreditar só no que a empresa diz. Isso pesa mais em compras de valor alto ou de compra única.' },
  P7: { A: 'Investigar o motivo antes de responder mostra segurança no próprio valor e evita descontos desnecessários.',
        B: 'Explicar benefícios ajuda, mas sem entender o motivo da objeção a resposta pode não tocar no que preocupa o cliente.',
        C: 'Ceder no preço ou ficar sem resposta indica que falta um argumento claro de valor. Cada desconto reduz a margem e ensina o cliente a pedir mais.',
        D: 'Como a objeção é rara, não dá para avaliar como a empresa defende o preço. Pode ser sinal de preço baixo demais ou de comparações silenciosas.' },
  P8: { A: 'Um motivo claro e repetido por todos deixa a marca fácil de entender e de indicar.',
        B: 'Cada conversa apresenta a empresa de um jeito. O cliente sai sem uma ideia clara do porquê escolher você, e a venda depende de quem atende.',
        C: 'Sem uma resposta clara e própria, o cliente não tem um motivo para escolher você além do preço ou da conveniência.' },
  P9: { A: 'Mostrar diferenças com provas ajuda o cliente a comparar pelo valor, e não só pelo preço.',
        B: 'Falar das diferenças sem provar pode soar como promessa. O cliente tende a desconfiar do que não vê demonstrado.',
        C: 'Uma comunicação de produtos e preços coloca a empresa na mesma vitrine dos concorrentes. O que torna você diferente fica escondido.' },
  P10: { A: 'Canais que explicam benefícios ajudam o cliente a decidir antes mesmo de falar com você.',
         B: 'A experiência muda conforme o canal. Quem chega pelo canal mais fraco pode formar uma ideia menor da empresa.',
         C: 'Canais com preço e catálogo convidam à comparação pelo valor da etiqueta.',
         D: 'Sem olhar os próprios canais com os olhos do cliente, fica difícil saber o que ele encontra antes de decidir.' },
  P11: { A: 'Defender o valor com provas diante de uma opção mais barata protege a margem e reforça a confiança.',
         B: 'Os argumentos existem, mas nem sempre convencem. Pode faltar prova, clareza ou ligação com o que o cliente valoriza.',
         C: 'Sem um argumento próprio, a comparação com o mais barato tende a terminar em desconto ou em venda perdida.' }
};

export const NATUREZA = {
  relato: 'Relato',          // o que o empresário informou
  hipotese: 'Hipótese',      // interpretação a partir da combinação das respostas
  verificar: 'A verificar'   // falta informação para concluir
};

export const AVISO = 'Este resultado é baseado nas suas respostas, e não em uma pesquisa com os seus clientes. Os pontos a melhorar são hipóteses para você confirmar com seus clientes.';

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
    // Favorável é exigente: pelo menos 70% de práticas estruturadas e nenhum ponto de atenção.
    const estado = validos < 3 ? 'inconclusivo' : (c.A / validos >= 0.7 && c.C === 0 ? 'favoravel' : 'atencao');
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
  // Sempre há o que melhorar: completa com práticas informais e, se tudo for favorável, com o próximo nível.
  classe.itens.filter(x => x.situacao === 'B').forEach(x => {
    if (fragilidades.length < 3) fragilidades.push({ titulo: x.tema + ': prática sem método', texto: REFLETE[x.id].B, natureza: 'hipotese' });
  });
  if (fragilidades.length < 2) {
    fragilidades.push({ titulo: 'Respostas que pedem confirmação', natureza: 'verificar',
      texto: 'Suas respostas são muito favoráveis. Numa autoavaliação, isso pede uma checagem: o que você vê de dentro pode não ser o que o cliente encontra. Vale confirmar com clientes recentes o que eles realmente percebem.' });
  }
  if (fragilidades.length < 2) {
    fragilidades.push({ titulo: 'Consistência em todos os pontos de contato', natureza: 'hipotese',
      texto: 'Mesmo com boas práticas, o valor pode se perder no canal mais fraco ou na conversa de quem tem menos experiência. O próximo nível é garantir a mesma mensagem e as mesmas provas em todos os contatos.' });
  }
  const consequencias = [];
  escolhidos.forEach(p => p.consequencias.forEach(([area, texto]) => { if (consequencias.length < 2 && !consequencias.some(c => c.area === area)) consequencias.push({ area, texto }); }));
  const principal = escolhidos[0];
  const recomendacao = principal
    ? { prioridade: principal.prioridade, porque: principal.porque, orientacao: principal.orientacao }
    : { prioridade: 'Registrar o que faz sua empresa ser escolhida',
        porque: 'Suas respostas indicam práticas favoráveis. O próximo passo é transformar isso em argumento consistente para toda a equipe.',
        orientacao: 'Escreva os três principais motivos pelos quais os clientes escolhem sua empresa, com uma prova para cada um, e confira se todos os canais e a equipe usam os mesmos argumentos.' };
  const leitura = principal
    ? PERFIS[classe.perfil].txt + ' O ponto que mais chama atenção na combinação das respostas: ' + principal.titulo.toLowerCase() + '.'
    : PERFIS[classe.perfil].txt;
  const respostas = classe.itens.map(x => ({ id: x.id, leitura: (REFLETE[x.id] || {})[x.situacao] || '' }));
  // Formato atual do resultado: resumo, pontos fortes avaliados, pontos a melhorar e três dicas.
  const dicas = [{ titulo: recomendacao.prioridade, texto: recomendacao.orientacao }];
  escolhidos.slice(1).forEach(p => dicas.push({ titulo: p.prioridade, texto: p.orientacao }));
  const extras = [
    { titulo: 'Pergunte aos clientes por que escolhem você', texto: 'Converse com cinco clientes recentes e anote as palavras exatas que eles usam para explicar a escolha.' },
    { titulo: 'Reúna três provas do seu valor', texto: 'Separe avaliações, fotos, números ou depoimentos que mostrem o resultado que você entrega e use nas conversas de venda.' },
    { titulo: 'Combine uma resposta com a equipe', texto: 'Escreva em duas frases por que escolher sua empresa e peça que todos usem a mesma resposta com clientes novos.' },
  ];
  for (const e of extras) if (dicas.length < 3 && !dicas.some(d => d.titulo === e.titulo)) dicas.push(e);
  const item = x => ({ titulo: x.titulo, texto: x.texto });
  // Prévia do diagnóstico completo (aparece embaçada no resultado).
  const prevPrio = [...escolhidos.map(p => ({ titulo: p.prioridade, texto: p.porque })), ...dicas.map(d => ({ titulo: d.titulo, texto: d.texto }))]
    .filter((x, i, a) => a.findIndex(y => y.titulo === x.titulo) === i).slice(0, 3);
  const previa = {
    entrega_enxerga: principal
      ? 'Suas respostas sugerem uma distância entre o que a empresa entrega e o que o cliente consegue enxergar: ' + principal.titulo.toLowerCase() + '. O diagnóstico completo mostra onde essa distância aparece e como reduzi-la.'
      : 'Suas respostas indicam boas práticas. O diagnóstico completo verifica se o valor que a empresa entrega aparece da mesma forma em todos os pontos de contato com o cliente.',
    prioridades: prevPrio,
  };
  return { resumo: leitura, pontos_fortes: pontos_fortes.map(item), pontos_melhorar: fragilidades.slice(0, 3).map(item), dicas: dicas.slice(0, 3), previa };
}

// Validação das respostas recebidas pela função (nunca confiar no navegador).
export function validarEntrada(e) {
  const erro = m => ({ ok: false, erro: m });
  if (!e || typeof e !== 'object') return erro('Envio vazio.');
  // Tipo de negócio escrito pela pessoa (ex.: "padaria", "escritório de branding").
  const segmento = String(e.segmento || '').trim().replace(/^Outro: /, '').replace(/\s+/g, ' ').slice(0, 80);
  if (segmento.replace(/[^\p{L}]/gu, '').length < 3) return erro('Informe o seu tipo de negócio.');
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

// ═══════════════════════════════════════════════════════════════════
// DIAGNÓSTICO COMPLETO · 24 perguntas novas (as 11 do teste já ficam salvas: 11 + 24 = 35)
// Pilares do completo: 1 Entrega de valor · 2 Comunicação de valor.
// ═══════════════════════════════════════════════════════════════════
export const PILARES_COMPLETO = {
  1: { nome: 'Entrega de valor', sub: 'O que a empresa efetivamente faz e oferece aos clientes' },
  2: { nome: 'Comunicação de valor', sub: 'Como a empresa explica e demonstra o valor que oferece' },
};
// Onde cada pergunta do teste gratuito entra no diagnóstico completo.
export const PILAR_DO_TESTE = { P1: 1, P2: 1, P3: 1, P5: 1, P4: 2, P6: 2, P7: 2, P8: 2, P9: 2, P10: 2, P11: 2 };

export const CANAIS = ['Loja ou escritório físico', 'Site ou loja virtual', 'Instagram', 'WhatsApp', 'Google (Perfil da empresa)', 'LinkedIn', 'Marketplace', 'Vendedores ou representantes', 'Indicação de clientes', 'Feiras e eventos', 'Telefone ou e-mail'];

export const COMPLETO = [
  // Sobre a empresa (3)
  { id: 'CE', tipo: 'texto', bloco: 'empresa', q: 'Qual é o nome da sua empresa?', max: 80, min: 2, obrigatorio: true },
  { id: 'CO', tipo: 'texto', longo: true, q: 'Quais são os principais produtos ou serviços da sua empresa?', max: 240, min: 3, obrigatorio: true,
    ajuda: 'Ex.: pães de fermentação natural, bolos e cafés; ou consultoria tributária e planejamento para empresas.' },
  { id: 'CC', tipo: 'multi', q: 'Por quais canais sua empresa vende e atende?', ajuda: 'Marque todos os que você usa.', opcoes: CANAIS, outro: 'Outro canal' },
  // Pilar 1 · Entrega de valor (11)
  { id: 'E1', pilar: 1, bloco: 'entrega', tema: 'Qualidade', q: 'Como a empresa garante a qualidade do que entrega?', r: [
    ['Temos padrões definidos e conferimos antes de cada entrega.', 'A'], ['Temos padrões, mas a conferência depende de quem faz.', 'B'],
    ['Confiamos na experiência da equipe, sem padrão definido.', 'B'], ['A qualidade varia e às vezes recebemos reclamações.', 'C'], ['Não sei dizer.', 'D']] },
  { id: 'E2', pilar: 1, tema: 'Retrabalho e trocas', q: 'Com que frequência acontece retrabalho, troca ou devolução?', r: [
    ['Quase nunca, e quando acontece registramos o motivo.', 'A'], ['Quase nunca, mas não registramos.', 'B'], ['De vez em quando.', 'B'], ['Com frequência.', 'C'], ['Não sei dizer.', 'D']] },
  { id: 'E3', pilar: 1, tema: 'Experiência do cliente', q: 'Como é a experiência do cliente, do primeiro contato até depois da compra?', r: [
    ['Cada etapa tem um jeito combinado de atender, inclusive o pós-venda.', 'A'], ['O atendimento é bom, mas cada pessoa atende do seu jeito.', 'B'],
    ['Atendemos bem na venda, mas depois da compra quase não há contato.', 'C'], ['Recebemos reclamações de demora ou falta de retorno.', 'C'], ['Nunca olhamos o atendimento como etapas.', 'D']] },
  { id: 'E4', pilar: 1, tema: 'Tempo de resposta', q: 'Quanto tempo o cliente costuma esperar por uma resposta?', r: [
    ['Pouco tempo, com um prazo combinado com a equipe.', 'A'], ['Respondemos no mesmo dia, mas sem prazo definido.', 'B'],
    ['Depende de quem atende e do dia.', 'B'], ['Às vezes o cliente fica sem resposta.', 'C'], ['Não sei dizer.', 'D']] },
  { id: 'E5', pilar: 1, tema: 'Pós-venda', q: 'O que acontece depois que o cliente compra?', r: [
    ['Temos um contato combinado de pós-venda para saber como foi.', 'A'], ['Mandamos mensagem de vez em quando, sem rotina.', 'B'],
    ['Oferecemos algo novo quando surge oportunidade.', 'B'], ['Só falamos com o cliente se ele procurar.', 'C']] },
  { id: 'E6', pilar: 1, tema: 'Venda e entrega alinhadas', q: 'O que a venda promete é o mesmo que a entrega cumpre?', r: [
    ['Sim: venda e entrega combinam as promessas e conferimos.', 'A'], ['Quem vende é quem entrega, então fica igual.', 'B'],
    ['Quase sempre, mas às vezes a venda promete mais.', 'B'], ['Já tivemos problemas por prometer o que não foi entregue.', 'C'], ['Não sei dizer.', 'D']] },
  { id: 'E7', pilar: 1, tema: 'Consistência do atendimento', q: 'Se o cliente for atendido por pessoas diferentes, a experiência é a mesma?', r: [
    ['Sim, temos processos definidos e a equipe é treinada neles.', 'A'], ['Na maior parte das vezes, mas depende de quem atende.', 'B'],
    ['É igual quando eu estou presente; sem mim, muda.', 'B'], ['Varia bastante de um atendimento para outro.', 'C'], ['Não sei dizer.', 'D']] },
  { id: 'E8', pilar: 1, tema: 'Dependência do dono', q: 'Se você ficar uma semana fora, o que acontece com o atendimento e a entrega?', r: [
    ['Segue igual: a equipe sabe o que fazer.', 'A'], ['Segue, mas com algumas falhas.', 'B'],
    ['Trabalho sozinho: aviso os clientes e reorganizo os prazos.', 'B'], ['Muita coisa para ou atrasa.', 'C'], ['Nunca aconteceu, não sei dizer.', 'D']] },
  { id: 'E9', pilar: 1, tema: 'Motivos de saída', q: 'Você sabe por que alguns clientes deixam de comprar?', r: [
    ['Sim, perguntamos e registramos os motivos.', 'A'], ['Temos uma ideia, pelas conversas.', 'B'], ['Desconfiamos, mas nunca perguntamos.', 'C'],
    ['Não sabemos.', 'C'], ['Não se aplica: o cliente normalmente compra uma vez só.', 'NA']] },
  { id: 'E10', pilar: 1, tema: 'Melhoria contínua', q: 'O que acontece com reclamações, sugestões e erros?', r: [
    ['Registramos, analisamos e mudamos processos a partir deles.', 'A'], ['Resolvemos cada caso, mas não registramos nem mudamos o processo.', 'B'],
    ['Conversamos sobre isso quando dá tempo.', 'B'], ['Os mesmos problemas costumam se repetir.', 'C'], ['Não sei dizer.', 'D']] },
  { id: 'E11', pilar: 1, tipo: 'texto', longo: true, opcional: true, tema: 'O que faz o cliente desistir (aberta)', max: 240, min: 0,
    q: 'Na sua visão, o que mais faz um cliente reclamar ou desistir da sua empresa hoje?', ajuda: 'Opcional. Escreva do seu jeito.' },
  // Pilar 2 · Comunicação de valor (10)
  { id: 'M1', pilar: 2, tipo: 'texto', longo: true, opcional: true, bloco: 'comunicacao', tema: 'Por que escolhem a empresa (aberta)', max: 240, min: 0,
    q: 'Na sua visão, por que os clientes escolhem a sua empresa?', ajuda: 'Opcional. Escreva do seu jeito, como você explicaria para um amigo.' },
  { id: 'M2', pilar: 2, tema: 'Diferencial próprio', q: 'Um concorrente poderia dizer o mesmo diferencial que você diz?', r: [
    ['Não: é algo que só a gente pode dizer, e conseguimos provar.', 'A'], ['Em parte: temos algo próprio, mas falamos de forma parecida.', 'B'],
    ['Sim: falamos de qualidade, atendimento e preço, como todos.', 'C'], ['Nunca comparei.', 'D']] },
  { id: 'M3', pilar: 2, tema: 'Clareza do que o cliente paga', q: 'O cliente entende o que está pagando e o resultado que vai ter?', r: [
    ['Sim: mostramos o que está incluído e o resultado esperado antes do preço.', 'A'], ['Em parte: explicamos quando o cliente pergunta.', 'B'],
    ['Mostramos o produto ou serviço e o preço.', 'C'], ['Não sei dizer.', 'D']] },
  { id: 'M4', pilar: 2, tema: 'Material de venda', q: 'Existe material de apoio para vender (apresentação, proposta, catálogo, roteiro)?', r: [
    ['Sim, atualizado e usado por todos.', 'A'], ['Sim, mas desatualizado ou pouco usado.', 'B'], ['Cada um usa o que tem.', 'B'], ['Não temos.', 'C']] },
  { id: 'M5', pilar: 2, tema: 'Momento do preço', q: 'Quando o preço aparece na conversa com o cliente?', r: [
    ['Depois de o cliente entender o valor e os benefícios.', 'A'], ['Varia conforme quem atende.', 'B'],
    ['Logo no começo, porque o cliente pergunta.', 'C'], ['O preço é a primeira coisa que mostramos.', 'C']] },
  { id: 'M6', pilar: 2, tema: 'Demonstração de resultados', q: 'A empresa mostra resultados concretos do que entrega (números, antes e depois, casos)?', r: [
    ['Sim, temos resultados organizados e usamos na venda e na comunicação.', 'A'], ['Temos resultados, mas mostramos pouco ou só quando pedem.', 'B'],
    ['Temos bons resultados, mas nunca registramos.', 'C'], ['Não sabemos medir os resultados que entregamos.', 'C']] },
  { id: 'M7', pilar: 2, tema: 'Perfil no Google', q: 'Como está o perfil da sua empresa no Google (nota, avaliações e respostas)?', r: [
    ['Nota alta, muitas avaliações e respondemos todas.', 'A'], ['Temos avaliações, mas respondemos pouco.', 'B'],
    ['Poucas avaliações ou perfil desatualizado.', 'C'], ['Não temos perfil no Google.', 'C'], ['Não sei como está.', 'D']] },
  { id: 'M8', pilar: 2, tema: 'Pedido de avaliações', q: 'A empresa pede avaliações e depoimentos com regularidade?', r: [
    ['Sim, faz parte da rotina após cada venda ou entrega.', 'A'], ['Às vezes, quando lembramos.', 'B'],
    ['Só quando o cliente elogia por conta própria.', 'B'], ['Não pedimos.', 'C']] },
  { id: 'M9', pilar: 2, tema: 'Mensagem nos canais', q: 'Site, redes sociais, WhatsApp, propostas e atendimento passam a mesma mensagem?', r: [
    ['Sim, seguimos um padrão de mensagem e de tom em todos os canais.', 'A'], ['Em parte: alguns canais estão alinhados, outros não.', 'B'],
    ['Cada canal fala de um jeito.', 'C'], ['Não sei dizer.', 'D']] },
  { id: 'M10', pilar: 2, tema: 'Identidade visual', q: 'A identidade visual (logo, cores, materiais) segue um padrão em tudo?', r: [
    ['Sim, temos um padrão e todos os materiais seguem.', 'A'], ['Temos logo e cores, mas cada material sai de um jeito.', 'B'],
    ['Cada coisa é feita de um jeito.', 'C'], ['Não temos identidade visual definida.', 'C']] },
];
export const TOTAL_COMPLETO = 11 + COMPLETO.length; // 35

export const ESTADOS_COMPLETO = { forte: 'Estruturado', desenvolvimento: 'Em desenvolvimento', fragil: 'Frágil', inconclusivo: 'Precisa ser verificado' };

// Junta as 11 respostas do teste com as 24 novas e calcula o índice de 0 a 100 de cada pilar.
export function classificarCompleto(resp11, resp24) {
  const base = classificar(resp11).itens.map(x => ({ ...x, pilar: PILAR_DO_TESTE[x.id] }));
  const novas = COMPLETO.filter(p => p.r).map(p => {
    const [resposta, situacao] = p.r[Number(resp24[p.id])];
    return { id: p.id, pilar: p.pilar, tema: p.tema, pergunta: p.q, resposta, situacao };
  });
  const itens = [...base, ...novas];
  const pilares = {};
  for (const n of [1, 2]) {
    const lista = itens.filter(x => x.pilar === n);
    const c = { A: 0, B: 0, C: 0, D: 0, NA: 0 };
    lista.forEach(x => c[x.situacao]++);
    const validos = c.A + c.B + c.C;
    const indice = validos ? Math.round((c.A * 100 + c.B * 50) / validos) : null;
    let estado = 'desenvolvimento';
    if (validos < 4) estado = 'inconclusivo';
    else if (c.A / validos >= 0.7 && c.C === 0) estado = 'forte';
    else if (c.C >= 5 || indice < 35) estado = 'fragil';
    pilares[n] = { ...c, validos, indice, estado };
  }
  return { itens, pilares };
}

const limpaTxt = (v, max) => String(v ?? '').replace(/\s+/g, ' ').trim().slice(0, max);
export function validarCompleto(e) {
  const erro = m => ({ ok: false, erro: m });
  const base = validarEntrada(e);
  if (!base.ok) return base;
  const c = (e && e.completo) || {};
  const r = c.respostas || {};
  const respostas = {}, abertas = {};
  for (const p of COMPLETO) {
    if (p.tipo === 'texto') {
      const v = limpaTxt(r[p.id], p.max);
      if (p.obrigatorio && v.replace(/[^\p{L}]/gu, '').length < p.min) return erro('Preencha: ' + p.q);
      abertas[p.id] = v;
    } else if (p.tipo === 'multi') {
      const lista = (Array.isArray(r[p.id]) ? r[p.id] : []).map(x => limpaTxt(x, 100))
        .filter(x => p.opcoes.includes(x) || (x.startsWith(p.outro + ': ') && x.length > p.outro.length + 3)).slice(0, 15);
      if (!lista.length) return erro('Marque pelo menos um canal.');
      abertas[p.id] = lista;
    } else {
      const i = Number(r[p.id]);
      if (!Number.isInteger(i) || i < 0 || i >= p.r.length) return erro('Resposta inválida em ' + p.id + '.');
      respostas[p.id] = i;
    }
  }
  return { ok: true, dados: { ...base.dados, completo: { empresa: abertas.CE, oferta: abertas.CO, canais: abertas.CC, desistir: abertas.E11 || '', motivo: abertas.M1 || '', respostas } } };
}

// Relatório de reserva do completo (usado se a Inteligência Artificial não responder).
export function completoDeReserva(cc) {
  const peso = { C: 0, D: 1, B: 2, A: 3, NA: 4 };
  const frase = x => x.tema + ': ' + x.resposta.replace(/\.$/, '').toLowerCase() + '.';
  const pilares = [1, 2].map(n => {
    const lista = cc.itens.filter(x => x.pilar === n);
    return {
      pilar: n,
      leitura: { forte: 'Suas respostas indicam práticas estruturadas neste pilar. O desafio é manter e comprovar.', desenvolvimento: 'Há práticas que funcionam, mas parte delas depende de pessoas e não de método.', fragil: 'Este pilar concentra os principais pontos de atenção da empresa.', inconclusivo: 'Faltam informações para concluir. Vale verificar estes pontos.' }[cc.pilares[n].estado],
      funciona: lista.filter(x => x.situacao === 'A').slice(0, 3).map(frase),
      fragil: lista.filter(x => x.situacao === 'C' || x.situacao === 'B').sort((a, b) => peso[a.situacao] - peso[b.situacao]).slice(0, 3).map(frase),
      verificar: lista.filter(x => x.situacao === 'D').slice(0, 2).map(x => x.tema + ': vale verificar como isso acontece hoje.'),
    };
  });
  const piores = cc.itens.filter(x => x.situacao === 'C' || x.situacao === 'B').sort((a, b) => peso[a.situacao] - peso[b.situacao]).slice(0, 3);
  const prioridades = piores.map(x => ({
    titulo: 'Fortalecer: ' + x.tema.toLowerCase(),
    porque: 'Você respondeu: "' + x.resposta + '"',
    o_que_melhorar: 'Transformar essa prática em algo com método, que não dependa de uma pessoa nem da memória.',
    como_implementar: ['Escreva como essa prática deve acontecer, em poucas linhas.', 'Combine com a equipe quem faz e quando.', 'Teste por 30 dias e ajuste o que não funcionar.'],
    rotina: 'Revisão rápida uma vez por semana, nos primeiros 30 dias.',
    responsavel: 'O dono da empresa, com uma pessoa da equipe.',
    acompanhar: 'Anote uma vez por semana se a prática aconteceu e o que mudou.',
  }));
  return {
    resumo: 'Suas respostas mostram onde a empresa pode fortalecer a entrega e a comunicação de valor. As três prioridades abaixo indicam por onde começar.',
    entrega_enxerga: { entrega: 'O que você relata entregar aparece nas respostas sobre qualidade, atendimento e promessas.', enxerga: 'O cliente que ainda não conhece a empresa vê principalmente o que os canais, as provas e os argumentos de venda mostram.', distancia: 'Quanto mais essas duas partes se distanciam, mais a decisão tende a ir para o preço.' },
    pilares, prioridades,
  };
}
