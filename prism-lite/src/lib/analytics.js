import { posthog } from "./posthog";
export function track(event, props) {
    posthog.capture(event, props);
}
