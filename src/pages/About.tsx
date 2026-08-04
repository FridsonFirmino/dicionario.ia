import {
  ArrowLeft,
  BookOpenText,
  Cpu,
  Languages,
  RotateCcw,
  ShieldAlert,
  Sparkles,
  Target,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Container } from "../components/layout/Container";
import { knowledgeAreas } from "../hooks/useSettings";

const steps = [
  {
    icon: Target,
    title: "Escolha o contexto",
    text: "Nas configurações (O icon encontra-se no canto inferior direito), selecione a área de conhecimento (o contexto). Ela define a lente pela qual cada termo será interpretado.",
  },
  {
    icon: Sparkles,
    title: "Pesquise o termo",
    text: "Digite qualquer expressão ou termo técnico. Se já estiver no catálogo, a resposta é imediata; caso contrário, é gerada por inteligência artificial.",
  },
  {
    icon: Languages,
    title: "Leia na sua língua",
    text: "Os verbetes respeitam o idioma escolhido, mostrando quando usar, quando evitar, exemplos e termos relacionados.",
  },
  {
    icon: RotateCcw,
    title: "Troque o contexto",
    text: "Mude a área de conhecimento nas configurações a qualquer momento e o mesmo termo passa a ser explicado sob uma nova perspectiva.",
  },
];

const features = [
  {
    icon: BookOpenText,
    title: "Dicionário técnico",
    text: "Focado em expressões, siglas e termos técnicos, não em palavras comuns.",
  },
  {
    icon: Target,
    title: "Interpretação por contexto",
    text: "O mesmo termo pode ter sentidos diferentes em áreas distintas. O verbete segue o contexto da área selecionada.",
  },
  {
    icon: Cpu,
    title: "Gerado por IA",
    text: "Verbetes completos produzidos pela API do Groq, com saída estruturada e respostas de alta velocidade.",
  },
  {
    icon: ShieldAlert,
    title: "Conteúdo gerado",
    text: "Use como apoio, o conteúdo é automático e pode conter imprecisões ou desatualizações.",
  },
];

export function About() {
  return (
    <main>
      <Container className="pt-2 pb-24">
        <div className="flex py-6 justify-start">
          <Link
            to="/"
            className="py-3 rounded-xl  text-white font-medium hover:text-emerald-600 transition-colors"
          >
            <ArrowLeft size={18} className="inline-block mr-2" />
            Voltar
          </Link>
        </div>
        <header className="mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-500">
            Dicionário técnico
          </span>
          <h1 className="mt-2 text-3xl md:text-5xl font-bold tracking-">
            Termos técnicos, explicados{" "}
            <span className="text-emerald-500">pelo contexto certo.</span>
          </h1>
          <p className="mt-5 text-justify text-base md:text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed">
            O Dicionário.IA é um dicionário conceitual para expressões e termos
            técnicos. Em vez de explicar apenas "a palavra", ele interpreta cada
            termo dentro de uma{" "}
            <strong className="text-zinc-800 dark:text-zinc-200 font-medium">
              área de conhecimento
            </strong>{" "}
            o contexto definido nas configurações.
          </p>
        </header>

        <section className="mb-12 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50  p-7 md:p-9">
          <span className="flex items-center gap-3 text-sm font-semibold text-emerald-500">
            <Target size={18} />
            Contexto = área de conhecimento
          </span>
          <h2 className="mt-2 text-2xl md:text-3xl font-semibold tracking-tight">
            Uma expressão pode ter muitos sentidos. O contexto define qual vale.
          </h2>
          <p className="mt-3 text-justify text-zinc-600 dark:text-zinc-300 leading-relaxed">
            Um termo técnico raramente tem um único significado, o que "stream"
            significa para quem trabalha com dados não é o que significa para
            quem trabalha com música. Por isso, antes de buscar um termo, você
            define a{" "}
            <strong className="text-zinc-800 dark:text-zinc-100 font-medium">
              área de conhecimento
            </strong>{" "}
            nas configurações o contexto que guia a interpretação. Ao trocar a
            área, o mesmo termo ganha um novo verbete, coerente com aquela
            perspectiva. Por padrão, o Dicionário.IA vem com a área de
            conhecimento "Tecnologia", mas você pode mudar para outras áreas
            disponíveis nas configurações.
          </p>
          <div className="mt-5">
            <span className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Áreas disponíveis
            </span>
            <div className="mt-2 flex flex-wrap gap-2">
              {knowledgeAreas.map((area) => (
                <span
                  key={area}
                  className="px-3 py-1.5 rounded-full text-sm font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight mb-6">
            Como funciona
          </h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {steps.map((step, index) => {
              return (
                <section
                  key={step.title}
                  className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-6"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">
                      0{index + 1}
                    </h3>
                  </div>
                  <h3 className="font-semibold">{step.title}</h3>
                  <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    {step.text}
                  </p>
                </section>
              );
            })}
          </div>
        </section>

        <section>
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight mb-6">
            Em resumo
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <section
                  key={feature.title}
                  className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-5"
                >
                  <Icon size={20} className="text-emerald-500 mb-3" />
                  <h3 className="font-semibold text-sm">{feature.title}</h3>
                  <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    {feature.text}
                  </p>
                </section>
              );
            })}
          </div>
        </section>

        <p className="mt-12 pt-6 border-t border-zinc-200/50 dark:border-zinc-800/50 text-center text-sm text-zinc-400 dark:text-zinc-500">
          Desenvolvido com ❤️ por{" "}
          <span className="font-medium text-zinc-500 dark:text-zinc-400">
            Fridson Firmino
          </span>
        </p>
      </Container>
    </main>
  );
}
