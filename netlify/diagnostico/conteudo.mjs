// Conteúdo do Diagnóstico Marca com Essência©.
// Fonte única: perguntas, faixas de leitura e bibliografia.
// As perguntas vêm dos capítulos 4 a 10 do Livro MARCA COM ESSÊNCIA©.
// Para trocar uma pergunta ou um livro, edite só este arquivo.

export const PRODUTO = "Diagnóstico Marca com Essência©";

// 7 dimensões × 5 perguntas abertas = 35 respostas escritas pela própria pessoa.
export const DIMENSOES = [
  {
    id: "autoimagem",
    capitulo: 4,
    nome: "Autoimagem Estratégica",
    descricao: "A clareza de quem o fundador é no negócio. Toda marca é uma extensão da consciência de quem a lidera.",
    perguntas: [
      "Quais momentos da sua história marcaram você e moldaram quem você é hoje como pessoa e como empresário?",
      "Que características da sua personalidade aparecem na forma como você conduz o seu negócio?",
      "No dia a dia da empresa, qual papel você mais exerce (criador, gestor, vendedor, comunicador…)? E qual papel você evita assumir?",
      "O que dentro de você já está mudando, mas ainda não apareceu na comunicação da sua marca?",
      "O que hoje já não combina mais com você e, por isso, também não deve mais fazer parte da sua marca?",
    ],
  },
  {
    id: "posicionamento",
    capitulo: 5,
    nome: "Posicionamento Claro",
    descricao: "O lugar que a marca ocupa na mente e no coração das pessoas. Se a marca não escolhe, o mercado escolhe por ela.",
    perguntas: [
      "Quando um cliente escolhe a sua marca, qual motivo você acredita que mais pesa na decisão?",
      "O que a sua marca entrega de forma tão consistente que já é reconhecida por isso, mesmo sem você prometer?",
      "Em quais situações você percebe que a sua marca é comparada a concorrentes que não têm nada a ver com você?",
      "Se tivesse que resumir em uma frase simples, qual é o lugar único que a sua marca ocupa hoje?",
      "Que espaço no mercado você precisa ter coragem de renunciar para que a sua marca seja lembrada pelo que realmente é?",
    ],
  },
  {
    id: "voz",
    capitulo: 6,
    nome: "Personalidade e Voz",
    descricao: "A linguagem viva da marca: tom, vocabulário e ritmo que a tornam reconhecível mesmo sem assinatura.",
    perguntas: [
      "Se a sua marca fosse uma pessoa, como você descreveria o jeito dela (séria, acolhedora, ousada, inspiradora…)?",
      "Como você gostaria que a sua marca fosse lembrada quando alguém fala dela em uma conversa?",
      "Quais palavras, expressões ou frases você sente que não combinam com a sua marca de jeito nenhum?",
      "Quando você fala com clientes, prefere uma linguagem mais formal ou mais próxima? Por quê?",
      "Qual emoção você quer que a sua marca desperte quando alguém lê ou ouve a sua mensagem?",
    ],
  },
  {
    id: "arquitetura",
    capitulo: 7,
    nome: "Arquitetura de Marca",
    descricao: "A organização das ofertas: o cliente entende por onde começar e qual caminho seguir.",
    perguntas: [
      "Liste tudo o que a sua marca oferece hoje: produtos, serviços, experiências, cursos, consultorias, eventos.",
      "Se alguém perguntasse \"por onde eu começo?\", você saberia indicar uma ordem lógica entre as suas ofertas?",
      "Algum produto ou serviço da sua marca compete com outro, deixando o cliente confuso sobre qual escolher?",
      "Existe alguma oferta que você sente que não faz mais sentido manter? Por quê?",
      "Se você organizasse o seu portfólio em três níveis (entrada, meio e topo), como ele ficaria?",
    ],
  },
  {
    id: "visual",
    capitulo: 8,
    nome: "Expressão Visual com Propósito",
    descricao: "A coerência entre forma e verdade. Forma sem verdade é maquiagem; verdade sem forma é invisibilidade.",
    perguntas: [
      "Hoje, a sua marca tem uma identidade visual definida? Como você descreveria o estilo em poucas palavras?",
      "Você sente que a estética atual representa quem a sua marca realmente é, ou foi criada só para parecer profissional?",
      "Que sensações você gostaria que a sua marca despertasse só de bater o olho?",
      "Existe algum elemento visual que está chamando mais atenção do que deveria, ou escondendo o que realmente importa?",
      "Se a sua marca fosse representada por uma imagem simbólica, o que haveria nela?",
    ],
  },
  {
    id: "proposta",
    capitulo: 9,
    nome: "Proposta de Valor e Narrativa",
    descricao: "A promessa que a marca cumpre com integridade e a história verdadeira que a sustenta.",
    perguntas: [
      "Se você tivesse que prometer algo para o seu público com total integridade, o que seria?",
      "Para quem exatamente essa promessa faz mais sentido? Descreva essa pessoa ou empresa.",
      "Em uma frase clara, qual é a proposta de valor da sua marca?",
      "Qual é a história por trás da criação da sua marca? Quando, como e por que ela nasceu?",
      "O que a sua marca defende, mesmo que isso nem sempre seja popular?",
    ],
  },
  {
    id: "presenca",
    capitulo: 10,
    nome: "Presença e Comunicação Estratégica",
    descricao: "A comunicação que acontece em todo ponto de contato, não só nas redes. O cliente não separa: ele sente o todo.",
    perguntas: [
      "Hoje, em quais lugares a sua marca aparece (redes sociais, site, eventos, atendimento, boca a boca, e-mail…)?",
      "Sobre quais assuntos a sua marca pode falar com segurança e constância, porque realmente acredita neles?",
      "Existe algo que a sua marca evita dizer por medo ou comparação? Ou algo que você fala só porque todo mundo está falando?",
      "Quais canais ajudam a sua marca a mostrar quem ela é de verdade? E quais atrapalham ou distorcem essa imagem?",
      "Se a sua marca parasse de anunciar e ficasse em silêncio por um tempo, do que as pessoas mais sentiriam falta?",
    ],
  },
];

