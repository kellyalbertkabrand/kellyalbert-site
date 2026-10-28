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
      { texto: "Quais momentos da sua história marcaram você e moldaram quem você é hoje como pessoa e como empresário?", ajuda: "Pense em fatos que mudaram o seu jeito de ver o trabalho: uma pessoa, uma crise, uma conquista. Ex.: “Cresci no ateliê da minha mãe e aprendi ali o valor do feito à mão.”" },
      { texto: "Que características da sua personalidade aparecem na forma como você conduz o seu negócio?", ajuda: "São os seus traços que aparecem nas decisões do dia a dia. Ex.: “Sou detalhista, então reviso cada entrega antes de sair.”" },
      { texto: "No dia a dia da empresa, qual papel você mais exerce (criador, gestor, vendedor, comunicador…)? E qual papel você evita assumir?", ajuda: "Papel é a função que você ocupa de fato, não o cargo no cartão. Ex.: “Na prática, sou mais vendedora do que gestora. E fujo da parte financeira.”" },
      { texto: "O que dentro de você já está mudando, mas ainda não apareceu na comunicação da sua marca?", ajuda: "Aquilo que você já pensa ou já faz diferente, mas a marca ainda comunica do jeito antigo. Ex.: “Hoje atendo empresas, mas o Instagram ainda fala com pessoa física.”" },
      { texto: "O que hoje já não combina mais com você e, por isso, também não deve mais fazer parte da sua marca?", ajuda: "O que você faria questão de deixar para trás: um serviço, um tipo de cliente, um tom. Ex.: “Não quero mais competir por preço.”" },
    ],
  },
  {
    id: "posicionamento",
    capitulo: 5,
    nome: "Posicionamento Claro",
    descricao: "O lugar que a marca ocupa na mente e no coração das pessoas. Se a marca não escolhe, o mercado escolhe por ela.",
    perguntas: [
      { texto: "Quando um cliente escolhe a sua marca, qual motivo você acredita que mais pesa na decisão?", ajuda: "Posicionamento é o lugar que a sua marca ocupa na cabeça do cliente. Comece pelo motivo real da escolha, não pelo que você gostaria. Ex.: “Me escolhem pela rapidez na entrega.”" },
      { texto: "O que a sua marca entrega de forma tão consistente que já é reconhecida por isso, mesmo sem você prometer?", ajuda: "É aquilo pelo que você já é lembrado, mesmo sem anunciar. Ex.: “Todo cliente comenta do atendimento pelo WhatsApp.”" },
      { texto: "Em quais situações você percebe que a sua marca é comparada a concorrentes que não têm nada a ver com você?", ajuda: "Quando o cliente compara você com quem não tem nada a ver, é sinal de que o seu lugar ainda não está claro. Ex.: “Me comparam com lojas de departamento, mas eu faço curadoria.”" },
      { texto: "Se tivesse que resumir em uma frase simples, qual é o lugar único que a sua marca ocupa hoje?", ajuda: "Uma frase que só a sua marca poderia dizer. Ex.: “A cafeteria que resgata o café dos pequenos produtores da serra.”" },
      { texto: "Que espaço no mercado você precisa ter coragem de renunciar para que a sua marca seja lembrada pelo que realmente é?", ajuda: "Posicionar exige escolher, e escolher exige abrir mão. Ex.: “Preciso parar de atender qualquer tipo de evento e focar em casamentos.”" },
    ],
  },
  {
    id: "voz",
    capitulo: 6,
    nome: "Personalidade e Voz",
    descricao: "A linguagem viva da marca: tom, vocabulário e ritmo que a tornam reconhecível mesmo sem assinatura.",
    perguntas: [
      { texto: "Se a sua marca fosse uma pessoa, como você descreveria o jeito dela (séria, acolhedora, ousada, inspiradora…)?", ajuda: "Personalidade da marca é o jeito dela se comportar, como se fosse gente. Ex.: “Uma amiga experiente: acolhe, mas fala a verdade.”" },
      { texto: "Como você gostaria que a sua marca fosse lembrada quando alguém fala dela em uma conversa?", ajuda: "Pense na frase que você gostaria de ouvir quando um cliente indica a sua marca. Ex.: “Vai lá, eles resolvem sem enrolação.”" },
      { texto: "Quais palavras, expressões ou frases você sente que não combinam com a sua marca de jeito nenhum?", ajuda: "Palavras, gírias ou expressões que soariam estranhas na boca da sua marca. Ex.: “top”, “promoção imperdível”, “mano”." },
      { texto: "Quando você fala com clientes, prefere uma linguagem mais formal ou mais próxima? Por quê?", ajuda: "É o tom da conversa: mais formal (“prezado cliente”) ou mais próximo (“oi, tudo bem?”). Conte também o porquê da escolha." },
      { texto: "Qual emoção você quer que a sua marca desperte quando alguém lê ou ouve a sua mensagem?", ajuda: "A sensação que fica depois do contato com a marca. Ex.: confiança, alívio, orgulho, vontade de voltar." },
    ],
  },
  {
    id: "arquitetura",
    capitulo: 7,
    nome: "Arquitetura de Marca",
    descricao: "A organização das ofertas: o cliente entende por onde começar e qual caminho seguir.",
    perguntas: [
      { texto: "Liste tudo o que a sua marca oferece hoje: produtos, serviços, experiências, cursos, consultorias, eventos.", ajuda: "Arquitetura de marca é a organização de tudo o que você vende. Liste tudo, até o que está parado ou desatualizado." },
      { texto: "Se alguém perguntasse \"por onde eu começo?\", você saberia indicar uma ordem lógica entre as suas ofertas?", ajuda: "Pense no caminho do cliente: qual é a primeira compra natural e o que vem depois. Ex.: “Primeiro a consultoria de 1 hora, depois o projeto completo.”" },
      { texto: "Algum produto ou serviço da sua marca compete com outro, deixando o cliente confuso sobre qual escolher?", ajuda: "Acontece quando duas ofertas parecem iguais e o cliente não sabe escolher. Ex.: “Tenho dois pacotes de fotos quase iguais e todo mundo pergunta a diferença.”" },
      { texto: "Existe alguma oferta que você sente que não faz mais sentido manter? Por quê?", ajuda: "Uma oferta que dá muito trabalho, vende pouco ou não combina mais com quem a marca é hoje." },
      { texto: "Se você organizasse o seu portfólio em três níveis (entrada, meio e topo), como ele ficaria?", ajuda: "Entrada é a primeira compra. Meio é o aprofundamento. Topo é a entrega mais completa e transformadora. Ex.: livro, mentoria em grupo, projeto individual." },
    ],
  },
  {
    id: "visual",
    capitulo: 8,
    nome: "Expressão Visual com Propósito",
    descricao: "A coerência entre forma e verdade. Forma sem verdade é maquiagem; verdade sem forma é invisibilidade.",
    perguntas: [
      { texto: "Hoje, a sua marca tem uma identidade visual definida? Como você descreveria o estilo em poucas palavras?", ajuda: "Identidade visual é o conjunto de logo, cores, fontes e imagens. Ex.: “Minimalista, tons de bege, fotos claras.”" },
      { texto: "Você sente que a estética atual representa quem a sua marca realmente é, ou foi criada só para parecer profissional?", ajuda: "Às vezes a estética foi feita só para “parecer profissional” e não diz nada sobre a marca. Conte o que funciona e o que incomoda." },
      { texto: "Que sensações você gostaria que a sua marca despertasse só de bater o olho?", ajuda: "O que a pessoa sente antes de ler qualquer coisa. Ex.: sofisticação, energia, acolhimento, confiança." },
      { texto: "Existe algum elemento visual que está chamando mais atenção do que deveria, ou escondendo o que realmente importa?", ajuda: "Pode ser uma cor forte demais, uma fonte difícil de ler, fotos genéricas de banco de imagem, um logo que ninguém entende." },
      { texto: "Se a sua marca fosse representada por uma imagem simbólica, o que haveria nela?", ajuda: "Use a imaginação: um lugar, uma textura, um cenário. Ex.: “Uma mesa de madeira com luz de fim de tarde.”" },
    ],
  },
  {
    id: "proposta",
    capitulo: 9,
    nome: "Proposta de Valor e Narrativa",
    descricao: "A promessa que a marca cumpre com integridade e a história verdadeira que a sustenta.",
    perguntas: [
      { texto: "Se você tivesse que prometer algo para o seu público com total integridade, o que seria?", ajuda: "Promessa é aquilo que o cliente pode esperar sempre, sem exceção. Pense no que você cumpre mesmo nos dias difíceis." },
      { texto: "Para quem exatamente essa promessa faz mais sentido? Descreva essa pessoa ou empresa.", ajuda: "Descreva o cliente ideal com detalhes: momento de vida, dor, o que busca. Ex.: “Mulheres acima de 40 que estão empreendendo pela primeira vez.”" },
      { texto: "Em uma frase clara, qual é a proposta de valor da sua marca?", ajuda: "Proposta de valor é a frase que diz o que você entrega, para quem e por que isso tem valor único. Ex.: “Ajudo famílias endividadas a reconstruir a segurança financeira com planejamento realista.”" },
      { texto: "Qual é a história por trás da criação da sua marca? Quando, como e por que ela nasceu?", ajuda: "Narrativa central é a história verdadeira da marca: por que nasceu, o que precisou mudar, o que ela defende. Conte do seu jeito." },
      { texto: "O que a sua marca defende, mesmo que isso nem sempre seja popular?", ajuda: "São os valores e as posturas que a marca não negocia, mesmo perdendo uma venda. Ex.: “Não aceito projeto com prazo que comprometa a qualidade.”" },
    ],
  },
  {
    id: "presenca",
    capitulo: 10,
    nome: "Presença e Comunicação Estratégica",
    descricao: "A comunicação que acontece em todo ponto de contato, não só nas redes. O cliente não separa: ele sente o todo.",
    perguntas: [
      { texto: "Hoje, em quais lugares a sua marca aparece (redes sociais, site, eventos, atendimento, boca a boca, e-mail…)?", ajuda: "Pontos de contato são todos os lugares onde o cliente encontra a marca, inclusive o atendimento, o contrato e a embalagem." },
      { texto: "Sobre quais assuntos a sua marca pode falar com segurança e constância, porque realmente acredita neles?", ajuda: "São os temas em que a sua marca tem autoridade e assunto de sobra para falar toda semana." },
      { texto: "Existe algo que a sua marca evita dizer por medo ou comparação? Ou algo que você fala só porque todo mundo está falando?", ajuda: "Ex.: “Evito falar de preço porque tenho medo de parecer cara.” Ou: “Posto dancinha porque todo mundo posta.”" },
      { texto: "Quais canais ajudam a sua marca a mostrar quem ela é de verdade? E quais atrapalham ou distorcem essa imagem?", ajuda: "Canais são os meios de comunicação: Instagram, site, WhatsApp, e-mail, eventos. Diga quais mostram a marca de verdade e quais distorcem." },
      { texto: "Se a sua marca parasse de anunciar e ficasse em silêncio por um tempo, do que as pessoas mais sentiriam falta?", ajuda: "Imagine a marca 3 meses sem anunciar e sem postar. O que os clientes procurariam? O que faria falta?" },
    ],
  },
];

