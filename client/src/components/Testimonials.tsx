import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Testimonial {
  id: number;
  name: string;
  location: string;
  text: string;
  rating: number;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Carlos M.",
    location: "São Paulo, SP",
    text: "Meu notebook tava travando direto, não aguentava mais! Chamei pelo WhatsApp e em 20 minutos já estavam acessando remoto. Fizeram limpeza de sistema, otimização e ainda tiraram uns vírus. Ficou voando! Tudo online, super prático. Preço honesto demais!",
    rating: 5,
    image: "👨"
  },
  {
    id: 2,
    name: "Ana Paula",
    location: "Florianópolis, SC",
    text: "Pessoal, que atendimento incrível! Meu PC pegou vírus e perdi uns arquivos importantes. Atenderam remoto na hora, conseguiram recuperar TUDO e ainda limparam o sistema. Explicaram cada passo, super pacientes. Atendimento online sensacional! Vale cada centavo! 💙",
    rating: 5,
    image: "👩"
  },
  {
    id: 3,
    name: "Roberto S.",
    location: "Recife, PE",
    text: "Cara, é 1h30 DA MANHÃ e meu PC travou no meio de um trabalho urgente que tinha que entregar às 8h. Entrei em desespero total! Mandei no WhatsApp sem esperança nenhuma... e CARA, o técnico me respondeu NA HORA! Destravou tudo remoto em 30 min. Salvou minha vida literalmente! Atendimento 24/7 de verdade! 🙏",
    rating: 5,
    image: "👨‍💻"
  },
  {
    id: 4,
    name: "Juliana Ferreira",
    location: "Campo Grande, MS",
    text: "Precisava de atendimento presencial urgente, meu PC não ligava de jeito nenhum. Eles vieram em casa no mesmo dia! Descobriram que era a fonte queimada, trocaram na hora e ainda fizeram uma revisão completa. Profissionais top, super educados. Melhor atendimento presencial que já tive! 🔧",
    rating: 5,
    image: "👩‍💼"
  },
  {
    id: 5,
    name: "João Pedro",
    location: "Manaus, AM",
    text: "Sou estudante e meu note é minha vida. Ele começou a desligar do nada, fiquei desesperado. Entrei no site, mandei mensagem e em minutos já tavam me atendendo remoto. Descobriram que era superaquecimento, me ensinaram a limpar e otimizaram tudo. Resolveram online mesmo, sem precisar sair de casa! Top demais! 💻",
    rating: 5,
    image: "👦"
  },
  {
    id: 6,
    name: "Marcos Silva",
    location: "Campo Grande, MS",
    text: "Meu computador tava com problema físico na placa-mãe, precisava de atendimento presencial mesmo. Agendei pelo WhatsApp e vieram no dia seguinte. Levaram pra oficina, consertaram e devolveram em 2 dias. Ficou perfeito! Atendimento presencial impecável, pessoal muito gente boa. Recomendo! 👍",
    rating: 5,
    image: "👨‍🔧"
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000); // Muda a cada 5 segundos

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="relative py-20 bg-black/20 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            ⭐ O Que Nossos Clientes Dizem
          </h2>
          <p className="text-gray-400 text-lg">
            Depoimentos reais de clientes satisfeitos com nossos serviços
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-sm border-blue-500/30 hover:border-blue-400 transition-all shadow-2xl shadow-blue-500/20 overflow-hidden">
            {/* Quote Icon */}
            <div className="absolute top-6 left-6 opacity-10">
              <Quote className="w-20 h-20 text-blue-400" />
            </div>

            <CardContent className="pt-12 pb-8 px-8 relative">
              {/* Testimonial Content */}
              <div className="text-center mb-8 animate-fade-in">
                {/* Avatar */}
                <div className="mx-auto mb-6 w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-5xl shadow-lg shadow-blue-500/50">
                  {currentTestimonial.image}
                </div>

                {/* Stars */}
                <div className="flex justify-center gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-6 h-6 fill-yellow-400 text-yellow-400 animate-pulse"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    />
                  ))}
                </div>

                {/* Text */}
                <p className="text-gray-300 text-lg md:text-xl mb-8 italic leading-relaxed">
                  "{currentTestimonial.text}"
                </p>

                {/* Author Info */}
                <div className="space-y-1">
                  <h4 className="text-white font-bold text-xl">{currentTestimonial.name}</h4>
                  <p className="text-blue-400 font-medium">{currentTestimonial.location}</p>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-center gap-4">
                <Button
                  onClick={goToPrevious}
                  variant="outline"
                  size="icon"
                  className="rounded-full border-blue-500/30 hover:border-blue-400 hover:bg-blue-500/20 transition-all"
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>

                {/* Dots */}
                <div className="flex gap-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${
                        index === currentIndex
                          ? "bg-blue-400 w-8"
                          : "bg-gray-600 hover:bg-gray-500"
                      }`}
                      aria-label={`Ir para depoimento ${index + 1}`}
                    />
                  ))}
                </div>

                <Button
                  onClick={goToNext}
                  variant="outline"
                  size="icon"
                  className="rounded-full border-blue-500/30 hover:border-blue-400 hover:bg-blue-500/20 transition-all"
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>

              {/* Counter */}
              <div className="text-center mt-6 text-gray-500 text-sm">
                {currentIndex + 1} / {testimonials.length}
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-8 max-w-2xl mx-auto">
            <Card className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 border-blue-500/30 text-center p-4">
              <p className="text-3xl font-bold text-blue-400 mb-1">5.0</p>
              <p className="text-gray-400 text-sm">Avaliação Média</p>
            </Card>
            <Card className="bg-gradient-to-br from-green-600/20 to-green-800/20 border-green-500/30 text-center p-4">
              <p className="text-3xl font-bold text-green-400 mb-1">500+</p>
              <p className="text-gray-400 text-sm">Clientes Felizes</p>
            </Card>
            <Card className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 border-purple-500/30 text-center p-4">
              <p className="text-3xl font-bold text-purple-400 mb-1">98%</p>
              <p className="text-gray-400 text-sm">Satisfação</p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
