import { posthog } from "./posthog";

export function track(event: string, props?: Record<string, any>) {
  posthog.capture(event, props);
}