// Dados de contexto pedidos antes das perguntas.
export const PERFIL = [
  { id: "nome", rotulo: "Seu nome", obrigatorio: true },
  { id: "marca", rotulo: "Nome da marca", obrigatorio: true },
  { id: "segmento", rotulo: "Segmento ou área de atuação", obrigatorio: true },
  { id: "tempo", rotulo: "Há quanto tempo a marca existe?", obrigatorio: false },
];

// Faixas da leitura geral (nota de 0 a 100).
export const FAIXAS = [
  { min: 0, nome: "Marca sem Raiz", resumo: "A marca existe no mercado, mas o lugar que ela ocupa ainda está sendo escolhido pelos outros." },
  { min: 40, nome: "Marca em Construção", resumo: "Há verdade e valor, mas a estrutura ainda não sustenta a percepção com consistência." },
  { min: 70, nome: "Marca com Direção", resumo: "A base está clara. O desafio agora é coerência em todos os pontos de contato." },
  { min: 85, nome: "Marca com Essência", resumo: "Essência, estrutura e expressão caminham juntas. A marca é lembrada, desejada e escolhida." },
];

export function faixaDaNota(nota) {
  return [...FAIXAS].reverse().find((f) => nota >= f.min) ?? FAIXAS[0];
}

// Lista fechada de bibliografia. A Inteligência Artificial só pode indicar livros desta lista.
export const BIBLIOGRAFIA = [
  { id: "mce", titulo: "Marca com Essência", autor: "Kelly Albert" },
  { id: "sinek", titulo: "Comece pelo Porquê (Start with Why)", autor: "Simon Sinek" },
  { id: "schein", titulo: "Cultura Organizacional e Liderança", autor: "Edgar Schein" },
  { id: "ries_trout", titulo: "Posicionamento: A Batalha por sua Mente", autor: "Al Ries e Jack Trout" },
  { id: "neumeier_gap", titulo: "The Brand Gap", autor: "Marty Neumeier" },
  { id: "neumeier_zag", titulo: "Zag", autor: "Marty Neumeier" },
  { id: "keller", titulo: "Gestão Estratégica de Marcas", autor: "Kevin Lane Keller" },
  { id: "mark_pearson", titulo: "O Herói e o Fora-da-Lei", autor: "Margaret Mark e Carol S. Pearson" },
  { id: "miller", titulo: "Building a StoryBrand", autor: "Donald Miller" },
  { id: "aaker_lideranca", titulo: "Como Construir Marcas Líderes", autor: "David Aaker e Erich Joachimsthaler" },
  { id: "aaker_equity", titulo: "Managing Brand Equity", autor: "David Aaker" },
  { id: "kapferer", titulo: "The New Strategic Brand Management", autor: "Jean-Noël Kapferer" },
  { id: "wheeler", titulo: "Design de Identidade da Marca", autor: "Alina Wheeler" },
  { id: "olins", titulo: "The Brand Handbook", autor: "Wally Olins" },
  { id: "osterwalder", titulo: "Value Proposition Design", autor: "Alexander Osterwalder e outros" },
  { id: "mckee", titulo: "Story", autor: "Robert McKee" },
  { id: "godin", titulo: "Isso é Marketing", autor: "Seth Godin" },
  { id: "sharp", titulo: "How Brands Grow", autor: "Byron Sharp" },
  { id: "cialdini", titulo: "As Armas da Persuasão", autor: "Robert Cialdini" },
  { id: "kahneman", titulo: "Rápido e Devagar", autor: "Daniel Kahneman" },
];

// Limites das respostas (protegem custo e qualidade).
export const MIN_CARACTERES = 3;
export const MAX_CARACTERES = 2500;

// O que o navegador precisa para montar o questionário.
export function conteudoPublico() {
  return {
    produto: PRODUTO,
    perfil: PERFIL,
    maxCaracteres: MAX_CARACTERES,
    dimensoes: DIMENSOES.map(({ id, capitulo, nome, perguntas }) => ({ id, capitulo, nome, perguntas })),
  };
}

// Valida as respostas recebidas. Devolve a lista de problemas (vazia = tudo certo).
export function validarRespostas(perfil, respostas) {
  const problemas = [];
  for (const campo of PERFIL) {
    const v = perfil?.[campo.id];
    if (campo.obrigatorio && (typeof v !== "string" || !v.trim())) problemas.push(`perfil.${campo.id}`);
    if (typeof v === "string" && v.length > 200) problemas.push(`perfil.${campo.id}`);
  }
  for (const d of DIMENSOES) {
    const lista = respostas?.[d.id];
    d.perguntas.forEach((_, i) => {
      const v = Array.isArray(lista) ? lista[i] : undefined;
      if (typeof v !== "string" || v.trim().length < MIN_CARACTERES || v.length > MAX_CARACTERES) {
        problemas.push(`${d.id}.${i}`);
      }
    });
  }
  return problemas;
}
