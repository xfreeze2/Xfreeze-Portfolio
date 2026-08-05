# XFreeze Grok Lab

Static v1 website for the `@XFreeze` Grok creator profile.

## Open The Site

Open `index.html` in a browser.

## Update Contact And Checkout Links

Edit the `siteConfig` block at the top of `app.js`:

```js
const siteConfig = {
  contactEmail: "hello@xfreeze.ai",
  profileUrl: "https://x.com/XFreeze",
  products: {
    starter: "https://xfreeze.gumroad.com/l/creator-starter-pack",
    commercial: "https://xfreeze.gumroad.com/l/commercial-prompt-pack",
    vault: "https://xfreeze.gumroad.com/l/xfreeze-complete-vault"
  }
};
```

Replace the email and product URLs with your real Lemon Squeezy or Gumroad links.

## Update Before / After Results

Edit the `comparisons` array in `app.js` to add real before-and-after image pairs for each template.