// Dados de contexto pedidos antes das perguntas.
export const PERFIL = [
  { id: "nome", rotulo: "Seu nome", obrigatorio: true },
  { id: "marca", rotulo: "Nome da marca", obrigatorio: true },
  { id: "segmento", rotulo: "Segmento ou área de atuação", obrigatorio: true },
  { id: "tempo", rotulo: "Há quanto tempo a marca existe?", obrigatorio: false },
  { id: "site", rotulo: "Site da empresa", obrigatorio: false, link: true, exemplo: "www.suamarca.com.br" },
  { id: "instagram", rotulo: "Instagram da marca", obrigatorio: false, link: true, exemplo: "@suamarca" },
  { id: "outras_redes", rotulo: "Outras redes (LinkedIn, TikTok, YouTube…)", obrigatorio: false, link: true, exemplo: "linkedin.com/company/suamarca" },
];

// Transforma o que a pessoa digitou em links visitáveis (aceita "@perfil", "www…", vírgulas).
export function linksDoPerfil(perfil) {
  const links = [];
  for (const id of ["site", "instagram", "outras_redes"]) {
    const bruto = String(perfil?.[id] ?? "").trim();
    if (!bruto) continue;
    for (let parte of bruto.split(/[\s,;]+/)) {
      parte = parte.trim();
      if (!parte) continue;
      if (id === "instagram" && /^@?[\w.]+$/.test(parte) && !parte.includes(".com")) {
        parte = "https://www.instagram.com/" + parte.replace(/^@/, "") + "/";
      } else if (!/^https?:\/\//i.test(parte)) {
        parte = "https://" + parte.replace(/^\/+/, "");
      }
      try {
        const url = new URL(parte);
        if (url.hostname.includes(".")) links.push({ tipo: id, url: url.href });
      } catch {}
    }
  }
  return links.slice(0, 6);
}

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
  { id: "oceano_azul", titulo: "A Estratégia do Oceano Azul", autor: "W. Chan Kim e Renée Mauborgne" },
  { id: "essencialismo", titulo: "Essencialismo", autor: "Greg McKeown" },
  { id: "ideias_que_colam", titulo: "Ideias que Colam (Made to Stick)", autor: "Chip Heath e Dan Heath" },
  { id: "vaca_roxa", titulo: "A Vaca Roxa", autor: "Seth Godin" },
  { id: "marketing_4", titulo: "Marketing 4.0", autor: "Philip Kotler, Hermawan Kartajaya e Iwan Setiawan" },
  { id: "economia_experiencia", titulo: "A Economia da Experiência", autor: "B. Joseph Pine II e James H. Gilmore" },
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
    // perguntas: [{ texto, ajuda }]
  };
}

// Valida as respostas recebidas. Devolve a lista de problemas (vazia = tudo certo).
export function validarRespostas(perfil, respostas) {
  const problemas = [];
  for (const campo of PERFIL) {
    const v = perfil?.[campo.id];
    if (campo.obrigatorio && (typeof v !== "string" || !v.trim())) problemas.push(`perfil.${campo.id}`);
    if (typeof v === "string" && v.length > 300) problemas.push(`perfil.${campo.id}`);
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
