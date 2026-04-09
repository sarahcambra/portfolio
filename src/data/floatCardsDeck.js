/**
 * Scroll-driven floating cards on the homepage — edit `RICH_CARDS` to add or change entries.
 *
 * variant:
 *   - tokens | wcag | ui | type | audit | contrast | touch | focus | dark | ai | …
 */
export const FLOAT_ANIM_CLASSES = ['fa', 'fb', 'fc', 'fd', 'fe'];

const RICH_CARDS = [

  

  // WCAG with Success Criteria
  { id: 'contrast', variant: 'contrast', badge: 'WCAG SC 1.4.3', title: 'Strong Contrast for Everyone', detail: 'Good contrast helps people with low vision, but also anyone wearing glasses, over 50, or reading in bright sunlight.' },
  { id: 'touch-aa', variant: 'touch', badge: 'WCAG AA 2.5.8', title: 'Easy-to-Tap Buttons', detail: 'Interactive elements must be at least 24×24 px so fingers can tap them comfortably (AA level).' },
  { id: 'touch-aaa', variant: 'touch', badge: 'WCAG AAA 2.5.5', title: '44 px Touch Targets', detail: 'For the highest level, buttons and links should be at least 44×44 px.' },
  { id: 'focus-visible', variant: 'focus', badge: 'WCAG SC 2.4.7', title: 'Visible Keyboard Focus', detail: 'When you press Tab, you always see exactly where you are — a clear focus ring is essential.' },
  { id: 'resize', variant: 'type', badge: 'WCAG SC 1.4.4', title: 'Text Can Be Enlarged', detail: 'Users can make text up to 200% bigger without breaking the layout or losing content.' },
  { id: 'name', variant: 'wcag', badge: 'WCAG SC 4.1.2', title: 'Clear Accessible Names', detail: 'Every button, link, form field, and image must have a proper name so screen readers know what it does.' },
  { id: 'keyboard', badge: 'WCAG SC 2.1.1', title: 'Works with Keyboard Only', detail: 'The entire website must be fully usable without a mouse.' },
  { id: 'error', badge: 'WCAG SC 3.3.1', title: 'Helpful Error Messages', detail: 'When something goes wrong, the message clearly explains how to fix it.' },

  // DIGG & European
  { id: 'dark', variant: 'dark', badge: 'DIGG §11.7', title: 'Dark Mode is Mandatory', detail: 'In Sweden dark mode is required by law (EN 301 549 § 11.7).' },
  { id: 'eaa-2025', variant: 'audit', badge: 'EAA', title: 'European Accessibility Act 2025', detail: 'Micro-enterprises are exempt only if they have BOTH <10 employees AND < €2 million annual turnover or balance sheet.' },

  // AI Risks (very current on X)
  { id: 'ai-generated', variant: 'ai', badge: 'AI Risk', title: 'AI Sites Hide Problems', detail: 'AI tools often create beautiful designs with serious invisible accessibility issues.' },
  { id: 'ai-alt', variant: 'ai', badge: 'AI Risk', title: 'Bad Auto-Alt Text', detail: 'AI-generated alt text is frequently wrong, meaningless, or misleading.' },
  { id: 'ai-contrast', variant: 'ai', badge: 'AI Risk', title: 'AI Creates Low Contrast', detail: 'Many AI design tools generate pretty interfaces that fail basic contrast rules.' },
  { id: 'ai-keyboard', variant: 'ai', badge: 'AI Risk', title: 'AI Breaks Keyboard Navigation', detail: 'AI code often forgets proper focus order and keyboard support.' },
  { id: 'ai-forms', variant: 'ai', badge: 'AI Risk', title: 'AI Makes Inaccessible Forms', detail: 'AI frequently forgets labels and error messages on forms.' },
  { id: 'ai-testing', variant: 'ai', badge: 'AI Risk', title: 'Don’t Trust AI Accessibility Tests', detail: 'Automated AI tests miss many real problems that actual users experience.' },
  { id: 'ai-training', variant: 'ai', badge: 'AI Risk', title: 'AI Trained on Accessibility Data', detail: 'Some AI models are trained using alt text and audio descriptions meant to help disabled people.' },
  { id: 'ai-uncanny', variant: 'ai', badge: 'AI Risk', title: 'AI Text Feels Uncanny', detail: 'AI writing often feels flat or robotic, making content harder to read and trust.' },

  // Mobile & Everyday
  { id: 'mobile', badge: 'Mobile', title: 'Tested on Real Phones', detail: 'We test on actual devices, not just resized desktop views.' },
  { id: 'portrait', badge: 'Mobile', title: 'Works in Portrait & Landscape', detail: 'The layout adapts perfectly no matter how you hold your phone.' },
  { id: 'onehand', badge: 'Touch', title: 'One-Hand Friendly', detail: 'Important buttons are easy to reach with just your thumb.' },
  { id: 'color', badge: 'WCAG SC 1.4.1', title: 'Never Use Color Alone', detail: 'Color is never the only way to show important information.' },
  { id: 'hover', badge: 'WCAG', title: 'Hover States Are Visible', detail: 'Links and buttons clearly change when you hover over them.' },

  // Process & Best Practices
  { id: 'day1', badge: 'Process', title: 'Accessibility from Day 1', detail: 'We think about accessibility before we even start designing.' },
  { id: 'realtest', badge: 'Testing', title: 'Tested with Real Users', detail: 'We test with people who actually use screen readers and assistive technology.' },
  { id: 'handoff', badge: 'Handoff', title: 'Clear Designer Annotations', detail: 'Focus order, ARIA notes, and alt text are added before developers start coding.' },
  { id: 'checklist', badge: 'Process', title: 'Checklist in Every Sprint', detail: 'We use a checklist so nothing important gets forgotten.' },
  { id: 'shiftleft', badge: 'Process', title: 'Shift-Left Approach', detail: 'We fix accessibility problems early, not at the end of the project.' },

  // 40 more clear & useful cards
  { id: 'logical', badge: 'WCAG', title: 'Logical Reading Order', detail: 'The page makes sense when read from top to bottom by a screen reader.' },
  { id: 'skip', badge: 'Focus', title: 'Skip to Main Content', detail: 'Keyboard users can jump straight to the important part of the page.' },
  { id: 'language', badge: 'WCAG', title: 'Correct Language Tag', detail: 'The page tells screen readers and browsers which language is being used.' },
  { id: 'font', badge: 'WCAG', title: 'Readable Font Sizes', detail: 'Text is never too small or in hard-to-read fonts.' },
  { id: 'trap', badge: 'Focus', title: 'Focus Never Gets Trapped', detail: 'You can always escape modals and menus with the keyboard.' },
  { id: 'nav', badge: 'WCAG', title: 'Consistent Navigation', detail: 'The menu is always in the same place on every page.' },
  { id: 'inclusive', badge: 'DIGG', title: 'Inclusive by Default', detail: 'We design for everyone from the very first sketch.' },
  { id: 'video', badge: 'WCAG', title: 'No Auto-Playing Video', detail: 'Videos never start automatically with sound.' },
  { id: 'training', badge: 'Process', title: 'Team Accessibility Training', detail: 'Everyone on the team learns basic accessibility principles.' },
  { id: 'procurement', badge: 'EAA', title: 'Accessible Procurement', detail: 'We only buy tools and services that are already accessible.' },
  { id: 'live', badge: 'WCAG', title: 'Live Updates Announced', detail: 'Success messages and dynamic content are announced by screen readers.' },
  { id: 'focus-all', badge: 'Focus', title: 'Visible Focus on Everything', detail: 'Even custom buttons and links show a clear focus indicator.' },
  { id: 'gov', badge: 'DIGG', title: 'Swedish Government Standard', detail: 'We follow DIGG’s official guidelines for public digital services.' },
  { id: 'flash', badge: 'WCAG', title: 'No Flashing Content', detail: 'Nothing flashes more than 3 times per second to prevent seizures.' },
  { id: 'alt', badge: 'WCAG', title: 'Meaningful Alt Text', detail: 'Every meaningful image has a short, useful description for screen readers.' },
  { id: 'motion', badge: 'Motion', title: 'Respects No Motion Preference', detail: 'If someone turns off animations, the site immediately stops all movement.' },
  { id: 'report', badge: 'EAA', title: 'Regular Accessibility Reports', detail: 'We monitor and publish our accessibility status.' },
  { id: 'error-help', badge: 'WCAG', title: 'Helpful Error Messages', detail: 'When something goes wrong, the message explains exactly how to fix it.' },
  { id: 'consistent', badge: 'WCAG', title: 'Predictable Behaviour', detail: 'Menus and buttons always behave the same way so people don’t get confused.' },
  { id: 'no-time', badge: 'WCAG', title: 'No Time Pressure', detail: 'Users are never forced to complete actions within a time limit.' },

  // Final 20 high-quality cards
  { id: 'link-purpose', badge: 'WCAG', title: 'Clear Link Purpose', detail: 'Every link clearly tells you where it will take you.' },
  { id: 'plain-swedish', badge: 'DIGG', title: 'Plain Swedish Language', detail: 'We use short sentences and everyday words so more people can understand.' },
  { id: 'focus-order', badge: 'Focus', title: 'Focus Order Makes Sense', detail: 'Tab order follows the visual flow of the page.' },
  { id: 'large-tap', badge: 'Touch', title: 'Large Tap Targets', detail: 'Everything important is easy to tap even with big fingers.' },
  { id: 'reviews', badge: 'Process', title: 'Accessibility Reviews', detail: 'We review every design and code change for accessibility.' },
  { id: 'no-trap', badge: 'Focus', title: 'No Keyboard Traps', detail: 'You can always move around freely with the keyboard.' },
  { id: 'monitoring', badge: 'EAA', title: 'Monitoring & Reporting', detail: 'We regularly check and publish our accessibility status.' },
  { id: 'ai-review', badge: 'AI Risk', title: 'AI Needs Human Review', detail: 'AI is a tool — real accessibility still needs human eyes.' },
  { id: 'team-owns', badge: 'Process', title: 'Everyone Owns Accessibility', detail: 'It’s not just the designer’s job — the whole team is responsible.' },
  { id: 'headings', badge: 'WCAG', title: 'Good Heading Structure', detail: 'Clear headings help screen readers navigate the page easily.' },
  { id: 'responsive', badge: 'Mobile', title: 'Responsive Design', detail: 'The site looks and works great on every screen size.' },
  { id: 'strong-focus', badge: 'Focus', title: 'Strong Focus Indicator', detail: 'The focus ring is thick and has enough contrast to be seen clearly.' },
  { id: 'bilingual', badge: 'DIGG', title: 'Swedish + English Versions', detail: 'Both languages are fully accessible and properly marked.' },
  { id: 'no-surprise', badge: 'WCAG', title: 'No Unexpected Changes', detail: 'The page never changes suddenly without warning.' },
  { id: 'early-fix', badge: 'Process', title: 'Early Testing Saves Time', detail: 'Catching accessibility issues early is much cheaper than fixing them later.' },
  { id: 'line-length', badge: 'WCAG', title: 'Readable Line Length', detail: 'Lines of text are not too long or too short for comfortable reading.' },
  { id: 'leadership', badge: 'EAA', title: 'Public Sector Leadership', detail: 'Government websites must set the example for accessibility.' },
  { id: 'human-test', badge: 'AI Risk', title: 'AI Can’t Replace Human Testing', detail: 'Only real users can tell us if something truly works.' },
  { id: 'quality', badge: 'Process', title: 'Accessibility is Quality', detail: 'Making the site accessible makes it better for every single user.' },
  { id: 'no-flash', badge: 'WCAG', title: 'No Flashing Content', detail: 'Nothing flashes more than 3 times per second to prevent seizures.' },
];

export const FLOAT_CARDS_DECK = RICH_CARDS;

/**
 * Three fixed corners — top-left, top-right, bottom-right — so cards do not
 * stack on one side while scrolling.
 */
export const FLOAT_SCROLL_SLOTS = [
  { top: 'max(5.25rem, 11vh)', left: 'max(10px, 2vw)', width: 'min(90vw, 220px)' },
  { top: 'max(5.25rem, 11vh)', right: 'max(10px, 2vw)', width: 'min(90vw, 220px)' },
  { bottom: 'max(1.25rem, 7vh)', right: 'max(10px, 2vw)', width: 'min(90vw, 220px)' },
];
