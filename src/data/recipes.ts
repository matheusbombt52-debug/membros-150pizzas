import { extraRecipes, extraVolumes } from "./extras";
import margherita from "@/assets/r-margherita.jpg";
import queijos from "@/assets/r-queijos.jpg";
import doce from "@/assets/r-doce.jpg";
import artesanal from "@/assets/r-artesanal.jpg";
import veg from "@/assets/r-veg.jpg";
import especial from "@/assets/r-especial.jpg";
import massa from "@/assets/r-massa.jpg";
import cogumelos from "@/assets/r-cogumelos.jpg";
import calabresa from "@/assets/r-calabresa.jpg";
import banana from "@/assets/r-banana.jpg";
import frango from "@/assets/r-frango.jpg";
import molhos from "@/assets/b-molhos.jpg";
import bMassa from "@/assets/b-massa.jpg";

export type Volume = {
  id: string;
  numeral: string;
  title: string;
  short: string;
  emoji: string;
  cover: string;
  description: string;
  names: string[];
  extra?: boolean;
};

export type Recipe = {
  slug: string;
  number: number;
  name: string;
  volumeId: string;
  image: string;
  description: string;
  ingredients: string[];
  steps: string[];
  tips: string[];
  time: string;
  yield: string;
};

export const volumes: Volume[] = [
  {
    id: "classicas",
    numeral: "I",
    title: "Clássicas Italianas",
    short: "Clássicas",
    emoji: "🍕",
    cover: margherita,
    description: "As receitas que fizeram a fama das pizzarias de Nápoles a Roma.",
    names: [
      "Pizza Margherita", "Pizza Marinara", "Pizza Napoletana", "Pizza Calabresa", "Pizza Portuguesa",
      "Pizza Mussarela", "Pizza Pepperoni", "Pizza Capricciosa", "Pizza Prosciutto e Funghi", "Pizza Diavola",
      "Pizza Romana", "Pizza Siciliana", "Pizza Caprese", "Pizza de Frango com Catupiry", "Pizza Toscana",
      "Pizza Bolonhesa", "Pizza de Atum", "Pizza Alho e Óleo", "Pizza Quattro Stagioni", "Pizza Parma",
      "Pizza Milano", "Pizza Veneziana", "Pizza Lombarda", "Pizza Bianca", "Pizza Salame Italiano",
      "Pizza Presunto e Queijo", "Pizza Acciughe", "Pizza de Bacon", "Pizza Baiana", "Pizza Fiorentina",
    ],
  },
  {
    id: "artesanais",
    numeral: "II",
    title: "Artesanais",
    short: "Artesanais",
    emoji: "🍕",
    cover: artesanal,
    description: "Massas de longa fermentação e combinações de pizzaria artesanal.",
    names: [
      "Pizza Parma com Rúcula", "Pizza de Linguiça Artesanal", "Pizza Burrata e Tomate Confit", "Pizza Mortadela e Pistache", "Pizza de Abobrinha e Hortelã",
      "Pizza Bresaola e Parmesão", "Pizza de Cebola Caramelizada", "Pizza Nduja e Mel", "Pizza Fior di Latte", "Pizza de Tomate Assado e Alho",
      "Pizza de Pancetta e Ovo", "Pizza Porchetta", "Pizza de Figo e Presunto", "Pizza de Salame e Pimenta", "Pizza Rústica de Forno a Lenha",
      "Pizza de Batata e Alecrim", "Pizza Speck e Brie", "Pizza de Copa e Rúcula", "Pizza Pesto e Tomate Seco", "Pizza de Azeitonas Pretas e Orégano",
      "Pizza de Lombo Defumado", "Pizza Stracciatella e Limão", "Pizza de Abóbora e Sálvia", "Pizza de Cogumelos e Trufa", "Pizza de Pera e Gorgonzola",
    ],
  },
  {
    id: "especiais",
    numeral: "III",
    title: "Especiais",
    short: "Especiais",
    emoji: "🍕",
    cover: especial,
    description: "Criações autorais para impressionar em ocasiões especiais.",
    names: [
      "Pizza Pepperoni com Mel Picante", "Pizza de Camarão ao Alho", "Pizza Carbonara", "Pizza de Filé Mignon", "Pizza de Salmão e Cream Cheese",
      "Pizza de Costela Desfiada", "Pizza Strogonoff", "Pizza de Carne Seca e Abóbora", "Pizza Lasanha", "Pizza de Frango Barbecue",
      "Pizza de Picanha", "Pizza de Polvo e Batata", "Pizza de Lombo e Abacaxi", "Pizza Calzone Aberta", "Pizza de Pato e Laranja",
      "Pizza de Frutos do Mar", "Pizza Burrata e Pepperoni", "Pizza de Peito de Peru e Ricota", "Pizza de Chorizo e Pimentão", "Pizza de Bacalhau",
      "Pizza Parmegiana", "Pizza de Cupim", "Pizza à Moda da Casa", "Pizza de Linguiça e Cebola Roxa", "Pizza Toscana Premium",
    ],
  },
  {
    id: "queijos",
    numeral: "IV",
    title: "Diferentes Tipos de Queijo",
    short: "Queijos",
    emoji: "🧀",
    cover: queijos,
    description: "Uma viagem pelos queijos italianos e suas combinações perfeitas.",
    names: [
      "Pizza Quattro Formaggi", "Pizza Cinque Formaggi", "Pizza de Gorgonzola e Nozes", "Pizza de Brie e Damasco", "Pizza de Burrata",
      "Pizza de Provolone", "Pizza de Parmesão e Azeite", "Pizza de Queijo de Cabra e Mel", "Pizza de Ricota e Espinafre", "Pizza de Mussarela de Búfala",
      "Pizza de Pecorino e Pimenta", "Pizza de Taleggio", "Pizza de Fontina e Cogumelos", "Pizza de Scamorza Defumada", "Pizza de Catupiry",
      "Pizza de Camembert", "Pizza de Emmental e Presunto", "Pizza de Gorgonzola e Pera", "Pizza de Mascarpone e Limão", "Pizza Tre Formaggi",
    ],
  },
  {
    id: "vegetarianas",
    numeral: "V",
    title: "Vegetarianas",
    short: "Vegetarianas",
    emoji: "🌿",
    cover: veg,
    description: "Sabores frescos da horta italiana, cheios de cor e perfume.",
    names: [
      "Pizza de Cogumelos e Ervas", "Pizza Ortolana", "Pizza de Berinjela", "Pizza de Abobrinha", "Pizza de Brócolis e Alho",
      "Pizza Primavera", "Pizza de Espinafre e Ricota", "Pizza de Palmito", "Pizza de Tomate e Manjericão", "Pizza de Pimentões Assados",
      "Pizza de Alcachofra", "Pizza de Milho e Ervilha", "Pizza de Rúcula e Tomate Seco", "Pizza de Escarola", "Pizza Pesto Genovese",
      "Pizza de Aspargos", "Pizza de Cebola e Azeitona", "Pizza de Abóbora e Ricota", "Pizza Mediterrânea", "Pizza de Champignon",
    ],
  },
  {
    id: "doces",
    numeral: "VI",
    title: "Pizzas Doces",
    short: "Doces",
    emoji: "🍫",
    cover: doce,
    description: "Sobremesas irresistíveis para fechar a noite com chave de ouro.",
    names: [
      "Pizza de Nutella com Morangos", "Pizza de Banana, Canela e Açúcar", "Pizza de Chocolate ao Leite", "Pizza Romeu e Julieta", "Pizza de Doce de Leite",
      "Pizza de Chocolate Branco e Morango", "Pizza Prestígio", "Pizza de Brigadeiro", "Pizza de Maçã com Canela", "Pizza de Nutella e Avelã",
      "Pizza de Frutas Vermelhas", "Pizza de Banana com Chocolate", "Pizza Sensação", "Pizza de Mascarpone e Figo", "Pizza de Abacaxi com Coco",
    ],
  },
  {
    id: "massas-molhos",
    numeral: "VII",
    title: "Massas, Molhos e Complementos",
    short: "Massas e Molhos",
    emoji: "🍅",
    cover: massa,
    description: "A base de tudo: massas, molhos e acompanhamentos da tradição.",
    names: [
      "Massa Napolitana Tradicional", "Massa de Fermentação Lenta", "Massa Integral", "Massa de Frigideira", "Massa de Pizza Doce",
      "Molho de Tomate Clássico", "Molho Pomodoro", "Molho Pesto", "Molho Branco", "Molho Arrabbiata",
      "Azeite Temperado", "Borda Recheada de Catupiry", "Calzone", "Focaccia", "Pão de Alho Italiano",
    ],
  },
];

