import { Navigation } from "@/components/navigation";
import { CinematicProvider } from "@/components/cinematic/cinematic-provider";
import { SceneNoise } from "@/components/scenes/scene-noise";
import { SceneCrystal } from "@/components/scenes/scene-crystal";
import { SceneChain } from "@/components/scenes/scene-chain";
import { Overview } from "@/components/overview";
import { SceneReveal } from "@/components/scenes/scene-reveal";
import { Features } from "@/components/features";
import { SceneRisk } from "@/components/scenes/scene-risk";
import { SceneArch } from "@/components/scenes/scene-arch";
import { Evidence } from "@/components/evidence";
import { SceneVision } from "@/components/scenes/scene-vision";
import { SceneFinal } from "@/components/scenes/scene-final";
import { Footer } from "@/components/footer";
import { CustomCursor } from "@/components/effects/custom-cursor";
import { ScrollProgress } from "@/components/effects/scroll-progress";
import { InteractionRoot } from "@/components/effects/interaction-root";

export default function Home() {
  return (
    <CinematicProvider>
      <ScrollProgress />
      <CustomCursor />
      <InteractionRoot />
      <Navigation />

      {/* the film */}
      <SceneNoise />          {/* 1 · noise → insight */}
      <SceneCrystal />        {/* 2 · the crystal */}
      <SceneChain />          {/* 3 · fracture — five perspectives */}
      <Overview />            {/* 4 · Paste a wallet. See the risk. */}
      <SceneReveal />         {/* 5 · the product, out of the dark */}
      <Features />            {/* 6 · see the chain, module by module */}
      <SceneRisk />           {/* 7 · you read numbers / we give context */}
      <SceneArch />           {/* 8 · Jupiter → Clarity */}
      <Evidence />            {/* 9 · the colophon */}
      <SceneVision />         {/* 10 · today / tomorrow */}
      <SceneFinal />          {/* 11 · the ending */}

      <Footer />
    </CinematicProvider>
  );
}
