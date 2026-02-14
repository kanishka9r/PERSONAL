"use client";

import { useState } from "react";
import PhotoPairGame from "../components/PhotoPairGame";
import ValentinesProposal from "@/components/ValentinesProposal";
import TextFooter from "@/components/TextFooter";
import OrientationGuard from "@/components/OrientationGuard";
import Questions from "../components/Questions";


export default function Home() {
  const [stage, setStage] = useState<
    "questions" | "game" | "proposal"
  >("questions");

  return (
    <OrientationGuard>
      <main className="flex items-center justify-center min-h-screen overflow-hidden relative">

        {stage === "questions" && (
          <Questions onFinish={() => setStage("game")} />
        )}

        {stage === "game" && (
          <div className="flex flex-col items-center">
            <PhotoPairGame
              handleShowProposal={() => setStage("proposal")}
            />
            <div className="mt-4 md:mt-0">
              <TextFooter />
            </div>
          </div>
        )}

        {stage === "proposal" && <ValentinesProposal />}

      </main>
    </OrientationGuard>
  );
}
