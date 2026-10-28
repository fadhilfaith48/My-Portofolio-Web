"use client";

import { Component, type ReactNode } from "react";
import SceneFallback from "@/components/SceneFallback";

type Props = { children: ReactNode };
type State = { failed: boolean };

// Catches render/lifecycle failures from the 3D scene (driver crash, shader
// compile error, unsupported context). WebGL context loss is handled inside
// FrozenKeyboard itself; this is the last line of defence so a broken GPU can
// never take the whole page down with it.
export default class SceneBoundary extends Component<Props, State> {
  state: State = { failed: false };

  static getDerivedStateFromError(): State {
    return { failed: true };
  }

  render() {
    return this.state.failed ? <SceneFallback /> : this.props.children;
  }
}
