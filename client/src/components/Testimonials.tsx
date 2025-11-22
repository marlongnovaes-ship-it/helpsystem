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
  date: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Carlos M.",
    location: "São Paulo, SP",
    text: "Meu notebook tava travando direto, não aguentava mais! Levei lá e em 2 dias tava pronto, rodando liso. Fizeram limpeza, trocaram a pasta térmica e ainda formataram. Ficou novo! Preço honesto e atendimento top. Já indiquei pra galera do trabalho.",
    rating: 5,
    image: "👨",
    date: "Há 2 semanas"
  },
  {
    id: 2,
    name: "Ana Paula",
    location: "Guarulhos, SP",
    text: "Pessoal, que atendimento incrível! Meu PC pegou vírus e perdi uns arquivos importantes. Eles conseguiram recuperar TUDO e ainda limparam o sistema. Explicaram cada passo, super pacientes. Agora só chamo eles quando preciso. Vale cada centavo! 💙",
    rating: 5,
    image: "👩",
    date: "Há 1 mês"
  },
  {
    id: 3,
    name: "Roberto S.",
    location: "Osasco, SP",
    text: "Tava precisando urgente de suporte pra uma apresentação importante. Chamei pelo WhatsApp às 22h (sim, de noite!) e o cara me atendeu na hora, resolveu tudo remoto em 40 minutos. Salvou minha vida! Profissionalismo 1000%. Recomendo de olhos fechados!",
    rating: 5,
    image: "👨‍💼",
    date: "Há 3 dias"
  },
  {
    id: 4,
    name: "Mari Costa",
    location: "Santo André, SP",
    text: "Gente, meu PC tava uma lesma, demorava 10 min pra ligar 😫 Fizeram upgrade de SSD e memória RAM, agora liga em 15 segundos! Parece mágica kkk. Além disso, me ensinaram a manter ele sempre rápido. Amei o serviço, super indico! ⚡",
    rating: 5,
    image: "👩‍🦰",
    date: "Há 1 semana"
  },
  {
    id: 5,
    name: "João Pedro",
    location: "São Bernardo, SP",
    text: "Sou estudante e meu note é minha vida. Ele começou a desligar do nada, fiquei desesperado. Levei lá e descobriram que era problema na ventoinha. Consertaram no mesmo dia e ainda fizeram uma revisão geral. Preço justo e muita honestidade. Virei cliente!",
    rating: 5,
    image: "👦",
    date: "Há 5 dias"
  },
  {
    id: 6,
    name: "Fernanda L.",
    location: "Diadema, SP",
    text: "Melhor experiência que já tive com técnico de informática! Meu computador não conectava no WiFi de jeito nenhum. Eles vieram em casa, identificaram o problema (placa de rede queimada) e já trouxeram a peça. Resolveram na hora. Educados, rápidos e preço bom. Nota 10! 👏",
    rating: 5,
    image: "👩‍🦱",
    date: "Há 4 dias"
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
                  <p className="text-gray-500 text-sm">{currentTestimonial.date}</p>
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
