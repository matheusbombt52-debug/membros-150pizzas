// Capas dos produtos (p-*) e fotos dos pratos usadas nas receitas (f-*; massas usa a foto r-massa).
import pLasanha from "@/assets/p-lasanhas.jpg";
import pSobremesa from "@/assets/p-sobremesas.jpg";
import pEntrada from "@/assets/p-entradas.jpg";
import pMassa from "@/assets/p-massas-italianas.jpg";
import fLasanha from "@/assets/f-lasanhas.jpg";
import fSobremesa from "@/assets/f-sobremesas.jpg";
import fEntrada from "@/assets/f-entradas.jpg";
import fMassa from "@/assets/r-massa.jpg";
import type { Recipe, Volume } from "./recipes";

// Produtos extras (order bumps). Para trocar uma capa por foto real, substitua o arquivo em src/assets.
type Content = Pick<Recipe, "description" | "ingredients" | "steps" | "tips" | "time" | "yield">;
type Maker = (name: string, h: number) => Content;

const slugify = (s: string) =>
  s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
const hash = (s: string) => {
  let h = 0;
  for (const c of s) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return h;
};
const mainOf = (name: string) =>
  name.split(" ").length > 1 ? name.replace(/^\S+\s+(?:(?:de|da|do|ao|à|com|alla|alle|all'|al)\s+)?/i, "") : name;

const lasanha: Maker = (name, h) => ({
  description: `${name}: camadas generosas de massa, recheio cremoso e queijo gratinado, do jeito que a nonna servia no domingo.`,
  ingredients: ["500 g de massa de lasanha", `Recheio principal: ${mainOf(name).toLowerCase()} (cerca de 500 g)`, "600 ml de molho de tomate caseiro ou molho branco", "300 g de mussarela fatiada", "100 g de parmesão ralado", "Sal, pimenta-do-reino e noz-moscada a gosto", "Azeite extravirgem"],
  steps: [
    "Preaqueça o forno a 200 °C e unte um refratário com azeite.",
    "Refogue alho e cebola no azeite e prepare o recheio principal até ficar bem temperado.",
    "Aqueça o molho e acerte o sal. Ele deve ficar úmido, mas não aguado.",
    "Monte as camadas: molho, massa, recheio e mussarela. Repita 3 vezes.",
    "Finalize com molho, mussarela e parmesão ralado.",
    "Cubra com papel alumínio e asse 30 minutos; retire o papel e asse mais 15 minutos até gratinar.",
    "Deixe descansar 10 minutos antes de cortar para que as camadas firmem.",
  ],
  tips: ["O descanso depois de assar é o que garante fatias firmes.", "Use molho morno para a massa hidratar melhor durante o forno.", "Dá para montar na véspera e assar só na hora de servir."],
  time: `${70 + (h % 3) * 10} min`,
  yield: "8 porções",
});

const sobremesa: Maker = (name, h) => {
  const n = name.toLowerCase();
  const common = { time: `${30 + (h % 4) * 10} min + descanso`, yield: `${6 + (h % 3) * 2} porções` };
  if (/gelato|granita|semifreddo|sorvete|affogato/.test(n))
    return { ...common, time: `${25 + (h % 3) * 5} min + 4 h de freezer`,
      description: `${name}: refrescante, cremosa e com o sabor intenso das sorveterias italianas.`,
      ingredients: ["500 ml de creme de leite fresco", "300 ml de leite integral", "150 g de açúcar", `Sabor principal: ${mainOf(name).toLowerCase()}`, "1 pitada de sal"],
      steps: ["Aqueça o leite com o açúcar até dissolver e deixe esfriar.", "Misture o sabor principal e o creme de leite batido em ponto mole.", "Despeje em um recipiente fundo e leve ao freezer.", "A cada 40 minutos, mexa vigorosamente para quebrar os cristais de gelo (3 vezes).", "Deixe firmar por pelo menos 4 horas.", "Retire 5 minutos antes de servir em bolas ou taças."],
      tips: ["Mexer durante o congelamento é o segredo da textura cremosa.", "Sirva em taças geladas para durar mais."] };
  if (/torta|bolo|cheesecake|biscotti|amaretti|cantucci|pizzelle|crostata|pastiera|sfogliatelle|zeppole|bomboloni|cannoli/.test(n))
    return { ...common,
      description: `${name}: um clássico dos doces de padaria italiana, perfumado e delicioso com café.`,
      ingredients: ["250 g de farinha de trigo", "200 g de açúcar", "3 ovos", "120 g de manteiga ou azeite", "Raspas de limão e essência de baunilha", `Recheio ou sabor característico de ${name}`, "Açúcar de confeiteiro para finalizar"],
      steps: ["Preaqueça o forno a 180 °C e prepare a forma ou assadeira.", "Bata a manteiga com o açúcar até obter um creme claro.", "Acrescente os ovos um a um e as raspas de limão.", "Incorpore a farinha aos poucos, sem bater demais.", "Adicione o recheio ou sabor principal e leve ao forno por 30 a 40 minutos.", "Espere esfriar, desenforme e finalize com açúcar de confeiteiro."],
      tips: ["Ingredientes em temperatura ambiente misturam melhor.", "Faça o teste do palito antes de tirar do forno."] };
  return { ...common,
    description: `${name}: sobremesa cremosa e elegante, perfeita para encerrar uma refeição italiana.`,
    ingredients: ["500 ml de creme de leite fresco", "200 g de mascarpone ou creme base", "100 g de açúcar", `Ingrediente principal de ${name}`, "Cacau, frutas ou calda para finalizar"],
    steps: ["Prepare a base cremosa misturando o creme e o açúcar até ficar homogênea.", "Incorpore o ingrediente principal com movimentos suaves.", "Distribua em taças ou em um refratário.", "Leve à geladeira por no mínimo 4 horas.", "Finalize com cacau, frutas ou calda na hora de servir."],
    tips: ["Quanto mais gelada, melhor a textura.", "Prepare na véspera: o sabor fica ainda mais equilibrado."] };
};

const entrada: Maker = (name, h) => {
  const n = name.toLowerCase();
  const common = { time: `${15 + (h % 4) * 5} min`, yield: `${4 + (h % 3) * 2} porções` };
  if (/bruschetta|crostini/.test(n))
    return { ...common, description: `${name}: pão crocante com cobertura fresca, a entrada mais pedida nas trattorias.`,
      ingredients: ["8 fatias de pão italiano", "Azeite extravirgem", "1 dente de alho", `Cobertura: ${mainOf(name).toLowerCase()}`, "Sal e manjericão a gosto"],
      steps: ["Toste as fatias de pão no forno ou na frigideira até dourar.", "Esfregue o alho no pão ainda quente.", "Prepare a cobertura e tempere com azeite e sal.", "Monte sobre o pão e finalize com manjericão."], tips: ["Monte só na hora para o pão não amolecer."] };
  if (/carpaccio|salada|insalata|caprese|antipasto|tábua/.test(n))
    return { ...common, time: `${10 + (h % 3) * 5} min`, description: `${name}: leve, fresca e cheia de sabor, ideal para abrir o almoço.`,
      ingredients: [`Ingrediente principal de ${name}`, "Azeite extravirgem", "Suco de limão", "Sal e pimenta-do-reino", "Parmesão em lascas", "Folhas de rúcula ou manjericão"],
      steps: ["Lave e seque bem todos os ingredientes.", "Fatie ou monte o ingrediente principal em um prato grande.", "Tempere com azeite, limão, sal e pimenta.", "Finalize com parmesão e folhas frescas. Sirva imediatamente."], tips: ["Use azeite de boa qualidade: ele é o tempero principal."] };
  if (/sopa|minestrone|ribollita/.test(n))
    return { ...common, time: `${40 + (h % 3) * 10} min`, description: `${name}: reconfortante e rústica, como nas casas da Toscana.`,
      ingredients: ["2 colheres (sopa) de azeite", "1 cebola e 2 dentes de alho", `Base principal de ${name}`, "1 litro de caldo de legumes", "Sal, pimenta e ervas a gosto", "Parmesão ralado para servir"],
      steps: ["Refogue cebola e alho no azeite até dourar.", "Acrescente o ingrediente principal e refogue por 5 minutos.", "Adicione o caldo e cozinhe em fogo baixo por 25 minutos.", "Acerte o tempero, bata parte da sopa se quiser mais cremosa e sirva com parmesão."], tips: ["Fica ainda melhor no dia seguinte."] };
  if (/focaccia|grissini/.test(n))
    return { ...common, time: `${40 + (h % 2) * 10} min + 1 h de descanso`, description: `${name}: pão italiano aromático e dourado, perfeito para a mesa de antipasti.`,
      ingredients: ["500 g de farinha de trigo", "350 ml de água morna", "10 g de sal e 5 g de fermento seco", "Azeite extravirgem", `Cobertura: ${mainOf(name).toLowerCase()}`],
      steps: ["Misture farinha, água, sal e fermento até formar uma massa úmida.", "Deixe descansar por 1 hora, até dobrar de volume.", "Abra na assadeira untada com azeite e faça furinhos com os dedos.", "Distribua a cobertura e regue com azeite.", "Asse a 220 °C por 20 a 25 minutos."], tips: ["Furinhos com os dedos criam a textura alveolada."] };
  if (/arancini|crocchette|bolinho|in carrozza|fritto|lula|anéis|milanesa|dorê/.test(n))
    return { ...common, time: `${30 + (h % 3) * 5} min`, description: `${name}: crocante por fora e macio por dentro, sucesso em qualquer festa.`,
      ingredients: [`Recheio principal de ${name}`, "2 ovos batidos", "Farinha de trigo", "Farinha de rosca ou panko", "Óleo para fritar", "Sal e pimenta a gosto"],
      steps: ["Prepare e tempere o recheio principal.", "Modele as porções e passe na farinha, nos ovos e na farinha de rosca.", "Aqueça o óleo a 180 °C.", "Frite em pequenas porções até dourar e escorra em papel toalha.", "Sirva imediatamente, com limão ou molho de tomate."], tips: ["Óleo na temperatura certa evita que fique encharcado."] };
  return { ...common, time: `${25 + (h % 3) * 5} min`, description: `${name}: sabor caseiro e porção generosa para compartilhar.`,
    ingredients: [`Ingrediente principal de ${name}`, "Molho de tomate ou azeite", "Queijo ralado", "Alho, cebola e ervas", "Sal e pimenta a gosto"],
    steps: ["Preaqueça o forno a 200 °C.", "Prepare e tempere o ingrediente principal.", "Monte em uma assadeira com molho e queijo.", "Asse por 15 a 20 minutos até dourar.", "Sirva quente, com azeite e ervas frescas."], tips: ["Ervas frescas no final fazem toda a diferença."] };
};

const massa: Maker = (name, h) => {
  const n = name.toLowerCase();
  const common = { time: `${25 + (h % 4) * 5} min`, yield: `${4 + (h % 2) * 2} porções` };
  if (/massa fresca|massa de/.test(n))
    return { ...common, time: "40 min + 30 min de descanso", description: `${name}: a base de todas as massas caseiras, macia e com cor e sabor autênticos.`,
      ingredients: ["400 g de farinha tipo 00 ou de trigo", "4 ovos", "1 colher (sopa) de azeite", "1 pitada de sal", n.includes("espinafre") ? "100 g de espinafre cozido e bem espremido" : n.includes("beterraba") ? "80 g de beterraba cozida e batida" : "Água se necessário"],
      steps: ["Faça um vulcão com a farinha e coloque os ovos no centro.", "Misture com um garfo e depois sove por 10 minutos até ficar lisa.", "Embrulhe e deixe descansar 30 minutos.", "Abra a massa fina e corte no formato desejado.", "Cozinhe em água fervente salgada por 2 a 3 minutos."], tips: ["O descanso relaxa o glúten e facilita a abertura."] };
  if (/nhoque/.test(n))
    return { ...common, time: "50 min", description: `${name}: nuvens macias que derretem na boca, feitas em casa.`,
      ingredients: ["1 kg de batata (ou ingrediente principal) cozida", "250 g de farinha de trigo", "1 gema", "Sal e noz-moscada", "Molho a gosto"],
      steps: ["Amasse a base ainda quente e deixe esfriar.", "Misture a gema, o sal e a farinha aos poucos, sem sovar demais.", "Faça rolos e corte em pedaços de 2 cm.", "Cozinhe em água fervente: estão prontos quando subirem.", "Passe no molho e sirva na hora."], tips: ["Pouca farinha deixa o nhoque mais leve."] };
  if (/ravioli|capeletti|tortellini|canelone/.test(n))
    return { ...common, time: "60 min", description: `${name}: massa recheada com carinho, uma das glórias da cozinha italiana.`,
      ingredients: ["400 g de massa fresca ou folhas prontas", `Recheio: ${mainOf(name).toLowerCase()}`, "1 ovo para selar", "Molho de tomate ou branco", "Parmesão ralado e noz-moscada"],
      steps: ["Prepare o recheio e deixe esfriar.", "Distribua colheradas sobre a massa aberta e feche com ovo, sem deixar ar.", "Cozinhe em água fervente salgada até boiarem (3 a 5 minutos).", "Escorra com cuidado, passe no molho aquecido e finalize com parmesão."], tips: ["Pressione bem as bordas para não abrirem na água."] };
  if (/forno|gratinado/.test(n))
    return { ...common, time: `${40 + (h % 2) * 10} min`, description: `${name}: macarrão cremoso e gratinado, o prato que agrada toda a família.`,
      ingredients: ["500 g de macarrão", "500 ml de molho de tomate ou branco", "300 g de mussarela", "150 g de presunto ou recheio", "Parmesão ralado", "Sal e pimenta"],
      steps: ["Cozinhe o macarrão até ficar al dente e escorra.", "Misture com o molho e o recheio.", "Transfira para um refratário e cubra com mussarela e parmesão.", "Asse a 200 °C por 20 minutos até gratinar."], tips: ["Cozinhe 2 minutos a menos: ele termina no forno."] };
  return { ...common, description: `${name}: receita clássica de macarrão al dente com molho marcante e finalização italiana.`,
    ingredients: ["400 g de massa (formato da receita)", `Molho: ${mainOf(name).toLowerCase()}`, "3 dentes de alho", "Azeite extravirgem", "Parmesão ou pecorino ralado", "Sal grosso e pimenta-do-reino"],
    steps: ["Ferva 4 litros de água com 2 colheres (sopa) de sal grosso.", "Prepare o molho em uma frigideira larga com azeite e alho.", "Cozinhe a massa até ficar al dente, reservando 1 xícara da água do cozimento.", "Termine a massa na frigideira com o molho e um pouco da água reservada.", "Sirva imediatamente com queijo ralado e azeite."], tips: ["A água do cozimento liga o molho à massa.", "Nunca lave o macarrão depois de cozido."] };
};

const defs: { v: Omit<Volume, "names" | "numeral" | "extra">; photo: string; maker: Maker; names: string[] }[] = [
  { v: { id: "lasanhas", title: "Receitas de Lasanha", short: "Lasanhas", emoji: "🍽️", cover: pLasanha, description: "Lasanhas cremosas, camadas generosas e muito queijo gratinado." }, photo: fLasanha, maker: lasanha, names: [
    "Lasanha à Bolonhesa", "Lasanha de Presunto e Queijo", "Lasanha de Frango com Catupiry", "Lasanha Quatro Queijos", "Lasanha de Berinjela", "Lasanha de Abobrinha", "Lasanha de Espinafre e Ricota", "Lasanha de Cogumelos", "Lasanha de Camarão", "Lasanha de Salmão",
    "Lasanha de Atum", "Lasanha de Carne Seca", "Lasanha de Calabresa", "Lasanha de Bacalhau", "Lasanha ao Molho Branco", "Lasanha ao Pesto", "Lasanha de Linguiça Toscana", "Lasanha de Peru", "Lasanha Napolitana", "Lasanha de Brócolis com Bacon",
    "Lasanha de Milho", "Lasanha de Palmito", "Lasanha de Carne Moída com Queijo", "Lasanha de Costela Desfiada", "Lasanha de Frango com Brócolis", "Lasanha de Legumes", "Lasanha de Panela", "Lasanha de Micro-ondas", "Lasanha Branca de Frango", "Lasanha de Berinjela à Parmegiana"] },
  { v: { id: "sobremesas", title: "Sobremesas Italianas", short: "Sobremesas", emoji: "🍰", cover: pSobremesa, description: "Doces tradicionais da Itália para fechar a refeição com chave de ouro." }, photo: fSobremesa, maker: sobremesa, names: [
    "Tiramisù Clássico", "Panna Cotta com Calda de Frutas Vermelhas", "Cannoli Sicilianos", "Gelato de Pistache", "Gelato de Chocolate", "Gelato de Baunilha", "Gelato de Limão Siciliano", "Affogato", "Zabaione", "Semifreddo de Café",
    "Torta Caprese", "Torta de Ricota", "Torta de Limão Siciliano", "Torta de Amêndoas", "Bolo de Laranja Italiano", "Bolo de Azeite", "Cheesecake Italiano", "Biscotti de Amêndoas", "Amaretti", "Cantucci",
    "Pizzelle", "Zeppole", "Sfogliatelle", "Pastiera Napoletana", "Crostata de Frutas", "Crostata de Nutella", "Mousse de Chocolate Italiano", "Pudim de Mascarpone", "Creme de Mascarpone com Morangos", "Brigadeiro Italiano",
    "Granita de Limão", "Granita de Morango", "Pêssegos Recheados", "Peras ao Vinho", "Bomboloni"] },
  { v: { id: "entradas", title: "Entradas Italianas", short: "Entradas", emoji: "🥗", cover: pEntrada, description: "Antipasti, bruschettas e petiscos para começar a mesa com sabor." }, photo: fEntrada, maker: entrada, names: [
    "Bruschetta de Tomate e Manjericão", "Bruschetta de Cogumelos", "Bruschetta de Burrata", "Bruschetta de Presunto de Parma", "Bruschetta de Pesto", "Bruschetta de Berinjela", "Crostini de Gorgonzola e Mel", "Crostini de Ricota e Figo", "Crostini de Patê de Fígado", "Crostini de Alho Assado",
    "Carpaccio de Carne", "Carpaccio de Salmão", "Carpaccio de Abobrinha", "Carpaccio de Polvo", "Salada Caprese", "Insalata de Rúcula e Parmesão", "Insalata de Tomate e Cebola Roxa", "Insalata de Polvo", "Salada de Pera e Gorgonzola", "Insalata de Funghi",
    "Arancini de Queijo", "Arancini de Carne", "Arancini de Cogumelos", "Crocchette de Batata", "Bolinho de Mozzarella", "Mozzarella in Carrozza", "Polpette ao Sugo", "Polpette de Frango", "Fritto Misto", "Lula à Dorê",
    "Anéis de Cebola à Italiana", "Tábua de Antipasti", "Antipasto de Berinjela", "Antipasto de Pimentões Assados", "Antipasto de Azeitonas Temperadas", "Provolone à Milanesa", "Provolone Assado", "Queijo Grelhado com Mel", "Sopa de Tomate", "Minestrone",
    "Sopa de Cebola", "Ribollita", "Focaccia de Alecrim", "Focaccia de Tomate Cereja", "Grissini", "Cogumelos Recheados", "Tomates Recheados", "Pimentões Recheados"] },
  { v: { id: "massas-italianas", title: "Massas Italianas", short: "Massas", emoji: "🍝", cover: pMassa, description: "Spaghetti, nhoques, recheadas e massas frescas feitas em casa." }, photo: fMassa, maker: massa, names: [
    "Spaghetti alla Carbonara", "Spaghetti à Bolonhesa", "Spaghetti Aglio e Olio", "Spaghetti alle Vongole", "Spaghetti Cacio e Pepe", "Spaghetti ao Sugo", "Spaghetti alla Puttanesca", "Penne all'Arrabbiata", "Penne alla Vodka", "Penne ao Pesto",
    "Penne Quatro Queijos", "Fettuccine Alfredo", "Fettuccine com Cogumelos", "Fettuccine aos Frutos do Mar", "Tagliatelle ao Ragu", "Tagliatelle ao Limão Siciliano", "Tagliatelle com Salmão", "Linguine ao Pesto de Manjericão", "Linguine com Camarão", "Rigatoni à Amatriciana",
    "Rigatoni ao Forno", "Fusilli ao Pesto de Rúcula", "Fusilli com Brócolis e Linguiça", "Farfalle com Salmão", "Farfalle ao Molho de Gorgonzola", "Macarrão à Primavera", "Pappardelle ao Ragu de Linguiça", "Ravioli de Ricota e Espinafre", "Ravioli de Queijo", "Ravioli de Carne",
    "Ravioli de Abóbora", "Capeletti em Caldo", "Capeletti ao Molho Sugo", "Tortellini de Presunto e Queijo", "Tortellini ao Molho Branco", "Canelone de Carne", "Canelone de Ricota e Espinafre", "Canelone de Frango", "Nhoque de Batata", "Nhoque ao Sugo",
    "Nhoque aos Quatro Queijos", "Nhoque de Ricota", "Nhoque de Abóbora", "Macarrão Gratinado", "Macarrão de Forno com Presunto e Queijo", "Massa Fresca Caseira", "Massa de Espinafre", "Massa de Beterraba", "Talharim ao Alho e Óleo", "Talharim com Frango e Catupiry"] },
];

const NUMERALS = ["A", "B", "C", "D"];
export const extraVolumes: Volume[] = defs.map((d, i) => ({ ...d.v, numeral: NUMERALS[i]!, extra: true, names: d.names }));
export const extraRecipes: Recipe[] = defs.flatMap((d) =>
  d.names.map((name, idx) => ({
    slug: slugify(name),
    number: idx + 1,
    name,
    volumeId: d.v.id,
    image: d.photo,
    ...d.maker(name, hash(name)),
  })),
);
export const TOTAL_EXTRA_RECIPES = extraRecipes.length;
