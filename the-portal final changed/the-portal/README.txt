THE PORTAL — website
DEPLOY (Netlify): drag the whole "the-portal" folder onto app.netlify.com/drop (or connect to Git). No build step.
ADD / REPLACE A VIDEO: copy the .mp4 to assets/videos/, a poster .jpg to assets/thumbnails/, then edit that slot in js/videos-config.js (title, src, poster, category, active:true).
Tip: export reels 720x1280, H.264, under ~8 MB each for fast loading.
Nav + footer are shared and live in js/main.js — edit once, applies to all 4 pages.

CONTACT FORM: sends real email to theportal246@gmail.com via FormSubmit.co.
FIRST TIME ONLY: after deploying, submit the form once yourself, then open the "Activate Form" email FormSubmit sends to that Gmail (check Spam) and click the button. After that every enquiry arrives in the inbox.
CLIENT FEEDBACK: edit names, real quotes and star ratings (1-5, halves allowed) in js/reviews.js.

FREE TRIAL REWARD: a claimable reward card on Home and Our Work (built in js/main.js, styles at the end of css/style.css). After claiming, visitors can book on WhatsApp or via the contact form. To reset it while testing, clear this site's localStorage ("portal_reward").
