import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

:root {
  /* Primary */
  --sunrise: rgb(65, 156, 184); /* Primary call to action color */
  --sky: #cebb11; /* Secondary call to action color */
  --daylight: rgb(245, 245, 245);
  --bright: rgb(255, 255, 255);
  --gray: rgb(194, 194, 194);
  --midnight: rgb(17, 17, 17);
}

* {
  margin: 0;
  padding: 0;
}

*:focus {
  outline: none;
}

*:active {
  outline: none;
}

button {
  color: var(--bright);
  background-color: var(--sky);
  border-radius: 25px;
  border: none;
  padding: 0.5rem 0.5rem;
}

body {
  background-color: #f1f1f1;
  font-size: 16px;
  ${'' /* font-family: Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; */}
  font-family: 'Balsamiq Sans', 'Open Sans', Arial;
  font-weight: 600;
  line-height: 1.6rem;
  letter-spacing: 0.05rem;
  scroll-behavior: smooth;
  text-align: center;
}

a {
  text-decoration: none;
}

img {
  width: 15rem;
}

@keyframes donut-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
`;

export default GlobalStyle;
