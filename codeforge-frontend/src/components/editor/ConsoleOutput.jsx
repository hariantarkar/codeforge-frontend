import React from "react";
import "./ConsoleOutput.css";

export default function ConsoleOutput({ result, isRunning }) {
  return (
    <div className="co-panel">
      <div className="co-header">Console</div>

      <div className="co-body">
        {isRunning && !result && <div className="co-placeholder">Compiling and running...</div>}

        {!isRunning && !result && <div className="co-placeholder">Output will appear here after you run your code.</div>}

        {result && (
          <>
            {!result.compiledSuccessfully && (
              <div className="co-line co-line--error">{result.stderr}</div>
            )}

            {result.compiledSuccessfully && result.timedOut && (
              <div className="co-line co-line--error">{result.stderr}</div>
            )}

            {result.compiledSuccessfully && !result.timedOut && (
              <>
                {result.stdout && <pre className="co-line co-line--stdout">{result.stdout}</pre>}
                {result.stderr && <pre className="co-line co-line--error">{result.stderr}</pre>}
                <div className="co-meta">
                  Exit code {result.exitCode} · {result.executionTimeMs}ms
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}