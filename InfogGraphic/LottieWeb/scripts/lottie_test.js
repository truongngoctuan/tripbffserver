var animation = bodymovin.loadAnimation({
    container: document.getElementById('svgExample'),
    renderer: 'svg',
    loop: false,
    autoplay: false,
    path: './data.json',
    name: 'svgB',
    rendererSettings: {
      className: 'svgBold'
    }
  });

  animation.playSegments([[5, 15]], true)

  setTimeout(() => {
    animation.playSegments([[50, 100]], true)
  }, 5000);