const slugify = (s: string) =>
  s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

function pickImage(name: string, vol: Volume): string {
  const n = name.toLowerCase();
  if (/nutella|morango|chocolate|brigadeiro|prestígio|sensação|frutas|julieta|doce de leite/.test(n)) return doce;
  if (/banana|canela|maçã|abacaxi com coco/.test(n)) return banana;
  if (/cogumel|funghi|champignon|trufa/.test(n)) return cogumelos;
  if (/frango|catupiry|peru/.test(n)) return frango;
  if (/calabresa|pepperoni|salame|diavola|linguiça|chorizo|nduja/.test(n)) return vol.id === "especiais" ? especial : calabresa;
  if (/formaggi|gorgonzola|brie|queijo|provolone|taleggio|fontina|scamorza|camembert|emmental|pecorino|mascarpone|búfala|parmesão e azeite/.test(n)) return queijos;
  if (/parma|prosciutto|rúcula|bresaola|speck|copa|figo|presunto/.test(n)) return artesanal;
  if (/molho|pesto|azeite/.test(n) && vol.id === "massas-molhos") return molhos;
  if (/^massa/.test(n)) return bMassa;
  if (/margherita|marinara|napoletana|caprese|tomate e manjericão/.test(n)) return margherita;
  if (vol.id === "vegetarianas") return veg;
  return vol.cover;
}

