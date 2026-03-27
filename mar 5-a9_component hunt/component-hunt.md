# Component Hunt - Breaking Down Netflix into Components

## Website Chosen: Netflix (netflix.com)

## Component Structure

```
App
├── Navbar
│   ├── Logo
│   ├── NavLinks (Home, TV Shows, Movies, New & Popular)
│   ├── SearchBar
│   ├── NotificationIcon
│   └── ProfileDropdown
│
├── HeroBanner
│   ├── BackgroundImage
│   ├── MovieTitle
│   ├── Description
│   └── ButtonGroup (Play Button, More Info Button)
│
├── ContentRow (repeated for each category)
│   ├── RowTitle ("Trending Now", "Top 10", etc.)
│   ├── ScrollArrow (left)
│   ├── MovieCard (repeated)
│   │   ├── Thumbnail
│   │   └── HoverPreview
│   │       ├── VideoPreview
│   │       ├── Title
│   │       ├── MatchScore
│   │       ├── ActionButtons (Play, Add to List, Like, Dislike)
│   │       └── GenreTags
│   └── ScrollArrow (right)
│
├── Footer
│   ├── SocialLinks
│   ├── FooterLinkColumns
│   │   └── FooterLink (repeated)
│   ├── ServiceCode
│   └── CopyrightText
```

## Why These Are Components

### Navbar
- Stays the same across all pages
- Contains its own state (search open/closed, dropdown open/closed)
- Can be reused on every page

### HeroBanner
- Displays featured content
- Changes based on what Netflix wants to promote
- Has its own data (title, description, image)

### ContentRow
- This is the most reusable component
- Same structure repeated many times with different data ("Trending", "Action Movies", "Comedy", etc.)
- Each row fetches different content but looks the same

### MovieCard
- Smallest reusable piece
- Shows a thumbnail and expands on hover
- Used hundreds of times across the page
- Takes movie data as props

## Key Observations

1. **Reusability**: MovieCard and ContentRow are used many times with different data - this is the main advantage of components
2. **Props**: Each MovieCard would receive movie data (title, image, genre) as props from its parent ContentRow
3. **State**: Navbar has local state for search toggle, HeroBanner might have state for auto-cycling featured content
4. **Nesting**: Components are nested inside each other - MovieCard inside ContentRow inside App
5. **Data flow**: Data flows from top (App fetches movie lists) down to child components through props