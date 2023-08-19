<script>
  const logoImage = document.getElementById('image-c418c30e');
  const whiteLogoUrl = 'https://d1yei2z3i6k35z.cloudfront.net/4555433/64dc0781ef611_sticky-menu-white-logo.png';
  const coloredLogoUrl = 'https://d1yei2z3i6k35z.cloudfront.net/4555433/64dc0776841e4_sticky-menu-colored-logo.png';

  const coloredLogo = new Image();
  coloredLogo.src = coloredLogoUrl;

  const whiteLogo = new Image();
  whiteLogo.src = whiteLogoUrl;

  logoImage.src = whiteLogoUrl;

  document.addEventListener('DOMContentLoaded', function () {
    const stickyMenu = document.getElementById('section-4f6994fa');
    const menu = document.getElementById('menu-972c4b46');
    const button = document.getElementById('button-e246b912');
    const navigationLinks = menu.querySelectorAll('a');

    const initialStyles = {
      backgroundImage: stickyMenu.style.backgroundImage,
      backgroundColor: stickyMenu.style.backgroundColor,
      menuColor: menu.style.color,
      buttonColor: button.style.backgroundColor
    };

    const transitionDuration = '0.5s';
    
    menu.style.transition = `color ${transitionDuration} ease-in-out`;
    navigationLinks.forEach(link => {
      link.style.transition = `color ${transitionDuration} ease-in-out`;
    });
    button.style.transition = `background-color ${transitionDuration} ease-in-out`;
    logoImage.style.transition = `opacity ${transitionDuration} ease-in-out`;
    stickyMenu.style.transition = `background-color ${transitionDuration} ease-in-out`; // Faster transition

    let isAtTop = true;
    let isButtonBlack = false;
    let logoSwapped = false;
    let isTransitioning = false;

    function swapLogo(sourceUrl) {
      logoImage.style.opacity = '0';
      setTimeout(() => {
        logoImage.src = sourceUrl;
        logoImage.style.opacity = '1';
        logoSwapped = false;
      }, 300);
    }

    function smoothTransition(element, property, fromValue, toValue, duration) {
      const fps = 60;
      const interval = 1000 / fps;
      const steps = duration / interval;
      let stepCount = 0;
      
      const increment = (toValue - fromValue) / steps;

      const timer = setInterval(() => {
        if (stepCount >= steps) {
          clearInterval(timer);
          element.style[property] = toValue;
        } else {
          element.style[property] = `${fromValue + increment * stepCount}px`;
          stepCount++;
        }
      }, interval);
    }

function resetStyles(styles) {
  // Use a faster duration for the background color reset transition
  stickyMenu.style.transition = `background-color 0.3s ease-in-out`; // Add this line
  stickyMenu.style.backgroundColor = 'transparent'; // Set the background color to transparent
  setTimeout(() => {
    stickyMenu.style.backgroundImage = styles.backgroundImage;
    stickyMenu.style.backgroundColor = styles.backgroundColor;
    stickyMenu.style.transition = 'background-color 0.5s ease-in-out'; // Reset the transition
  }, 300); // Same timing as the background color transition

      // Reset other styles here
      menu.style.color = styles.menuColor;
      navigationLinks.forEach(link => {
        link.style.color = styles.menuColor;
      });
      button.style.backgroundColor = styles.buttonColor;
    }

function toggleBackgroundOnScroll(elementId) {
    const section = document.getElementById(elementId);
    if (!section) {
      console.error(`Element with ID "${elementId}" not found.`);
      return;
    }

    let prevScrollPos = window.scrollY;

    function handleScroll() {
      const currentScrollPos = window.scrollY;

      if (currentScrollPos === 0) {
        resetStyles(initialStyles);
        if (!logoSwapped) {
          swapLogo(whiteLogoUrl);
          logoSwapped = true;
        }
        isAtTop = true;
        if (isButtonBlack) {
          button.style.backgroundColor = initialStyles.buttonColor;
          isButtonBlack = false;
        }
        navigationLinks.forEach((link, index) => {
          link.style.color = initialStyles.menuColor;
        });
      } else if (currentScrollPos > 0 && currentScrollPos > prevScrollPos && isAtTop) {
        if (!isTransitioning) {
          isTransitioning = true;
          section.style.backgroundColor = 'white';
          menu.style.color = 'black';
          navigationLinks.forEach(link => {
            link.style.color = 'black';
          });
          button.style.backgroundColor = 'black';
          setTimeout(() => {
            section.style.backgroundImage = `url(${coloredLogoUrl})`;
            isTransitioning = false;
          }, 150); // Same timing as swapping the logo
        }
        if (!logoSwapped) {
          swapLogo(coloredLogoUrl);
          logoSwapped = true;
        }
        isAtTop = false;
      } else if (currentScrollPos < prevScrollPos && !isAtTop) {
        menu.style.color = initialStyles.menuColor;
        if (!isAtTop && currentScrollPos === 0) {
          if (logoSwapped) {
            swapLogo(whiteLogoUrl);
            logoSwapped = false;
          }
          button.style.backgroundColor = initialStyles.buttonColor;
          isButtonBlack = false;
          navigationLinks.forEach((link, index) => {
            link.style.color = initialStyles.menuColor;
          });
        }
      }

      prevScrollPos = currentScrollPos;
    }

    window.addEventListener('scroll', handleScroll);
  }

  toggleBackgroundOnScroll('section-4f6994fa');

  });
</script>