const BASE_DOUGH = ["1 disco de massa de pizza (≈ 300 g)", "Farinha para polvilhar", "Azeite extravirgem a gosto"];

function hash(s: string) {
  let h = 0;
  for (const c of s) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return h;
}

function buildContent(name: string, vol: Volume) {
  const core = name.replace(/^Pizza (de |à )?/i, "");
  const parts = core
    .split(/,| e | com /i)
    .map((p) => p.trim())
    .filter(Boolean);
  const h = hash(name);
  const isSweet = vol.id === "doces";
  const isBase = vol.id === "massas-molhos";

  if (isBase) {
    return {
      description: `${name}: uma base essencial da cozinha italiana, simples de fazer e cheia de sabor para elevar suas pizzas.`,
      ingredients: /massa|focaccia|calzone|pão/i.test(name)
        ? ["500 g de farinha tipo 00", "325 ml de água fria", "10 g de sal", "3 g de fermento biológico seco", "15 ml de azeite extravirgem"]
        : ["800 g de tomates pelados ou ingredientes frescos", "3 dentes de alho", "Folhas de manjericão fresco", "Sal e pimenta-do-reino", "Azeite extravirgem"],
      steps: [
        "Separe e meça todos os ingredientes antes de começar (mise en place).",
        "Combine os ingredientes principais em uma tigela grande ou panela, seguindo a ordem da lista.",
        "Trabalhe a preparação com calma até atingir textura homogênea e aroma marcante.",
        "Deixe descansar ou apurar pelo tempo indicado para desenvolver o sabor.",
        "Ajuste o tempero, porcione e utilize imediatamente ou armazene corretamente.",
      ],
      tips: [
        "Use ingredientes de boa qualidade: na cozinha italiana, a simplicidade depende deles.",
        "Pode ser preparado com antecedência e guardado na geladeira por até 3 dias.",
      ],
      time: `${30 + (h % 4) * 15} min`,
      yield: `${4 + (h % 3) * 2} porções`,
    };
  }

  const toppings = parts.map((p) => `${p.charAt(0).toUpperCase()}${p.slice(1)} a gosto`);
  const base = isSweet
    ? ["Creme de leite ou chocolate para a base", "Açúcar de confeiteiro para finalizar"]
    : ["4 colheres (sopa) de molho de tomate", "200 g de mussarela fatiada ou em cubos", "Orégano ou manjericão fresco"];

  return {
    description: isSweet
      ? `Uma sobremesa irresistível: ${core.toLowerCase()} sobre massa fina e crocante, perfeita para dividir.`
      : `${name} da coleção ${vol.title}: massa leve, borda dourada e sabor autêntico, do jeito que se come na Itália.`,
    ingredients: [...BASE_DOUGH, ...base, ...toppings],
    steps: [
      "Preaqueça o forno na temperatura máxima (250–280 °C) por pelo menos 30 minutos, de preferência com pedra ou assadeira dentro.",
      "Abra a massa com as pontas dos dedos sobre superfície enfarinhada, preservando a borda com ar.",
      isSweet ? "Espalhe a base doce de forma uniforme, deixando 2 cm de borda livre." : "Espalhe o molho em espiral, do centro para fora, e distribua a mussarela.",
      `Distribua a cobertura: ${core.toLowerCase()}, sem sobrecarregar a massa.`,
      "Asse por 8 a 12 minutos, até a borda dourar e o recheio borbulhar.",
      isSweet ? "Finalize com açúcar de confeiteiro e sirva ainda morna." : "Finalize com um fio de azeite e folhas frescas. Fatie e sirva imediatamente.",
    ],
    tips: [
      "Não exagere na cobertura: a massa italiana precisa respirar para ficar crocante.",
      isSweet ? "Ingredientes frescos (como frutas) vão melhor depois de assar." : "Retire a mussarela da geladeira 30 minutos antes para derreter de forma uniforme.",
      "Se usar forno doméstico, asse na grade mais alta para dourar melhor a superfície.",
    ],
    time: `${25 + (h % 4) * 5} min`,
    yield: `${1 + (h % 2)} pizza${h % 2 ? "s" : ""} (8 fatias)`,
  };
}

