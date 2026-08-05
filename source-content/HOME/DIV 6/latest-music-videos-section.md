# Latest Music Videos Section — AI Implementation Brief

## Objective

Build the **Latest Music Videos** section shown in the supplied layout reference.

The section must embed **two YouTube music videos** and allow the visitor to slide between them inside one large video frame.

## Video Links

1. `https://youtu.be/IuD23IpalcY?si=q6Lu1ggVPTlQXfdJ`
2. `https://youtu.be/xJkMyMZ4jLs?si=LgLU9T0jiV8X-K9b`

Use these YouTube embed URLs:

```text
https://www.youtube.com/embed/IuD23IpalcY
https://www.youtube.com/embed/xJkMyMZ4jLs
```

## Layout

Create a full-width section with:

- A black background.
- A small centred title container above the video.
- The title text: **Latest Music Videos**
- A large responsive video container below the title.
- Thin light-grey or white borders around both the title container and video frame.
- Slightly rounded corners.
- Generous spacing between the title and the video frame.
- The layout must remain clean, minimal and consistent with the supplied reference image.

## Slider Behaviour

The large video frame must work as a two-slide carousel.

- Display only one video at a time.
- Add a **previous** and **next** control.
- Add two small navigation dots below or inside the lower part of the video frame.
- The active dot must clearly show which video is currently displayed.
- Allow keyboard navigation with the left and right arrow keys.
- Add touch/swipe support on mobile where practical.
- Use a smooth horizontal slide transition.
- Do not autoplay the videos when the page loads.
- Do not automatically rotate the slides while a visitor is watching.
- When the visitor changes slides, stop the previous video so that audio does not continue playing in the background.

## YouTube Embed Requirements

Use responsive YouTube iframes with:

```html
allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
allowfullscreen
```

Use a 16:9 aspect ratio for the video area.

The iframe must fill the entire available video frame without stretching or distortion.

## Responsive Behaviour

### Desktop

- Keep the title container centred and narrower than the video frame.
- Keep the video frame wide and visually dominant.
- Maintain balanced margins on both sides.

### Tablet and Mobile

- Reduce the side margins.
- Keep the 16:9 video ratio.
- Ensure the title and controls remain readable.
- Make the previous and next buttons large enough for touch interaction.
- Prevent horizontal page overflow.

## Accessibility

- Add descriptive `aria-label` values to the previous and next buttons.
- Make all slider controls keyboard accessible.
- Include a visible focus state.
- Use meaningful iframe titles, for example:
  - `Music video 1`
  - `Music video 2`
- Ensure navigation controls have sufficient contrast against the black background.

## Technical Direction

Implement the section using:

- Semantic HTML.
- CSS for layout, responsiveness and transitions.
- Vanilla JavaScript for slider behaviour.
- No React, GSAP or external carousel library is required.
- Keep the code self-contained and easy to integrate into the existing page.

## Important Constraints

- Do not replace or alter either YouTube link.
- Do not add extra videos.
- Do not add an unrequested tagline or marketing copy.
- Do not redesign unrelated sections of the website.
- Do not use decorative icons, particles, glow effects or visual clutter.
- Preserve the clean black, white and minimal visual direction shown in the reference.
- The finished component must contain exactly **two music-video slides**.

## Expected Structure

```html
<section class="latest-music-videos">
  <div class="section-title">
    <h2>Latest Music Videos</h2>
  </div>

  <div class="video-slider">
    <div class="video-track">
      <article class="video-slide">
        <!-- First YouTube iframe -->
      </article>

      <article class="video-slide">
        <!-- Second YouTube iframe -->
      </article>
    </div>

    <button class="video-prev" aria-label="Show previous music video">
      Previous
    </button>

    <button class="video-next" aria-label="Show next music video">
      Next
    </button>

    <div class="video-pagination" aria-label="Music-video navigation">
      <!-- Two navigation dots -->
    </div>
  </div>
</section>
```

## Completion Criteria

The section is complete when:

1. Both supplied videos are embedded correctly.
2. Only one video is visible at a time.
3. The previous button, next button and navigation dots work.
4. The slide transition is smooth.
5. Audio from the previous video stops after switching slides.
6. The section is responsive on desktop, tablet and mobile.
7. The design closely follows the supplied black, bordered and minimalist layout.
