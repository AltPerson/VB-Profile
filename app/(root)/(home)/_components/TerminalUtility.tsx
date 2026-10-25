import { memo } from 'react';
import GlobeSlot from './GlobeSlot';
import TerminalClock from './TerminalClock';

function TerminalUtility({ reduced }: { reduced: boolean }) {
  return (
    <div className="personal-terminal__utility">
      <GlobeSlot reduced={reduced} />
      <TerminalClock />
    </div>
  );
}
export default memo(TerminalUtility);
