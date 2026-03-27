# Flexbox - How It Works in This Assignment

## What is Flexbox?

Flexbox (Flexible Box Layout) is a CSS layout method that arranges items in a row or column, with easy control over alignment and spacing.

## Flexbox Part (in style.css)

The core Flexbox setup on the `.hero` section:

```css
.hero {
    display: flex;            /* Activates Flexbox */
    flex-direction: row;      /* Places children side-by-side (text LEFT, image RIGHT) */
    justify-content: space-between;  /* Spreads them apart */
    align-items: center;      /* Vertically centers both columns */
    gap: 40px;                /* Space between text and image */
}
```

This creates the **two-column desktop layout:**

```
┌─────────────────────────────────────────┐
│  [Text Content]      |    [Hero Image]  │
│   h1, p, button      |       img        │
└─────────────────────────────────────────┘
        ← flex-direction: row →
```

## Responsive Adjustment Part (the @media query)

This is where it adjusts for mobile:

```css
@media (max-width: 768px) {
    .hero {
        flex-direction: column;  /* ← THIS is the key adjustment */
        text-align: center;
        padding: 50px 20px;
    }
}
```

`flex-direction: column` **switches the layout from side-by-side to stacked:**

```
DESKTOP (row)                MOBILE (column)
┌──────────┬──────────┐     ┌──────────────┐
│   Text   │  Image   │     │    Text      │
│          │          │     │  h1, p, btn  │
└──────────┴──────────┘     ├──────────────┤
                            │    Image     │
                            └──────────────┘
```

## Flexbox Properties Used

| Property | Value | What It Does |
|---|---|---|
| `display: flex` | flex | Activates Flexbox on the container |
| `flex-direction` | row / column | Controls direction (side-by-side or stacked) |
| `justify-content` | space-between | Distributes space between items horizontally |
| `align-items` | center | Centers items vertically |
| `gap` | 40px | Adds space between flex children |
| `flex` | 1 | Makes both children (text & image) take equal width |
| `flex-wrap` | wrap | Allows items to wrap to next line if needed |

## How to See the Shift

1. Open the page in your browser
2. Click the device icons at the top (💻 📋 📱) to toggle between Desktop, Tablet, and Mobile views
3. Or press **F12** → click the phone/tablet icon in DevTools → resize to see the layout change
