export const defaultExamples = ["React", "Blockchain", "DDD", "Metáfora"];

// import type { TermData } from "../types";

// export const mockData: Record<string, TermData> = {
//   react: {
//     term: "React",
//     categories: ["Programação", "Frontend", "JavaScript"],
//     quickAnswer:
//       "React é uma biblioteca JavaScript usada para construir interfaces de utilizador através de componentes reutilizáveis.",
//     concept: [
//       "React foi criado pelo Facebook (agora Meta) e lançado em 2013. Ele introduziu uma abordagem inovadora baseada em componentes e um DOM virtual que otimiza a renderização de interfaces.",
//       "Diferente de frameworks completos, React é focado exclusivamente na camada de visualização, permitindo que os desenvolvedores escolham bibliotecas complementares para roteamento, estado global e outras necessidades.",
//       "O coração do React é o conceito de componentes: funções JavaScript que retornam JSX, uma extensão de sintaxe que combina HTML e JavaScript. Cada componente gerencia seu próprio estado e recebe dados através de props.",
//     ],
//     example: {
//       language: "tsx",
//       code: `function App() {\n  return <h1>Hello World</h1>;\n}`,
//       description:
//         'Este componente React retorna um elemento `h1` que renderiza "Hello World" na tela.',
//     },
//     whenToUse: [
//       "Construir SPAs e interfaces dinâmicas com alto nível de interação",
//       "Aplicações que exigem atualizações frequentes da interface baseadas em estado",
//       "Times que valorizam ecossistema maduro e comunidade ativa",
//       "Projetos que podem se beneficiar de reutilização de componentes",
//     ],
//     whenToAvoid: [
//       "Páginas estáticas sem interação que podem ser servidas com HTML puro",
//       "Projetos extremamente simples onde uma biblioteca como o HTMX seria suficiente",
//       "Times sem familiaridade com JSX e paradigma funcional",
//       "Aplicações que exigem renderização 100% server-side sem hidratação",
//     ],
//     commonMistakes: [
//       {
//         mistake: "Mutação direta do estado com React.setState incorretamente",
//         correction:
//           "Sempre use a função updater ou crie um novo objeto/array ao invés de mutar o estado existente",
//       },
//       {
//         mistake: "Usar índices como key em listas que podem ser reordenadas",
//         correction:
//           "Use identificadores únicos e estáveis como key, nunca o índice do array",
//       },
//       {
//         mistake:
//           "Ignorar o problema de prop drilling em componentes profundamente aninhados",
//         correction:
//           "Considere Context API ou bibliotecas como Zustand para estados compartilhados",
//       },
//     ],
//     relatedTerms: ["Next.js", "JavaScript", "TypeScript", "Vue.js", "Node.js"],
//   },
//   blockchain: {
//     term: "Blockchain",
//     categories: ["Tecnologia", "Criptomoedas", "Segurança"],
//     quickAnswer:
//       "Blockchain é um registro digital descentralizado e distribuído que armazena informações em blocos interligados, garantindo transparência e imutabilidade dos dados.",
//     concept: [
//       "Blockchain funciona como um livro-razão compartilhado onde cada transação é registrada em um bloco. Cada bloco contém um conjunto de transações, um carimbo de data/hora e o hash criptográfico do bloco anterior.",
//       "A descentralização é a característica fundamental: não existe uma autoridade central controlando a rede. Milhares de computadores (nós) mantêm cópias idênticas do registro, validando novas transações por consenso.",
//       "A segurança é garantida através de criptografia e mecanismos de consenso como Prova de Trabalho (PoW) ou Prova de Participação (PoS), que tornam impraticável a alteração de dados históricos.",
//     ],
//     example: {
//       language: "text",
//       code: `Bloco #42\n├── Hash anterior: 0000x7f3a...\n├── Transações:\n│   ├── Alice → Bob: 2 BTC\n│   └── Carol → Dave: 5 BTC\n├── Timestamp: 2024-03-15 14:30:00\n└── Hash: 0000b8e2f...`,
//       description:
//         "Exemplo simplificado de como um bloco na blockchain armazena transações e referência ao hash do bloco anterior, formando a corrente.",
//     },
//     whenToUse: [
//       "Registros que exigem transparência e auditabilidade pública",
//       "Sistemas onde a confiança precisa ser distribuída sem autoridade central",
//       "Tokenização de ativos e contratos inteligentes",
//       "Supply chain com rastreabilidade de ponta a ponta",
//     ],
//     whenToAvoid: [
//       "Bases de dados tradicionais comuns são mais rápidas e baratas para 99% dos casos",
//       "Projetos onde a escalabilidade de escrita é prioridade principal",
//       "Aplicações que exigem edição ou remoção frequente de dados",
//       "Sistemas onde todos os participantes confiam em uma autoridade central",
//     ],
//     commonMistakes: [
//       {
//         mistake: "Achar que blockchain é sinônimo de criptomoeda",
//         correction:
//           "Blockchain é a tecnologia subjacente; criptomoedas são apenas uma de suas aplicações",
//       },
//       {
//         mistake: "Ignorar o custo energético e taxa por transação",
//         correction:
//           "Avalie o custo total por transação e considere blockchains com Proof of Stake para reduzir impacto",
//       },
//       {
//         mistake: "Tentar armazenar arquivos grandes diretamente na blockchain",
//         correction:
//           "Armazene apenas hashes na blockchain e mantenha os arquivos em IPFS ou armazenamento tradicional",
//       },
//     ],
//     relatedTerms: [
//       "Criptomoeda",
//       "Bitcoin",
//       "Ethereum",
//       "Smart Contract",
//       "NFT",
//     ],
//   },
//   inflação: {
//     term: "Inflação",
//     categories: ["Economia", "Finanças", "Macroeconomia"],
//     quickAnswer:
//       "Inflação é o aumento generalizado e contínuo dos preços de bens e serviços em uma economia, reduzindo o poder de compra da moeda ao longo do tempo.",
//     concept: [
//       "A inflação é medida por índices como o IPCA (Brasil) ou CPI (EUA), que acompanham a variação de preços de uma cesta representativa de produtos e serviços consumidos pela população.",
//       "As principais causas da inflação incluem: excesso de demanda em relação à oferta (inflação de demanda), aumento dos custos de produção (inflação de custos) e expectativas inflacionárias que se autorrealizam.",
//       "Bancos centrais utilizam instrumentos como a taxa básica de juros (Selic no Brasil) para controlar a inflação, buscando mantê-la dentro da meta estabelecida.",
//     ],
//     whenToUse: [
//       "Análise de poder de compra e planejamento financeiro pessoal",
//       "Correção de contratos e aluguéis com indexação inflacionária",
//       "Decisões de investimento em renda fixa e variável",
//       "Planejamento estratégico de preços em empresas",
//     ],
//     whenToAvoid: [
//       "Não confundir inflação com aumento isolado de preço de um produto específico",
//       "Inflação não é o mesmo que desvalorização cambial, embora estejam relacionadas",
//       "Não use inflação passada como única referência para decisões sem considerar projeções",
//     ],
//     commonMistakes: [
//       {
//         mistake: "Achar que inflação zero é sempre desejável",
//         correction:
//           "Inflação muito baixa pode indicar recessão; a maioria dos bancos centrais busca inflação moderada (2-4%)",
//       },
//       {
//         mistake: "Confundir inflação com aumento de preços de um único bem",
//         correction:
//           "Inflação é sobre aumentos generalizados; um bem específico pode subir sem ser inflação",
//       },
//       {
//         mistake:
//           "Ignorar a inflação acumulada ao analisar retornos de investimentos",
//         correction:
//           "Sempre avalie retorno real (descontando a inflação) e não apenas o retorno nominal",
//       },
//     ],
//     relatedTerms: ["IPCA", "Selic", "Poder de Compra", "Juros", "Recessão"],
//   },
//   metáfora: {
//     term: "Metáfora",
//     categories: ["Português", "Literatura", "Figuras de Linguagem"],
//     quickAnswer:
//       "Metáfora é uma figura de linguagem que estabelece uma relação de semelhança entre dois termos ou ideias, substituindo um pelo outro sem usar conectivos comparativos.",
//     concept: [
//       'Diferente da comparação, que usa conectivos como "como" ou "tal qual", a metáfora realiza uma substituição direta: "Ele é um leão" (em vez de "ele é forte como um leão").',
//       "A metáfora opera por transferência de significado: um termo que designa uma coisa é aplicado a outra coisa com a qual mantém alguma similaridade implícita, enriquecendo a expressão.",
//       'Existem metáforas cotidianas tão incorporadas à linguagem que já não percebemos como figuras de linguagem, como "perna da mesa" ou "coração da cidade" — são chamadas de metáforas fossilizadas.',
//     ],
//     example: {
//       language: "text",
//       code: `"A vida é uma estrada de mão única"\n\n↓\n\nVida = Estrada\n- Ambas têm um percurso\n- Ambas têm destino\n- Ambas não permitem voltar`,
//       description:
//         "A metáfora compara vida a uma estrada de mão única, sugerindo que assim como não se pode voltar em uma via de sentido único, também não se pode reviver o passado.",
//     },
//     whenToUse: [
//       "Expressar ideias abstratas de forma mais concreta e compreensível",
//       "Enriquecer textos literários e poéticos com camadas de significado",
//       "Facilitar a comunicação de conceitos complexos em apresentações e ensino",
//       "Criar impacto e memorabilidade em discursos e copywriting",
//     ],
//     whenToAvoid: [
//       "Textos técnicos e científicos que exigem precisão literal",
//       "Documentos jurídicos onde ambiguidade pode gerar problemas de interpretação",
//       "Comunicação intercultural onde a metáfora pode não fazer sentido para outras culturas",
//       "Excesso de metáforas pode tornar o texto confuso e cansativo",
//     ],
//     commonMistakes: [
//       {
//         mistake: "Confundir metáfora com comparação",
//         correction:
//           'Na comparação há conectivo (como, tal qual); na metáfora a substituição é direta: "Seus olhos são duas jabuticabas" (metáfora) vs "Seus olhos são como jabuticabas" (comparação)',
//       },
//       {
//         mistake: "Usar metáforas misturadas ou inconsistentes",
//         correction:
//           "Mantenha a coerência da imagem: não misture metáforas de universos diferentes na mesma frase",
//       },
//       {
//         mistake: "Achar que metáfora é apenas recurso poético",
//         correction:
//           "Metáforas são usadas diariamente na comunicação cotidiana e são ferramentas cognitivas fundamentais",
//       },
//     ],
//     relatedTerms: [
//       "Comparação",
//       "Analogia",
//       "Metonímia",
//       "Catacrese",
//       "Figuras de Linguagem",
//     ],
//   },
// };
