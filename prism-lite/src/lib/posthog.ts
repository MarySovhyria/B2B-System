import posthog from "posthog-js";

export function initPostHog() {
  const key = import.meta.env.VITE_POSTHOG_KEY as string | undefined;
  const host = import.meta.env.VITE_POSTHOG_HOST as string | undefined;

  if (!key || !host) return;

  posthog.init(key, {
    api_host: host,

    // We'll manually capture page views so it matches React Router navigation
    capture_pageview: false,

    // Enables session replay (recordings)
    session_recording: {
      maskAllInputs: true, // safer (emails etc)
    },
    advanced_disable_feature_flags: false,
  });
}

posthog.startSessionRecording();
posthog.debug(true);

export { posthog };
