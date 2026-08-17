# Booking flow and voice booking agent

Status: planned, not started
Date: 2026-08-16

## The problem

"Book a Strategy Call" and "LET'S TALK" both open `/contact`, which is a message
form. The button promises a booking and delivers a text box. Every visitor who
wants a slot has to write a message, wait for a reply, and then agree a time by
email — three round trips for something that should take one.

A voice agent does not fix this. A calendar does. The agent is a separate,
optional layer on top, and it is worth building mainly as a portfolio piece.

## Research summary (2026-08-16)

- **cal.diy is not a call agent.** It is an MIT-licensed fork of Cal.com with
  the enterprise features removed — Next.js, tRPC, Prisma, Postgres. It answers
  "where do bookings live", not "who talks to the caller". It is an alternative
  to *hosting* Cal.com, nothing more.
- **Cal.com's embed is free on the personal plan.** `@calcom/embed-react` puts
  the whole booking flow on our own page.
- **Cal.com API v2** is what any agent would call:
  - `GET /v2/slots` — availability
  - `POST /v2/bookings` — create the booking
  - header `cal-api-version: 2024-08-13` (omitting it 404s)
  - auth: `Authorization: Bearer <API key>`, server side only
- **Voice platforms**, all of which work the same way — the platform runs the
  conversation and calls our HTTPS endpoint mid-call:

  | Option | $/min | Effort | Notes |
  |---|---|---|---|
  | ElevenLabs Agents | 0.08–0.12 | low | native website widget, free tier 15 min |
  | Retell | 0.13–0.31 | very low | no-code, native SIP |
  | Vapi | 0.20–0.33 | low | cleanest custom-tool contract |
  | Cal.ai | 0.29 | lowest | aimed at reminders/no-show recovery, not inbound |
  | LiveKit Agents / Pipecat | 0.01–0.17 (components) | high | MIT, self-hosted, we run the infra |

  Prices are from secondary sources and move fast — confirm on the vendor's own
  pricing page before committing.

**Decision: ElevenLabs Agents**, if and when phase 3 happens. Cheapest per
minute, free tier to prototype, and it ships a browser widget — which is the
shape this site needs (a visitor clicking "talk to book"), not a phone number.
Vapi is the fallback if its tooling proves limiting. Not self-hosting
LiveKit/Pipecat: the per-minute saving is meaningless at this volume and it
buys an always-on media server to babysit.

## Architecture

```
visitor ─▶ voice platform ─▶ our API route ─▶ Cal.com API v2
           (STT+LLM+TTS)     (the tool)       GET  /v2/slots
                                              POST /v2/bookings
```

Cal.com stays the single source of truth for availability. The API key never
leaves the server. The agent gets no calendar access of its own — it can only
do what our two routes allow, which is the whole point of putting them in the
middle.

## Phases

### Phase 1 — `/book` (do first, ~1 evening)

The only phase that matters for actual bookings.

1. Cal.com account, one event type: "Strategy Call", 30 min.
2. `src/app/book/page.tsx` — inline `@calcom/embed-react` on the site's own
   canvas: beige page, frosted band, the eyebrow/headline pattern the other
   pages use. Theme the embed to match (`--cal-brand` etc.).
3. Repoint every CTA: `AboutCta`, `FinalCta`, `SystemPageContent`'s closing
   band, the header's "LET'S TALK", `ProjectsCta`.
4. `/contact` stays, linked from `/book` as "rather write instead?". It is the
   right destination for scope questions, just not for booking.

Done when: a stranger can book a slot without emailing anyone.

### Phase 2 — the booking API (~half a day)

Useful on its own, and it is exactly the tool phase 3 needs.

- `src/lib/booking/cal.service.ts` — thin Cal.com v2 client, key from
  `CAL_API_KEY`, `cal-api-version` pinned in one place.
- `GET /api/booking/slots?from=&to=` — availability, already in the visitor's
  timezone.
- `POST /api/booking/create` — `{ name, email, start, timezone, notes }`.
- Guards, because this endpoint creates real calendar entries:
  - rate limit per IP
  - zod validation, same shape as the contact form's
  - honeypot or turnstile
  - never echo back anything Cal.com returns beyond the confirmation
- One test: a slot fetch and a booking against a Cal.com sandbox event type.

### Phase 3 — the voice agent (optional, ~1–2 days)

Only after 1 and 2 are live.

1. ElevenLabs agent, system prompt scoped to booking and nothing else.
2. Two tools pointed at the phase 2 routes, with the timezone passed through
   from the browser rather than guessed.
3. Widget on `/book` only, behind a "Talk to book" button — never auto-opening,
   never on every page.
4. Cap it: max call length, per-day spend cap, and a hard fallback to the embed
   when the agent errors or the caller asks for a human.
5. Confirmation email reuses the existing contact email templates.

Done when: someone can say "next Tuesday afternoon" and get a calendar invite.

## Risks

- **A voice agent that books real meetings is a spam target.** Phase 2's guards
  are not optional, and the agent must never be the only path to a booking.
- **Per-minute cost is unbounded by default.** Set the spend cap in the vendor
  dashboard on day one, not after the first bill.
- **Timezones.** The single most likely source of a wrong booking. Pass the
  browser's IANA zone explicitly through every layer; never let the model infer
  it from speech.
- **Vendor churn.** Everything above is a thin wrapper over `cal.service.ts` on
  purpose — swapping ElevenLabs for Vapi should touch the agent config and one
  route, not the app.

## Sources

- https://github.com/calcom/cal.diy
- https://cal.com/docs/api-reference/v2/bookings/create-a-booking
- https://cal.com/docs/agents
- https://cal.com/ai
- https://cal.com/embed
- https://docs.vapi.ai/tools/custom-tools
- https://www.reactify-solutions.com/articles/voice-ai-agents-production-2026
- https://www.cloudtalk.io/blog/elevenlabs-pricing/
