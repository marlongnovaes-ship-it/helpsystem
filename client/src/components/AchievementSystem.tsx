import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Star, Zap, Target, Award, Eye } from "lucide-react";
import { toast } from "sonner";

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: any;
  unlocked: boolean;
  progress: number;
  target: number;
}

export default function AchievementSystem() {
  const [achievements, setAchievements] = useState<Achievement[]>([
    { id: "visitor", title: "Primeiro Visitante", description: "Visitou o site", icon: Eye, unlocked: false, progress: 0, target: 1 },
    { id: "explorer", title: "Explorador", description: "Navegou por 3 seções", icon: Target, unlocked: false, progress: 0, target: 3 },
    { id: "engaged", title: "Engajado", description: "Passou 2 minutos no site", icon: Zap, unlocked: false, progress: 0, target: 120 },
    { id: "gamer", title: "Gamer", description: "Jogou o mini-game", icon: Trophy, unlocked: false, progress: 0, target: 1 },
    { id: "master", title: "Mestre Tech", description: "Desbloqueou tudo!", icon: Award, unlocked: false, progress: 0, target: 4 },
  ]);
  const [showNotification, setShowNotification] = useState(false);
  const [currentAchievement, setCurrentAchievement] = useState<Achievement | null>(null);

  useEffect(() => {
    // Unlock first achievement on mount
    setTimeout(() => {
      unlockAchievement("visitor");
    }, 2000);

    // Track time on site
    let seconds = 0;
    const timer = setInterval(() => {
      seconds++;
      updateProgress("engaged", seconds);
    }, 1000);

    // Track scrolling
    let sectionsVisited = new Set<string>();
    const handleScroll = () => {
      const sections = ['servicos', 'stats', 'atendimento', 'contato'];
      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= window.innerHeight) {
            sectionsVisited.add(section);
            updateProgress("explorer", sectionsVisited.size);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearInterval(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const updateProgress = (id: string, progress: number) => {
    setAchievements(prev => prev.map(ach => {
      if (ach.id === id && !ach.unlocked) {
        const newProgress = Math.min(progress, ach.target);
        if (newProgress >= ach.target) {
          unlockAchievement(id);
        }
        return { ...ach, progress: newProgress };
      }
      return ach;
    }));
  };

  const unlockAchievement = (id: string) => {
    setAchievements(prev => prev.map(ach => {
      if (ach.id === id && !ach.unlocked) {
        setCurrentAchievement(ach);
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 4000);
        
        toast.success(`🏆 Conquista Desbloqueada: ${ach.title}!`, {
          description: ach.description,
          duration: 4000,
        });

        // Check if all achievements unlocked
        const unlockedCount = prev.filter(a => a.unlocked || a.id === id).length;
        if (unlockedCount === prev.length - 1) {
          setTimeout(() => unlockAchievement("master"), 1000);
        }

        return { ...ach, unlocked: true, progress: ach.target };
      }
      return ach;
    }));
  };

  const unlockedCount = achievements.filter(a => a.unlocked).length;

  return (
    <>
      {/* Achievement Notification */}
      {showNotification && currentAchievement && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 animate-slide-in-down">
          <Card className="bg-gradient-to-r from-yellow-600 to-orange-600 border-yellow-400 shadow-2xl shadow-yellow-500/50">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-full">
                <currentAchievement.icon className="w-8 h-8 text-white animate-bounce" />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">🏆 Conquista Desbloqueada!</h3>
                <p className="text-yellow-100">{currentAchievement.title}</p>
                <p className="text-xs text-yellow-200">{currentAchievement.description}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Achievement Progress Indicator */}
      <div className="fixed top-24 left-8 z-40">
        <Card className="bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-xl border-yellow-500/50 shadow-lg shadow-yellow-500/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <Trophy className="w-5 h-5 text-yellow-400 animate-pulse" />
              <div>
                <h3 className="text-sm font-bold text-white">Conquistas</h3>
                <p className="text-xs text-gray-400">{unlockedCount}/{achievements.length}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              {achievements.map(ach => (
                <div
                  key={ach.id}
                  className={`flex items-center gap-2 p-2 rounded transition-all ${
                    ach.unlocked
                      ? 'bg-yellow-500/20 border border-yellow-500/30'
                      : 'bg-slate-950/50 border border-white/10'
                  }`}
                >
                  <ach.icon className={`w-4 h-4 ${ach.unlocked ? 'text-yellow-400' : 'text-gray-600'}`} />
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs font-semibold truncate ${ach.unlocked ? 'text-yellow-400' : 'text-gray-500'}`}>
                      {ach.title}
                    </p>
                    {!ach.unlocked && (
                      <div className="h-1 bg-slate-950 rounded-full mt-1 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 transition-all"
                          style={{ width: `${(ach.progress / ach.target) * 100}%` }}
                        />
                      </div>
                    )}
                  </div>
                  {ach.unlocked && <Star className="w-3 h-3 text-yellow-400 animate-pulse" />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
