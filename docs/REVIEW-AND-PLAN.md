# Review and implementation plan

Reviewed 22 September 2026, before application changes.

## Reference

Source: https://demo.shopbuzzcn.com/ and its About, Project, Services and Contact pages. The TLS certificate does not match its hostname. Public HTML, Elementor styles and images were retrieved without credentials. No connected browser was available; these findings come from actual markup and CSS, not a screenshot comparison.

- WordPress / Phlox Pro / Elementor architecture portfolio.
- Orange #ff7e44, almost black #191919, charcoal #3e3e3e, white and pale gray.
- Heebo headings, Mukta body, Poppins outline lettering. Desktop hero 88px, section headings 43–71px, content up to 1600px with 35px outer gutters.
- Asymmetric hero: left dark stripe, upper-right orange block, outline lettering, overlapping landscape and portrait photographs, social rail.
- Logo, telephone and hamburger header; orange fullscreen menu with photography and large vertical links.
- Home: hero, about/video, process image and three overlapping numbered cards, six projects, testimonial carousel, specialization, charcoal services with white cards and side photo, clients, offset CTA, pale footer.
- Staggered eased reveals, image zoom, color-changing cards. Tablet 1024px, mobile 767px. Respect reduced motion.
- Several reference social/video links are placeholders; do not copy inert controls.

## Existing project

- Next.js 16.3.5 App Router, React 19.2.8, TypeScript strict, Tailwind 4, React Compiler.
- Public pages, reusable sections, Next Image/Link, project filters and galleries; eight static project records and existing local photographs.
- No database, migrations, APIs, authentication, permissions or integrations. Admin is a placeholder. Contact form reports success without storing/sending anything.
- Fixed desktop hero/header/menu positions, nonresponsive about section, Arial typography, missing specialization/motion, different process/services/footer layouts.
- Menu lacks focus management, Escape handling and scroll locking. Social and video links are inert.
- Existing uncommitted work must be preserved; no reset/clean.

## Implementation sequence

1. Retain Next.js, public URLs, project data/filter/gallery and assets. Read installed Next.js server/client, authentication and route-handler guides.
2. Rebuild shared/home visual components from reference CSS with responsive layouts and accessible, reduced-motion-aware animation.
3. Add versioned SQLite schema and one-time project seed. Separate database, validation, authorization and integrations. Target a persistent single Node host; ephemeral/multi-instance deployments need an external database.
4. Add scrypt password hashing, random database sessions, HttpOnly cookies, same-origin checks, persistent throttles and API permissions. Bootstrap admin by CLI; no default credentials or registration.
5. Add dashboard, projects (draft/published/archive), content/settings, enquiries, users, role permissions and audit history.
6. Add WhatsApp click-to-chat, Cloud API verification and signed/deduplicated webhooks; API-connected chatbot with configuration and conversation history. Secrets remain in server environment.
7. Connect published data to public pages and real enquiry/chat endpoints.
8. Verify lint/types/build and integration tests for auth, permissions, validation, publication, persistence and external failure handling. Report browser/live credential limitations accurately.
