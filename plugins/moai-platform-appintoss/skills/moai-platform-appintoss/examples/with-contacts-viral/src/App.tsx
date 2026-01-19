import { Top } from "@toss/tds-mobile";
import { DIFFICULTY_LABEL } from "@/constants/game";
import { SafeArea } from "@/components/SafeArea";
import { StatusPanel } from "@/components/StatusPanel";
import { GameBoard } from "@/components/GameBoard";
import { BGMController } from "@/components/BGMController";
import { SystemSoundController } from "@/components/SystemSoundController";
import { DifficultySelectorButton } from "@/components/DifficultySelectorButton";
import { RestartButton } from "./components/RestartButton";
import { useDifficultyConfig } from "@/hooks/useDifficultyConfig";
import { useBoardManager } from "@/hooks/useBoardManager";

export function App() {
  const { difficulty, setDifficulty, gameConfig } = useDifficultyConfig();
  const { lives, board, state, stats, version, mode, handlers } =
    useBoardManager(gameConfig);

  return (
    <SafeArea>
      <BGMController gameState={state} />
      <SystemSoundController gameState={state} />
      <Top
        upperGap={0}
        lowerGap={0}
        title={
          <Top.TitleParagraph size={28} fontWeight={"bold"}>
            {DIFFICULTY_LABEL[difficulty as keyof typeof DIFFICULTY_LABEL]}{" "}
            모드에요
          </Top.TitleParagraph>
        }
      />
      <StatusPanel
        lives={lives}
        mode={mode}
        onFlagChange={handlers.toggleMode}
        revealedSafe={stats.revealedSafe}
        totalSafe={stats.totalSafe}
      />
      <GameBoard
        board={board}
        state={state}
        dims={{ rows: gameConfig.rows, cols: gameConfig.cols }}
        version={version}
        onCellClick={handlers.handleCellClick}
      />
      <div className="button-container">
        <DifficultySelectorButton
          version={version}
          currentDifficulty={difficulty}
          onDifficultyChange={setDifficulty}
          showOnMount={true}
          disabled={lives === 0}
        />
        <RestartButton
          version={version}
          onRestart={handlers.reset}
          onAddLife={handlers.addLife}
          lives={lives}
        />
      </div>
    </SafeArea>
  );
}