let counter = 0;
export const recipes: Recipe[] = volumes.flatMap((vol) =>
  vol.names.map((name) => {
    counter += 1;
    return {
      slug: slugify(name),
      number: counter,
      name,
      volumeId: vol.id,
      image: pickImage(name, vol),
      ...buildContent(name, vol),
    };
  }),
);

export const TOTAL_RECIPES = recipes.length;
export const getVolume = (id: string) => volumes.find((v) => v.id === id) ?? extraVolumes.find((v) => v.id === id);
export const getRecipe = (slug: string) => recipes.find((r) => r.slug === slug) ?? extraRecipes.find((r) => r.slug === slug);
export const recipesOf = (volumeId: string) => [...recipes, ...extraRecipes].filter((r) => r.volumeId === volumeId);
export const allRecipes = [...recipes, ...extraRecipes];
export const pizzaSlugs = new Set(recipes.map((r) => r.slug));
export const volumeLabel = (v: Volume) => (v.extra ? "Produto extra" : `Volume ${v.numeral}`);
export { extraVolumes, extraRecipes, TOTAL_EXTRA_RECIPES } from "./extras";
export const normalize = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

export const featuredSlugs = [
  "pizza-quattro-formaggi",
  "pizza-caprese",
  "pizza-de-nutella-com-morangos",
  "pizza-de-cogumelos-e-ervas",
  "pizza-de-banana-canela-e-acucar",
];
