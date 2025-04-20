import ReactGA from "react-ga4";

// GA 초기화
export const initGA = () => {
  ReactGA.initialize('G-3F3CBN9BDD');
};

// 페이지 뷰 추적
export const logPageView = () => {
  ReactGA.send({ hitType: "pageview", page: window.location.pathname });
};